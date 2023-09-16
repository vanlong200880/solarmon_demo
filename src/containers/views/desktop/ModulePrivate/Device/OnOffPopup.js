
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import OnOffPopupJsx from './OnOffPopup.jsx';
import MainDeviceService from '../../../../../services/MainDeviceService';
class OnOffPopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            // dataDeviceType: [],
            // dataList: [],
            // show_tab: this.props.show_tab,
            // dataDeviceHardware: []
        }

        this.jsxTemplate = OnOffPopupJsx;
    }
    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/09/2021
     */
    componentDidMount() {
        // this.getDataListHardware();
    }

    async onClickOnOffAction() {
        let params = Object.assign({}, this.state.curItem), self = this;
        params.status = params.status == 1 ? 0 : 1;
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

    // onClickShowTab = (index) => {
    //     this.setState({
    //         show_tab: index
    //     })
    // }
    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    // getDataListHardware() {
    //     let self = this;
    //     var { curItem } = this.state;
    //     let params = Object.assign({}, curItem);
    //     params.id_language = this.employee.id_language;
    //     params.id_employee = this.employee.id_employee;
    //     ClientDeviceService.instance.getDataListHardware(params, (data, total_row) => {
    //         if (Libs.isArrayData(data)) {
    //             curItem.last_communication = data[0].last_communication;
    //             curItem.last_attempt = data[0].last_attempt;
    //             self.setState({
    //                 dataDeviceHardware: data,
    //                 curItem: curItem
    //             });

    //         } else {
    //             self.setState({
    //                 dataDeviceHardware: []
    //             });
    //         }
    //     });
    // }

    // /**
    //  * @description reload data
    //  * @author Long.Pham 19/09/2021
    //  * @param {int} index
    //  */
    // reloadLatestData() {
    //     let self = this;
    //     self.getDataListHardware();
    // }

}
export default OnOffPopup;