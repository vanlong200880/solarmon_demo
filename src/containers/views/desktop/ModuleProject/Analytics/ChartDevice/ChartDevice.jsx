import React from 'react';
import Libs from '../../../../../../utils/Libs';
import FilterParam from '../FilterParam/FilterParam';
import CMSDatePicker from '../../../../../../components/CMSDatePicker/CMSDatePicker';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


export default function ChartDevice() {
    const { t } = this.props;
    var { curItem, dataParameter, dataListDevice, chartToolOption, chartParams, dataFilter, dataParameter } = this.state;


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
                itemTimes = <div>
                    <CMSDatePicker
                        value={chartParams.end_date}
                        inputId="today"
                        format="MM/DD/YYYY"
                        dateFormat="dd/MM/yyyy"
                        inputClass="form-control"
                        inputName="end_date"
                        maxDate={chartParams.max_date}
                        handleChange={this.handleInputDateChange.bind(this)}
                        maxLength={20}
                        showIconCalendar={true}
                    />
                </div>
                break;
            case '3_day':
                itemTimes = <div className="show-3day">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <CMSDatePicker
                                value={chartParams.start_date}
                                inputId="start_3day"
                                format="DD/MM/YYYY"
                                dateFormat="dd/MM/yyyy"
                                inputClass="form-control"
                                inputName="start_date"
                                maxDate={chartParams.start_max_date}
                                handleChange={this.handleInputDateChange.bind(this)}
                                maxLength={20}
                                showIconCalendar={false}
                            />
                        </div>
                        <div className="col-md-1 line-date text-center">
                            <span> - </span>
                        </div>
                        <div className="col-md-5">
                            <CMSDatePicker
                                value={chartParams.end_date}
                                inputId="end_3day"
                                format="DD/MM/YYYY"
                                dateFormat="dd/MM/yyyy"
                                inputClass="form-control"
                                inputName="end_date"
                                maxDate={chartParams.max_date}
                                handleChange={this.handleInputDateChange.bind(this)}
                                maxLength={20}
                                showIconCalendar={false}
                            />
                        </div>
                    </div>
                </div>
                break;
            case 'last_month':
            case 'this_month':
                itemTimes = <div>
                    <CMSDatePicker
                        value={chartParams.end_date}
                        inputId="this_month"
                        format="MM/yyyy"
                        dateFormat="MM/yyyy"
                        inputClass="form-control"
                        inputName="end_date"
                        maxDate={chartParams.max_date}
                        handleChange={this.handleInputDateChange.bind(this)}
                        maxLength={20}
                        showIconCalendar={true}
                        showMonthYearPicker={true}
                        showFullMonthYearPicker={true}
                        showTwoColumnMonthYearPicker={true}
                        showCustomMonth={false}
                    />
                </div>
                break;
            case '12_month':
                itemTimes = <div className="show-12month">
                    <div className="row">
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <CMSDatePicker
                                value={chartParams.start_date}
                                inputId="start_12month"
                                format="MM/yyyy"
                                dateFormat="MM/yyyy"
                                inputClass="form-control"
                                inputName="start_date"
                                maxDate={chartParams.max_start_date}
                                handleChange={this.handleInputDateChange.bind(this)}
                                maxLength={20}
                                showIconCalendar={false}
                                showCustomMonth={true}
                                showMonthYearPicker={true}
                                showFullMonthYearPicker={true}
                                showTwoColumnMonthYearPicker={true}
                            />
                        </div>
                        <div className="col-md-1 line-date text-center">
                            <span> - </span>
                        </div>
                        <div className="col-md-5">
                            <CMSDatePicker
                                value={chartParams.end_date}
                                inputId="end_12month"
                                format="MM/yyyy"
                                dateFormat="MM/yyyy"
                                inputClass="form-control"
                                inputName="end_date"
                                maxDate={chartParams.max_date}
                                handleChange={this.handleInputDateChange.bind(this)}
                                maxLength={20}
                                showIconCalendar={false}
                                showCustomMonth={true}
                                showMonthYearPicker={true}
                                showFullMonthYearPicker={true}
                                showTwoColumnMonthYearPicker={true}
                            />
                        </div>
                    </div>
                </div>
                break;
        }
    }


    return (
        <div className="chart-view">
            <FilterParam dataParameter={dataParameter} callBackLoadChart={this.callBackLoadChart} key={Math.random()} dataListDevice={dataListDevice} auth={this.props.auth} actions={this.props.actions} />
            <div id="main-chart-view" className="main-chart-view">
                <div className="box-chart">
                    <div className="chart-filter">
                        <div className="row">
                            <div className="col-xl-1 col-lg-1 col-md-1">
                                <div className="download" onClick={this.downloadData.bind(this)}><span><var className="icon-download"></var></span></div>
                            </div>
                            <div className="col-xl-11 col-lg-11 col-md-11">
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
                        {!Libs.isObjectEmpty(chartToolOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartToolOption} /> : ""}
                    </div>
                </div>
            </div>
        </div>
    );
};