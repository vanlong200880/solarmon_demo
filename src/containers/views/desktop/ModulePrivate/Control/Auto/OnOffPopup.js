
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import OnOffPopupJsx from './OnOffPopup.jsx';
import MainDeviceService from '../../../../../../services/MainDeviceService';
class OnOffPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem
        }

        this.jsxTemplate = OnOffPopupJsx;
    }


    async onClickOnOffAction() {
        let params = Object.assign({}, this.state.curItem), self = this;
        params.status_control = params.status_control == 1 ? 0 : 1;
        params.updated_by = this.employee.first_name + ' ' + this.employee.last_name;
        MainDeviceService.instance.updateOnOff(params, function (status, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onClickCloseOnOff(true);
            } else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);
    }

}
export default OnOffPopup;