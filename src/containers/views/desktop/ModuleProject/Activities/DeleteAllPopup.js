
import BaseComponent from '../../../../BaseComponent';
import DeleteAllPopupJsx from './DeleteAllPopup.jsx';
import ClientActivitiesService from '../../../../../services/ClientActivitiesService';
import Libs from '../../../../../utils/Libs';

class DeleteAllPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            dataList: this.props.dataList
        }
        this.jsxTemplate = DeleteAllPopupJsx;
    }

    /**
     * @description close popup
     * @author Long.Pham 12/05/2021
     */
    onClickCloseDeleteAll() {
        if (!this.props.onClickCloseDeleteAll || typeof this.props.onClickCloseDeleteAll !== 'function') return;
        this.props.onClickCloseDeleteAll(false, null);
    }


    /** 
     * @description delete
     * @author Long.Pham 12/05/2021
    */
    async onDeleteAction() {
        let params = Object.assign({}, this.state.curItem), self = this;
        var dataList = this.state.dataList;
        var dataArr = [];
        if (Libs.isArrayData(dataList)) {
            for (var i = 0, len = dataList.length; i < len; i++) {
                if (dataList[i].is_checked) {
                    dataArr.push({
                        id: dataList[i].id,
                        updated_by: this.employee.first_name + ' ' + this.employee.last_name,
                        status: 0
                    });
                }
            }
        }
        params.dataArr = dataArr;
        params.type = 'customer';
        if (Libs.isArrayData(dataArr)) {
            ClientActivitiesService.instance.closeAlert(params, function (status, data, msg) {
                if (status) {
                    self.toast(msg, "info");
                    self.props.onClickCloseDeleteAll(true, data);
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
}
export default DeleteAllPopup;