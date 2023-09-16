import React from 'react';
// import RowItem from './RowItem';
import Libs from '../../../../../../utils/Libs';
import moment from 'moment';
import FormReactSelect from '../../../../../../components/FormReactSelect';
import './ChartDeviceDiagnostics.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


export default function ChartDeviceDiagnostics() {
    const { t } = this.props;
    var { curItem, dataList, chartParams, dataFilter, chartOption, dataDiagnostics, dataStringIndex, dataDevice, dataParameter } = this.state;


    var itemFilters = null;
    if (Libs.isArrayData(dataFilter)) {
        itemFilters = dataFilter.map((item, index) => {
            return <a key={index} onClick={this.onClickFilter.bind(this, item.id)} className={item.id == chartParams.id_filter ? "item active" : "item"}>{item.text}</a>
        })
    }

    var itemTimes = null;
    if (!Libs.isObjectEmpty(chartParams)) {
        switch (chartParams.id_filter) {
            case 'today':
                itemTimes = <p>
                    <span onClick={this.onClickPrev.bind(this)} className="icon icon-angle-left"></span>
                    <label className="start-date">{moment(chartParams.end_date).format('ll')}</label>
                    <span onClick={chartParams.showNextBtn ? this.onClickNext.bind(this) : null} className={!chartParams.showNextBtn ? "icon icon-angle-right disabled" : "icon icon-angle-right"}></span>
                </p>
                break;
            case '12_month':
            case 'last_month':
            case 'this_month':
                itemTimes = <p>
                    <span onClick={this.onClickPrev.bind(this)} className="icon icon-angle-left"></span>
                    <label className="start-date">{moment(chartParams.start_date).format('ll')}</label>
                    <label className="pad-line">-</label>
                    <label className="start-date">{moment(chartParams.end_date).format('ll')}</label>
                    <span onClick={chartParams.showNextBtn ? this.onClickNext.bind(this) : null} className={!chartParams.showNextBtn ? "icon icon-angle-right disabled" : "icon icon-angle-right"}></span>
                </p>
                break;

            case 'lifetime':
                itemTimes = <p>
                    <span className="icon icon-angle-left disabled"></span>
                    <label className="start-date">{moment(chartParams.start_date).format('ll')}</label>
                    <label className="pad-line">-</label>
                    <label className="start-date">{moment(chartParams.end_date).format('ll')}</label>
                    <span className="icon icon-angle-right disabled"></span>
                </p>
                break;
        }
    }


    return (
        <div className="chart-view chart-diagnostics">
            <div className="main-chart-view">
                <div className="box-chart">
                    <div className="chart-filter">
                        <div className="row">
                            <div className="col-xl-2 col-lg-2 col-md-2">
                                <FormReactSelect
                                    instanceId="type_diagnostics"
                                    className="statype_diagnosticsus"
                                    name="type_diagnostics"
                                    value={dataDiagnostics.filter(function (item) { return item.id === curItem.type_diagnostics })}
                                    onChange={(e) => { this.handleDropdownChange(e, 'type_diagnostics'); }}
                                    optionList={dataDiagnostics}
                                    placeHolder={t('common.choose')}
                                />


                                {/* <div className="download"><span><var className="icon-download"></var> Download</span></div> */}
                            </div>

                            <div className="col-xl-2 col-lg-2 col-md-2">
                                <FormReactSelect
                                    instanceId="type_string_index"
                                    className="type_string_index"
                                    name="type_string_index"
                                    value={dataStringIndex.filter(function (item) { return item.id === curItem.type_string_index })}
                                    onChange={(e) => { this.handleDropdownChange(e, 'type_string_index'); }}
                                    optionList={dataStringIndex}
                                    placeHolder={t('common.choose')}
                                />


                                {/* <div className="download"><span><var className="icon-download"></var> Download</span></div> */}
                            </div>

                            <div className="col-xl-8 col-lg-8 col-md-8">
                                <div className={chartParams.show_filter ? "filter on" : "filter"}>
                                    {chartParams.id_filter == 'today' ?
                                        <div className="filter-raw">
                                            <div className="main-raw">
                                                <span onClick={curItem.data_send_time != 2 ? this.changeViewMinute.bind(this, 1) : ''} className={curItem.data_send_time != 1 ? "disabled" : (chartParams.data_send_time == 1 ? "active" : "")}>5 Minutes</span>
                                                <span onClick={this.changeViewMinute.bind(this, 2)} className={chartParams.data_send_time == 2 ? "active" : ""}>15 Minutes</span>
                                                <span onClick={this.changeViewMinute.bind(this, 3)} className={chartParams.data_send_time == 3 ? "active" : ""}>1 hour</span>
                                            </div>
                                        </div>
                                        : ""}

                                    <a ref={this.wrapperRef} onClick={this.onClickShowFilter.bind(this)} className="view">{chartParams.text_filter} <span className="icon-down-open-big"></span></a>
                                    <div className="filter-dropdown">
                                        {itemFilters}
                                    </div>
                                </div>

                                <div className="time-filter">
                                    {itemTimes}
                                </div>


                            </div>
                        </div>
                    </div>


                    <div ref={this.myRef} className="chart-content">
                        {!Libs.isObjectEmpty(chartOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption} /> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};