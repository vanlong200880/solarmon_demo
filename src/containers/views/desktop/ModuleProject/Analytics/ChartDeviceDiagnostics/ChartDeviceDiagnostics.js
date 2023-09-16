import React from 'react';
import ChartDeviceDiagnosticsJsx from './ChartDeviceDiagnostics.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/Constants';
import ChartsDiagnosticsService from '../../../../../../services/ChartsDiagnosticsService';

import moment from 'moment';
class ChartDeviceDiagnostics extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            curItem: {
                data_send_time: 1,
                type: 2,
                type_diagnostics: 2,
                type_string_index: 1
            },

            dataDevice: [
                {
                    id: 1,
                    name: "Satcon PVS-375 Inverter",
                    is_active: 0,
                },
                {
                    id: 2,
                    name: "Shark 100",
                    is_active: 0
                },
                {
                    id: 3,
                    name: "Inverter 1",
                    is_active: 0,
                }
            ],

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
                }
            ],

            dataList: [],
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
            },
            allLanguage: Libs.isBlank(this.employee) ? [] : this.employee.languages,

            dataFilter: [
                { id: "today", text: "Today" },
                { id: "this_month", text: "This month" },
                { id: "last_month", text: "Last month" },
                { id: "12_month", text: "Last 12 months" },
                { id: "lifetime", text: "Lifetime" }
            ],

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

        this.paging = {
            total: 0,
            current: 1,
            currentInput: 1
        };

        this.jsxTemplate = ChartDeviceDiagnosticsJsx;

        this.inputChangedHandler = this.inputChangedHandler.bind(this);
        this.inputChangedEnter = this.inputChangedEnter.bind(this);
        this.inputChangedBlue = this.inputChangedBlue.bind(this);
        this.wrapperRef = React.createRef();
        this.myRef = React.createRef();

    }

    componentDidMount() {
        
        // this.getList();
        document.addEventListener('click', this.handleClickOutside);
        this.getDataChart();
        // this.showHeaderMenuProject(true);

        // if (typeof this.props.parent.reloadHeaderShops == 'function') {
        //     // this.props.parent.showHeaderShops(false);
        // }
        // this.forceUpdate();
    }
    componentWillUnmount() {
        // document.removeEventListener('click', this.handleClickOutside)
    }

    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;

        if (Libs.isObjectEmpty(item) && name == 'statype_diagnosticsus') {
            curItem.statype_diagnosticsus = '';
        } else if(Libs.isObjectEmpty(item) && name == 'type_string_index'){
            curItem.type_string_index = '';
        } else {
            var value = item.value;
            curItem[name] = value;
        }

        self.setState({
            curItem: curItem
        });
    }

    // showFilterParameter = () => {
    //     this.setState({
    //         show_parameter: true
    //     });
    // }


    // addFilterParameter = () => {
    //     this.setState({
    //         show_parameter: false
    //     });
    // }

    // closeFilterParameter = () => {
    //     this.setState({
    //         show_parameter: false
    //     });
    // }

    // clearFilterParameter = () => {
    //     var { dataParameter } = this.state;
    //     if (!Libs.isArrayData(dataParameter)) return;

    //     dataParameter.map((item, index) => {
    //         dataParameter[index].is_active = 0;
    //     });

    //     this.setState({
    //         dataParameter: dataParameter
    //     });
    // }

    // handleParameterInputChange = (e, index, k) => {
    //     var { dataParameter } = this.state;


    //     if (!Libs.isArrayData(dataParameter)) return;
    //     var item = dataParameter[index];
    //     if (Libs.isObjectEmpty(item)) return;
    //     var childs = item.dataParameter;
    //     if (!Libs.isArrayData(childs)) return;

        

    //     // childs[k].is_active = childs[k].is_active ? 0 : 1;

    //     dataParameter[index].dataParameter[k].is_active = dataParameter[index].dataParameter[k].is_active ? 0 : 1;
    //     // dataParameter[index].dataParameter = childs;
    //     this.setState({
    //         dataParameter: dataParameter
    //     });
    // }

    // handleDeviceInputChange = (e, index) => {
    //     var { dataDevice, dataParameter } = this.state;
    //     if (!Libs.isArrayData(dataDevice)) return;
    //     var item = dataDevice[index];
    //     if (Libs.isObjectEmpty(item)) return;
    //     if (dataDevice[index].is_active) {
    //         dataDevice[index].is_active = 0;
    //         if (Libs.isArrayData(dataParameter)) {
    //             for (var i = 0, len = dataParameter.length; i < len; i++) {
    //                 if (dataParameter[i].id == item.id) {
    //                     dataParameter.splice(i, 1);
    //                 }
    //             }
    //         }
    //     } else {
    //         dataDevice[index].is_active = 1;
    //         dataParameter.push(item);
    //     }


    //     this.setState({
    //         dataDevice: dataDevice,
    //         dataParameter: dataParameter,
    //         show_parameter: true
    //     });
    // }

    /**
   * Get chart data
   * @author long.pham 2020-12-03
   * @param id_site, id_customer
   * @return Object
   */
    getDataChart() {
        var { chartParams, curItem } = this.state, self = this;

        if (Libs.isObjectEmpty(chartParams)) return;

        var params = {};
        params.start_date = Libs.convertAllFormatDate(Libs.dateFormat(chartParams.start_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 00:00:00");
        if (Libs.dateFormat(chartParams.current_time, "MM/DD/YYYY", "MM/DD/YYYY") == Libs.dateFormat(chartParams.end_date, "MM/DD/YYYY", "MM/DD/YYYY")) {
            params.end_date = Libs.convertAllFormatDate(chartParams.end_date); // '2020-11-01 23:59:59';
        } else {
            params.end_date = Libs.convertAllFormatDate(Libs.dateFormat(chartParams.end_date, "MM/DD/YYYY", "MM/DD/YYYY") + " 23:59:59");
        }


        // params.start_date = '2021-08-09 00:00:00';
        // params.end_date = '2021-08-09 23:59:59';
        params.id_site = curItem.id;
        params.id_customer = curItem.id_customer;
        params.customer_type = !Libs.isBlank(this.user) ? this.user.customer_type : null;
        // params.offset_timezone = Libs.getOffsetTimeZone(chartParams.end_date);
        // params.offset_timezone = '-08:00';
        params.filterBy = chartParams.id_filter;
        // params.format_sql_long = Constants.DATE_FORMAT.format_sql_long;
        params.id_site_type = curItem.id_site_type;
        params.setup_send_time = curItem.data_send_time;
        // Use only for lifetime
        params.typeView = (moment(curItem.commissioning).format('YYYY') - moment(chartParams.end_date).format('YYYY')) > 3 ? null : 'month';
        params.data_send_time = chartParams.data_send_time;
        ChartsDiagnosticsService.instance.getDataChart(params, (data) => {
            if (!Libs.isObjectEmpty(data)) {
                var dataListEnergy = data.energy;
                var dataIrradiance = [], dataEnergy = [], categories = [], arrEnergy = [], arrMeasure = [];
                var generationTotal = 0, series = [], lastUpdated = moment().format('LLL');
                if (params.filterBy == 'today') {
                    switch (chartParams.data_send_time) {
                        case 1:
                            curItem.tickInterval = 24;
                            categories = [
                                '0AM', '0:05 AM', '0:10 AM', '0:15 AM', '0:20 AM', '0:25 AM', '0:30 AM', '0:35 AM', '0:40 AM', '0:45 AM', '0:50 AM', '0:55 AM',
                                '1AM', '1:05 AM', '1:10 AM', '1:15 AM', '1:20 AM', '1:25 AM', '1:30 AM', '1:35 AM', '1:40 AM', '1:45 AM', '1:50 AM', '1:55 AM',
                                '2AM', '2:05 AM', '2:10 AM', '2:15 AM', '2:20 AM', '2:25 AM', '2:30 AM', '2:35 AM', '2:40 AM', '2:45 AM', '2:50 AM', '2:55 AM',
                                '3AM', '3:05 AM', '3:10 AM', '3:15 AM', '3:20 AM', '3:25 AM', '3:30 AM', '3:35 AM', '3:40 AM', '3:45 AM', '3:50 AM', '3:55 AM',
                                '4AM', '4:05 AM', '4:10 AM', '4:15 AM', '4:20 AM', '4:25 AM', '4:30 AM', '4:35 AM', '4:40 AM', '4:45 AM', '4:50 AM', '4:55 AM',
                                '5AM', '5:05 AM', '5:10 AM', '5:15 AM', '5:20 AM', '5:25 AM', '5:30 AM', '5:35 AM', '5:40 AM', '5:45 AM', '5:50 AM', '5:55 AM',
                                '6AM', '6:05 AM', '6:10 AM', '6:15 AM', '6:20 AM', '6:25 AM', '6:30 AM', '6:35 AM', '6:40 AM', '6:45 AM', '6:50 AM', '6:55 AM',
                                '7AM', '7:05 AM', '7:10 AM', '7:15 AM', '7:20 AM', '7:25 AM', '7:30 AM', '7:35 AM', '7:40 AM', '7:45 AM', '7:50 AM', '7:55 AM',
                                '8AM', '8:05 AM', '8:10 AM', '8:15 AM', '8:20 AM', '8:25 AM', '8:30 AM', '8:35 AM', '8:40 AM', '8:45 AM', '8:50 AM', '8:55 AM',
                                '9AM', '9:05 AM', '9:10 AM', '9:15 AM', '9:20 AM', '9:25 AM', '9:30 AM', '9:35 AM', '9:40 AM', '9:45 AM', '9:50 AM', '9:55 AM',
                                '10AM', '10:05 AM', '10:10 AM', '10:15 AM', '10:20 AM', '10:25 AM', '10:30 AM', '10:35 AM', '10:40 AM', '10:45 AM', '10:50 AM', '10:55 AM',
                                '11AM', '11:05 AM', '11:10 AM', '11:15 AM', '11:20 AM', '11:25 AM', '11:30 AM', '11:35 AM', '11:40 AM', '11:45 AM', '11:50 AM', '11:55 AM',
                                '12PM', '12:05 PM', '12:10 PM', '12:15 PM', '12:20 PM', '12:25 PM', '12:30 PM', '12:35 PM', '12:40 PM', '12:45 PM', '12:50 PM', '12:55 PM',
                                '1PM', '1:05 PM', '1:10 PM', '1:15 PM', '1:20 PM', '1:25 PM', '1:30 PM', '1:35 PM', '1:40 PM', '1:45 PM', '1:50 PM', '1:55 PM',
                                '2PM', '2:05 PM', '2:10 PM', '2:15 PM', '2:20 PM', '2:25 PM', '2:30 PM', '2:35 PM', '2:40 PM', '2:45 PM', '2:50 PM', '2:55 PM',
                                '3PM', '3:05 PM', '3:10 PM', '3:15 PM', '3:20 PM', '3:25 PM', '3:30 PM', '3:35 PM', '3:40 PM', '3:45 PM', '3:50 PM', '3:55 PM',
                                '4PM', '4:05 PM', '4:10 PM', '4:15 PM', '4:20 PM', '4:25 PM', '4:30 PM', '4:35 PM', '4:40 PM', '4:45 PM', '4:50 PM', '4:55 PM',
                                '5PM', '5:05 PM', '5:10 PM', '5:15 PM', '5:20 PM', '5:25 PM', '5:30 PM', '5:35 PM', '5:40 PM', '5:45 PM', '5:50 PM', '5:55 PM',
                                '6PM', '6:05 PM', '6:10 PM', '6:15 PM', '6:20 PM', '6:25 PM', '6:30 PM', '6:35 PM', '6:40 PM', '6:45 PM', '6:50 PM', '6:55 PM',
                                '7PM', '7:05 PM', '7:10 PM', '7:15 PM', '7:20 PM', '7:25 PM', '7:30 PM', '7:35 PM', '7:40 PM', '7:45 PM', '7:50 PM', '7:55 PM',
                                '8PM', '8:05 PM', '8:10 PM', '8:15 PM', '8:20 PM', '8:25 PM', '8:30 PM', '8:35 PM', '8:40 PM', '8:45 PM', '8:50 PM', '8:55 PM',
                                '9PM', '9:05 PM', '9:10 PM', '9:15 PM', '9:20 PM', '9:25 PM', '9:30 PM', '9:35 PM', '9:40 PM', '9:45 PM', '9:50 PM', '9:55 PM',
                                '10PM', '10:05 PM', '10:10 PM', '10:15 PM', '10:20 PM', '10:25 PM', '10:30 PM', '10:35 PM', '10:40 PM', '10:45 PM', '10:50 PM', '10:55 PM',
                                '11PM', '11:05 PM', '11:10 PM', '11:15 PM', '11:20 PM', '11:25 PM', '11:30 PM', '11:35 PM', '11:40 PM', '11:45 PM', '11:50 PM', '11:55 PM'
                            ];

                            for (var i1 = 0; i1 < dataListEnergy.length; i1++) {
                                var seriesItem = {};
                                seriesItem.name = dataListEnergy[i1].devicename;
                                seriesItem.data = [];
                                seriesItem.zIndex = i1;
                                if (dataListEnergy[i1].type == 'energy') {
                                    seriesItem.type = 'spline';
                                    seriesItem.tooltip = {
                                        valueSuffix: ' kW'
                                    };
                                    seriesItem.lineWidth = 3;
                                    seriesItem.marker = {
                                        radius: 1.5
                                    };
                                } else if (dataListEnergy[i1].type == 'irradiance') {
                                    seriesItem.type = 'spline';
                                    seriesItem.xAxis = 1;
                                    seriesItem.yAxis = 1;
                                    seriesItem.lineWidth = 3;
                                    seriesItem.tooltip = {
                                        valueSuffix: ' kW'
                                    };
                                    seriesItem.id = 's1';
                                    seriesItem.marker = {
                                        radius: 1.5
                                    };

                                }

                                // Put data energy
                                var dataModelEnergy = dataListEnergy[i1].data_energy;
                                var rowItem = [];
                                if (Libs.isArrayData(dataModelEnergy)) {
                                    for (var j1 = 0; j1 < dataModelEnergy.length; j1++) {

                                        if (dataListEnergy[i1].type == 'energy') {
                                            arrEnergy.push({
                                                "ID": i1 + 1 + "_" + j1 + 1,
                                                "DateTime": dataModelEnergy[j1].download_time,
                                                "Device Name": dataListEnergy[i1].export_devicename,
                                                "Power (kW)": dataModelEnergy[j1].chart_energy_kwh
                                            });
                                            generationTotal = generationTotal + dataModelEnergy[j1].chart_energy_kwh;
                                        } else {
                                            arrMeasure.push({
                                                "ID": i1 + 1 + "_" + j1 + 1,
                                                "DateTime": dataModelEnergy[j1].download_time,
                                                "Device Name": dataListEnergy[i1].export_devicename,
                                                "Measured Irradiance (w/m2)": dataModelEnergy[j1].chart_energy_kwh
                                            });
                                        }

                                        rowItem.push([dataModelEnergy[j1].full_time, dataModelEnergy[j1].chart_energy_kwh]);
                                    }
                                    if (dataModelEnergy.length < 288 && dataModelEnergy.length > 0) {
                                        var lastDate = '';
                                        for (var izero1 = dataModelEnergy.length; izero1 < 288; izero1++) {
                                            if (izero1 == dataModelEnergy.length) { lastDate = dataModelEnergy[dataModelEnergy.length - 1].full_time; }
                                            if (lastDate != null) {
                                                lastDate = Libs.addMinutes(lastDate, 5);
                                                rowItem.push([Libs.dateFormat(lastDate, 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss'), 0]);
                                            }
                                        }
                                    }
                                }

                                seriesItem.data = rowItem;
                                series.push(seriesItem);
                            }

                            break;
                        case 2:
                            curItem.tickInterval = 8;
                            categories = [
                                '0AM', '0:15AM', '0:30AM', '0:45AM',
                                '1AM', '1:15AM', '1:30AM', '1:45AM',
                                '2AM', '2:15AM', '2:30AM', '2:45AM',
                                '3AM', '3:15AM', '3:30AM', '3:45AM',
                                '4AM', '4:15AM', '4:30AM', '4:45AM',
                                '5AM', '5:15AM', '5:30AM', '5:45AM',
                                '6AM', '6:15AM', '6:30AM', '6:45AM',
                                '7AM', '7:15AM', '7:30AM', '7:45AM',
                                '8AM', '8:15AM', '8:30AM', '8:45AM',
                                '9AM', '9:15AM', '9:30AM', '9:45AM',
                                '10AM', '10:15AM', '10:30AM', '10:45AM',
                                '11AM', '11:15AM', '11:30AM', '11:45AM',
                                '12PM', '12:15PM', '12:30PM', '12:45PM',
                                '1PM', '1:15PM', '1:30PM', '1:45PM',
                                '2PM', '2:15PM', '2:30PM', '2:45PM',
                                '3PM', '3:15PM', '3:30PM', '3:45PM',
                                '4PM', '4:15PM', '4:30PM', '4:45PM',
                                '5PM', '5:15PM', '5:30PM', '5:45PM',
                                '6PM', '6:15PM', '6:30PM', '6:45PM',
                                '7PM', '7:15PM', '7:30PM', '7:45PM',
                                '8PM', '8:15PM', '8:30PM', '8:45PM',
                                '9PM', '9:15PM', '9:30PM', '9:45PM',
                                '10PM', '10:15PM', '10:30PM', '10:45PM',
                                '11PM', '11:15PM', '11:30PM', '11:45PM',
                            ];

                            for (var i2 = 0; i2 < dataListEnergy.length; i2++) {
                                var seriesItem2 = {};
                                seriesItem2.name = dataListEnergy[i2].devicename;
                                seriesItem2.data = [];
                                seriesItem2.zIndex = i2;
                                if (dataListEnergy[i2].type == 'energy') {
                                    seriesItem2.type = 'spline';
                                    seriesItem2.tooltip = {
                                        valueSuffix: ' kW'
                                    };
                                    seriesItem2.yAxis = 1;
                                    seriesItem2.lineWidth = 3;

                                } else if (dataListEnergy[i2].type == 'irradiance') {
                                    seriesItem2.type = 'spline';
                                    // seriesItem2.xAxis = 1;
                                    // seriesItem2.yAxis = 1;
                                    seriesItem2.lineWidth = 3;
                                    seriesItem2.tooltip = {
                                        valueSuffix: ' kW'
                                    };
                                    seriesItem2.id = 's1';
                                    seriesItem2.marker = {
                                        radius: 1.5
                                    };

                                }

                                // Put data energy
                                var dataModelEnergy2 = dataListEnergy[i2].data_energy;

                                var rowItem2 = [];
                                if (Libs.isArrayData(dataModelEnergy2)) {
                                    for (var j2 = 0; j2 < dataModelEnergy2.length; j2++) {

                                        if (dataListEnergy[i2].type == 'energy') {
                                            arrEnergy.push({
                                                "ID": i2 + 1 + "_" + j2 + 1,
                                                "DateTime": dataModelEnergy2[j2].download_time,
                                                "Device Name": dataListEnergy[i2].export_devicename,
                                                "Power (kW)": dataModelEnergy2[j2].chart_energy_kwh
                                            });

                                            generationTotal = generationTotal + dataModelEnergy2[j2].chart_energy_kwh;
                                        } else {
                                            arrMeasure.push({
                                                "ID": i2 + 1 + "_" + j2 + 1,
                                                "DateTime": dataModelEnergy2[j2].download_time,
                                                "Device Name": dataListEnergy[i2].export_devicename,
                                                "Measured Irradiance (w/m2)": dataModelEnergy2[j2].chart_energy_kwh
                                            });
                                        }

                                        rowItem2.push([dataModelEnergy2[j2].full_time, dataModelEnergy2[j2].chart_energy_kwh]);
                                    }

                                    if (dataModelEnergy2.length < 96 && dataModelEnergy2.length > 0) {
                                        var lastDate2 = '';
                                        for (var izero2 = dataModelEnergy2.length; izero2 < 96; izero2++) {
                                            if (izero2 == dataModelEnergy2.length) { lastDate2 = dataModelEnergy2[dataModelEnergy2.length - 1].full_time; }
                                            if (lastDate2 != null) {
                                                lastDate2 = Libs.addMinutes(lastDate2, 5);
                                                rowItem2.push([Libs.dateFormat(lastDate2, 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD HH:mm:ss'), 0]);
                                            }
                                        }
                                    }
                                }

                                seriesItem2.data = rowItem2;
                                series.push(seriesItem2);
                            }

                            break;
                        default:
                            curItem.tickInterval = 2;
                            categories = [];
                            for (var i3 = 0; i3 < dataListEnergy.length; i3++) {
                                var seriesItem3 = {};
                                seriesItem3.name = dataListEnergy[i3].devicename;
                                seriesItem3.data = [];
                                seriesItem3.zIndex = i3;
                                if (dataListEnergy[i3].type == 'energy') {
                                    seriesItem3.type = 'spline';
                                    seriesItem3.tooltip = {
                                        valueSuffix: ' kW'
                                    };
                                } else if (dataListEnergy[i3].type == 'irradiance') {
                                    seriesItem3.type = 'spline';
                                    seriesItem3.xAxis = 1;
                                    seriesItem3.yAxis = 1;
                                    seriesItem3.lineWidth = 3;
                                    seriesItem3.tooltip = {
                                        valueSuffix: ' kW'
                                    };
                                    seriesItem3.id = 's1';
                                    seriesItem3.marker = {
                                        radius: 1.5
                                    };

                                }

                                // Put data energy
                                var dataModelEnergy3 = dataListEnergy[i3].data_energy, rowItem3 = [];
                                if (Libs.isArrayData(dataModelEnergy3)) {
                                    for (var j3 = 0; j3 < dataModelEnergy3.length; j3++) {

                                        categories.push([dataModelEnergy3[j3].categories_time]);
                                        if (dataListEnergy[i3].type == 'energy') {
                                            arrEnergy.push({
                                                "ID": i3 + 1 + "_" + j3 + 1,
                                                "DateTime": dataModelEnergy3[j3].download_time,
                                                "Device Name": dataListEnergy[i3].export_devicename,
                                                "Power (kW)": dataModelEnergy3[j3].chart_energy_kwh
                                            });
                                            generationTotal = generationTotal + dataModelEnergy3[j3].chart_energy_kwh;
                                        } else {
                                            arrMeasure.push({
                                                "ID": i3 + 1 + "_" + j3 + 1,
                                                "DateTime": dataModelEnergy3[j3].download_time,
                                                "Device Name": dataListEnergy[i3].export_devicename,
                                                "Measured Irradiance (w/m2)": dataModelEnergy3[j3].chart_energy_kwh
                                            });
                                        }

                                        rowItem3.push([dataModelEnergy3[j3].full_time, dataModelEnergy3[j3].chart_energy_kwh]);
                                    }
                                    if (chartParams.id_filter == 'today' && dataModelEnergy3.length < 24) {
                                        for (var izero3 = dataModelEnergy3.length; izero3 < 24; izero3++) {
                                            if (izero3 <= 11) {
                                                categories.push([izero3 + "AM"]);
                                                rowItem3.push([izero3 + "AM", 0]);
                                            } else {
                                                var pm = null;
                                                if (izero3 < 12) {
                                                    pm = izero3;
                                                } else if (izero3 == 12) {
                                                    pm = (izero3);
                                                } else {
                                                    pm = izero3 - 12;
                                                }
                                                rowItem3.push([pm + "PM", 0]);
                                                categories.push([pm + "PM"]);
                                            }
                                        }
                                    }
                                }

                                seriesItem3.data = rowItem3;
                                series.push(seriesItem3);
                            }
                            break;
                    }
                } else {
                    curItem.tickInterval = 1;
                    categories = [];

                    for (var i4 = 0; i4 < dataListEnergy.length; i4++) {
                        var seriesItem4 = {};
                        seriesItem4.name = dataListEnergy[i4].devicename;
                        seriesItem4.data = [];
                        seriesItem4.zIndex = i4;
                        if (dataListEnergy[i4].type == 'energy') {
                            seriesItem4.type = 'spline';
                            seriesItem4.tooltip = {
                                valueSuffix: ' kW'
                            };
                        } else if (dataListEnergy[i4].type == 'irradiance') {
                            seriesItem4.type = 'spline';
                            seriesItem4.xAxis = 1;
                            seriesItem4.yAxis = 1;
                            seriesItem4.lineWidth = 3;
                            seriesItem4.tooltip = {
                                valueSuffix: ' kW'
                            };
                            seriesItem4.id = 's1';
                            seriesItem4.marker = {
                                radius: 1.5
                            };

                        }

                        // Put data energy
                        var dataModelEnergy4 = dataListEnergy[i4].data_energy;
                        var rowItem4 = [];
                        if (Libs.isArrayData(dataModelEnergy4)) {
                            for (var j4 = 0; j4 < dataModelEnergy4.length; j4++) {
                                categories.push([dataModelEnergy4[j4].categories_time]);
                                if (dataListEnergy[i4].type == 'energy') {
                                    arrEnergy.push({
                                        "ID": i4 + 1 + "_" + j4 + 1,
                                        "DateTime": dataModelEnergy4[j4].download_time,
                                        "Device Name": dataListEnergy[i4].export_devicename,
                                        "Power (kW)": dataModelEnergy4[j4].chart_energy_kwh
                                    });

                                    generationTotal = generationTotal + dataModelEnergy4[j4].chart_energy_kwh;
                                } else {
                                    arrMeasure.push({
                                        "ID": i4 + 1 + "_" + j4 + 1,
                                        "DateTime": dataModelEnergy4[j4].download_time,
                                        "Device Name": dataListEnergy[i4].export_devicename,
                                        "Measured Irradiance (w/m2)": dataModelEnergy4[j4].chart_energy_kwh
                                    });
                                }

                                rowItem4.push([dataModelEnergy4[j4].full_time, dataModelEnergy4[j4].chart_energy_kwh]);
                            }
                            if (chartParams.id_filter == 'today' && dataModelEnergy4.length < 24) {
                                for (var izero4 = dataModelEnergy4.length; izero4 < 24; izero4++) {
                                    if (izero4 <= 11) {
                                        categories.push([izero4 + "AM"]);
                                        rowItem4.push([izero4 + "AM", 0]);
                                    } else {
                                        var pm4 = null;
                                        if (izero3 < 12) {
                                            pm4 = izero4;
                                        } else if (izero4 == 12) {
                                            pm4 = (izero4);
                                        } else {
                                            pm4 = izero4 - 12;
                                        }
                                        rowItem4.push([pm4 + "PM", 0]);
                                        categories.push([pm4 + "PM"]);
                                    }
                                }
                            }
                        }

                        seriesItem4.data = rowItem4;
                        series.push(seriesItem4);
                    }
                }

                curItem.generation_total = generationTotal;
                curItem.lastUpdated = lastUpdated;
                self.setState({
                    dataCategories: categories,
                    dataEnergy: dataEnergy,
                    dataIrradiance: dataIrradiance,
                    curItem: curItem,
                    dataEnergyExport: arrEnergy,
                    dataMeasureExport: arrMeasure,
                    series: series
                }, () => {
                    self.loadChartOption();
                });
            }
        });

    }


    loadChartOption() {
        let { clientHeight } = this.myRef.current;
        var chartOption = {
            credits: { enabled: false },
            exporting: { enabled: true },
            title: { text: null },

            chart: {
                type: 'column',
                // height: window.innerWidth <= 1024 ? 300 : null
                height: clientHeight ? clientHeight - 15 : null
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
                    text: 'kW',
                    enabled: true
                },
                lineWidth: 1,
                gridLineWidth: 1,
                labels: {
                    enabled: true
                },
            }, {
                title: { text: 'Watts/meter²', enabled: false },
                lineWidth: 1,
                opposite: true,
                gridLineWidth: 1,
                labels: {
                    enabled: false
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



    onClickNext() {
        var { chartParams } = this.state, self = this;
        var showNextBtn = chartParams.showNextBtn;
        var compareDate = Libs.compareDate(Libs.addDays(chartParams.end_date, 1), 'MM/DD/YYYY', chartParams.current_time);
        switch (chartParams.id_filter) {
            case 'today':
                if (compareDate >= 0) {
                    showNextBtn = false;
                    chartParams.end_date = Libs.addDays(chartParams.end_date, 1);
                    chartParams.start_date = chartParams.end_date;
                } else {
                    chartParams.end_date = Libs.addDays(chartParams.end_date, 1);
                    chartParams.start_date = chartParams.end_date;
                    showNextBtn = true;
                }
                break;

            case 'this_month':
                var tcurrent = new Date(chartParams.end_date);
                var ycurrent = tcurrent.getFullYear(), mcurrent = tcurrent.getMonth();
                if (compareDate > 0) {
                    showNextBtn = false;
                    chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
                    chartParams.start_date = moment(new Date(ycurrent, mcurrent, 1)).format('MM/DD/YYYY HH:mm');
                } else {
                    chartParams.end_date = moment(Libs.addMonths(new Date(ycurrent, mcurrent, 1), 1)).endOf('month').format('MM/DD/YYYY HH:mm');
                    chartParams.start_date = moment(Libs.addMonths(new Date(ycurrent, mcurrent, 1), 1)).format('MM/DD/YYYY HH:mm');
                    showNextBtn = true;
                }

                break;

            case 'last_month':
                var tc = new Date(Libs.getCurrentMMDDYYYYHI());
                var yc = tc.getFullYear(), mc = tc.getMonth();

                if (moment(chartParams.current_time).format('MM/YYYY') == moment(chartParams.end_date).format('MM/YYYY')) {
                    showNextBtn = false;
                    chartParams.end_date = moment(Libs.addMonths(new Date(yc, mc, 1), -1)).endOf('month').format('MM/DD/YYYY HH:mm');
                    chartParams.start_date = moment(Libs.addMonths(new Date(yc, mc, 1), -1)).format('MM/DD/YYYY HH:mm');

                } else {
                    var tlast = new Date(chartParams.end_date);
                    var ylast = tlast.getFullYear(), mlast = tlast.getMonth();
                    chartParams.end_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), 1)).endOf('month').format('MM/DD/YYYY HH:mm');
                    chartParams.start_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), 1)).format('MM/DD/YYYY HH:mm');
                    showNextBtn = true;
                }

                break;


            case '12_month':
                var tstart = new Date(chartParams.end_date);
                var ystart = tstart.getFullYear(), mstart = tstart.getMonth();
                var compareEndDate = moment(Libs.addMonths(new Date(ystart, mstart, 1), 12)).format('YYYY');
                if (moment(chartParams.current_time).format('YYYY') <= compareEndDate) {
                    chartParams.end_date = Libs.getCurrentMMDDYYYYHI();

                    var tn = new Date(chartParams.end_date);
                    var yn = tn.getFullYear(), mn = tn.getMonth();
                    chartParams.start_date = moment(Libs.addMonths(new Date(yn, mn, 1), -12)).format('MM/DD/YYYY HH:mm');
                    showNextBtn = false;
                } else {
                    var te = new Date(chartParams.end_date);
                    var ye = te.getFullYear(), me = te.getMonth();
                    chartParams.end_date = moment(Libs.addMonths(new Date(ye, me, 1), 12)).endOf('month').format('MM/DD/YYYY HH:mm');
                    var ts = new Date(chartParams.start_date);
                    var ys = ts.getFullYear(), ms = ts.getMonth();
                    chartParams.start_date = moment(Libs.addMonths(new Date(ys, ms, 1), 12)).format('MM/DD/YYYY HH:mm');
                    showNextBtn = true;
                }

                break;
        }
        chartParams.showNextBtn = showNextBtn;
        this.setState({
            chartParams: chartParams
        }, () => {
            //   self.getDataChart();
        })
    }


    onClickPrev() {
        let self = this;
        var { chartParams } = this.state;
        chartParams.showNextBtn = true;
        var t = new Date(chartParams.end_date);
        var y = t.getFullYear(), m = t.getMonth();
        switch (chartParams.id_filter) {
            case 'today':
                chartParams.end_date = moment(Libs.addDays(chartParams.end_date, -1)).format('MM/DD/YYYY HH:mm:ss');
                chartParams.start_date = chartParams.end_date;
                break;
            case 'last_month':
            case 'this_month':
                chartParams.end_date = moment(Libs.addMonths(new Date(y, m, 1), -1)).endOf('month').format('MM/DD/YYYY HH:mm');
                chartParams.start_date = moment(Libs.addMonths(new Date(y, m, 1), -1)).format('MM/DD/YYYY HH:mm');
                break;
            case '12_month':
                chartParams.end_date = moment(Libs.addMonths(new Date(y, m, 1), -12)).endOf('month').format('MM/DD/YYYY HH:mm');
                var tstart = new Date(chartParams.start_date);
                var ystart = tstart.getFullYear(), mstart = tstart.getMonth();
                chartParams.start_date = moment(Libs.addMonths(new Date(ystart, mstart, 1), -12)).format('MM/DD/YYYY HH:mm');
                break;
        }
        this.setState({
            chartParams: chartParams
        }, () => {
            //   self.getDataChart();
        })
    }

    handleClickOutside = (event) => {
        const { target } = event;
        var { chartParams } = this.state, self = this;
        if (!Libs.isBlank(this.wrapperRef.current) && !this.wrapperRef.current.contains(target)) {
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
                break;
            case 'lifetime':
                chartParams.start_date = moment(curItem.commissioning).format('MM/DD/YYYY HH:mm:ss');
                chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
                break;
            case 'this_month':
                chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
                var t = new Date(chartParams.end_date);
                var y = t.getFullYear(), m = t.getMonth();
                chartParams.start_date = moment(new Date(y, m, 1)).format('MM/DD/YYYY HH:mm');
                break;
            case 'last_month':
                var tlast = new Date(Libs.getCurrentMMDDYYYYHI());
                var ylast = tlast.getFullYear(), mlast = tlast.getMonth();
                chartParams.end_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), -1)).endOf('month').format('MM/DD/YYYY HH:mm');
                chartParams.start_date = moment(Libs.addMonths(new Date(ylast, mlast, 1), -1)).format('MM/DD/YYYY HH:mm');
                break;

            case '12_month':
                chartParams.start_date = moment(Libs.addMonths(Libs.getCurrentMMDDYYYYHI(), -12)).format('MM/DD/YYYY HH:mm:ss');
                chartParams.end_date = Libs.getCurrentMMDDYYYYHI();
                break;
        }

        this.setState({
            chartParams: chartParams
        }, () => {
            // self.getDataChart();
        });
    }

    changeViewMinute = (value) => {
        var chartParams = this.state.chartParams, self = this;
        if (Libs.isBlank(value)) return;
        chartParams.data_send_time = value;
        this.setState({ chartParams: chartParams }, () => {
            // self.getDataChart();
        });
    }









    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getList() {
        let self = this;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_company = this.employee.id_company;
        // AnalyticsService.instance.getList(params, (data, total_row) => {
        //     if (Libs.isArrayData(data)) {
        //         self.setState({
        //             dataList: data
        //         });

        //         var total = parseInt(total_row / self.state.searchParam.limit);
        //         if (total_row % self.state.searchParam.limit > 0) {
        //             total = total + 1;
        //         }
        //         self.paging.total = total;
        //         self.paging.current = self.state.searchParam.index;
        //         self.paging.currentInput = self.state.searchParam.index;
        //         self.state.total_row = total_row;

        //     } else {
        //         self.setState({
        //             dataList: [],
        //             total_row: 0
        //         });
        //         self.paging.total = 0;
        //         self.paging.current = 1;
        //         self.paging.currentInput = 1;
        //     }
        //     self.forceUpdate();
        // });
    }


    onClickAdd = () => {
        let curItem = this.state.curItem;
        let data = [];
        var allLanguage = this.state.allLanguage;
        curItem.screen_mode = Constants.SCREEN_MODE.ADD;
        curItem.tabActive = '';
        allLanguage.map((language, index) => {
            if (language.is_default === 1) { curItem.tabActive = language.is_default === 1 ? language.iso_code : ''; }
            let item = {
                is_default: language.is_default,
                iso_code: language.iso_code,
                id_language: language.id,
                name: "",
                description: ""
            };
            return data.push(item);
        });

        curItem.data = data;
        this.setState({
            curItem: curItem,
            add: true
        });

    };

    onClickCloseAdd = (status) => {
        if (status) {
            this.getList();
        }
        this.setState({
            add: false
        })
    }

    onClickCloseDelete = (status, data) => {
        if (status && data) {
            this.getList();
        }
        this.setState({
            delete: false
        })
    }

    /**
     * @description Item click event
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    onItemClick = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index], self = this;

        var params = this.state.curItem;
        params.id_company = item.id_company;
        params.id = item.id;

        // ChartDeviceDiagnosticsService.instance.getDetail(params, data => {
        //     if (data) {
        //         item.data = data.data;
        //         item.screen_mode = Constants.SCREEN_MODE.EDIT;
        //         let curTransItem = Libs.find(data.data,'is_default', 1);
        //         if(Libs.isObjectEmpty(curTransItem)){ return false; }
        //         item["name_"+curTransItem.iso_code] = curTransItem.name;

        //         if(Libs.isArrayData(data.data)){
        //             var dataLang = data.data;
        //             dataLang.map((row, index) => {
        //                 if(row.is_default === 1){
        //                     item.tabActive = row.iso_code;
        //                 }
        //                 return 1;
        //             });
        //         }

        //         self.setState({
        //             curItem: item,
        //             add: true
        //         });
        //     }
        // }, false);
    }



    /**
     * @description Item click event change status
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    onStatusChange = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index], self = this;
        item.screen_mode = Constants.SCREEN_MODE.EDIT;
        item.id_company = this.employee.id_company;
        item.id_language = this.employee.id_language;

        var isActiveUpdate = item.status;
        if (isActiveUpdate * 1 === 1) {
            isActiveUpdate = 0;
        }
        else {
            isActiveUpdate = 1;
        }

        item.status = isActiveUpdate;
        item.updated_by = this.employee.first_name + ' ' + this.employee.last_name;

        // ChartDeviceDiagnosticsService.instance.updateStatus(item, function (status, msg) {
        //     if (status) {
        //         self.setState({
        //             dataList: self.state.dataList
        //         });
        //     }
        // });
    }

    /**
   * @description Item click event delete
   * @author Long.Pham 12-05-2021
   * @param index Order element in the list
   */
    onItemClickDelete = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index];
        this.setState({
            curItem: item,
            delete: true
        });
    }


    inputChangedHandler(event) {
        let self = this;
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name === 'current') {
            if (!Libs.isBlank(value)) {
                var { t } = this.props;
                if (!Libs.isNumber(value)) {
                    self.toast(t('common.page_is_number'), "error");
                    return;
                }
            }

            self.paging.currentInput = value;
            self.forceUpdate();
        }

        if (name === 'limit') {
            var { searchParam } = this.state;
            searchParam.limit = value;
            this.setState({
                searchParam: searchParam
            }, () => {
                self.getList();
            })
        }
    }

    inputChangedEnter(event) {
        let self = this;
        if (event.key === 'Enter') {
            var currentInput = this.paging.currentInput;
            if (!Libs.isBlank(currentInput)) {
                var { t } = this.props;
                if (!Libs.isNumber(currentInput)) {
                    self.toast(t('common.page_is_number'), "error");
                    return;
                }
            }

            if (Libs.isBlank(currentInput) && !Libs.isNumber(currentInput)) return;
            if (parseInt(currentInput) > this.paging.total) {
                currentInput = self.paging.total;
            }

            if (currentInput <= 0) {
                currentInput = 1;
            }

            self.paging.current = currentInput;
            self.paging.currentInput = currentInput;
            this.onSelectPage(currentInput);
            self.forceUpdate();
        }
    }

    inputChangedBlue(event) {
        let self = this;
        let target = event.target;
        let name = target.name;
        if (name === 'current') {
            var currentInput = this.paging.currentInput;
            if (!Libs.isBlank(currentInput)) {
                var { t } = this.props;
                if (!Libs.isNumber(currentInput)) {
                    self.toast(t('common.page_is_number'), "error");
                    return;
                }
            }

            if (Libs.isBlank(currentInput) && !Libs.isNumber(currentInput)) return;
            if (parseInt(currentInput) > this.paging.total) {
                currentInput = self.paging.total;
            }

            if (currentInput <= 0) {
                currentInput = 1;
            }

            self.paging.current = currentInput;
            self.paging.currentInput = currentInput;
            this.onSelectPage(currentInput);
            self.forceUpdate();
        }
    }


    /**
     * @description Select page in pagging
     * @author long.pham 09/05/2021
     * @param {int} index
     */
    onSelectPage(index) {
        let self = this;
        self.state.searchParam.index = index;

        if (index > 0) {
            self.state.searchParam.offset = (index - 1) * self.state.searchParam.limit;
        } else {
            self.state.searchParam.offset = 0;
        }
        self.getList();
    }


    /**
     * @description reload data
     * @author long.pham 09/05/2021
     * @param {int} index
     */
    onClickReload() {
        let self = this;
        self.getList();
    }


    /**
    * Func filter table
    * @author Long.Pham 12-05-2021
    * @param  {Object} e
    */

    onSort(event, sortKey) {
        this.state.searchParam.sort_column = sortKey;
        this.state.searchParam.order_by = (this.state.searchParam.order_by === '' || this.state.searchParam.order_by === 'asc') ? 'desc' : 'asc';
        this.getList();
    }

    /**
      * @description Call form search
      * @author Long.Pham 12/05/2021
      */
    onSearch() {
        let formSearch = (this.state.formSearch === false) ? true : false;
        this.setState({
            formSearch: formSearch
        });
    }

    onResetSearch() {
        let self = this;
        let searchParam = this.state.searchParam;
        searchParam.name = null;
        searchParam.id = null;
        searchParam.index = 1;
        searchParam.offset = 0;
        self.paging.current = 1;
        self.paging.currentInput = 1;
        self.paging.total = 1;
        self.setState({
            searchParam: searchParam
        }, () => {
            self.getList();
        });
    }

    /**
     * Func search
     * @author Long.Pham 12/05/2021
     * @param  {Object} e
     */
    handleSearch() {
        this.getList();
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(ChartDeviceDiagnostics)
export default HighOrderComponentTranslated;