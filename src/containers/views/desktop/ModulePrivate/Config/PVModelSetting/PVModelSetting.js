import PVModelSettingJsx from './PVModelSetting.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/Constants';
import MainConfigService from '../../../../../../services/MainConfigService';

class PVModelSetting extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            curItem: {},
            itemDevice: this.props.itemDevice,
            dataListSensor: []

        };

        this.jsxTemplate = PVModelSettingJsx;
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    componentDidMount() {
        this.getListDeviceSensor();
        this.getDeviceDetail();
    }

    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;

        if (Libs.isObjectEmpty(item)) {
            if (name == 'poa_irradiance') {
                curItem.poa_irradiance = null;
            } else if (name == 'panel_temperature') {
                curItem.panel_temperature = null;
            }

        } else {
            var value = item.value;
            curItem[name] = value;
        }

        self.setState({
            curItem: curItem
        });
    }

    getListDeviceSensor() {
        let self = this;
        let params = {
            hash_id: this.state.hash_id
        };

        MainConfigService.instance.getListDeviceSensor(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataListSensor: data
                });
            } else {
                self.setState({
                    dataListSensor: []
                });
            }
        });
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
        switch (parseInt(itemDevice.id_device_group)) {
            case 18: // innvert 
            case 19: // innvert
            case 20: // innvert
            case 21: // 6 string 
            case 22: // innvert
            case 28: // 12 string
            case 29: // emeter
            case 30: // emeter
                return this.jsxTemplate.call(this);
            default:
                return Libs.isObjectEmpty(itemDevice) ? <div className="data-empty">Device is not selected </div> : <div className="data-empty">There is no configuration for this device</div>;
        }
    }
}

const HighOrderComponentTranslated = withTranslation('common')(PVModelSetting)
export default HighOrderComponentTranslated;