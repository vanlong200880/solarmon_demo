
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import ViewDevicePopupJsx from './ViewDevicePopup.jsx';
import ClientDeviceService from '../../../../../services/ClientDeviceService';
class ViewDevicePopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            dataDeviceType: [],
            dataList: [],
            show_tab: this.props.show_tab,
            dataDeviceHardware: []
        }

        this.jsxTemplate = ViewDevicePopupJsx;
    }
    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/09/2021
     */
    componentDidMount() {
        this.getDataListHardware();
    }

    onClickShowTab = (index) => {
        this.setState({
            show_tab: index
        })
    }
    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getDataListHardware() {
        let self = this;
        var { curItem } = this.state;
        let params = Object.assign({}, curItem);
        params.id_language = this.employee.id_language;
        params.id_employee = this.employee.id_employee;
        ClientDeviceService.instance.getDataListHardware(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                curItem.last_communication = data[0].last_communication;
                curItem.last_attempt = data[0].last_attempt;
                self.setState({
                    dataDeviceHardware: data,
                    curItem: curItem
                });

            } else {
                self.setState({
                    dataDeviceHardware: []
                });
            }
        });
    }

    /**
     * @description reload data
     * @author Long.Pham 19/09/2021
     * @param {int} index
     */
    reloadLatestData() {
        let self = this;
        self.getDataListHardware();
    }

}
export default ViewDevicePopup;