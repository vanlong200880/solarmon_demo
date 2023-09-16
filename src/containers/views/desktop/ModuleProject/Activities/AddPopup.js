
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import Constants from '../../../../../utils/Constants';
import AddPopupJsx from './AddPopup.jsx';
import ClientActivitiesService from '../../../../../services/ClientActivitiesService';
import AlertStateService from '../../../../../services/AlertStateService';

class AddPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            dataErrorType: this.props.dataErrorType,
            dataErrorLevel: this.props.dataErrorLevel,
            dataStatus: this.props.dataStatus,
            dataAlertState: []
        }
        this.jsxTemplate = AddPopupJsx;
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }
    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/05/2021
     */
    componentDidMount() {
        this.getListAlertState();
    }

    handleAlertStateInputChange = (index) => {
        var { dataAlertState, curItem } = this.state;
        if(!Libs.isArrayData(dataAlertState)) return;
        var item = dataAlertState[index];
        if(Libs.isObjectEmpty(item)) return;
        curItem.id_alert_state = item.id;
        this.setState({
            curItem: curItem
        })
    }
    /**
    * ge list error state
    * @author Long.Pham 2019-06-03
    */
    getListAlertState() {
        let self = this;
        var params = { id_language: this.employee.id_language };

        AlertStateService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataAlertState: data
                });
            } else {
                self.setState({
                    dataAlertState: []
                });
            }
        })
    }


    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;

        if (Libs.isObjectEmpty(item)) {
            curItem.status = '';
        } else {
            var value = item.value;
            curItem[name] = value;
        }

        self.setState({
            curItem: curItem
        });
    }

    

    /**
     * @description save data
     * @author long.pham 12/05/2021
     */
    async onSave() {
        var curItem = this.state.curItem, self = this;
        var params = Object.assign({}, curItem);
        params.screen_mode = Constants.SCREEN_MODE.EDIT ;
        params.id_employee = this.employee.id_employee;
        params.id_language = this.employee.id_language;
        params.type = 'customer';

        ClientActivitiesService.instance.save(params, function (status, data, msg) {
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