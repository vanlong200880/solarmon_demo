
import BaseComponent from '../../../../BaseComponent';
import DeleteDevicePopupJsx from './DeleteDevicePopup.jsx';
import DeviceService from '../../../../../services/DeviceService';
import Libs from '../../../../../utils/Libs';

class DeleteDevicePopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItemDelete
        }
        this.jsxTemplate = DeleteDevicePopupJsx;
    }

    /**
     * @description close popup
     * @author Long.Pham 12/05/2021
     */
     onClickCloseDeleteDevice() {
        if (!this.props.onClickCloseDeleteDevice || typeof this.props.onClickCloseDeleteDevice !== 'function') return;
        this.props.onClickCloseDeleteDevice(false, null);
    }


    /** 
     * @description delete
     * @author Long.Pham 12/05/2021
    */
    async onDeleteDeviceAction() {
        let params = Object.assign({}, this.state.curItem), self = this;
        params.status = -1;
        params.updated_by = this.employee.first_name + ' ' + this.employee.last_name;
        DeviceService.instance.delete(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onClickCloseDeleteDevice(true, data);
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
export default DeleteDevicePopup;