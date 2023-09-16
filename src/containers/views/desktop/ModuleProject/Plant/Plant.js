import React from 'react';
import PlantJsx from './Plant.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import PlantService from '../../../../../services/PlantService';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';

class Plant extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            hash_id: !Libs.isObjectEmpty(this.params) ? this.params.id : null,
            curItem: {},
            single_line: false,
            allLanguage: Libs.isBlank(this.employee) ? [] : this.employee.languages,
            dataFilter: [
                { id: "today", text: "Today" },
                { id: "3_day", text: "3 days" },
                { id: "this_month", text: "This month" },
                { id: "last_month", text: "Last month" },
                { id: "12_month", text: "Last 12 months" },
                { id: "lifetime", text: "Lifetime" }
            ],

            chartParams: {
                id_filter: 'today',
                text_filter: 'Today',
                show_filter: false,
                max_date: Libs.getCurrentDDMMYYYY(),
                data_send_time: 2
            },
        };

        this.paging = {
            total: 0,
            current: 1,
            currentInput: 1
        };

        this.jsxTemplate = PlantJsx;
        this.wrapperRef = React.createRef();

    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
        this.loadConfigDefaultDate();
        this.getDetailProject();
        this.getDataChart();

    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
    }

    componentWillReceiveProps(nextProps) {
        let self = this;
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                hash_id: nextProps.match.params.id
            }, () => {
                self.getDetailProject();
                self.getDataChart();
            });
        }
    }


    handleClickOutside = (event) => {
        const { target } = event;
        var { chartParams } = this.state, self = this;
        if (!this.wrapperRef.current.contains(target)) {
            if (chartParams.show_filter) {
                chartParams.show_filter = false;
                self.setState({
                    chartParams: chartParams
                })
            }
        }
    }

    loadConfigDefaultDate() {
        var { chartParams } = this.state;
        switch (chartParams.id_filter) {
            case 'today':
                chartParams.max_date = Libs.getCurrentMMDDYYYYHI();
                chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
                break;
            case '3_day':
                chartParams.end_date = Libs.getCurrentDDMMYYYY();
                chartParams.start_date = moment(Libs.addDays(Libs.getCurrentMMDDYYYYHI(), -2)).format('DD/MM/YYYY');
                chartParams.start_max_date = moment(Libs.addDays(Libs.getCurrentMMDDYYYYHI(), -2)).format('DD/MM/YYYY');
                break;
            case 'this_month':
                chartParams.max_date = moment().format('MM/YYYY');
                chartParams.end_date = moment().format('MM/YYYY');
                break;
            case 'last_month':
                chartParams.max_date = moment().format('MM/YYYY');
                var tlast = new Date(Libs.getCurrentMMDDYYYYHI());
                var ylast = tlast.getFullYear(), mlast = tlast.getMonth();
                chartParams.end_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), -1)).endOf('month').format('MM/YYYY');
                chartParams.start_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), -1)).format('MM/YYYY');

                break;
            case 'lifetime':
            case '12_month':
                chartParams.max_date = moment().format('MM/YYYY');
                chartParams.end_date = moment().format('MM/YYYY');
                var tlast = new Date(Libs.getCurrentMMDDYYYYHI());
                var ylast = tlast.getFullYear(), mlast = tlast.getMonth();
                chartParams.start_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), -12)).format('MM/YYYY');
                chartParams.max_start_date = moment(Libs.addMonths(Libs.getCurrentMMDDYYYYHI(), -12)).format('MM/YYYY');
                break;
        }
        this.setState({
            chartParams: chartParams
        })
    }

    onClickFilter = (value) => {
        var { chartParams, dataFilter, curItem } = this.state;
        var self = this;
        if (!Libs.isArrayData(dataFilter)) return;
        var item = Libs.find(dataFilter, 'id', value);
        if (Libs.isObjectEmpty(item)) return;

        chartParams.id_filter = item.id;
        chartParams.text_filter = item.text;
        chartParams.show_filter = false;
        chartParams.showNextBtn = false;

        switch (value) {
            case 'today':
                chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
                chartParams.max_date = Libs.getCurrentMMDDYYYYHI();
                break;
            case '3_day':
                chartParams.end_date = Libs.getCurrentDDMMYYYY();
                chartParams.start_date = moment(Libs.addDays(Libs.getCurrentMMDDYYYYHI(), -2)).format('DD/MM/YYYY');
                chartParams.start_max_date = moment(Libs.addDays(Libs.getCurrentMMDDYYYYHI(), -2)).format('DD/MM/YYYY');
                chartParams.max_date = Libs.getCurrentDDMMYYYY();
                break;

            case 'this_month':
                chartParams.max_date = moment().format('MM/YYYY');
                chartParams.end_date = moment().format('MM/YYYY');
                break;
            case 'last_month':
                chartParams.max_date = moment().format('MM/YYYY');
                var tlast = new Date(Libs.getCurrentMMDDYYYYHI());
                var ylast = tlast.getFullYear(), mlast = tlast.getMonth();
                chartParams.end_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), -1)).endOf('month').format('MM/YYYY');
                chartParams.start_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), -1)).format('MM/YYYY');
                break;

            case 'lifetime':
            case '12_month':
                chartParams.max_date = moment().format('MM/YYYY');
                chartParams.end_date = moment().format('MM/YYYY');
                chartParams.start_date = moment(Libs.addMonths(Libs.getCurrentMMDDYYYYHI(), -12)).format('MM/YYYY');

                break;
            // case 'lifetime':
            //     chartParams.start_date = moment(curItem.commissioning).format('MM/DD/YYYY HH:mm:ss');
            //     chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
            //     break;
        }

        this.setState({
            chartParams: chartParams
        }, () => {
            self.getDataChart();
        });
    }

    changeViewMinute = (value) => {
        var chartParams = this.state.chartParams, self = this;
        if (Libs.isBlank(value)) return;
        chartParams.data_send_time = value;
        this.setState({ chartParams: chartParams }, () => {
            self.getDataChart();
        });
    }


    getDetailProject() {
        var { hash_id } = this.state, self = this;
        if (Libs.isBlank(hash_id)) return;

        var params = {
            hash_id: hash_id,
            id_language: this.employee.id_language,
            id_employee: this.employee.id_employee,
            type: 'customer'
        };
        PlantService.instance.getDetail(params, data => {
            if (data) {
                self.setState({
                    curItem: data
                });
            }
        }, false);
    }


    onClickShowSingleLine = () => {
        this.setState({
            single_line: true
        })
    }

    onClickCloseSingleLine = () => {
        this.setState({
            single_line: false
        })
    }


    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputDateChange(event) {
        let target = event.target;
        let name = target.name;
        var self = this;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let { chartParams } = this.state;
            switch (chartParams.id_filter) {
                case 'today':
                case 'last_month':
                case 'this_month':
                    chartParams.start_date = value;
                    chartParams[name] = value;
                    break;
                case '3_day':
                    if (name == 'start_date') {
                        chartParams.start_date = value;
                        let arrDate = value.split('/');
                        if (arrDate) {
                            let currentDate = arrDate[2] + '/' + arrDate[1] + "/" + arrDate[0];
                            chartParams.end_date = moment(Libs.addDays(currentDate, 2)).format('DD/MM/YYYY');
                        }
                    }

                    if (name == 'end_date') {
                        chartParams.end_date = value;
                        let arrDate = value.split('/');
                        if (arrDate) {
                            let currentDate = arrDate[2] + '/' + arrDate[1] + "/" + arrDate[0];
                            chartParams.start_date = moment(Libs.addDays(currentDate, -2)).format('DD/MM/YYYY');
                        }
                    }

                    break;
                case '12_month':
                    if (name == 'start_date') {
                        chartParams.start_date = value;
                        let arrDate = value.split('/');

                        if (arrDate) {
                            let currentDate = arrDate[1] + '/' + arrDate[0] + '/01';
                            const startOfMonth = moment(currentDate).startOf('month').format('YYYY-MM-DD');
                            chartParams.end_date = moment(Libs.addMonths(startOfMonth, 12)).format('MM/YYYY');
                        }
                    }

                    if (name == 'end_date') {
                        chartParams.end_date = value;
                        let arrDate = value.split('/');
                        if (arrDate) {
                            let currentDate = arrDate[1] + '/' + arrDate[0] + '/01';
                            const startOfMonth = moment(currentDate).startOf('month').format('YYYY-MM-DD');
                            chartParams.start_date = moment(Libs.addMonths(startOfMonth, -12)).format('MM/YYYY');
                        }
                    }
                    break;
            }

            this.setState({ chartParams }, () => {
                self.getDataChart();
            });
        }
    }


    /**
   * Get chart data
   * @author long.pham 2020-12-03
   * @param id_site, id_customer
   * @return Object
   */
    getDataChart() {
        var { chartParams, curItem, hash_id } = this.state, self = this;
        if (Libs.isObjectEmpty(chartParams)) return;
        var params = {};
        params.hash_id = hash_id;
        params.total_year = curItem.total_year;
        params.id_employee = this.employee.id_employee;
        params.id_language = this.employee.id_language;
        params.filterBy = chartParams.id_filter;
        params.data_send_time = chartParams.data_send_time;

        switch (chartParams.id_filter) {
            case 'today':
                params.start_date = Libs.convertAllFormatDate(Libs.dateFormat(chartParams.start_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00");
                params.end_date = Libs.convertAllFormatDate(Libs.dateFormat(chartParams.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 19:00:00");
                break;
            case '3_day':
                params.start_date = Libs.dateFormat(chartParams.start_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00";
                params.end_date = Libs.dateFormat(chartParams.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 19:00:00";
                break;
            case 'last_month':
            case 'this_month':
                params.start_date = Libs.dateFormat(Libs.getCurrentMMDDYYYYHI(), "DD", "MM/DD/YYYY") + "/" + chartParams.start_date + " 00:00:00";
                params.end_date = Libs.dateFormat(Libs.getCurrentMMDDYYYYHI(), "DD", "MM/DD/YYYY") + "/" + chartParams.end_date + " 19:00:00";
                break;
            case 'lifetime':
            case '12_month':
                params.start_date = Libs.dateFormat(Libs.getCurrentMMDDYYYYHI(), "DD", "MM/DD/YYYY") + "/" + chartParams.start_date + " 00:00:00";
                params.end_date = Libs.dateFormat(Libs.getCurrentMMDDYYYYHI(), "DD", "MM/DD/YYYY") + "/" + chartParams.end_date + " 19:00:00";
                break;
        }


        // params.end_date = '01/11/2021 19:00:00';
        // params.start_date = '01/11/2021 05:00:00';
        params.type = 'customer';

        PlantService.instance.getDataChart(params, (data) => {
            if (Libs.isArrayData(data)) {
                var dataListEnergy = data;
                var series = [], categories = [];

                let seriesItemEnergy = {
                    data: [],
                    name: 'Energy yield',
                    zIndex: 1,
                    type: 'column',
                    tooltip: {
                        valueSuffix: ' kWh'
                    }
                };

                let seriesItemPower = {
                    data: [],
                    name: 'Power',
                    zIndex: 1,
                    type: 'spline',
                    xAxis: 1,
                    yAxis: 1,
                    id: 's1',
                    lineWidth: 2,
                    tooltip: {
                        valueSuffix: ' kW'
                    },
                    marker: {
                        radius: 2.5
                    }
                };

                var rowItemEnergy = [], rowItemPower = [];

                if (params.filterBy === 'today') {
                    switch (chartParams.data_send_time) {
                        case 1:
                            curItem.tickInterval = 12;
                            categories = [
                                '5AM', '5:05 AM', '5:10 AM', '5:15 AM', '5:20 AM', '5:25 AM', '5:30 AM', '5:35 AM', '5:40 AM', '5:45 AM', '5:50 AM', '5:55 AM',
                                '6AM', '6:05 AM', '6:10 AM', '6:15 AM', '6:20 AM', '6:25 AM', '6:30 AM', '6:35 AM', '6:40 AM', '6:45 AM', '6:50 AM', '6:55 AM',
                                '7AM', '7:05 AM', '7:10 AM', '7:15 AM', '7:20 AM', '7:25 AM', '7:30 AM', '7:35 AM', '7:40 AM', '7:45 AM', '7:50 AM', '7:55 AM',
                                '8AM', '8:05 AM', '8:10 AM', '8:15 AM', '8:20 AM', '8:25 AM', '8:30 AM', '8:35 AM', '8:40 AM', '8:45 AM', '8:50 AM', '8:55 AM',
                                '9AM', '9:05 AM', '9:10 AM', '9:15 AM', '9:20 AM', '9:25 AM', '9:30 AM', '9:35 AM', '9:40 AM', '9:45 AM', '9:50 AM', '9:55 AM',
                                '10AM', '10:05 AM', '10:10 AM', '10:15 AM', '10:20 AM', '10:25 AM', '10:30 AM', '10:35 AM', '10:40 AM', '10:45 AM', '10:50 AM', '10:55 AM',
                                '11AM', '11:05 AM', '11:10 AM', '11:15 AM', '11:20 AM', '11:25 AM', '11:30 AM', '11:35 AM', '11:40 AM', '11:45 AM', '11:50 AM', '11:55 AM',
                                '12PM', '12:05 PM', '12:10 PM', '12:15 PM', '12:20 PM', '12:25 PM', '12:30 PM', '12:35 PM', '12:40 PM', '12:45 PM', '12:50 PM', '12:55 PM',
                                '13PM', '13:05 PM', '13:10 PM', '13:15 PM', '13:20 PM', '13:25 PM', '13:30 PM', '13:35 PM', '13:40 PM', '13:45 PM', '13:50 PM', '13:55 PM',
                                '14PM', '14:05 PM', '14:10 PM', '14:15 PM', '14:20 PM', '14:25 PM', '14:30 PM', '14:35 PM', '14:40 PM', '14:45 PM', '14:50 PM', '14:55 PM',
                                '15PM', '15:05 PM', '15:10 PM', '15:15 PM', '15:20 PM', '15:25 PM', '15:30 PM', '15:35 PM', '15:40 PM', '15:45 PM', '15:50 PM', '15:55 PM',
                                '16PM', '16:05 PM', '16:10 PM', '16:15 PM', '16:20 PM', '16:25 PM', '16:30 PM', '16:35 PM', '16:40 PM', '16:45 PM', '16:50 PM', '16:55 PM',
                                '17PM', '17:05 PM', '17:10 PM', '17:15 PM', '17:20 PM', '17:25 PM', '17:30 PM', '17:35 PM', '17:40 PM', '17:45 PM', '17:50 PM', '17:55 PM',
                                '18PM', '18:05 PM', '18:10 PM', '18:15 PM', '18:20 PM', '18:25 PM', '18:30 PM', '18:35 PM', '18:40 PM', '18:45 PM', '18:50 PM', '18:55 PM',
                                '19PM'
                            ];
                            var range5Minute = 0;
                            for (let i = 0; i < dataListEnergy.length; i++) {
                                if (i == 0) {
                                    var hour = Libs.dateFormat(dataListEnergy[i].time_format, 'HH', 'YYYY-MM-DD HH:mm:ss');
                                    var minutes = Libs.dateFormat(dataListEnergy[i].time_format, 'mm', 'YYYY-MM-DD HH:mm:ss');
                                    range5Minute = ((parseInt(hour) - 5) * 12) + (Math.round(minutes / 5));
                                    if (range5Minute > 0) {
                                        for (var j = 0; j < range5Minute; j++) {
                                            var dateF = Libs.dateFormat(Libs.addMinutes(Libs.dateFormat(dataListEnergy[i].time_format, 'YYYY-MM-DD 05:00', 'YYYY-MM-DD HH:mm:ss'), j * 5), 'DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm:ss');
                                            rowItemEnergy.push([dateF, null]);
                                            rowItemPower.push([dateF, null]);
                                        }
                                    }
                                }
                                rowItemEnergy.push([dataListEnergy[i].time_full, dataListEnergy[i].activeEnergy]);
                                rowItemPower.push([dataListEnergy[i].time_full, dataListEnergy[i].activePower]);
                            }




                            // set chart line end
                            let range5MinuteLine = range5Minute + dataListEnergy.length;

                            if (range5MinuteLine < 168 && range5MinuteLine > 0) {
                                let lastDate = '';
                                for (let izero1 = range5MinuteLine; izero1 < 168; izero1++) {
                                    if (izero1 == range5MinuteLine) {
                                        lastDate = dataListEnergy[dataListEnergy.length - 1].time_format;
                                    }
                                    if (lastDate != null) {
                                        lastDate = Libs.addMinutes(lastDate, 5);
                                        rowItemEnergy.push([Libs.dateFormat(lastDate, 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss'), null]);
                                        rowItemPower.push([Libs.dateFormat(lastDate, 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss'), null]);
                                    }
                                }
                            }
                            seriesItemEnergy.data = rowItemEnergy;
                            series.push(seriesItemEnergy);
                            seriesItemPower.data = rowItemPower;
                            series.push(seriesItemPower);
                            break;
                        case 2:
                            curItem.tickInterval = 4;
                            categories = [
                                '5AM', '5:15AM', '5:30AM', '5:45AM',
                                '6AM', '6:15AM', '6:30AM', '6:45AM',
                                '7AM', '7:15AM', '7:30AM', '7:45AM',
                                '8AM', '8:15AM', '8:30AM', '8:45AM',
                                '9AM', '9:15AM', '9:30AM', '9:45AM',
                                '10AM', '10:15AM', '10:30AM', '10:45AM',
                                '11AM', '11:15AM', '11:30AM', '11:45AM',
                                '12PM', '12:15PM', '12:30PM', '12:45PM',
                                '13PM', '13:15PM', '13:30PM', '13:45PM',
                                '14PM', '14:15PM', '14:30PM', '14:45PM',
                                '15PM', '15:15PM', '15:30PM', '15:45PM',
                                '16PM', '16:15PM', '16:30PM', '16:45PM',
                                '17PM', '17:15PM', '17:30PM', '17:45PM',
                                '18PM', '18:15PM', '18:30PM', '18:45PM',
                                '19PM'
                            ];

                            var range15Minute = 0;
                            for (let i = 0; i < dataListEnergy.length; i++) {
                                if (i == 0) {

                                    var hour = Libs.dateFormat(dataListEnergy[i].time_format, 'HH', 'YYYY-MM-DD HH:mm:ss');
                                    var minutes = Libs.dateFormat(dataListEnergy[i].time_format, 'mm', 'YYYY-MM-DD HH:mm:ss');
                                    range15Minute = ((parseInt(hour) - 5) * 4) + (Math.round(minutes / 15));
                                    if (range15Minute > 0) {
                                        for (var j = 0; j < range15Minute; j++) {
                                            var dateF = Libs.dateFormat(Libs.addMinutes(Libs.dateFormat(dataListEnergy[i].time_format, 'YYYY-MM-DD 05:00', 'YYYY-MM-DD HH:mm:ss'), j * 15), 'DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm:ss');
                                            rowItemEnergy.push([dateF, null]);
                                            rowItemPower.push([dateF, null]);
                                        }
                                    }

                                }
                                rowItemEnergy.push([dataListEnergy[i].time_full, dataListEnergy[i].activeEnergy]);
                                rowItemPower.push([dataListEnergy[i].time_full, dataListEnergy[i].activePower]);
                            }

                            // set chart line end
                            let range15MinuteLine = range15Minute + dataListEnergy.length;
                            if (range15MinuteLine < 56 && range15MinuteLine > 0) {
                                let lastDate = '';
                                for (let izero1 = range15MinuteLine; izero1 < 56; izero1++) {
                                    if (izero1 == range15MinuteLine) {
                                        lastDate = dataListEnergy[dataListEnergy.length - 1].time_format;
                                    }
                                    if (lastDate != null) {
                                        lastDate = Libs.addMinutes(lastDate, 15);
                                        rowItemEnergy.push([Libs.dateFormat(lastDate, 'DD/MM/YYYY', 'YYYY-MM-DD HH:mm:ss'), null]);
                                        rowItemPower.push([Libs.dateFormat(lastDate, 'DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm:ss'), null]);
                                    }
                                }
                            }
                            seriesItemEnergy.data = rowItemEnergy;
                            series.push(seriesItemEnergy);
                            seriesItemPower.data = rowItemPower;
                            series.push(seriesItemPower);
                            break;
                        default:
                            curItem.tickInterval = 1;
                            categories = ['5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '13PM', '14PM', '15PM', '16PM', '17PM', '18PM', '19PM'];

                            var rangeHour = 0;
                            for (let i = 0; i < dataListEnergy.length; i++) {
                                if (i == 0) {
                                    var hour = Libs.dateFormat(dataListEnergy[i].time_format, 'HH', 'YYYY-MM-DD HH:mm:ss');
                                    rangeHour = parseInt(hour) - 5;
                                    if (rangeHour > 0) {
                                        for (var j = 0; j < rangeHour; j++) {
                                            var dateF = Libs.dateFormat(dataListEnergy[i].time_format, 'DD/MM/YYYY', 'YYYY-MM-DD HH:mm:ss') + " " + (j + 5) + ":00";
                                            rowItemEnergy.push([dateF, null]);
                                            rowItemPower.push([dateF, null]);
                                        }
                                    }
                                }

                                rowItemEnergy.push([dataListEnergy[i].time_full, dataListEnergy[i].activeEnergy]);
                                rowItemPower.push([dataListEnergy[i].time_full, dataListEnergy[i].activePower]);
                            }

                            // set chart line end
                            let rangeHourLine = rangeHour + dataListEnergy.length;
                            if (rangeHourLine < 15 && rangeHourLine > 0) {
                                let lastDate = '';
                                for (let izero1 = rangeHourLine; izero1 < 15; izero1++) {
                                    if (izero1 == rangeHourLine) {
                                        lastDate = dataListEnergy[dataListEnergy.length - 1].time_format;
                                    }
                                    if (lastDate != null) {
                                        lastDate = Libs.addMinutes(lastDate, 60);
                                        rowItemEnergy.push([Libs.dateFormat(lastDate, 'DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm:ss'), null]);
                                        rowItemPower.push([Libs.dateFormat(lastDate, 'DD/MM/YYYY HH:mm', 'YYYY-MM-DD HH:mm:ss'), null]);
                                    }
                                }
                            }
                            seriesItemEnergy.data = rowItemEnergy;
                            series.push(seriesItemEnergy);
                            seriesItemPower.data = rowItemPower;
                            series.push(seriesItemPower);
                            break;
                    }
                } else if (params.filterBy === '3_day') {
                    var start_date = chartParams.start_date;
                    let arrDate = start_date.split('/');
                    var currentDate = '';
                    var stringDate1 = '', stringDate2 = '', stringDate3 = '';
                    if (arrDate) {
                        currentDate = arrDate[2] + '/' + arrDate[1] + "/" + arrDate[0];
                        stringDate1 = moment(currentDate).format('DD. MMM');
                        stringDate2 = moment(Libs.addDays(currentDate, 1)).format('DD. MMM');
                        stringDate3 = moment(Libs.addDays(currentDate, 2)).format('DD. MMM');
                    } else { return }

                    switch (chartParams.data_send_time) {
                        case 1:
                            curItem.tickInterval = 169;
                            categories = [
                                stringDate1, '5:05 AM', '5:10 AM', '5:15 AM', '5:20 AM', '5:25 AM', '5:30 AM', '5:35 AM', '5:40 AM', '5:45 AM', '5:50 AM', '5:55 AM',
                                '6:00 AM', '6:05 AM', '6:10 AM', '6:15 AM', '6:20 AM', '6:25 AM', '6:30 AM', '6:35 AM', '6:40 AM', '6:45 AM', '6:50 AM', '6:55 AM',
                                '7:00 AM', '7:05 AM', '7:10 AM', '7:15 AM', '7:20 AM', '7:25 AM', '7:30 AM', '7:35 AM', '7:40 AM', '7:45 AM', '7:50 AM', '7:55 AM',
                                '8:00 AM', '8:05 AM', '8:10 AM', '8:15 AM', '8:20 AM', '8:25 AM', '8:30 AM', '8:35 AM', '8:40 AM', '8:45 AM', '8:50 AM', '8:55 AM',
                                '9:00 AM', '9:05 AM', '9:10 AM', '9:15 AM', '9:20 AM', '9:25 AM', '9:30 AM', '9:35 AM', '9:40 AM', '9:45 AM', '9:50 AM', '9:55 AM',
                                '10:00 AM', '10:05 AM', '10:10 AM', '10:15 AM', '10:20 AM', '10:25 AM', '10:30 AM', '10:35 AM', '10:40 AM', '10:45 AM', '10:50 AM', '10:55 AM',
                                '11:00 AM', '11:05 AM', '11:10 AM', '11:15 AM', '11:20 AM', '11:25 AM', '11:30 AM', '11:35 AM', '11:40 AM', '11:45 AM', '11:50 AM', '11:55 AM',
                                '12:00 PM', '12:05 PM', '12:10 PM', '12:15 PM', '12:20 PM', '12:25 PM', '12:30 PM', '12:35 PM', '12:40 PM', '12:45 PM', '12:50 PM', '12:55 PM',
                                '13:00 PM', '13:05 PM', '13:10 PM', '13:15 PM', '13:20 PM', '13:25 PM', '13:30 PM', '13:35 PM', '13:40 PM', '13:45 PM', '13:50 PM', '13:55 PM',
                                '14:00 PM', '14:05 PM', '14:10 PM', '14:15 PM', '14:20 PM', '14:25 PM', '14:30 PM', '14:35 PM', '14:40 PM', '14:45 PM', '14:50 PM', '14:55 PM',
                                '15:00 PM', '15:05 PM', '15:10 PM', '15:15 PM', '15:20 PM', '15:25 PM', '15:30 PM', '15:35 PM', '15:40 PM', '15:45 PM', '15:50 PM', '15:55 PM',
                                '16:00 PM', '16:05 PM', '16:10 PM', '16:15 PM', '16:20 PM', '16:25 PM', '16:30 PM', '16:35 PM', '16:40 PM', '16:45 PM', '16:50 PM', '16:55 PM',
                                '17:00 PM', '17:05 PM', '17:10 PM', '17:15 PM', '17:20 PM', '17:25 PM', '17:30 PM', '17:35 PM', '17:40 PM', '17:45 PM', '17:50 PM', '17:55 PM',
                                '18:00 PM', '18:05 PM', '18:10 PM', '18:15 PM', '18:20 PM', '18:25 PM', '18:30 PM', '18:35 PM', '18:40 PM', '18:45 PM', '18:50 PM', '18:55 PM',
                                '19:00 PM',


                                stringDate2, '5:05 AM', '5:10 AM', '5:15 AM', '5:20 AM', '5:25 AM', '5:30 AM', '5:35 AM', '5:40 AM', '5:45 AM', '5:50 AM', '5:55 AM',
                                '6:00 AM', '6:05 AM', '6:10 AM', '6:15 AM', '6:20 AM', '6:25 AM', '6:30 AM', '6:35 AM', '6:40 AM', '6:45 AM', '6:50 AM', '6:55 AM',
                                '7:00 AM', '7:05 AM', '7:10 AM', '7:15 AM', '7:20 AM', '7:25 AM', '7:30 AM', '7:35 AM', '7:40 AM', '7:45 AM', '7:50 AM', '7:55 AM',
                                '8:00 AM', '8:05 AM', '8:10 AM', '8:15 AM', '8:20 AM', '8:25 AM', '8:30 AM', '8:35 AM', '8:40 AM', '8:45 AM', '8:50 AM', '8:55 AM',
                                '9:00 AM', '9:05 AM', '9:10 AM', '9:15 AM', '9:20 AM', '9:25 AM', '9:30 AM', '9:35 AM', '9:40 AM', '9:45 AM', '9:50 AM', '9:55 AM',
                                '10:00 AM', '10:05 AM', '10:10 AM', '10:15 AM', '10:20 AM', '10:25 AM', '10:30 AM', '10:35 AM', '10:40 AM', '10:45 AM', '10:50 AM', '10:55 AM',
                                '11:00 AM', '11:05 AM', '11:10 AM', '11:15 AM', '11:20 AM', '11:25 AM', '11:30 AM', '11:35 AM', '11:40 AM', '11:45 AM', '11:50 AM', '11:55 AM',
                                '12:00 PM', '12:05 PM', '12:10 PM', '12:15 PM', '12:20 PM', '12:25 PM', '12:30 PM', '12:35 PM', '12:40 PM', '12:45 PM', '12:50 PM', '12:55 PM',
                                '13:00 PM', '13:05 PM', '13:10 PM', '13:15 PM', '13:20 PM', '13:25 PM', '13:30 PM', '13:35 PM', '13:40 PM', '13:45 PM', '13:50 PM', '13:55 PM',
                                '14:00 PM', '14:05 PM', '14:10 PM', '14:15 PM', '14:20 PM', '14:25 PM', '14:30 PM', '14:35 PM', '14:40 PM', '14:45 PM', '14:50 PM', '14:55 PM',
                                '15:00 PM', '15:05 PM', '15:10 PM', '15:15 PM', '15:20 PM', '15:25 PM', '15:30 PM', '15:35 PM', '15:40 PM', '15:45 PM', '15:50 PM', '15:55 PM',
                                '16:00 PM', '16:05 PM', '16:10 PM', '16:15 PM', '16:20 PM', '16:25 PM', '16:30 PM', '16:35 PM', '16:40 PM', '16:45 PM', '16:50 PM', '16:55 PM',
                                '17:00 PM', '17:05 PM', '17:10 PM', '17:15 PM', '17:20 PM', '17:25 PM', '17:30 PM', '17:35 PM', '17:40 PM', '17:45 PM', '17:50 PM', '17:55 PM',
                                '18:00 PM', '18:05 PM', '18:10 PM', '18:15 PM', '18:20 PM', '18:25 PM', '18:30 PM', '18:35 PM', '18:40 PM', '18:45 PM', '18:50 PM', '18:55 PM',
                                '19:00 PM',

                                stringDate3, '5:05 AM', '5:10 AM', '5:15 AM', '5:20 AM', '5:25 AM', '5:30 AM', '5:35 AM', '5:40 AM', '5:45 AM', '5:50 AM', '5:55 AM',
                                '6:00 AM', '6:05 AM', '6:10 AM', '6:15 AM', '6:20 AM', '6:25 AM', '6:30 AM', '6:35 AM', '6:40 AM', '6:45 AM', '6:50 AM', '6:55 AM',
                                '7:00 AM', '7:05 AM', '7:10 AM', '7:15 AM', '7:20 AM', '7:25 AM', '7:30 AM', '7:35 AM', '7:40 AM', '7:45 AM', '7:50 AM', '7:55 AM',
                                '8:00 AM', '8:05 AM', '8:10 AM', '8:15 AM', '8:20 AM', '8:25 AM', '8:30 AM', '8:35 AM', '8:40 AM', '8:45 AM', '8:50 AM', '8:55 AM',
                                '9:00 AM', '9:05 AM', '9:10 AM', '9:15 AM', '9:20 AM', '9:25 AM', '9:30 AM', '9:35 AM', '9:40 AM', '9:45 AM', '9:50 AM', '9:55 AM',
                                '10:00 AM', '10:05 AM', '10:10 AM', '10:15 AM', '10:20 AM', '10:25 AM', '10:30 AM', '10:35 AM', '10:40 AM', '10:45 AM', '10:50 AM', '10:55 AM',
                                '11:00 AM', '11:05 AM', '11:10 AM', '11:15 AM', '11:20 AM', '11:25 AM', '11:30 AM', '11:35 AM', '11:40 AM', '11:45 AM', '11:50 AM', '11:55 AM',
                                '12:00 PM', '12:05 PM', '12:10 PM', '12:15 PM', '12:20 PM', '12:25 PM', '12:30 PM', '12:35 PM', '12:40 PM', '12:45 PM', '12:50 PM', '12:55 PM',
                                '13:00 PM', '13:05 PM', '13:10 PM', '13:15 PM', '13:20 PM', '13:25 PM', '13:30 PM', '13:35 PM', '13:40 PM', '13:45 PM', '13:50 PM', '13:55 PM',
                                '14:00 PM', '14:05 PM', '14:10 PM', '14:15 PM', '14:20 PM', '14:25 PM', '14:30 PM', '14:35 PM', '14:40 PM', '14:45 PM', '14:50 PM', '14:55 PM',
                                '15:00 PM', '15:05 PM', '15:10 PM', '15:15 PM', '15:20 PM', '15:25 PM', '15:30 PM', '15:35 PM', '15:40 PM', '15:45 PM', '15:50 PM', '15:55 PM',
                                '16:00 PM', '16:05 PM', '16:10 PM', '16:15 PM', '16:20 PM', '16:25 PM', '16:30 PM', '16:35 PM', '16:40 PM', '16:45 PM', '16:50 PM', '16:55 PM',
                                '17:00 PM', '17:05 PM', '17:10 PM', '17:15 PM', '17:20 PM', '17:25 PM', '17:30 PM', '17:35 PM', '17:40 PM', '17:45 PM', '17:50 PM', '17:55 PM',
                                '18:00 PM', '18:05 PM', '18:10 PM', '18:15 PM', '18:20 PM', '18:25 PM', '18:30 PM', '18:35 PM', '18:40 PM', '18:45 PM', '18:50 PM', '18:55 PM',
                                '19:00 PM',

                            ];
                            if(Libs.isArrayData(data)){
                                for (let i = 0; i < data.length; i++) {
                                    rowItemEnergy.push([data[i].time_full, data[i].activeEnergy]);
                                    rowItemPower.push([data[i].time_full, data[i].activePower]);
                                }
                            }

                            seriesItemEnergy.data = rowItemEnergy;
                            series.push(seriesItemEnergy);
                            seriesItemPower.data = rowItemPower;
                            series.push(seriesItemPower);

                            break;
                        case 2:
                            curItem.tickInterval = 57;
                            categories = [
                                stringDate1, '5:15AM', '5:30AM', '5:45AM',
                                '6AM', '6:15AM', '6:30AM', '6:45AM',
                                '7AM', '7:15AM', '7:30AM', '7:45AM',
                                '8AM', '8:15AM', '8:30AM', '8:45AM',
                                '9AM', '9:15AM', '9:30AM', '9:45AM',
                                '10AM', '10:15AM', '10:30AM', '10:45AM',
                                '11AM', '11:15AM', '11:30AM', '11:45AM',
                                '12PM', '12:15PM', '12:30PM', '12:45PM',
                                '13PM', '13:15PM', '13:30PM', '13:45PM',
                                '14PM', '14:15PM', '14:30PM', '14:45PM',
                                '15PM', '15:15PM', '15:30PM', '15:45PM',
                                '16PM', '16:15PM', '16:30PM', '16:45PM',
                                '17PM', '17:15PM', '17:30PM', '17:45PM',
                                '18PM', '18:15PM', '18:30PM', '18:45PM', '19PM',

                                stringDate2, '5:15AM', '5:30AM', '5:45AM',
                                '6AM', '6:15AM', '6:30AM', '6:45AM',
                                '7AM', '7:15AM', '7:30AM', '7:45AM',
                                '8AM', '8:15AM', '8:30AM', '8:45AM',
                                '9AM', '9:15AM', '9:30AM', '9:45AM',
                                '10AM', '10:15AM', '10:30AM', '10:45AM',
                                '11AM', '11:15AM', '11:30AM', '11:45AM',
                                '12PM', '12:15PM', '12:30PM', '12:45PM',
                                '13PM', '13:15PM', '13:30PM', '13:45PM',
                                '14PM', '14:15PM', '14:30PM', '14:45PM',
                                '15PM', '15:15PM', '15:30PM', '15:45PM',
                                '16PM', '16:15PM', '16:30PM', '16:45PM',
                                '17PM', '17:15PM', '17:30PM', '17:45PM',
                                '18PM', '18:15PM', '18:30PM', '18:45PM', '19PM',

                                stringDate3, '5:15AM', '5:30AM', '5:45AM',
                                '6AM', '6:15AM', '6:30AM', '6:45AM',
                                '7AM', '7:15AM', '7:30AM', '7:45AM',
                                '8AM', '8:15AM', '8:30AM', '8:45AM',
                                '9AM', '9:15AM', '9:30AM', '9:45AM',
                                '10AM', '10:15AM', '10:30AM', '10:45AM',
                                '11AM', '11:15AM', '11:30AM', '11:45AM',
                                '12PM', '12:15PM', '12:30PM', '12:45PM',
                                '13PM', '13:15PM', '13:30PM', '13:45PM',
                                '14PM', '14:15PM', '14:30PM', '14:45PM',
                                '15PM', '15:15PM', '15:30PM', '15:45PM',
                                '16PM', '16:15PM', '16:30PM', '16:45PM',
                                '17PM', '17:15PM', '17:30PM', '17:45PM',
                                '18PM', '18:15PM', '18:30PM', '18:45PM', '19PM',
                            ];

                            if(Libs.isArrayData(data)){
                                for (let i = 0; i < data.length; i++) {
                                    rowItemEnergy.push([data[i].time_full, data[i].activeEnergy]);
                                    rowItemPower.push([data[i].time_full, data[i].activePower]);
                                }
                            }

                            
                            seriesItemEnergy.data = rowItemEnergy;
                            series.push(seriesItemEnergy);
                            seriesItemPower.data = rowItemPower;
                            series.push(seriesItemPower);

                            break;
                        case 3:

                            curItem.tickInterval = 15;
                            categories = [
                                stringDate1, '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '13PM', '14PM', '15PM', '16PM', '17PM', '18PM', '19PM',
                                stringDate2, '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '13PM', '14PM', '15PM', '16PM', '17PM', '18PM', '19PM',
                                stringDate3, '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '13PM', '14PM', '15PM', '16PM', '17PM', '18PM', '19PM',
                            ];


                            if(Libs.isArrayData(data)){
                                for (let i = 0; i < data.length; i++) {
                                    rowItemEnergy.push([data[i].time_full, data[i].activeEnergy]);
                                    rowItemPower.push([data[i].time_full, data[i].activePower]);
                                }
                            }

                            seriesItemEnergy.data = rowItemEnergy;
                            series.push(seriesItemEnergy);
                            seriesItemPower.data = rowItemPower;
                            series.push(seriesItemPower);
                            break
                    }

                } else {
                    curItem.tickInterval = 1;
                    categories = [];
                    var lastDate = '', minMonth = '', maxMonth = '';
                    for (let i = 0; i < dataListEnergy.length; i++) {
                        categories.push([dataListEnergy[i].category_time_format]);
                        lastDate = dataListEnergy[i].time_format;
                        if (i === 0) {
                            let date = new Date(dataListEnergy[i].time_format);
                            minMonth = date.getMonth() + 1;
                        }

                        if (i === dataListEnergy.length - 1) {
                            let date = new Date(dataListEnergy[i].time_format);
                            maxMonth = date.getMonth() + 1;
                        }
                        rowItemEnergy.push([dataListEnergy[i].time_full, dataListEnergy[i].activeEnergy]);
                        rowItemPower.push([dataListEnergy[i].time_full, dataListEnergy[i].activePower]);

                    }



                    switch (params.filterBy) {
                        case 'this_month':
                        case 'last_month':
                            if (!Libs.isBlank(lastDate)) {
                                let date = new Date(lastDate);
                                let firstDay = date.getDate();
                                let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
                                if (firstDay < lastDay.getDate()) {
                                    for (let i = firstDay; i < lastDay.getDate(); i++) {
                                        lastDate = Libs.addDays(lastDate, 1);
                                        rowItemEnergy.push([Libs.dateFormat(lastDate, 'DD/MM/YYYY', 'YYYY-MM-DD'), null]);
                                        rowItemPower.push([Libs.dateFormat(lastDate, 'DD/MM/YYYY', 'YYYY-MM-DD'), null]);
                                        categories.push([lastDate.getDate()]);
                                    }
                                }
                            }
                            break;
                        case '12_month':
                            if (!Libs.isBlank(minMonth) && !Libs.isBlank(maxMonth)) {
                                let firstArrEnergy = [], firstArrayPower = [], firstArrCategory = [];
                                let date = new Date(lastDate);

                                for (let i = 1; i < minMonth; i++) {
                                    firstArrEnergy.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                                    firstArrayPower.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                                    firstArrCategory.push([Libs.getStringMonthNumber(i)]);
                                }

                                firstArrCategory.push(...categories);
                                firstArrEnergy.push(...rowItemEnergy);
                                firstArrayPower.push(...rowItemPower);

                                for (let i = maxMonth + 1; i <= 12; i++) {
                                    firstArrEnergy.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                                    firstArrayPower.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                                    firstArrCategory.push([Libs.getStringMonthNumber(i)]);
                                }

                                categories = firstArrCategory;
                                rowItemEnergy = firstArrEnergy;
                                rowItemPower = firstArrayPower;
                            }
                            break;

                        case 'lifetime':
                            if (!Libs.isBlank(curItem.total_year) && curItem.total_year < 2) {
                                if (!Libs.isBlank(minMonth) && !Libs.isBlank(maxMonth)) {
                                    let firstArrEnergy = [], firstArrayPower = [], firstArrCategory = [];
                                    let date = new Date(lastDate);

                                    for (let i = 1; i < minMonth; i++) {
                                        firstArrEnergy.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                                        firstArrayPower.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                                        firstArrCategory.push([Libs.getStringMonthNumber(i)]);
                                    }

                                    firstArrCategory.push(...categories);
                                    firstArrEnergy.push(...rowItemEnergy);
                                    firstArrayPower.push(...rowItemPower);

                                    for (let i = maxMonth + 1; i <= 12; i++) {
                                        firstArrEnergy.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                                        firstArrayPower.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                                        firstArrCategory.push([Libs.getStringMonthNumber(i)]);
                                    }

                                    categories = firstArrCategory;
                                    rowItemEnergy = firstArrEnergy;
                                    rowItemPower = firstArrayPower;
                                }
                            }
                            break;
                    }


                    seriesItemEnergy.data = rowItemEnergy;
                    series.push(seriesItemEnergy);
                    seriesItemPower.data = rowItemPower;
                    series.push(seriesItemPower);
                }

                self.setState({
                    dataCategories: categories,
                    dataEnergy: data,
                    curItem: curItem,
                    series: series
                }, () => {
                    self.loadChartOption();
                });
            } else {
                self.setState({
                    dataCategories: [],
                    dataEnergy: [],
                    curItem: curItem,
                    series: []
                }, () => {
                    self.loadChartOption();
                });
            }
        });

    }


    loadChartOption() {
        var chartOption = {
            credits: { enabled: false },
            exporting: { enabled: true },
            title: { text: null },

            chart: {
                type: 'column'
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0,
                showInLegend: false
            },
            colors: ['#82cdff', '#f2ae1b', '#1e477f', '#e68600', '#00b767', '#ffc300'],
            xAxis: [
                {
                    title: { text: "Power", enabled: false },
                    alignTicks: true,
                    gridLineWidth: 1,
                    tickInterval: this.state.curItem.tickInterval,
                    visible: true,
                    categories: this.state.dataCategories
                },

                {
                    title: { text: 'Data', enabled: false },
                    tickInterval: 1,
                    opposite: true,
                    visible: false,
                },

            ],

            yAxis: [{
                min: 0,
                title: {
                    text: 'kWh',
                    enabled: true
                },
                lineWidth: 1,
                gridLineWidth: 1,
                labels: {
                    enabled: true
                },
            }, {
                title: { text: 'kW', enabled: true },
                lineWidth: 1,
                opposite: true,
                gridLineWidth: 1,
                labels: {
                    enabled: true
                },
            }
            ],

            plotOptions: {
                column: {
                    stacking: 'normal'
                },
            },

            tooltip: {
                shared: false,
                crosshairs: true
            },
            series: this.state.series
        };

        this.setState({ chartOption: chartOption });
    }



    onClickShowFilter = () => {
        var { chartParams } = this.state;
        chartParams.show_filter = true;
        this.setState({
            chartParams: chartParams
        });
    }


    downloadData = () => {
        var { dataEnergy, curItem } = this.state;
        var { t } = this.props;
        if (!Libs.isArrayData(dataEnergy)) return;

        var dataExport = [];
        for (var i = 0, len = dataEnergy.length; i < len; i++) {
            dataExport.push({
                // "ID": ++i,
                'Time': dataEnergy[i].time_full,
                'Project name': curItem.name,
                'Energy now (kWh)': dataEnergy[i].activeEnergy,
                "Power now (kW)": dataEnergy[i].activePower
            });
        }

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(dataExport, { skipHeader: false });
        const wb = {
            SheetNames: ['Alerts'],
            Sheets: { 'Alerts': ws }
        };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Export-alerts-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
    }


    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Plant)
export default HighOrderComponentTranslated;