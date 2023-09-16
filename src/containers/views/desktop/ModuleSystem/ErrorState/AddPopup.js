
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import Constants from '../../../../../utils/Constants';
import AddPopupJsx from './AddPopup.jsx';
import AddPopupValidate from './AddPopupValidate';
import ErrorStateService from '../../../../../services/ErrorStateService';

class AddPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            allLanguage: this.props.allLanguage
        }

        this.jsxTemplate = AddPopupJsx;
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
        this.setState({
            curItem: curItem
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
                dataName = name.substr(0, 4),
                dataDescription = name.substr(0, 11);

            allLanguage.map((language, index) => {
                if (isoCode === language.iso_code && dataName === 'name') {
                    item.data[index].name = (event.target.validity.valid) ? value : this.state.curItem.data[index].name;
                }

                if (isoCode === language.iso_code && dataDescription === 'description') {
                    item.data[index].description = (event.target.validity.valid) ? value : this.state.curItem.data[index].description;
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
                params.data[index].name = (item.name === '') ? itemLanguageDefault.name : item.name;
                params.data[index].description = (item.description === '') ? itemLanguageDefault.description : item.description;
                return params;

            });
        } else { return false; }

        ErrorStateService.instance.save(params, function (status, data, msg) {
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