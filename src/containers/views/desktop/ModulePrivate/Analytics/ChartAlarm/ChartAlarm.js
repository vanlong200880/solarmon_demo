import React from 'react';
import ChartAlarmJsx from './ChartAlarm.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/Constants';
import MainAnalyticsService from '../../../../../../services/MainAnalyticsService';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';

class ChartAlarm extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hash_id: this.props.hash_id,
            curItem: {},
            dataTotalFleet: [],
            dataList: [],
            categories: [],
            series: [],
            chartOption: {},
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

        this.paging = {
            total: 0,
            current: 1,
            currentInput: 1
        };

        this.jsxTemplate = ChartAlarmJsx;
    }

    componentDidMount() {
        this.getDataChartProfile();
    }

    getDataChartProfile() {
        var { hash_id, curItem, categories, series } = this.state, self = this;
        if (Libs.isBlank(hash_id)) return;
        var params = {
            hash_id: hash_id,
            id_language: this.employee.id_language,
            id_employee: this.employee.id_employee,
            type: 'private'
        };

        MainAnalyticsService.instance.getChartAlarm(params, data => {
            if (data) {
                var alarmLast12Month = data.alarmLast12Month;
                if (Libs.isArrayData(alarmLast12Month)) {
                    var dataItem = [];
                    for (var i = 0, len = alarmLast12Month.length; i < len; i++) {
                        categories.push(alarmLast12Month[i].time_full);
                        dataItem.push([alarmLast12Month[i].time_full, alarmLast12Month[i].total_alarm]);
                    }

                    series.push({
                        name: 'Alarms - Last 12 months',
                        type: 'spline',
                        data: dataItem,
                        tooltip: {
                            valueSuffix: ''
                        }
                    })
                }
                self.setState({
                    curItem: data,
                    series: series,
                    categories: categories

                }, () => {
                    self.loadChartOption();
                });
            } else {
                this.setState({
                    curItem: curItem
                })
            }
        }, false);
    }

    loadChartOption() {
        var { categories, series } = this.state;
        var chartOption = {
            credits: { enabled: false },
            exporting: { enabled: false },
            chart: {
                zoomType: 'xy',
                height: 380
            },
            title: {
                text: null,

            },
            colors: ['#f5893b', '#66bc51', '#004ec3'],
            xAxis: {
                categories: categories,
                crosshair: true
            },
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

            series: series
        };

        this.setState({
            chartOption: chartOption
        })

    }

    downloadData = () => {
        var { curItem } = this.state;
        if (!Libs.isArrayData(curItem.alarmLast12Month)) return;
        var alarmLast12Month = curItem.alarmLast12Month;

        var dataExport = [];
        for (var i = 0, len = alarmLast12Month.length; i < len; i++) {
            dataExport.push({
                'Time': alarmLast12Month[i].time_full,
                'Project name': curItem.name,
                'Total': alarmLast12Month[i].total_alarm
            });
        }

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(dataExport, { skipHeader: false });
        const wb = {
            SheetNames: ['Alarms - Last 12 months'],
            Sheets: { 'Alarms - Last 12 months': ws }
        };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Export-alarm-12-month-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
    }


    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(ChartAlarm)
export default HighOrderComponentTranslated;