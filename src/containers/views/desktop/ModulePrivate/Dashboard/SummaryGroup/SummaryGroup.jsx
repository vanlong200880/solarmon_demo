import React from 'react';
import Libs from '../../../../../../utils/Libs';
import './SummaryGroup.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


export default function SummaryGroup() {
    const { t } = this.props;
    var { chartOption, dataListSummary } = this.state;
    return (
        <div className="chart-alarm">
            <div className="data-chart">
            {!Libs.isObjectEmpty(chartOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption} /> : ""}
            </div>

            {Libs.isArrayData(dataListSummary) ?
                <div className="plant-sum">
                    <div className="row">
                        {dataListSummary.map((item, index) => {
                            return (
                                <div key={index} className="col-md-3">
                                    <div className="item">
                                        <h2>{item.name}</h2>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="sub-item">
                                                    <p>Today's Production</p>
                                                    <p className="today">{Libs.formatNum(item.energy_today, '#,###.##')} kWh</p>
                                                    <hr></hr>
                                                    <p>Total Production</p>
                                                    <p className="total"><strong>{Libs.formatElectricalUnit(item.lifetime, 'h')}</strong></p>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="sub-item">
                                                    <p>Today's Revenue</p>
                                                    <p className="total-money">{Libs.formatNum(item.today_revenue, '#.###')} VNĐ</p>
                                                    <hr></hr>
                                                    <p>Total Revenue</p>
                                                    <p><strong>{Libs.formatNum(item.lifetime_revenue, '#.###')} VNĐ</strong></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                : ""}
        </div>
    );
};