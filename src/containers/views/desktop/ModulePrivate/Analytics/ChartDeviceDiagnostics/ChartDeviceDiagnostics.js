import React from 'react';
import ChartDeviceDiagnosticsJsx from './ChartDeviceDiagnostics.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/Constants';
import MainAnalyticsService from '../../../../../../services/MainAnalyticsService';

import moment from 'moment';
class ChartDeviceDiagnostics extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hash_id: this.props.hash_id,
            curItem: {
                data_send_time: 1,
                type: 2,
                type_diagnostics: 1,
                type_string_index: 1
            },
            dataParameter: [],
            chartToolOption: {},
            dataFilter: [
                { id: "today", text: "Today" },
                { id: "3_day", text: "3 days" },
                { id: "this_month", text: "This month" },
                { id: "last_month", text: "Last month" },
                { id: "12_month", text: "Last 12 months" },
                { id: "lifetime", text: "Lifetime" }
            ],


            dataListDevice: [],
            dataDiagnostics: [
                {
                    id: 1,
                    value: 1,
                    label: "AC Output"
                },
                {
                    id: 2,
                    value: 2,
                    label: "DC Input"
                },
                {
                    id: 3,
                    value: 3,
                    label: "DC Input Channel"
                }
            ],

            dataStringIndex: [
                {
                    id: 1,
                    value: 1,
                    label: "Power"
                },
                {
                    id: 2,
                    value: 2,
                    label: "Voltage"
                },
                {
                    id: 3,
                    value: 3,
                    label: "Current"
                },
                {
                    id: 4,
                    value: 4,
                    label: "Energy"
                }
            ],

            dataList: [],
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
            },
            allLanguage: Libs.isBlank(this.employee) ? [] : this.employee.languages,

            chartParams: {
                id_site: null,
                id_filter: 'today',
                text_filter: 'Today',
                show_filter: false,
                showNextBtn: false,
                current_time: Libs.getCurrentMMDDYYYYHI(),
                end_date: Libs.getCurrentMMDDYYYYHI(),
                start_date: Libs.getCurrentMMDDYYYYHI(),
                data_send_time: 2
            },
        };

        this.jsxTemplate = ChartDeviceDiagnosticsJsx;
        this.wrapperRef = React.createRef();
        this.myRef = React.createRef();

    }

    componentDidMount() {
        this.getListDeviceByProject();
        document.addEventListener('click', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside)
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

    onClickShowFilter = () => {
        var { chartParams } = this.state;
        chartParams.show_filter = true;
        this.setState({
            chartParams: chartParams
        });
    }


    changeViewMinute = (value) => {
        var chartParams = this.state.chartParams, self = this;
        if (Libs.isBlank(value)) return;
        chartParams.data_send_time = value;
        this.setState({ chartParams: chartParams }, () => {
            self.loadDataChart();
        });
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
            self.loadDataChart();
        });
    }


    handleDeviceInputChange = (e, index) => {
        var { dataListDevice } = this.state;
        var self = this;
        if (!Libs.isArrayData(dataListDevice)) return;
        var item = dataListDevice[index];
        if (Libs.isObjectEmpty(item)) return;
        dataListDevice[index].is_checked = dataListDevice[index].is_checked ? 0 : 1;
        this.setState({
            dataListDevice: dataListDevice
        }, () => {
            self.loadDataChart();
        });
    }


    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getListDeviceByProject() {
        let self = this;
        let params = {
            hash_id: this.state.hash_id,
            id_employee: this.employee.id_employee,
            id_language: this.employee.id_language,
            type: 'private'
        };

        MainAnalyticsService.instance.getListDeviceByProject(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                for (var i in data) { data[i].is_checked = 1; }
                self.setState({
                    dataListDevice: data.filter((item) => item.id_device_type == 1)
                });
            } else {
                self.setState({
                    dataListDevice: []
                });
            }
            self.forceUpdate();
            this.loadDataChart();
        });
    }



    handleDropdownChange = (item, name) => {
        var self = this;
        let { curItem } = self.state;
        if (Libs.isObjectEmpty(item) && name == 'type_diagnostics') {
            curItem.type_diagnostics = '';
        } else if (Libs.isObjectEmpty(item) && name == 'type_string_index') {
            curItem.type_string_index = '';
        } else {
            var value = item.value;
            curItem[name] = value;
        }

        var dataStringIndex = [];

        if (name == 'type_diagnostics') {
            if (value == 1) {
                dataStringIndex = [
                    { id: 1, value: 1, label: "Power" },
                    { id: 2, value: 2, label: "Voltage" },
                    { id: 3, value: 3, label: "Current" },
                    { id: 4, value: 4, label: "Energy" }
                ];
                curItem.type_string_index = 1;
            } else if (value == 2) {
                dataStringIndex = [
                    { id: 1, value: 1, label: "Power" },
                    { id: 2, value: 2, label: "Voltage" }
                ];
                curItem.type_string_index = 1;
            } else if (value == 3) {
                dataStringIndex = [
                    { id: 1, value: 1, label: "Power" },
                    { id: 2, value: 2, label: "Voltage" },
                    { id: 3, value: 3, label: "Current" }
                ];
                curItem.type_string_index = 1;
            }

            self.setState({
                curItem: curItem,
                dataStringIndex: dataStringIndex
            }, () => {
                self.loadDataChart();
            });
        } else {
            self.setState({
                curItem: curItem
            }, () => {
                self.loadDataChart();
            });
        }

    }


    loadDataChart() {
        var { chartParams, dataListDevice, curItem } = this.state, self = this;
        var dataParameter = [];
        if (!Libs.isArrayData(dataListDevice)) return;
        var dataDeviceChecked = dataListDevice.filter((item) => item.is_checked == 1);


        switch (parseInt(curItem.type_diagnostics)) {
            case 1:
                for (let i = 0; i < dataDeviceChecked.length; i++) {
                    var listParameter = dataDeviceChecked[i].dataParameter;
                    if (Libs.isArrayData(listParameter)) {
                        for (let j = 0; j < listParameter.length; j++) {
                            listParameter[j].is_checked = 0;
                            if (curItem.type_string_index == 1 && listParameter[j].slug == "activePower") {
                                listParameter[j].is_checked = 1;
                            }

                            if (curItem.type_string_index == 2 && listParameter[j].slug == "dcVoltage") {
                                listParameter[j].is_checked = 1;
                            }

                            if (curItem.type_string_index == 3 && listParameter[j].slug == "acCurrent") {
                                listParameter[j].is_checked = 1;
                            }

                            if (curItem.type_string_index == 4 && listParameter[j].slug == "activeEnergy") {
                                listParameter[j].is_checked = 1;
                            }


                        }
                    }
                    dataDeviceChecked[i].dataParameter = listParameter;
                    let findItem = Libs.find(dataParameter, 'id_device_group', dataDeviceChecked[i].id_device_group);
                    if (Libs.isObjectEmpty(findItem)) {
                        dataParameter.push(dataDeviceChecked[i]);
                    }
                }


                break;
            case 2:
                for (let i = 0; i < dataDeviceChecked.length; i++) {
                    var listParameter = dataDeviceChecked[i].dataParameter;
                    if (Libs.isArrayData(listParameter)) {
                        for (let j = 0; j < listParameter.length; j++) {
                            listParameter[j].is_checked = 0;
                            if (curItem.type_string_index == 1 && listParameter[j].slug == "dcPower") {
                                listParameter[j].is_checked = 1;
                            }

                            if (curItem.type_string_index == 2 && listParameter[j].slug == "dcVoltage") {
                                listParameter[j].is_checked = 1;
                            }

                            if (curItem.type_string_index == 3 && listParameter[j].slug == "dcCurrent") {
                                listParameter[j].is_checked = 1;
                            }
                        }
                    }
                    dataDeviceChecked[i].dataParameter = listParameter;
                    let findItem = Libs.find(dataParameter, 'id_device_group', dataDeviceChecked[i].id_device_group);
                    if (Libs.isObjectEmpty(findItem)) {
                        dataParameter.push(dataDeviceChecked[i]);
                    }
                }
                break;
            case 3:

                for (let i = 0; i < dataDeviceChecked.length; i++) {
                    var listParameter = dataDeviceChecked[i].dataParameter;
                    if (Libs.isArrayData(listParameter)) {
                        for (let j = 0; j < listParameter.length; j++) {
                            listParameter[j].is_checked = 0;
                            if (curItem.type_string_index == 1 && listParameter[j].slug == "activePower") {
                                listParameter[j].is_checked = 1;
                            }

                            if (curItem.type_string_index == 2 && listParameter[j].slug == "dcVoltage") {
                                listParameter[j].is_checked = 1;
                            }

                            if (curItem.type_string_index == 3 && listParameter[j].slug == "acCurrent") {
                                listParameter[j].is_checked = 1;
                            }
                        }
                    }
                    dataDeviceChecked[i].dataParameter = listParameter;
                    let findItem = Libs.find(dataParameter, 'id_device_group', dataDeviceChecked[i].id_device_group);
                    if (Libs.isObjectEmpty(findItem)) {
                        dataParameter.push(dataDeviceChecked[i]);
                    }
                }
                break;
        }

        if (!Libs.isArrayData(dataParameter)) return;
        var chartToolOption = {};
        var params = {};
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



        params.id_language = this.employee.id_language;
        params.id_employee = this.employee.id_employee;
        params.dataDevice = dataDeviceChecked;
        params.filterBy = chartParams.id_filter;
        params.data_send_time = chartParams.data_send_time;

        let elHeight = (document.getElementById('main-chart-view').clientHeight) - 60;

        chartToolOption.chart = { zoomType: 'xy', height: elHeight ? elHeight : null };
        chartToolOption.credits = { enabled: false };
        chartToolOption.exporting = { enabled: true };
        chartToolOption.title = {
            text: null,
            align: 'left'
        };
        chartToolOption.xAxis = [];
        chartToolOption.yAxis = [];
        chartToolOption.tooltip = {
            shared: true,
            crosshairs: true
        };
        chartToolOption.plotOptions = {
            series: {
                turboThreshold: 5000
            },
            column: {
                stacking: 'normal'
            }
        };
        chartToolOption.series = [];
        var tickInterval = 24;
        switch (chartParams.id_filter) {
            case 'today':
                if (chartParams.data_send_time == 1) {
                    tickInterval = 24;
                } else if (chartParams.data_send_time == 2) {
                    tickInterval = 12;
                } else if (chartParams.data_send_time == 3) {
                    tickInterval = 2;
                }

                break;
            case '3_day':
                if (chartParams.data_send_time == 1) {
                    tickInterval = 168;
                } else if (chartParams.data_send_time == 2) {
                    tickInterval = 57;
                } else if (chartParams.data_send_time == 3) {
                    tickInterval = 15;
                }
                break;
            case 'last_month':
            case 'this_month':
                tickInterval = 4;
                break;
            case 'lifetime':
            case '12_month':
                tickInterval = 1;
                break;
        }

        var paramerter = [];
        for (var j = 0, leng = dataParameter.length; j < leng; j++) {
            var childs = dataParameter[j].dataParameter;
            if (!Libs.isArrayData(childs)) return;
            var dataChildTmp = childs.filter((item) => item.is_checked == 1);
            if (Libs.isArrayData(dataChildTmp)) {
                paramerter.push(...dataChildTmp);
            }
        }

        if (!Libs.isArrayData(paramerter)) return;
        params.type = 'private';
        MainAnalyticsService.instance.getChartByListDevice(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                var categories = [], series = [], yAxis = [];
                var yAxisUnit = [];
                for (var i = 0; i < paramerter.length; i++) {
                    if (i === 0) {
                        yAxisUnit.push(paramerter[i]);
                        yAxis.push({
                            gridLineWidth: 1,
                            lineWidth: 1,
                            labels: {
                                enabled: true
                            },
                            title: {
                                text: (!Libs.isBlank(paramerter[i].unit) ? paramerter[i].unit : ''),
                                enabled: true
                            },
                            opposite: false
                        });
                    } else {
                        var findyAxisUnit = Libs.find(yAxisUnit, 'unit', paramerter[i].unit);
                        if (Libs.isObjectEmpty(findyAxisUnit)) {
                            yAxisUnit.push(paramerter[i]);
                            yAxis.push({
                                gridLineWidth: 1,
                                lineWidth: 1,
                                labels: {
                                    enabled: true
                                },
                                title: {
                                    text: (!Libs.isBlank(paramerter[i].unit) ? paramerter[i].unit : ''),
                                    enabled: true
                                },
                                opposite: true
                            });
                        }
                    }

                    var idyAxis = 0;

                    if (Libs.isArrayData(yAxisUnit)) {
                        yAxisUnit.map((h, index) => {
                            if (paramerter[i].unit == h.unit) {
                                idyAxis = index;
                            }
                        })
                    }

                    for (let k = 0, lenk = data.length; k < lenk; k++) {
                        var findSeries = Libs.find(series, 'id', data[k].id);
                        if (Libs.isObjectEmpty(findSeries)) {
                            var seriesItem = {
                                id: data[k].id,
                                name: data[k].device_name + " - " + paramerter[i].name,
                                type: 'spline',
                                yAxis: idyAxis,
                                tooltip: {
                                    valueSuffix: ' ' + (!Libs.isBlank(paramerter[i].unit) ? paramerter[i].unit : '')
                                },
                                data: [],
                                gridLineWidth: 1,
                                lineWidth: 1,
                                marker: {
                                    radius: 1.5,
                                    enabled: false
                                }
                            };

                            var dataRow = data[k].data;
                            var itemData = [];
                            for (let j = 0; j < dataRow.length; j++) {
                                // generate series
                                var value = (!Libs.isBlank(dataRow[j][paramerter[i].slug]) && dataRow[j][paramerter[i].slug] > 0) ? dataRow[j][paramerter[i].slug] : null;
                                itemData.push([dataRow[j].time_full, value]);
                                categories.push(dataRow[j].categories_time);
                            }

                            seriesItem.data = itemData;
                            series.push(seriesItem);
                        }

                    }
                }

                if (Libs.isArrayData(categories) && Libs.isArrayData(series) && Libs.isArrayData(yAxis)) {
                    chartToolOption.xAxis = [
                        {
                            categories: categories,
                            alignTicks: true,
                            tickInterval: tickInterval
                        }
                    ];
                    chartToolOption.series = series;
                    chartToolOption.yAxis = yAxis;

                    this.setState({
                        chartToolOption: chartToolOption,
                        dataChartDevice: data,
                        dataExport: data
                    })
                }
            } else {
                self.setState({
                    chartToolOption: {},
                    dataChartDevice: [],
                    dataExport: []
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

            self.setState({
                chartParams: chartParams
            });
            self.loadDataChart();
        }
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(ChartDeviceDiagnostics)
export default HighOrderComponentTranslated;