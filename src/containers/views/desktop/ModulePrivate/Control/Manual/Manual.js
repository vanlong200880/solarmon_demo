import ManualJsx from './Manual.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/Constants';
import MainDeviceService from '../../../../../../services/MainDeviceService';
import ControlValidate from './ControlValidate';
import './Manual.scss';

class Manual extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = ManualJsx;
        this.state = {
            hash_id: this.props.hash_id,
            curItem: {},
            curProject: {},
            dataListInverter: [],
            showOnOffPopup: false,
            changeMode: false,
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
                max_date: Libs.getCurrentDDMMYYYY(),
                current_date: Libs.getCurrentDDMMYYYY(),
                scheduled_mode: 1,
                limit_power_status: 1,
                limit_energy_status: 1
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);


    }

    componentDidMount() {
        this.getListInverter();
        this.getProjectDetail();
    }


    /**
     * @description Item click event
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    getProjectDetail() {
        var { searchParam } = this.state;
        var self = this;
        var params = {
            hash_id: this.state.hash_id
        };
        MainDeviceService.instance.getProjectDetail(params, data => {
            if (data) {
                searchParam.scheduled_mode = data.export_limitation_control_mode;
                searchParam.limit_energy_status = data.limit_energy_status;
                searchParam.limit_power_status = data.limit_power_status;
                searchParam.limit_power = data.limit_power;
                searchParam.limit_energy = data.limit_energy;
                self.setState({
                    curProject: data,
                    searchParam: searchParam
                });
            }
        }, false);
    }

    calbackChangeMode = (searchParam) => {
        var self = this;
        let params = {
            export_limitation_control_mode: searchParam.scheduled_mode,
            hash_id: this.state.hash_id,
            type: 'export_control'
        };

        MainDeviceService.instance.updateControlMode(params, function (status, msg) {
            if (status) {
                self.setState({ searchParam: searchParam, changeMode: false });
            }
            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);

    }

    onClickCloseChangeMode = () => {
        this.setState({
            changeMode: false
        });
    }

    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputChange(event) {
        let target = event.target, self = this;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let { searchParam } = this.state;
            if (name == 'scheduled_manual_mode') {
                if (searchParam.scheduled_mode == 1) { return; }
                self.setState({ changeMode: true });
            }
            if (name == 'scheduled_auto_mode') {
                if (searchParam.scheduled_mode == 2) { return; }
                self.setState({ changeMode: true });
            }

            if (name == 'limit_energy_status') {
                searchParam[name] = searchParam.limit_energy_status == 1 ? 0 : 1
            }
            if (name == 'limit_power_status') {
                searchParam[name] = searchParam.limit_power_status == 1 ? 0 : 1
            }

            if (name == 'limit_energy' || name == 'limit_power') {
                searchParam[name] = (event.target.validity.valid) ? value : searchParam[name];
                self.setState({ searchParam: searchParam });
            }

        }
    }


    /**
     * @description validate a field input
     * @author Long.Pham 12/05/2021
     * @param {*} event 
     */
    async validateOne(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name) {
            let param = {
                [name]: value
            }
            let v = new ControlValidate(this.props);
            let error = await v.validateOne(param, name);
            if (error != null) {
                this.setValidateMessage(error, true);
            }
        }
    }


    onClickControlCalender = (index) => {
        var { dataListInverter } = this.state;
        if (!Libs.isArrayData(dataListInverter)) return;
        var item = dataListInverter[index];
        if (Libs.isObjectEmpty(item)) return;
        this.setState({
            showControlCalendar: true,
            curItem: item
        })

    }

    onCloseControlCalender = () => {
        this.setState({
            showControlCalendar: false
        })

    }


    onClickCloseOnOff = (status) => {
        if (status) {
            this.getListInverter();
        }
        this.setState({
            showOnOffPopup: false
        })
    }


    onClickOnOff = (index) => {
        var { dataListInverter } = this.state;
        if (!Libs.isArrayData(dataListInverter)) return;
        var item = dataListInverter[index];
        if (Libs.isObjectEmpty(item)) return;
        this.setState({
            showOnOffPopup: true,
            curItem: item
        })

    }

    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getListInverter() {
        let self = this;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_employee = this.employee.id_employee;
        params.hash_id = this.state.hash_id;
        params.type = 'private';
        MainDeviceService.instance.getListInverter(params, (data, total_row) => {
            console.log("aaa: ", params, data);
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataListInverter: data
                });
            } else {
                self.setState({
                    dataListInverter: []
                });
            }
            self.forceUpdate();
        });
    }

    onClickSaveExportLimitationAction() {
        var { searchParam } = this.state, self = this;

        let params = {
            limit_energy: searchParam.limit_energy ? searchParam.limit_energy : null,
            limit_power: searchParam.limit_power ? searchParam.limit_power : null,
            hash_id: this.state.hash_id,
            type: 'save'
        };

        MainDeviceService.instance.updateModePowerAndEnergy(params, function (status, msg) {
            if (status) {
                self.setState({ searchParam: searchParam });
            }
            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Manual)
export default HighOrderComponentTranslated;