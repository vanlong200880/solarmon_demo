import React from 'react';
import DeviceChartingJsx from './DeviceCharting.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import AnalyticsService from '../../../../../../services/AnalyticsService';
import MainDeviceService from '../../../../../../services/MainDeviceService';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';

class DeviceCharting extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            curItem: this.props.curItem,
            dataParameter: [],
            chartToolOption: {},
            dataExport: [],
            chartParams: {
                id_filter: 'today',
                text_filter: 'Today',
                show_filter: false,
                max_date: Libs.getCurrentDDMMYYYY(),
                data_send_time: 1
            },

            dataFilter: [
                { id: "today", text: "Today" },
                { id: "3_day", text: "3 days" },
                { id: "this_month", text: "This month" },
                { id: "last_month", text: "Last month" },
                { id: "12_month", text: "Last 12 months" },
                { id: "lifetime", text: "Lifetime" }
            ],
        };
        this.jsxTemplate = DeviceChartingJsx;

        this.handleParameterInputChange = this.handleParameterInputChange.bind(this);
        this.wrapperRef = React.createRef();

    }

    componentDidMount() {
        
        this.getDataListHardware();
        this.loadConfigDefaultDate();
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
        params.type = 'private';
        MainDeviceService.instance.getDataListHardware(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataParameter: data
                });

            } else {
                self.setState({
                    dataParameter: []
                });
            }
        });
    }

    handleParameterInputChange(e, index) {
        var { dataParameter, curItem } = this.state, self = this;
        if (!Libs.isArrayData(dataParameter)) return;
        var item = dataParameter[index];
        if (Libs.isObjectEmpty(item)) return;

        dataParameter[index].is_checked = dataParameter[index].is_checked ? 0 : 1;
        dataParameter[index].id_device = curItem.id;
        this.setState({
            dataParameter: dataParameter
        }, () => {
            self.loadDataChart();
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
                chartParams.start_date = Libs.getCurrentMMDDYYYYHI();
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



    changeViewMinute = (value) => {
        var chartParams = this.state.chartParams, self = this;
        if (Libs.isBlank(value)) return;
        chartParams.data_send_time = value;
        this.setState({ chartParams: chartParams }, () => {
            self.loadDataChart();
        });
    }


    onClickShowFilter = () => {
        var { chartParams } = this.state;
        chartParams.show_filter = true;
        this.setState({
            chartParams: chartParams
        });
    }


    loadDataChart() {
        var { chartParams, dataDevice, dataParameter, curItem } = this.state, self = this;
        var chartToolOption = {};
        var dataDevice = [];
        if (!Libs.isObjectEmpty(curItem)) {
            dataDevice.push(curItem);
        }
        if (!Libs.isArrayData(dataDevice) || !Libs.isArrayData(dataParameter)) return;
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

        const filterDevice = dataDevice.reduce((acc, current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);


        params.dataDevice = filterDevice;
        params.filterBy = chartParams.id_filter;
        params.data_send_time = chartParams.data_send_time;
        params.type = 'private';

        let elHeight = (document.getElementById('chart-view').clientHeight) - 80;
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

        var paramerter = dataParameter.filter((item) => item.is_checked == 1);
        if (!Libs.isArrayData(paramerter)) return;

        AnalyticsService.instance.getChartByListDevice(params, (data, total_row) => {
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
                        var seriesItem = {
                            name: paramerter[i].name,
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
                        if (Libs.isArrayData(dataRow)) {
                            for (let j = 0; j < dataRow.length; j++) {
                                // generate series
                                var value = (!Libs.isBlank(dataRow[j][paramerter[i].slug]) && dataRow[j][paramerter[i].slug] > 0) ? dataRow[j][paramerter[i].slug] : null;
                                itemData.push([dataRow[j].time_full, value]);
                                if (k === 0) {
                                    categories.push(dataRow[j].categories_time);
                                }
                            }
                        }


                        seriesItem.data = itemData;
                        series.push(seriesItem);
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
                        dataExport: data
                    });
                    self.forceUpdate()
                }
            } else {
                self.setState({
                    chartToolOption: {},
                    dataExport: []
                });
            }
        });
    }

    downloadData = () => {
        var { dataExport } = this.state;
        if (Libs.isArrayData(dataExport)) {
            var SheetNames = [], Sheets = {};
            const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const fileExtension = '.xlsx';
            for (var i = 0; i < dataExport.length; i++) {
                SheetNames.push(dataExport[i].name);
                var dataSheets = [];
                var dataRows = dataExport[i].data;
                if (Libs.isArrayData(dataRows)) {
                    dataRows.map((item, index) => {
                        dataSheets.push(item);
                    })
                }
                const ws = XLSX.utils.json_to_sheet(dataSheets, { skipHeader: false });
                Sheets[dataExport[i].name] = ws;
            }

            const wb = {
                SheetNames: SheetNames,
                Sheets: Sheets
            };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], { type: fileType });
            FileSaver.saveAs(data, "export-charting-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
        }
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(DeviceCharting)
export default HighOrderComponentTranslated;