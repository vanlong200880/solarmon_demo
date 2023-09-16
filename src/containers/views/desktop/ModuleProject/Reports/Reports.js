import ReportsJsx from './Reports.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import ReportService from '../../../../../services/ReportService';
import moment from 'moment';

class Reports extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = ReportsJsx;
        this.state = {
            hash_id: !Libs.isObjectEmpty(this.params) ? this.params.id : null,
            curItem: {},
            dataList: [],
            dataType: [
                {
                    id: 1,
                    value: 1,
                    label: "Year"
                },
                {
                    id: 2,
                    value: 2,
                    label: "Month"
                }
            ],

            searchParam: {
                type: 2,
                max_date: moment().format('MM/YYYY'),
                start_date: moment().add(-11, 'M').format('MM/YYYY'),
                end_date: moment().format('MM/YYYY')
            },
            chartMonthOption: {},
            chartOptionAlarm: {},
            chartOption1: {},
            chartOption2: {}
        };

        this.handleInputDateChange = this.handleInputDateChange.bind(this);

    }

    componentDidMount() {
        var { searchParam } = this.state;
        if (searchParam.type == 2) {
            this.getDataReportMonth();
        } else {
            this.getDataReportYear();
        }

    }

    componentWillReceiveProps(nextProps) {
        let self = this, searchParam = this.state.searchParam;
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                hash_id: nextProps.match.params.id
            }, () => {
                if (searchParam.type == 2) {
                    self.getDataReportMonth();
                } else {
                    self.getDataReportYear();
                }
            });
        }
    }

    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputDateChange(event) {
        let target = event.target, self = this;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let { searchParam } = this.state;
            if (searchParam.type === 1) {
                if (name === 'start_date') {
                    var startDate = value.split("/");
                    var endDate = null;
                    if (startDate.length > 0) {
                        endDate = startDate[0] + "/01/" + startDate[1];
                    }
                    if (Libs.isBlank(endDate)) { return }

                    const dateIsAfter = moment(Libs.addMonths(endDate, 11)).isAfter(moment());
                    if (dateIsAfter) {
                        searchParam.end_date = moment().format('MM/YYYY');
                    } else {
                        searchParam.end_date = moment(Libs.addMonths(endDate, 11)).format('MM/YYYY');
                    }
                }
            }

            searchParam[name] = value;
            this.setState({ searchParam }, () => {
                if (searchParam.type === 1) {
                    self.getDataReportYear();
                } else {
                    self.getDataReportMonth();
                }

            });
        }
    }

    getDataReportMonth() {
        var { hash_id, searchParam } = this.state, self = this;
        if (Libs.isBlank(hash_id)) return;
        var params = Object.assign({}, searchParam);
        params.start_date = '01/' + searchParam.start_date;
        params.end_date = '01/' + searchParam.end_date;

        params.hash_id = hash_id;
        params.id_employee = this.employee.id_employee;
        params.id_language = this.employee.id_language;
        params.type = 'customer';

        ReportService.instance.getDataReportMonth(params, data => {
            if (data) {
                var chartMonthOption = {
                    credits: { enabled: false },
                    exporting: { enabled: false },
                    chart: {
                        zoomType: 'xy'
                    },
                    title: {
                        text: null,

                    },
                    colors: ['#78c1f5', '#e2a76c'],
                    xAxis: [],
                    yAxis: [{
                        min: 0,
                        lineWidth: 1,
                        gridLineWidth: 1,
                        labels: {
                            format: '{value}',
                            enabled: true
                        },
                        title: {
                            text: 'kWh',
                            enabled: true
                        }
                    }],
                    tooltip: {
                        shared: true
                    },
                    legend: {

                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        borderWidth: 0,
                        showInLegend: false,
                        enabled: false

                    },
                    plotOptions: {
                        column: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        },
                    },

                    series: []
                };

                var dataEnergyMonth = data.dataEnergyMonth;
                if (Libs.isArrayData(dataEnergyMonth)) {
                    var categories = [], seriesData = [], series = [], xAxis = [];
                    dataEnergyMonth.map((item, index) => {
                        categories.push(parseInt(item.day));
                        seriesData.push(item.activeEnergy);
                    });

                    xAxis.push(
                        {
                            categories: categories,
                            crosshair: true
                        }
                    );

                    series.push(
                        {
                            name: '',
                            type: 'column',
                            data: seriesData,
                            tooltip: {
                                valueSuffix: ' kWh'
                            }
                        }
                    );

                    chartMonthOption.xAxis = xAxis;
                    chartMonthOption.series = series;
                }

                this.setState({
                    curItem: data,
                    chartMonthOption: chartMonthOption
                }, () => {
                    self.forceUpdate();
                });
            }
        }, false);

    }


    getDataReportYear() {
        var { hash_id, searchParam, chartOptionAlarm } = this.state, self = this;
        var { t } = this.props;
        if (Libs.isBlank(hash_id)) return;
        var params = Object.assign({}, searchParam);
        // if (searchParam.type == 1) {
        //     params.start_date = searchParam.start_date;
        //     params.end_date = searchParam.end_date;
        // }

        params.start_date = '01/' + searchParam.start_date;
        params.end_date = '01/' + searchParam.end_date;

        // params.start_date = '01/07/2021';
        // params.end_date = '30/10/2021';

        params.hash_id = hash_id;
        params.id_employee = this.employee.id_employee;
        params.id_language = this.employee.id_language;
        params.type = 'customer';

        ReportService.instance.getDataReportYear(params, data => {
            if (data) {
                var dataAlarms = data.dataAlarms;
                var chartOptionAlarm = {
                    credits: { enabled: false },
                    exporting: { enabled: false },
                    chart: {
                        zoomType: 'xy',
                        height: 340
                    },
                    title: {
                        text: null,

                    },
                    colors: ['#f5893b', '#66bc51', '#004ec3'],
                    xAxis: [],
                    yAxis: [{
                        min: 0,
                        lineWidth: 1,
                        gridLineWidth: 1,
                        labels: {
                            format: '{value}',
                            enabled: true
                        },
                        title: {
                            text: 'kWh',
                            enabled: false
                        }
                    }],
                    tooltip: {
                        shared: true
                    },
                    legend: {

                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        borderWidth: 0,
                        showInLegend: false

                    },

                    plotOptions: {
                        stacking: 'normal',
                        spline: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        },
                    },

                    series: []
                };

                var chartOption1 = {
                    credits: { enabled: false },
                    exporting: { enabled: false },
                    chart: {
                        zoomType: 'xy',
                        height: 340
                    },
                    title: {
                        text: null,

                    },
                    colors: ['#78c1f5', '#f58634'],
                    xAxis: [],
                    yAxis: [{
                        min: 0,
                        lineWidth: 1,
                        gridLineWidth: 1,
                        labels: {
                            format: '{value}',
                            enabled: true
                        },
                        title: {
                            text: t('report.energy_yield'),
                            enabled: false
                        }
                    }, { // Secondary yAxis

                        title: {
                            text: t('report.PVSyst_energy_yield'),
                            enabled: false
                        },
                        labels: {
                            format: '{value}',
                        },
                        opposite: true
                    }],
                    tooltip: {
                        // shared: true
                    },
                    legend: {

                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        borderWidth: 0,
                        showInLegend: false

                    },
                    plotOptions: {
                        stacking: 'normal',
                        line: {
                            dataLabels: {
                                enabled: true
                            },
                            enableMouseTracking: false
                        },

                        column: {
                            dataLabels: {
                                enabled: true,
                                rotation: 270,
                                x: 0,
                                y: 100,
                                style: {
                                    fontSize: "8px"
                                }
                            },
                            enableMouseTracking: false
                        },
                    },

                    series: []
                };

                var chartOption2 = {
                    credits: { enabled: false },
                    exporting: { enabled: false },
                    chart: {
                        zoomType: 'xy',
                        height: 340
                    },
                    title: {
                        text: null,

                    },
                    colors: ['#78c1f5', '#f58634'],
                    xAxis: [{
                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        crosshair: true
                    }],
                    yAxis: [{
                        min: 0,
                        lineWidth: 1,
                        gridLineWidth: 1,
                        labels: {
                            format: '{value}',
                            enabled: true
                        },
                        title: {
                            text: t('report.energy_yield'),
                            enabled: false
                        }
                    }, { // Secondary yAxis

                        title: {
                            text: t('report.PVSyst_energy_yield'),
                            enabled: false
                        },
                        labels: {
                            format: '{value}',
                        },
                        opposite: true
                    }],
                    tooltip: {
                        shared: true
                    },
                    legend: {

                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        borderWidth: 0,
                        showInLegend: false

                    },

                    series: []
                };

                if (Libs.isArrayData(dataAlarms)) {
                    var dataItem = [], categories = [], series = [], xAxis = [];
                    for (var i = 0, len = dataAlarms.length; i < len; i++) {
                        categories.push(dataAlarms[i].time_full);
                        dataItem.push([dataAlarms[i].time_full, dataAlarms[i].total_alarm]);
                    }

                    xAxis.push(
                        {
                            categories: categories,
                            crosshair: true
                        }
                    );

                    series.push({
                        name: 'Alarms',
                        type: 'spline',
                        data: dataItem,
                        tooltip: {
                            valueSuffix: ''
                        }
                    });

                    chartOptionAlarm.xAxis = xAxis;
                    chartOptionAlarm.series = series;
                } else {
                    chartOptionAlarm.xAxis = [];
                    chartOptionAlarm.series = [];
                    data.dataAlarms = [];
                }


                var dataEnergyMonth = data.dataEnergyMonth;
                var seriesRowET1 = [], seriesRow1 = [], series1 = [], categories1 = [], xAxis1 = [];
                var seriesRowET2 = [], seriesRow2 = [], series2 = [], categories2 = [], xAxis2 = [];
                if (Libs.isArrayData(dataEnergyMonth)) {

                    for (var i = 0, len = dataEnergyMonth.length; i < len; i++) {
                        categories1.push(dataEnergyMonth[i].time_full);
                        seriesRowET1.push([dataEnergyMonth[i].time_full, dataEnergyMonth[i].estimate_energy]);
                        seriesRow1.push([dataEnergyMonth[i].time_full, dataEnergyMonth[i].activeEnergy]);

                        categories2.push(dataEnergyMonth[i].time_full);
                        seriesRowET2.push([dataEnergyMonth[i].time_full, dataEnergyMonth[i].sum_estimate_energy == 0 ? null : dataEnergyMonth[i].sum_estimate_energy]);
                        seriesRow2.push([dataEnergyMonth[i].time_full, dataEnergyMonth[i].sum_activeEnergy == 0 ? null : dataEnergyMonth[i].sum_activeEnergy]);
                    }

                    xAxis1.push({
                        categories: categories1,
                        crosshair: true
                    });

                    series1.push({
                        name: t('report.PVSyst_energy_yield') +' (kWh)',
                        type: 'column',
                        zIndex: 1,
                        data: seriesRowET1,
                        tooltip: {
                            valueSuffix: 'kWh'
                        },
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#000',
                            align: 'center',
                            format: '{point.y}',
                            y: 20,
                            style: {
                                fontSize: '8px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    });

                    series1.push({
                        name: t('report.energy_yield') + ' (kWh)',
                        type: 'column',
                        yAxis: 0,
                        zIndex: 2,
                        data: seriesRow1,
                        tooltip: {
                            valueSuffix: ' kWh'
                        },
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#000',
                            align: 'center',
                            format: '{point.y}',
                            y: 20,
                            style: {
                                fontSize: '8px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    });
                    chartOption1.series = series1;
                    chartOption1.xAxis = xAxis1;

                    xAxis2.push({
                        categories: categories2,
                        crosshair: true
                    });

                    series2.push({
                        name: t('report.PVSyst_energy_yield') +' (kWh)',
                        type: 'column',
                        zIndex: 2,
                        data: seriesRowET2,
                        tooltip: {
                            valueSuffix: 'kWh'
                        },
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#000',
                            align: 'center',
                            format: '{point.y}',
                            y: 20,
                            style: {
                                fontSize: '8px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    });

                    series2.push({
                        name: t('report.energy_yield') +' (kWh)',
                        type: 'column',
                        yAxis: 0,
                        zIndex: 1,
                        data: seriesRow2,
                        tooltip: {
                            valueSuffix: ' kWh'
                        },
                        dataLabels: {
                            enabled: true,
                            rotation: -90,
                            color: '#000',
                            align: 'center',
                            format: '{point.y}',
                            y: 20,
                            style: {
                                fontSize: '8px',
                                fontFamily: 'Verdana, sans-serif'
                            }
                        }
                    });

                    chartOption2.series = series2;
                    chartOption2.xAxis = xAxis2;

                } else {
                    data.dataEnergyMonth = [];
                }
                this.setState({
                    curItem: data,
                    chartOptionAlarm: chartOptionAlarm,
                    chartOption1: chartOption1,
                    chartOption2: chartOption2
                }, () => {

                });
            }
        }, false);
    }




    handleDropdownChange = (item, name) => {
        var self = this;
        let searchParam = self.state.searchParam;

        if (Libs.isObjectEmpty(item)) {
            searchParam.type = '';
        } else {
            var value = item.value;
            searchParam[name] = value;
        }

        self.setState({
            searchParam: searchParam
        }, () => {
            if (searchParam.type == 1) {
                self.getDataReportYear();
            } else {
                self.getDataReportMonth();
            }

        });
    }


    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Reports)
export default HighOrderComponentTranslated;