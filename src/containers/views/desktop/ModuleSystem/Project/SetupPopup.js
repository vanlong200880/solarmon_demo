
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import SetupPopupJsx from './SetupPopup.jsx';
import ProjectService from '../../../../../services/ProjectService';
import Constants from '../../../../../utils/Constants';
import SetupPopupValidate from './SetupPopupValidate';
import EstimationSensorValidate from './EstimationSensorValidate';

class SetupPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItemProject: this.props.curItem,
            curItem: {},
            dataYear: this.getListYear(),
            dataConfigRevenue: []
        }

        this.jsxTemplate = SetupPopupJsx;
        this.handleInputChangeItem = this.handleInputChangeItem.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    componentDidMount(){
        this.loadConfig();
    }
    /**
     * @description Item click event
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
     loadConfig = () => {
        var item = this.props.curItem, self = this;
        if(Libs.isObjectEmpty(item)) return;

        ProjectService.instance.getDetailConfig(item, data => {
            if (data) {
                self.setState({
                    curItem: data,
                    dataConfigRevenue: Libs.isArrayData(data.dataConfigRevenue) ? data.dataConfigRevenue: []
                });
            }
        }, false);
    }

    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;

        if (Libs.isObjectEmpty(item)) {
            curItem.year = '';
        } else {
            var value = item.value;
            curItem[name] = value;
            self.setValidateMessage({ year: '' }, true);
        }

        self.setState({
            curItem: curItem
        });
    }

    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputChangeItem(event, index) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            var { dataConfigRevenue } = this.state;
            var item = dataConfigRevenue[index];

            if (name == 'config_revenue') {
                var numericExpression = /^[0-9\b]+$/;
                if (value == "" || numericExpression.test(value)) {
                    item[name] = value;
                    dataConfigRevenue[index] = item;
                    this.setState({ dataConfigRevenue: dataConfigRevenue });
                }
            } else {
                item[name] = value;
                dataConfigRevenue[index] = item;
                this.setState({ dataConfigRevenue: dataConfigRevenue });
            }
        }
    }


    getListYear() {
        var dataYear = [];
        let date = new Date();
        let year = date.getFullYear();
        if (year > 0) {
            for (var i = year; i >= year - 20; i--) {
                dataYear.push({
                    id: i,
                    value: i,
                    label: i
                })
            }
        }
        return dataYear;
    }

    onItemClickDelete = (index) => {
        var { dataConfigRevenue } = this.state;
        if (!Libs.isArrayData(dataConfigRevenue)) return;
        var item = dataConfigRevenue[index];
        if (Libs.isObjectEmpty(item)) return;
        dataConfigRevenue.splice(index, 1);
        this.setState({
            dataConfigRevenue: dataConfigRevenue
        })
    }

    addRowConfigRevenue = () => {
        var { dataConfigRevenue } = this.state;
        dataConfigRevenue.push({
            id: '',
            id_project: '',
            config_revenue: '',
            start_date: '',
            end_date: '',
            status: 1
        });
        this.setState({
            dataConfigRevenue: dataConfigRevenue
        })
    }


    /**
     * @description save data
     * @author long.pham 12/05/2021
     */
    async onSave() {
        var { curItem, dataConfigRevenue, curItemProject } = this.state, self = this;
        var params = Object.assign({}, curItem);
        params.screen_mode = Constants.SCREEN_MODE.EDIT;
        params.id_language = this.employee.id_language;
        params.id_project = curItemProject.id;
        params.dataConfigRevenue = dataConfigRevenue;

        let v = new SetupPopupValidate(this.props);
        let errors = await v.FLValidationAll(curItem);
        if (errors) {
            this.setValidateMessage(errors);
            return;
        }
        //remove message validation
        this.removeAllValidateMessage();



        ProjectService.instance.saveConfig(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onItemClickCloseSetup(false);
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
     * @description save data
     * @author long.pham 12/05/2021
     */
     async onSaveEstimationSenSor() {
        var { curItem, curItemProject } = this.state, self = this;
        var params = Object.assign({}, curItem);
        params.screen_mode = Constants.SCREEN_MODE.EDIT;
        params.id_language = this.employee.id_language;
        params.id_project = curItemProject.id;

        let v = new EstimationSensorValidate(this.props);
        let errors = await v.FLValidationAll(curItem);
        if (errors) {
            this.setValidateMessage(errors);
            return;
        }
        //remove message validation
        this.removeAllValidateMessage();


        ProjectService.instance.saveConfigEstimationSenSor(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
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
     * @description validate a field input
     * @author Long.Pham 12/05/2021
     * @param {*} event 
     */
      async validateOne(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (name) {
            let param = {
                [name]: value
            }
            let v = new SetupPopupValidate(this.props);
            let error = await v.validateOne(param, name);
            if (error != null) {
                this.setValidateMessage(error, true);
            }
        }
    }

    /**
     * @description validate a field input
     * @author Long.Pham 12/05/2021
     * @param {*} event 
     */
     async validateOneEst(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (name) {
            let param = {
                [name]: value
            }
            let v = new EstimationSensorValidate(this.props);
            let error = await v.validateOne(param, name);
            if (error != null) {
                this.setValidateMessage(error, true);
            }
        }
    }

}
export default SetupPopup;