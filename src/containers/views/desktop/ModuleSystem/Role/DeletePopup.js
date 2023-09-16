
import BaseComponent from '../../../../BaseComponent';
import DeletePopupJsx from './DeletePopup.jsx';
import RoleService from '../../../../../services/RoleService';
import Libs from '../../../../../utils/Libs';

class DeletePopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem
        }
        this.jsxTemplate = DeletePopupJsx;
    }

    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/05/2021
     */
    componentDidMount() {
    }

    /**
     * @description close popup
     * @author Long.Pham 12/05/2021
     */
     onClickCloseDelete() {
        if (!this.props.onClickCloseDelete || typeof this.props.onClickCloseDelete !== 'function') return;
        this.props.onClickCloseDelete(false, null);
    }


    /** 
     * @description delete
     * @author Long.Pham 12/05/2021
    */
    async onDeleteAction() {
        let params = Object.assign({}, this.state.curItem), self = this;
        params.status = -1;
        params.updated_by = this.employee.first_name + ' ' + this.employee.last_name;
        RoleService.instance.delete(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.props.onClickCloseDelete(true, data);
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
export default DeletePopup;