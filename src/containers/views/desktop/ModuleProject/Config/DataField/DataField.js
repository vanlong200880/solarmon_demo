import DataFieldJsx from './DataField.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/Constants';
import ClientConfigService from '../../../../../../services/ClientConfigService';

class DataField extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            curItem: {},
            itemDevice: this.props.itemDevice,
            dataFields: [
                { id: 1, key: "dc_current_string01", dc_current_string01: 0, name: "DC Current String 01" },
                { id: 2, key: "dc_current_string02", dc_current_string02: 0, name: "DC Current String 02" },
                { id: 3, key: "dc_current_string03", dc_current_string03: 0, name: "DC Current String 03" },
                { id: 4, key: "dc_current_string04", dc_current_string04: 0, name: "DC Current String 04" },
                { id: 5, key: "dc_current_string05", dc_current_string05: 0, name: "DC Current String 05" },
                { id: 6, key: "dc_current_string06", dc_current_string06: 0, name: "DC Current String 06" },
                { id: 7, key: "dc_current_string07", dc_current_string07: 0, name: "DC Current String 07" },
                { id: 8, key: "dc_current_string08", dc_current_string08: 0, name: "DC Current String 08" },
                { id: 9, key: "dc_current_string09", dc_current_string09: 0, name: "DC Current String 09" },
                { id: 10, key: "dc_current_string10", dc_current_string10: 0, name: "DC Current String 10" },
                { id: 11, key: "dc_current_string11", dc_current_string11: 0, name: "DC Current String 11" },
                { id: 12, key: "dc_current_string12", dc_current_string12: 0, name: "DC Current String 12" },
                { id: 13, key: "dc_current_string13", dc_current_string13: 0, name: "DC Current String 13" },
                { id: 14, key: "dc_current_string14", dc_current_string14: 0, name: "DC Current String 14" },
                { id: 15, key: "dc_current_string15", dc_current_string15: 0, name: "DC Current String 15" },
                { id: 16, key: "dc_current_string16", dc_current_string16: 0, name: "DC Current String 16" },
                { id: 17, key: "dc_current_string17", dc_current_string17: 0, name: "DC Current String 17" },
                { id: 18, key: "dc_current_string18", dc_current_string18: 0, name: "DC Current String 18" },
                { id: 19, key: "dc_current_string19", dc_current_string19: 0, name: "DC Current String 19" },
                { id: 20, key: "dc_current_string20", dc_current_string20: 0, name: "DC Current String 20" },
                { id: 21, key: "dc_current_string21", dc_current_string21: 0, name: "DC Current String 21" },
                { id: 22, key: "dc_current_string22", dc_current_string22: 0, name: "DC Current String 22" },
                { id: 23, key: "dc_current_string23", dc_current_string23: 0, name: "DC Current String 23" },
                { id: 24, key: "dc_current_string24", dc_current_string24: 0, name: "DC Current String 24" }
            ]
        };

        this.jsxTemplate = DataFieldJsx;
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

        ClientConfigService.instance.getDeviceDetail(params, data => {
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

        ClientConfigService.instance.updateDevice(params, function (status, data, msg) {
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
        switch (parseInt(itemDevice.id_device_group)) {
            case 18: // 6 string 
            case 21: // 6 string 
            case 28: // 12 string
                return this.jsxTemplate.call(this);
            default:
                return Libs.isObjectEmpty(itemDevice) ? <div className="data-empty">Device is not selected </div> : <div className="data-empty">There is no configuration for this device</div>;
        }
    }
}

const HighOrderComponentTranslated = withTranslation('common')(DataField)
export default HighOrderComponentTranslated;