
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import ControlCalendarJsx from './ControlCalendar.jsx';
import MainDeviceService from '../../../../../services/MainDeviceService';

import ControlCalendarValidate from './ControlCalendarValidate';
import moment from 'moment';
import Constants from '../../../../../utils/Constants';

class ControlCalendar extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            searchParam: {
                date_from: moment().format("DD/MM/YYYY HH:mm"),
                min_date: moment().format("DD/MM/YYYY HH:mm"),
            },
            eventsList: [
                // {
                //     'title': '',
                //     'start': new Date("2022-02-27 15:38:00"),
                //     'end': new Date("2022-02-27 16:43:00"),
                //     desc: ''
                // },

                // {
                //     'title': 'All Day Event very long title',
                //     'start': new Date(2022, 1, 22, 17, 0, 0, 0),
                //     'end': new Date(2022, 1, 24, 23, 30, 0, 0),
                // },

                // {
                //     'title': '17h - 19h',
                //     'start': new Date(2022, 1, 22, 17, 0, 0, 0),
                //     'end': new Date(2022, 1, 22, 19, 0, 0, 0),
                // },
            ]
            // dataDeviceType: [],
            // dataList: [],
            // show_tab: this.props.show_tab,
            // dataDeviceHardware: []
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


    onSelectEvent = (event) => {
        console.log(event)
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
            console.log(data);
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


    // handleSlotSelect = slotInfo => {
    //     console.log("slotInfo: ", slotInfo);
    //     // if (view === 'month') { // assumes you got 'view' from state
    //     //   // ... do some date stuff to get _just the date_ from the slotInfo.start
    //     //   handleNavigate(newDate);
    //     //   handleViewChange('day');
    //     // }
    //     // ... any other slot selection functionality for other views
    // };


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
        params.id_device = curItem.id;

        params.date_from = Libs.dateFormat(searchParam.date_from, "YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY HH:mm:ss");
        params.date_to = Libs.dateFormat(searchParam.date_to, "YYYY-MM-DD HH:mm:ss", "DD/MM/YYYY HH:mm:ss");

        MainDeviceService.instance.saveControlCalendar(params, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                searchParam.date_from = null;
                searchParam.date_to = null;
                self.setState({
                    searchParam: searchParam
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


    // onClickShowTab = (index) => {
    //     this.setState({
    //         show_tab: index
    //     })
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
export default ControlCalendar;