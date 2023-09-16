
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import Constants from '../../../../../utils/Constants';
import AddPopupJsx from './AddPopup.jsx';
import AddPopupValidate from './AddPopupValidate';
import DeviceParameterService from '../../../../../services/DeviceParameterService';
import DeviceGroupService from '../../../../../services/DeviceGroupService';

class AddPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: Object.assign({}, this.props.curItem),
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
        this.getListDeviceGroup();
        this.setState({
            curItem: curItem
        })
    }

    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;

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
    * ge list DeviceParameter state
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
            let DeviceParameter = await v.validateOne(param, name);
            if (DeviceParameter != null) {
                this.setValidateMessage(DeviceParameter, true);
            }
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
        let DeviceParameters = await v.FLValidationAll(curItem);
        if (DeviceParameters) {
            this.setValidateMessage(DeviceParameters);
            return;
        }
        //remove message validation
        this.removeAllValidateMessage();
        params.screen_mode = screenMode;

        params.iso_code_lang = this.employee.lang;
        params.id_language = this.employee.id_language;
        params.iso_code = this.employee.iso_code;

        DeviceParameterService.instance.save(params, function (status, data, msg) {
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