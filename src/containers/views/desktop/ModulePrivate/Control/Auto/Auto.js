import AutoJsx from './Auto.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/Constants';
import MainDeviceService from '../../../../../../services/MainDeviceService';
import ControlCalendarValidate from './ControlCalendarValidate';
import moment from 'moment';


class Auto extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = AutoJsx;
        this.state = {
            hash_id: this.props.hash_id,
            curItem: {},
            dataListInverter: [],
            showOnOffPopup: false,
            deleteItemCalendar: false,
            changeMode: false,
            itemCalendar: {},
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
                max_date: Libs.getCurrentDDMMYYYY(),
                current_date: Libs.getCurrentDDMMYYYY(),
                scheduled_mode: 1,
                date_from: moment().format("DD/MM/YYYY HH:mm"),
                min_date: moment().format("DD/MM/YYYY HH:mm"),
            },
            eventsList: []
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputDateChange = this.handleInputDateChange.bind(this);

    }

    componentDidMount() {
        this.getListInverter();
        this.getListControlCalendar();
        this.getProjectDetail();
    }


    onClickCloseChangeMode = () => {
        this.setState({
            changeMode: false
        });
    }
    /**
     * @description Item click event
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    getProjectDetail() {
        var self = this;
        var { searchParam } = this.state;
        var params = {
            hash_id: this.state.hash_id
        };
        MainDeviceService.instance.getProjectDetail(params, data => {
            if (data) {
                searchParam.scheduled_mode = data.schedule_control_mode;
                self.setState({
                    curProject: data,
                    searchParam: searchParam
                });
            }
        }, false);
    }

    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputDateChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let { searchParam } = this.state;
            searchParam[name] = value;

            if (name == 'date_from') {
                searchParam.date_to = moment(Libs.dateFormat(value, 'YYYY-MM-DD HH:mm:ss', 'DD/MM/YYYY HH:mm')).add(2, 'hours').format('DD/MM/YYYY HH:mm')
            }
            this.setState({ searchParam });
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
            let v = new ControlCalendarValidate(this.props);
            let error = await v.validateOne(param, name);
            if (error != null) {
                this.setValidateMessage(error, true);
            }
        }
    }


    handleCheckedChange(index) {
        var { dataListInverter } = this.state;
        if (!Libs.isArrayData(dataListInverter)) return;
        var item = dataListInverter[index];
        if (Libs.isObjectEmpty(item)) return;

        dataListInverter[index].checked = dataListInverter[index].checked == 1 ? 0 : 1;
        this.setState({
            dataListInverter: dataListInverter
        })
    }

    calbackChangeMode = (searchParam) => {
        var self = this;
        var params = {
            schedule_control_mode: searchParam.scheduled_mode,
            hash_id: this.state.hash_id,
            type: 'schedule_control'
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
            var { searchParam } = this.state;
            if (name == 'scheduled_mode_auto') {
                if (searchParam.scheduled_mode == 2) { return; }
                self.setState({ changeMode: true });
            }
            if (name == 'scheduled_mode_manual') {
                if (searchParam.scheduled_mode == 1) { return; }
                self.setState({ changeMode: true });
            }
        }
    }

    async onClickAddControlCalendarAction() {
        var { curItem, searchParam, dataListInverter } = this.state, self = this;
        var params = Object.assign({}, searchParam);
        let v = new ControlCalendarValidate(this.props);
        let errors = await v.FLValidationAll(params);
        if (errors) {
            this.setValidateMessage(errors);
            return;
        }

        //remove message validation
        this.removeAllValidateMessage();
        params.screen_mode = Constants.SCREEN_MODE.ADD;

        if (!Libs.isArrayData(dataListInverter)) return;
        var dataDevices = dataListInverter.filter((item) => item.checked == 1);
        if (!Libs.isArrayData(dataDevices)) { self.toast("You haven't selected a device", "error"); }
        params.dataDevices = dataDevices;
        params.date_from = Libs.dateFormat(searchParam.date_from, "YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY HH:mm:ss");
        params.date_to = Libs.dateFormat(searchParam.date_to, "YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY HH:mm:ss");

        MainDeviceService.instance.saveArrControlCalendar(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                searchParam.date_from = null;
                searchParam.date_to = null;
                self.setState({
                    searchParam: searchParam
                }, () => {
                    self.getListControlCalendar();
                })
            }
            else if (data) {
                self.setValidateMessage(data);
            }

            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);
    }



    /**
        * get list
        * @author Long.Pham 2019-06-03
        */
    getListControlCalendar() {
        let self = this;
        var { curItem, hash_id } = this.state;
        let params = Object.assign({}, curItem);
        params.hash_id = hash_id;

        var eventsList = [];
        MainDeviceService.instance.getListBySiteControlCalendar(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                data.map((item, index) => {
                    eventsList.push({
                        'title': item.title,
                        'start': new Date(item.start),
                        'end': new Date(item.end),
                        'index': index,
                        'id': item.id,
                        'id_device': item.id_device,
                        'id_site': item.id_site,
                        'hash_id': item.hash_id,
                        'date_from': item.date_from,
                        'date_to': item.date_to
                    }
                    );
                })
                self.setState({
                    eventsList: eventsList
                });

            } else {
                self.setState({
                    eventsList: []
                });
            }
        });
    }

    onSelectEvent(event) {
        if (Libs.isObjectEmpty(event)) return;
        this.setState({
            itemCalendar: event,
            deleteItemCalendar: true
        })
    }

    closeDeleteCalendar = (status) => {
        if (status) {
            this.getListControlCalendar();
        }
        this.setState({
            deleteItemCalendar: false
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


    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Auto)
export default HighOrderComponentTranslated;