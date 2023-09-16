import SummaryGroupJsx from './SummaryGroup.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import MainProjectService from '../../../../../../services/MainProjectService';

class SummaryGroup extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            curItem: {},
            searchParam: this.props.searchParam,
            chartOption: {}
        };

        this.jsxTemplate = SummaryGroupJsx;
    }

    componentDidMount() {
        this.getListPlantSummary();
    }

    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getListPlantSummary() {
        let self = this;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_employee = this.employee.id_employee;
        var chartOption = {
            credits: { enabled: false },
            exporting: { enabled: true },
            chart: {
                zoomType: 'xy'
            },
            title: {
                text: ''
            },

            colors: ['#66bc51', '#f5893b', '#004ec3'],
            xAxis: [{
                categories: [],
                crosshair: true
            }],
            yAxis: [{
                title: {
                    text: 'Today (kWh)'
                }
            }, {
                title: {
                    text: 'Lifetime (kWh)',
                },
                opposite: true
            }],
            tooltip: {
                shared: true
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                borderWidth: 0,
                showInLegend: false
            },


            series: [],
        };
        var seriesData1 = [], seriesData2 = [];
        var categories = [];
        var series = [];
        MainProjectService.instance.getListPlantSummary(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                for (var i = 0; i < data.length; i++) {

                    seriesData1.push(data[i].energy_today);
                    seriesData2.push(data[i].lifetime);
                    categories.push(data[i].name);
                }
                series.push(
                    {
                        name: "Today's Production",
                        type: 'column',
                        data: seriesData1,
                        tooltip: {
                            valueSuffix: ' kWh'
                        }
                    },
                );

                series.push(
                    {
                        name: 'Total Production',
                        type: 'spline',
                        yAxis: 1,
                        data: seriesData2,
                        tooltip: {
                            valueSuffix: ' kWh'
                        }
                    },
                );

                chartOption.series = series;
                chartOption.xAxis[0].categories = categories;
                self.setState({
                    dataListSummary: data,
                    chartOption: chartOption
                });
            } else {
                self.setState({
                    dataList: [],
                    chartOption: {}
                });
            }
        });
    }


    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(SummaryGroup)
export default HighOrderComponentTranslated;