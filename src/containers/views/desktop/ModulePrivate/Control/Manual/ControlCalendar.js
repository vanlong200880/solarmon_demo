
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import ControlCalendarJsx from './ControlCalendar.jsx';
import MainDeviceService from '../../../../../../services/MainDeviceService';
import ControlCalendarValidate from './ControlCalendarValidate';
import moment from 'moment';
import Constants from '../../../../../../utils/Constants';

class ControlCalendar extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            itemCalendar: {},
            deleteItemCalendar: false,
            searchParam: {
                date_from: moment().format("DD/MM/YYYY HH:mm"),
                min_date: moment().format("DD/MM/YYYY HH:mm"),
            },
            eventsList: []
        }

        this.jsxTemplate = ControlCalendarJsx;
    }
    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/09/2021
     */
    componentDidMount() {
        this.getListControlCalendar();
    }

    /**
         * get list
         * @author Long.Pham 2019-06-03
         */
    getListControlCalendar() {
        let self = this;
        var { curItem } = this.state;
        let params = Object.assign({}, curItem);
        params.id_device = curItem.id;

        var eventsList = [];
        MainDeviceService.instance.getListControlCalendar(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                data.map((item, index) => {
                    eventsList.push({
                        'title': item.title,
                        'start': new Date(item.start),
                        'end': new Date(item.end),
                        'index': index,
                        'id': item.id,
                        'id_device': item.id_device
                    }
                    );
                })
                self.setState({
                    eventsList: eventsList
                });

            } else {
                self.setState({
                    eventsList: []
                });
            }
        });
    }

    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputDateChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let { searchParam } = this.state;
            searchParam[name] = value;

            if (name == 'date_from') {
                searchParam.date_to = moment(Libs.dateFormat(value, 'YYYY-MM-DD HH:mm:ss', 'DD/MM/YYYY HH:mm')).add(2, 'hours').format('DD/MM/YYYY HH:mm')
            }
            this.setState({ searchParam });
        }
    }

    async onClickAddControlCalendarAction() {
        var { curItem, searchParam } = this.state, self = this;
        var params = Object.assign({}, searchParam);
        let v = new ControlCalendarValidate(this.props);
        let errors = await v.FLValidationAll(params);
        if (errors) {
            this.setValidateMessage(errors);
            return;
        }

        //remove message validation
        this.removeAllValidateMessage();
        params.screen_mode = Constants.SCREEN_MODE.ADD;
        if (Libs.isBlank(curItem.id)) return;
        params.id = curItem.id;
        params.id_device = curItem.id;
        params.deviceID = curItem.id_device;

        params.date_from = Libs.dateFormat(searchParam.date_from, "YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY HH:mm:ss");
        params.date_to = Libs.dateFormat(searchParam.date_to, "YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY HH:mm:ss");
        params.hash_id = this.props.hash_id;

        MainDeviceService.instance.saveControlCalendar(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                searchParam.date_from = null;
                searchParam.date_to = null;
                self.setState({
                    searchParam: searchParam
                }, () => {
                    self.getListControlCalendar();
                })
            }
            else if (data) {
                self.setValidateMessage(data);
            }

            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);
    }


    onSelectEvent(event) {
        if (Libs.isObjectEmpty(event)) return;
        this.setState({
            itemCalendar: event,
            deleteItemCalendar: true
        }, ()=>{
            document.body.classList.add('on');
        });
    }

    closeDeleteCalendar = (status) => {
        if (status) {
            this.getListControlCalendar();
        }
        this.setState({
            deleteItemCalendar: false
        }, () => {
            document.body.classList.remove('on');
        })
    }

    /**
     * @description validate a field input
     * @author Long.Pham 12/05/2021
     * @param {*} event 
     */
    async validateOne(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name) {
            let param = {
                [name]: value
            }
            let v = new ControlCalendarValidate(this.props);
            let error = await v.validateOne(param, name);
            if (error != null) {
                this.setValidateMessage(error, true);
            }
        }
    }
}
export default ControlCalendar;