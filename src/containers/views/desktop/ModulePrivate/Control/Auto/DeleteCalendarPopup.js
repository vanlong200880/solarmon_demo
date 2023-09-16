
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import DeleteCalendarPopupJsx from './DeleteCalendarPopup.jsx';
import MainDeviceService from '../../../../../../services/MainDeviceService';
class DeleteCalendarPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem
        }

        this.jsxTemplate = DeleteCalendarPopupJsx;
    }

    async onClickOnOffAction() {
        let params = Object.assign({}, this.state.curItem), self = this;
        MainDeviceService.instance.deleteListCalendarControl(params, function (status, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.closeDeleteCalendar(true);
            } else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);
    }

}
export default DeleteCalendarPopup;