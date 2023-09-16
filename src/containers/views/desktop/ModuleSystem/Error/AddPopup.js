
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import Constants from '../../../../../utils/Constants';
import AddPopupJsx from './AddPopup.jsx';
import AddPopupValidate from './AddPopupValidate';
import ErrorService from '../../../../../services/ErrorService';
import ErrorTypeService from '../../../../../services/ErrorTypeService';
import ErrorLevelService from '../../../../../services/ErrorLevelService';
import ErrorStateService from '../../../../../services/ErrorStateService';
import DeviceGroupService from '../../../../../services/DeviceGroupService';

class AddPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            allLanguage: this.props.allLanguage,
            dataErrorType: [],
            dataErrorLevel: [],
            dataErrorState: [],
            dataDeviceGroup: []
        }

        this.jsxTemplate = AddPopupJsx;
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/05/2021
     */
    componentDidMount() {
        var { curItem } = this.state;
        if(Constants.SCREEN_MODE.ADD == curItem.screen_mode){
            curItem.status = 1;
        }
        this.getListErrorType();
        this.getListErrorLevel();
        this.getListErrorState();
        this.getListDeviceGroup();
        this.setState({
            curItem: curItem
        })
    }

    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;
        var { t } = this.props;

        if (name === 'id_error_type') {
            if (Libs.isObjectEmpty(item)) {
                curItem.id_error_type = '';
            } else {
                var value = item.value;
                curItem[name] = value;
                self.setValidateMessage({ id_error_type: '' }, true);
            }
        }

        if (name === 'id_error_level') {
            if (Libs.isObjectEmpty(item)) {
                curItem.id_error_level = '';
            } else {
                var value = item.value;
                curItem[name] = value;
                self.setValidateMessage({ id_error_level: '' }, true);
            }
        }
        if (name === 'id_error_state') {
            if (Libs.isObjectEmpty(item)) {
                curItem.id_error_state = '';
            } else {
                var value = item.value;
                curItem[name] = value;
                self.setValidateMessage({ id_error_state: '' }, true);
            }
        }

        if (name === 'id_device_group') {
            if (Libs.isObjectEmpty(item)) {
                curItem.id_device_group = '';
            } else {
                var value = item.value;
                curItem[name] = value;
                self.setValidateMessage({ id_device_group: '' }, true);
            }
        }

        self.setState({
            curItem: curItem
        });
    }


     /**
    * ge list error state
    * @author Long.Pham 2019-06-03
    */
      getListDeviceGroup() {
        let self = this;
        var params = { id_language: this.employee.id_language };

        DeviceGroupService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataDeviceGroup: data
                });
            } else {
                self.setState({
                    dataDeviceGroup: []
                });
            }
        })
    }

    /**
    * ge list error state
    * @author Long.Pham 2019-06-03
    */
     getListErrorState() {
        let self = this;
        var params = { id_language: this.employee.id_language };

        ErrorStateService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataErrorState: data
                });
            } else {
                self.setState({
                    dataErrorState: []
                });
            }
        })
    }

     /**
    * ge list error level
    * @author Long.Pham 2019-06-03
    */
      getListErrorLevel() {
        let self = this;
        var params = { id_language: this.employee.id_language };

        ErrorLevelService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataErrorLevel: data
                });
            } else {
                self.setState({
                    dataErrorLevel: []
                });
            }
        })
    }


    /**
    * ge list error type
    * @author Long.Pham 2019-06-03
    */
     getListErrorType() {
        let self = this;
        var params = { id_language: this.employee.id_language };

        ErrorTypeService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataErrorType: data
                });
            } else {
                self.setState({
                    dataErrorType: []
                });
            }
        })
    }


    onClickShowTab = (e, tabActive) => {
        var curItem = this.state.curItem;
        if (Libs.isBlank(tabActive)) return;
        curItem.tabActive = tabActive;

        this.setState({
            curItem: curItem
        });
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
            let v = new AddPopupValidate(this.props);
            let error = await v.validateOne(param, name);
            if (error != null) {
                this.setValidateMessage(error, true);
            }
        }
    }

    /**
     * @description select change
     * @author Long.Pham 12/05/2021
     * @param {*} event 
     */

    handleInputTranslateChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }
        if (name) {
            let item = this.state.curItem;
            let allLanguage = this.state.allLanguage;
            let isoCode = name.substr(-2, 2),
                dataMessage = name.substr(0, 7),
                dataDescription = name.substr(0, 11),
                dataSolutions = name.substr(0, 9);
                

            allLanguage.map((language, index) => {
                if (isoCode === language.iso_code && dataMessage === 'message') {
                    item.data[index].message = (event.target.validity.valid) ? value : this.state.curItem.data[index].message;
                }

                if (isoCode === language.iso_code && dataDescription === 'description') {
                    item.data[index].description = (event.target.validity.valid) ? value : this.state.curItem.data[index].description;
                }

                if (isoCode === language.iso_code && dataSolutions === 'solutions') {
                    item.data[index].solutions = (event.target.validity.valid) ? value : this.state.curItem.data[index].solutions;
                }

                return 1;
            });

            item[name] = (event.target.validity.valid) ? value : this.state.curItem[name];

            this.setState({ curItem: item });
        }
    }



    /**
     * @description save data
     * @author long.pham 12/05/2021
     */
    async onSave() {
        var {curItem} = this.state, self = this;
        var params = Object.assign({}, this.state.curItem);
        var screenMode = (!Libs.isBlank(curItem.id)) ? Constants.SCREEN_MODE.EDIT : ((!Libs.isBlank(this.props.curItem.screen_mode)) ? this.props.curItem.screen_mode : Constants.SCREEN_MODE.ADD);
        let v = new AddPopupValidate(this.props);
        let errors = await v.FLValidationAll(curItem);
        if (errors) {
            this.setValidateMessage(errors);
            return;
        }
        //remove message validation
        this.removeAllValidateMessage();
        params.screen_mode = screenMode;

        params.iso_code_lang = this.employee.lang;
        params.id_language = this.employee.id_language;
        params.iso_code = this.employee.iso_code;

        if (Libs.isArrayData(params.data)) {
            let itemLanguageDefault = Libs.find(params.data, 'is_default', 1);
            if (!itemLanguageDefault) return;

            params.data.map((item, index) => {
                params.data[index].message  = (item.message === '') ? itemLanguageDefault.message : item.message;
                params.data[index].description = (item.description === '') ? itemLanguageDefault.description : item.description;
                params.data[index].solutions  = (item.solutions === '') ? itemLanguageDefault.solutions : item.solutions;
                return params;

            });
        } else { return false; }

        ErrorService.instance.save(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onClickCloseAdd(true);
            }
            else if (data) {
                self.setValidateMessage(data);
            }

            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);
    }
}
export default AddPopup;