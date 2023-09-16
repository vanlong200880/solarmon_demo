import React from 'react';
import Libs from '../../../../../../utils/Libs';
import './ChartAlarm.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import Constants from '../../../../../../utils/Constants';
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


export default function ChartAlarm() {
    const { t } = this.props;
    var { curItem, chartOption } = this.state;

    var totalFleet = null;
    var total = 0;
    if (Libs.isArrayData(curItem.totalFleetAlarm)) {
        totalFleet = curItem.totalFleetAlarm.map((item, index) => {
            total = total + item.total_alarm;
            return (
                <li key={index}>
                    <div className="item-alarm-sum">
                        <div className="row">
                            <div className="col-md-2 text-center"><img src={Constants.SERVER_DATA + "/" + item.thumbnail} width="20" /></div>
                            <div className="col-md-6"><strong>{item.name}</strong></div>
                            <div className="col-md-4 text-center"><p>{item.total_alarm}</p></div>
                        </div>
                    </div>
                </li>
            )
        })
    }

    var alarmOPened = curItem.alarmOPened;
    var alarmOPenedRender = null;
    if (Libs.isArrayData(alarmOPened)) {
        alarmOPenedRender = alarmOPened.map((item, index) => {
            return (
                <div key={index} className="body-row">
                    <div className="body-col width5"><p>
                    <img style={{ width: "20px", height: "20px" }} src={Constants.SERVER_DATA + "/" + item.thumbnail} alt={item.name} />
                    </p></div>
                    <div className="body-col width10"><p>{item.error_type_name}</p></div>
                    <div className="body-col width10"><p>{item.error_level_name}</p></div>
                    <div className="body-col width20"><p>Device: {item.name}</p></div>
                    <div className="body-col width25"><p>{Libs.isBlank(item.message) ? item.description : item.message}</p></div>
                    <div className="body-col width15"><p>{item.start_date_format}</p></div>
                    <div className="body-col width15">
                        <p>
                            {item.times_ago > 0 ? item.times_ago : ""}
                            {" " + t("common." + item.times_ago_unit)}
                            {item.times_ago > 1 && "s"}
                        </p>
                    </div>
                </div>
            );
        })
    }
    return (
        <div className="chart-alarm">
            <div className="chart-view-title">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2>{t('analytics.alarms')}</h2>
                    </div>
                    <div className="col-md-4">
                        <p>{t('analytics.last_updated')}: {curItem.current_day}</p>
                    </div>
                </div>
            </div>
            <div className="main-charting-view">
                <div className="row">
                    <div className="col-md-6">
                        <div className="box-item">
                            <div className="title">
                                <h2>{t('analytics.total_fleet_alerts')}</h2>
                            </div>

                            <div className="box-item-chart">
                                <ul>
                                    {totalFleet}
                                    <li>
                                        <div className="item-alarm-sum">
                                            <div className="row">
                                                <div className="col-md-2 text-center"></div>
                                                <div className="col-md-6"><strong>{t('analytics.total')}</strong></div>
                                                <div className="col-md-4 text-center"><p>{Libs.formatNum(total, '#,###')}</p></div>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="box-item">
                            <div className="title">

                                <div className="row">
                                    <div className="col-md-6"><h2>{t('analytics.alarm_last_12month')}</h2></div>
                                    <div className="col-md-6 text-end">
                                        <div className="download" onClick={this.downloadData.bind(this)}><span><var className="icon-download"></var></span></div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-item-chart">
                                {!Libs.isObjectEmpty(chartOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption} /> : ""}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12">
                        <div className="box-item">
                            <div className="title">
                                <h2>Open Alerts</h2>
                            </div>

                            <div className="box-item-chart">
                                <div className="main-alarm">
                                    <div className="main-header">
                                        <div className="header-row">
                                            <div className="header-col width5"><p></p></div>
                                            <div className="header-col width10"><p>{t('analytics.type')}</p></div>
                                            <div className="header-col width10"><p>{t('analytics.level')}</p></div>
                                            <div className="header-col width20"><p>{t('analytics.component')}</p></div>
                                            <div className="header-col width25"><p>{t('analytics.isuse')}</p></div>
                                            <div className="header-col width15"><p>{t('analytics.opened')}</p></div>
                                            <div className="header-col width15"><p>{t('analytics.open_period')}</p></div>
                                        </div>
                                    </div>

                                    <div className="main-body">
                                        <div className="body">
                                            {alarmOPenedRender}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};