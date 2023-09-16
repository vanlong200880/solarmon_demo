import React from 'react';
import Libs from '../../../../../../utils/Libs';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


export default function ChartDeviceProfile() {
    // const { t } = this.props;
    var { curItem, performanceTodayOption, performance12MonthOption, performance30DaysOption, maxPowerOption } = this.state;

    return (
        <div className="chart-view">
            <div className="chart-view-title">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2>Current site Performance</h2>
                    </div>
                    <div className="col-md-4">
                        {curItem.current_day ?
                            <p>Last Updated: {curItem.current_day}</p>
                            : ""}

                    </div>
                </div>
            </div>
            <div className="main-charting-view">
                <div className="row">
                    <div className="col-md-6">
                        <div className="box-item">
                            <div className="title">
                                <div className="row">
                                    <div className="col-md-6"><h2>Performance - Today</h2></div>
                                    <div className="col-md-6 text-end">
                                        <div className="download" onClick={this.downloadDataPerformanceToday.bind(this)}><span><var className="icon-download"></var></span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-item-chart">
                                {!Libs.isObjectEmpty(performanceTodayOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={performanceTodayOption} /> : ""}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="box-item">
                            <div className="title">

                                <div className="row">
                                    <div className="col-md-6"><h2>Performance - Last 30 days</h2></div>
                                    <div className="col-md-6 text-end">
                                        <div className="download" onClick={this.downloadDataP30Days.bind(this)}><span><var className="icon-download"></var></span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-item-chart">
                                {!Libs.isObjectEmpty(performance30DaysOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={performance30DaysOption} /> : ""}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="box-item">
                            <div className="title">

                                <div className="row">
                                    <div className="col-md-6"><h2>Performance - Last 12 months</h2></div>
                                    <div className="col-md-6 text-end">
                                        <div className="download" onClick={this.downloadDataP12Month.bind(this)}><span><var className="icon-download"></var></span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-item-chart">
                                {!Libs.isObjectEmpty(performance12MonthOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={performance12MonthOption} /> : ""}
                            </div>
                        </div>
                    </div>



                    <div className="col-md-6">
                        <div className="box-item">
                            <div className="title">

                                <div className="row">
                                    <div className="col-md-6"><h2>Daily Max Power - Last 12 Months</h2></div>
                                    <div className="col-md-6 text-end">
                                        <div className="download" onClick={this.downloadDataMaxPower.bind(this)}><span><var className="icon-download"></var></span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-item-chart">
                                {!Libs.isObjectEmpty(maxPowerOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={maxPowerOption} /> : ""}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};