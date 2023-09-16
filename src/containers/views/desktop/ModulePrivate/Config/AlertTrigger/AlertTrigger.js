import AlertTriggerJsx from './AlertTrigger.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/Constants';
import MainConfigService from '../../../../../../services/MainConfigService';

class AlertTrigger extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            curItem: {},
            itemDevice: this.props.itemDevice
        };

        this.jsxTemplate = AlertTriggerJsx;
    }

    componentDidMount() {
        this.getDeviceDetail();
    }

    getDeviceDetail() {
        let self = this, itemDevice = this.props.itemDevice;
        var params = {
            id: itemDevice.id,
            id_employee: this.employee.id_employee,
            id_language: this.employee.id_language
        };

        MainConfigService.instance.getDeviceDetail(params, data => {
            if (data) {
                self.setState({
                    curItem: data
                });
            }
        }, false);

    }


    async onSave() {
        var self = this;
        var params = Object.assign({}, this.state.curItem);
        params.screen_mode = Constants.SCREEN_MODE.EDIT;
        params.id_language = this.employee.id_language;

        MainConfigService.instance.updateDevice(params, function (status, data, msg) {
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

    render() {
        var { itemDevice } = this.state;
        return Libs.isObjectEmpty(itemDevice) ? <div className="data-empty">Device is not selected </div> : this.jsxTemplate.call(this);
        // if()
        // switch (parseInt(itemDevice.id_device_group)) {
        //     case 18: // 6 string 
        //     case 21: // 6 string 
        //     case 28: // 12 string
        //         return this.jsxTemplate.call(this);
        //     default:

        // }
    }
}

const HighOrderComponentTranslated = withTranslation('common')(AlertTrigger)
export default HighOrderComponentTranslated;