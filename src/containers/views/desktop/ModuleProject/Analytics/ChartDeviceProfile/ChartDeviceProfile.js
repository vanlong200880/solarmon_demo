import ChartDeviceProfileJsx from './ChartDeviceProfile.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import AnalyticsService from '../../../../../../services/AnalyticsService';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';
class ChartDeviceProfile extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hash_id: this.props.hash_id,
            curItem: {},
            dataPerformanceToday: [],
            dataP12Months: [],
            dataP30Days: [],
            maxPower12Months: []
        };

        this.jsxTemplate = ChartDeviceProfileJsx;
    }

    componentDidMount() {
        this.getDataChartProfile();
    }

    getDataChartProfile() {
        var { hash_id, curItem } = this.state, self = this;
        if (Libs.isBlank(hash_id)) return;
        var params = {
            hash_id: hash_id,
            id_language: this.employee.id_language,
            id_employee: this.employee.id_employee,
            type: 'customer'
        };

        AnalyticsService.instance.getDataChartProfile(params, data => {
            if (data) {
                curItem.name = data.name;
                curItem.current_day = data.current_day;
                // Performance - Today
                var dataListEnergy = data.dataChartProfile;
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
                    lineWidth: 1,
                    tooltip: {
                        valueSuffix: ' kW'
                    },
                    marker: {
                        radius: 1.5
                    }
                };
                var rowItemEnergy = [], rowItemPower = [];

                if (Libs.isArrayData(dataListEnergy)) {
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

                }

                // Performance - Last 12 months
                var rowItemEnergyP12Month = [], rowItemPowerP12Month = [];
                var performanceLast12Months = data.performanceLast12Months;
                var seriesP12Month = [], categoriesP12Month = [];
                let seriesItemEnergyP12Month = {
                    data: [],
                    name: 'Energy yield',
                    zIndex: 1,
                    type: 'column',
                    tooltip: {
                        valueSuffix: ' kWh'
                    }
                };

                let seriesItemPowerP12Month = {
                    data: [],
                    name: 'Power',
                    zIndex: 1,
                    type: 'spline',
                    xAxis: 1,
                    yAxis: 1,
                    id: 's1',
                    lineWidth: 1,
                    tooltip: {
                        valueSuffix: ' kW'
                    },
                    marker: {
                        radius: 1.5
                    }
                };

                // Performance - Last 12 months
                if (Libs.isArrayData(performanceLast12Months)) {
                    categoriesP12Month = [];
                    var lastDate = '', minMonth = '', maxMonth = '';
                    for (let i = 0; i < performanceLast12Months.length; i++) {
                        categoriesP12Month.push([performanceLast12Months[i].category_time_format]);
                        lastDate = performanceLast12Months[i].time_format;
                        if (i === 0) {
                            let date = new Date(performanceLast12Months[i].time_format);
                            minMonth = date.getMonth() + 1;
                        }

                        if (i === performanceLast12Months.length - 1) {
                            let date = new Date(performanceLast12Months[i].time_format);
                            maxMonth = date.getMonth() + 1;
                        }
                        rowItemEnergyP12Month.push([performanceLast12Months[i].time_full, performanceLast12Months[i].activeEnergy]);
                        rowItemPowerP12Month.push([performanceLast12Months[i].time_full, performanceLast12Months[i].activePower]);

                    }

                    if (!Libs.isBlank(minMonth) && !Libs.isBlank(maxMonth)) {
                        let firstArrEnergyP12Month = [], firstArrayPowerP12Month = [], firstArrCategoryP12Month = [];
                        let date = new Date(lastDate);

                        for (let i = 1; i < minMonth; i++) {
                            firstArrEnergyP12Month.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                            firstArrayPowerP12Month.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                            firstArrCategoryP12Month.push([Libs.getStringMonthNumber(i)]);
                        }

                        firstArrCategoryP12Month.push(...categoriesP12Month);
                        firstArrEnergyP12Month.push(...rowItemEnergyP12Month);
                        firstArrayPowerP12Month.push(...rowItemPowerP12Month);

                        for (let i = maxMonth + 1; i <= 12; i++) {
                            firstArrEnergyP12Month.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                            firstArrayPowerP12Month.push([(i < 10 ? ('0' + i) : i) + "/" + date.getFullYear(), null]);
                            firstArrCategoryP12Month.push([Libs.getStringMonthNumber(i)]);
                        }

                        categoriesP12Month = firstArrCategoryP12Month;
                        rowItemEnergyP12Month = firstArrEnergyP12Month;
                        rowItemPowerP12Month = firstArrayPowerP12Month;
                    }


                    seriesItemEnergyP12Month.data = rowItemEnergyP12Month;
                    seriesP12Month.push(seriesItemEnergyP12Month);
                    seriesItemPowerP12Month.data = rowItemPowerP12Month;
                    seriesP12Month.push(seriesItemPowerP12Month);


                }

                // Performance - Last 31 days
                var dataP30Days = data.performanceLast30Days;
                var rowItemEnergyP30Days = [], rowItemPowerP30Days = [];
                var seriesP30Days = [], categoriesP30Days = [];
                let seriesItemEnergyP30Days = {
                    data: [],
                    name: 'Energy yield',
                    zIndex: 1,
                    type: 'column',
                    tooltip: {
                        valueSuffix: ' kWh'
                    }
                };

                let seriesItemPowerP30Days = {
                    data: [],
                    name: 'Power',
                    zIndex: 1,
                    type: 'spline',
                    xAxis: 1,
                    yAxis: 1,
                    id: 's1',
                    lineWidth: 1,
                    tooltip: {
                        valueSuffix: ' kW'
                    },
                    marker: {
                        radius: 1.5
                    }
                };

                if (Libs.isArrayData(dataP30Days)) {
                    categoriesP30Days = [];
                    for (let i = 0; i < dataP30Days.length; i++) {
                        categoriesP30Days.push([dataP30Days[i].category_time_format]);
                        rowItemEnergyP30Days.push([dataP30Days[i].time_full, dataP30Days[i].activeEnergy]);
                        rowItemPowerP30Days.push([dataP30Days[i].time_full, dataP30Days[i].activePower]);

                    }

                    seriesItemEnergyP30Days.data = rowItemEnergyP30Days;
                    seriesP30Days.push(seriesItemEnergyP30Days);
                    seriesItemPowerP30Days.data = rowItemPowerP30Days;
                    seriesP30Days.push(seriesItemPowerP30Days);

                }

                // Daily Max Power - Last 12 Months
                var maxPower12Months = data.maxPower12Months;
                var rowItemPowerMaxPower = [];
                var seriesMaxPower = [];
                let seriesItemPowerMax = {
                    data: [],
                    name: 'Measured AC Power (max)',
                    tooltip: {
                        valueSuffix: ' kW'
                    }
                };

                if (Libs.isArrayData(maxPower12Months)) {
                    for (let i = 0; i < maxPower12Months.length; i++) {
                        rowItemPowerMaxPower.push([Date.UTC(maxPower12Months[i].year, maxPower12Months[i].month, maxPower12Months[i].day), maxPower12Months[i].activePower]);
                    }
                    seriesItemPowerMax.data = rowItemPowerMaxPower;
                    seriesMaxPower.push(seriesItemPowerMax);
                }

                self.setState({
                    curItem: curItem,
                    dataCategories: categories,
                    dataPerformanceToday: dataListEnergy,
                    series: series,

                    dataP12Months: performanceLast12Months,
                    dataCategoriesP12Month: categoriesP12Month,
                    seriesP12Month: seriesP12Month,

                    dataP30Days: dataP30Days,
                    categoriesP30Days: categoriesP30Days,
                    seriesP30Days: seriesP30Days,

                    maxPower12Months: maxPower12Months,
                    seriesMaxPower: seriesMaxPower,

                }, () => {
                    self.performanceTodayOption();
                });
            }
        }, false);
    }




    performanceTodayOption() {
        // Performance - Today
        var performanceTodayOption = {
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
            colors: ['#82cdff', '#f5893b', '#f2ae1b', '#1e477f', '#e68600', '#00b767', '#ffc300'],
            xAxis: [
                {
                    title: { text: "Power", enabled: false },
                    alignTicks: true,
                    gridLineWidth: 1,
                    tickInterval: 24,
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

        // Performance - Last 12 months
        var performance12MonthOption = {
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
            colors: ['#82cdff', '#f5893b', '#f2ae1b', '#1e477f', '#e68600', '#00b767', '#ffc300'],
            xAxis: [
                {
                    title: { text: "Power", enabled: false },
                    alignTicks: true,
                    gridLineWidth: 1,
                    tickInterval: 1,
                    visible: true,
                    categories: this.state.dataCategoriesP12Month
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
            series: this.state.seriesP12Month
        };


        // Performance - Last 12 months
        var performance30DaysOption = {
            credits: { enabled: false },
            exporting: { enabled: true },
            title: { text: null },

            chart: {
                type: 'xy'
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
                borderWidth: 0,
                showInLegend: false
            },
            colors: ['#82cdff', '#f5893b', '#f2ae1b', '#1e477f', '#e68600', '#00b767', '#ffc300'],
            xAxis: [
                {
                    title: { text: "Power", enabled: false },
                    alignTicks: true,
                    gridLineWidth: 1,
                    tickInterval: 3,
                    visible: true,
                    categories: this.state.categoriesP30Days,
                    crosshair: true
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

            tooltip: {
                shared: false,
                crosshairs: true
            },
            series: this.state.seriesP30Days
        };


        // Daily Max Power - Last 12 Months
        var maxPowerOption = {
            credits: { enabled: false },
            exporting: { enabled: true },
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: null
            },
            colors: ['#f5893b', '#66bc51', '#004ec3'],

            xAxis: {
                type: 'datetime',
                dateTimeLabelFormats: {
                    month: '%e. %b',
                    year: '%Y'
                },
                title: {
                    text: null,
                    enabled: false 
                }
            },
            yAxis: {
                title: {
                    text: 'kW'
                },
                min: 0,
                lineWidth: 1,
                gridLineWidth: 1,
            },

            plotOptions: {
                series: {
                    marker: {
                        enabled: true
                    }
                }
            },
            series: this.state.seriesMaxPower
        };


        this.setState({
            performanceTodayOption: performanceTodayOption,
            performance12MonthOption: performance12MonthOption,
            performance30DaysOption: performance30DaysOption,
            maxPowerOption: maxPowerOption
        });
    }



    downloadDataPerformanceToday = () => {
        var { dataPerformanceToday, curItem } = this.state;
        if (!Libs.isArrayData(dataPerformanceToday)) return;

        var dataExport = [];
        for (var i = 0, len = dataPerformanceToday.length; i < len; i++) {
            dataExport.push({
                'Time': dataPerformanceToday[i].time_full,
                'Project name': curItem.name,
                'Energy now (kWh)': dataPerformanceToday[i].activeEnergy,
                "Power now (kW)": dataPerformanceToday[i].activePower
            });
        }

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(dataExport, { skipHeader: false });
        const wb = {
            SheetNames: ['Performance - Today'],
            Sheets: { 'Performance - Today': ws }
        };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Export-performance-today-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
    }



    downloadDataP12Month = () => {
        var { dataP12Months, curItem } = this.state;
        if (!Libs.isArrayData(dataP12Months)) return;

        var dataExport = [];
        for (var i = 0, len = dataP12Months.length; i < len; i++) {
            dataExport.push({
                'Time': dataP12Months[i].time_full,
                'Project name': curItem.name,
                'Energy now (kWh)': dataP12Months[i].activeEnergy,
                "Power now (kW)": dataP12Months[i].activePower
            });
        }

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(dataExport, { skipHeader: false });
        const wb = {
            SheetNames: ['Performance - Last 12 months'],
            Sheets: { 'Performance - Last 12 months': ws }
        };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Export-performance-12-month-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
    }


    downloadDataP30Days = () => {
        var { dataP30Days, curItem } = this.state;
        if (!Libs.isArrayData(dataP30Days)) return;

        var dataExport = [];
        for (var i = 0, len = dataP30Days.length; i < len; i++) {
            dataExport.push({
                'Time': dataP30Days[i].time_full,
                'Project name': curItem.name,
                'Energy now (kWh)': dataP30Days[i].activeEnergy,
                "Power now (kW)": dataP30Days[i].activePower
            });
        }

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(dataExport, { skipHeader: false });
        const wb = {
            SheetNames: ['Performance - Last 30 days'],
            Sheets: { 'Performance - Last 30 days': ws }
        };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Export-performance-30-days-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
    }


    downloadDataMaxPower = () => {
        var { maxPower12Months, curItem } = this.state;
        if (!Libs.isArrayData(maxPower12Months)) return;

        var dataExport = [];
        for (var i = 0, len = maxPower12Months.length; i < len; i++) {
            dataExport.push({
                'Time': maxPower12Months[i].time_full,
                'Project name': curItem.name,
                "Max power (kW)": maxPower12Months[i].activePower
            });
        }

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(dataExport, { skipHeader: false });
        const wb = {
            SheetNames: ['Daily Max Power'],
            Sheets: { 'Daily Max Power': ws }
        };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Export-max-power-12-months-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(ChartDeviceProfile)
export default HighOrderComponentTranslated;