import React from 'react';
import FormReactSelect from '../../../../../components/FormReactSelect';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import Libs from '../../../../../utils/Libs';
import Constants from '../../../../../utils/Constants';
import './Reports.scss';
import MenuPrivateProject from '../../../../common/MenuPrivateProject/MenuPrivateProject';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import ReactToPrint from 'react-to-print';
import ChartAlarm from '../Analytics/ChartAlarm/ChartAlarm';


bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


export default function Reports() {
    const { t } = this.props;
    var { curItem, searchParam, chartMonthOption, dataType, chartOptionAlarm, chartOption1, chartOption2 } = this.state;
    var totalFeetAlarms = curItem.totalFeetAlarms;
    var dataAlarms = curItem.dataAlarms;

    var rowTotalFeetAlarms = null;
    var totalAlarms = 0;
    if (Libs.isArrayData(totalFeetAlarms)) {
        rowTotalFeetAlarms = totalFeetAlarms.map((item, index) => {
            totalAlarms = totalAlarms + item.total_alarm;
            return (
                <tr key={index}>
                    <td className="text-center">
                        <img src={Constants.SERVER_DATA + "/" + item.thumbnail} width="20" />
                    </td>
                    <td><strong>{item.name}</strong></td>
                    <td><p className="text-center">{item.total_alarm}</p></td>
                </tr>
            )
        })
    }



    var dataEneryRender = [];
    var dataRenderDay = [];

    var dataEneryRender1 = [];
    var dataRenderDay1 = [];

    var dataEnergyMonth = curItem.dataEnergyMonth;
    if (Libs.isArrayData(dataEnergyMonth)) {
        for (var i = 0; i < dataEnergyMonth.length; i++) {
            if (i < 15) {
                dataRenderDay.push(
                    <th key={i}>{dataEnergyMonth[i].day}</th>
                );
                dataEneryRender.push(
                    <td key={i}>{dataEnergyMonth[i].activeEnergy}</td>
                );
            } else {
                dataRenderDay1.push(
                    <th key={i}>{dataEnergyMonth[i].day}</th>
                );

                dataEneryRender1.push(
                    <td key={i}>{dataEnergyMonth[i].activeEnergy}</td>
                );
            }
        };


        // dataRenderDay = dataEnergyMonth.map((item, index) => {
        //     if(index < 15){
        //         return (
        //             <th key={index}>{item.day}</th>
        //         );
        //     }

        // });

        // dataEneryRender = dataEnergyMonth.map((item, index) => {
        //     return (
        //         <td key={index}>{item.activeEnergy}</td>
        //     );
        // })
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
                    <div className="body-col width25"><p>{item.name}</p></div>
                    <div className="body-col width25"><p>{Libs.isBlank(item.message) ? item.description : item.message}</p></div>
                    <div className="body-col width15"><p>{item.start_date_format}</p></div>
                    <div className="body-col width10"><p>{item.status_name}</p></div>
                </div>
            );
        })
    }


    var dataEnergyMonth = curItem.dataEnergyMonth;
    var dataEnergyMonthRender = null;
    var t1 = 0, t2 = 0, t3 = 0, t4 = 0;
    if (Libs.isArrayData(dataEnergyMonth)) {
        dataEnergyMonthRender = dataEnergyMonth.map((item, index) => {
            var pr = item.activeEnergy / item.estimate_energy;
            t1 = t1 + item.estimate_energy;
            t2 = t2 + item.activeEnergy;
            t3 = t3 + item.diff_energy;
            t4 = t4 + pr;

            return (
                <tr key={index}>
                    <td><p className="text-start">{item.time_full}</p></td>
                    <td><p className="bg-first text-center">{Libs.formatNum(item.estimate_energy, '#,###')}</p></td>
                    <td><p className="bg-two text-center">{Libs.formatNum(item.activeEnergy, '#,###')}</p></td>
                    <td><p className={item.diff_energy < 0 ? "error text-center" : "text-center"}>{Libs.formatNum(item.diff_energy, '#,###')}</p></td>
                    <td><p className={item.diff_percent < 0 ? "error text-center" : "text-center"}>{Libs.formatNum(item.diff_percent, '#,###')}</p></td>
                    <td><p className={pr < 0 ? "error text-center" : "text-center"}>{Libs.formatNum(pr, '#,###.##')}</p></td>
                </tr>
            )
        })
    }

    var dataEnergyMonthRenderET = null;
    var m1 = 0, m2 = 0, m3 = 0;
    if (Libs.isArrayData(dataEnergyMonth)) {
        dataEnergyMonthRenderET = dataEnergyMonth.map((item, index) => {
            m1 = !Libs.isBlank(item.sum_estimate_energy) && item.sum_estimate_energy > 0 ? item.sum_estimate_energy : m1;
            m2 = !Libs.isBlank(item.sum_activeEnergy) && item.sum_activeEnergy > 0 ? item.sum_activeEnergy : m2;
            m3 = !Libs.isBlank(item.sum_diff_energy) && item.sum_diff_energy != 0 ? item.sum_diff_energy : m3;

            return (
                <tr key={index}>
                    <td><p className="text-start">{item.time_full}</p></td>
                    <td><p className="bg-first text-center">{Libs.formatNum(item.sum_estimate_energy, '#,###')}</p></td>
                    <td><p className="bg-two text-center">{Libs.formatNum(item.sum_activeEnergy, '#,###')}</p></td>
                    <td><p className={item.sum_diff_energy < 0 ? "error text-center" : "text-center"}>{Libs.formatNum(item.sum_diff_energy, '#,###')}</p></td>
                    <td><p className={item.sum_diff_percent < 0 ? "error text-center" : "text-center"}>{Libs.formatNum(item.sum_diff_percent, '#,###')}</p></td>
                </tr>
            )
        })
    }

    const getPageLandscape = () => {
        return `@media print { @page { size: ${"landscape"} }}`;
    };

    return (
        <div className="reports">
            {searchParam.type == 2 ? <style>{getPageLandscape()}</style> : ""}

            <MenuPrivateProject hash_id={this.state.hash_id} key={Math.random(0)} />
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-2">
                        <FormReactSelect
                            instanceId="type"
                            className="type"
                            name="type"
                            value={dataType.filter(function (item) { return item.id === searchParam.type })}
                            onChange={(e) => { this.handleDropdownChange(e, 'type'); }}
                            optionList={dataType}
                            placeHolder={t('common.choose')}
                        />
                    </div>

                    <div className="col-md-10">
                        {searchParam.type == 3 ? "" :
                            <div className="report-filter">
                                <div className="row">

                                    <div className="col-md-9">
                                        <div className="row">
                                            {searchParam.type == 1 ?
                                                <div className="col-md-3">
                                                    <CMSDatePicker
                                                        key={Math.random()}
                                                        value={searchParam.start_date}
                                                        inputId="start_date"
                                                        format="MM/yyyy"
                                                        dateFormat="MM/yyyy"
                                                        inputClass="form-control"
                                                        inputName="start_date"
                                                        maxDate={searchParam.max_date}
                                                        handleChange={this.handleInputDateChange.bind(this)}
                                                        maxLength={20}
                                                        showIconCalendar={true}
                                                        showMonthYearPicker={true}
                                                        showFullMonthYearPicker={true}
                                                        showTwoColumnMonthYearPicker={true}
                                                        showCustomMonth={false}
                                                    />
                                                </div>
                                                : ""}




                                            {searchParam.type == 1 ?
                                                <div className="col-md-1 text-center">
                                                    <p className="to">to</p>
                                                </div>
                                                : ""}


                                            <div className="col-md-3">
                                                {searchParam.type == 1 ?
                                                    <CMSDatePicker
                                                        key={Math.random()}
                                                        value={searchParam.end_date}
                                                        inputId="end_date"
                                                        format="MM/yyyy"
                                                        dateFormat="MM/yyyy"
                                                        inputClass="form-control"
                                                        inputName="end_date"
                                                        maxDate={searchParam.max_date}
                                                        handleChange={this.handleInputDateChange.bind(this)}
                                                        maxLength={20}
                                                        showIconCalendar={true}
                                                        showMonthYearPicker={true}
                                                        showFullMonthYearPicker={true}
                                                        showTwoColumnMonthYearPicker={true}
                                                        showCustomMonth={false}
                                                    />
                                                    :
                                                    <CMSDatePicker
                                                        key={Math.random()}
                                                        value={searchParam.end_date}
                                                        inputId="end_date"
                                                        format="MM/yyyy"
                                                        dateFormat="MM/yyyy"
                                                        inputClass="form-control"
                                                        inputName="end_date"
                                                        maxDate={searchParam.max_date}
                                                        handleChange={this.handleInputDateChange.bind(this)}
                                                        maxLength={20}
                                                        showIconCalendar={true}
                                                        showMonthYearPicker={true}
                                                        showFullMonthYearPicker={true}
                                                        showTwoColumnMonthYearPicker={true}
                                                        showCustomMonth={false}
                                                    />
                                                }

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">

                                        <ReactToPrint
                                            trigger={() => {
                                                return (
                                                    <ul>
                                                        <li><span className="icon-print"></span> Print</li>
                                                        <li><span className="icon-file-text-o"></span> Pdf</li>
                                                    </ul>
                                                );
                                            }}
                                            onBeforePrint={this.onBeforePrint}
                                            onAfterPrint={this.onAfterPrint}
                                            content={() => this.componentRef}
                                        />
                                    </div>
                                </div>
                            </div>
                        }


                    </div>

                </div>
            </div>
            {searchParam.type == 3 ?
                <ChartAlarm key={Math.random()} hash_id={this.state.hash_id} t={t} curItem={curItem} auth={this.props.auth} actions={this.actions} />
                :
                <div className="main-export" ref={el => (this.componentRef = el)}>

                    <div className="report-header">
                        <table className="table table-borderless">
                            <tbody>
                                <tr>
                                    <td rowSpan="3"><img src="/logo.png" style={{ width: "200px" }} alt="Logo" /></td>
                                    <td><h1>{curItem.site_name}</h1></td>
                                </tr>

                                <tr>
                                    <td><h2>Project: {curItem.name}</h2></td>
                                </tr>

                                <tr>
                                    <td><p>Address: {curItem.address}</p></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {searchParam.type == 1 ?
                        <div className="export-year" >
                            <div className="report-header-info">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "60%" }}>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text"> {t('report.estimation_data')}</p>
                                                            </td>
                                                            <td>
                                                                <p className="value">PVSYST</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">{t('report.report_data')}</p>
                                                            </td>
                                                            <td>
                                                                <p className="value" style={{ borderTop: "none" }}>Solarmon</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>

                                                </table>

                                                <table className="table" style={{ marginTop: "15px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">{t('report.report_period')}</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double">
                                                                    <span style={{ borderRight: "1px solid #DDD" }}>{curItem.start_string}</span>
                                                                    <span>{curItem.end_string}</span></p>
                                                            </td>
                                                        </tr>


                                                    </tbody>
                                                </table>

                                                <table className="table" style={{ marginTop: "15px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">{t('report.reporter')}</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px" }}>{this.employee.full_name}</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">{t('report.report_time')} </p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ borderTop: "none", textAlign: "left", paddingLeft: "5px" }}> {curItem.current_day}</p>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>

                                            </td>
                                            <td style={{ width: "40%", paddingLeft: "30px" }}>

                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Installed power:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px" }}>{curItem.installed_power}</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Commissioning date:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{curItem.commisioning_date}</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Energy start of year:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{Libs.formatNum(curItem.min_activeEnergy, '#,###.#')} kWh</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Energy end of year:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{Libs.formatNum(curItem.max_activeEnergy, '#,###.#')} kWh</p>
                                                            </td>
                                                        </tr>


                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Energy yield in year:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{Libs.formatNum(curItem.energyMonth, '#,###')} kWh</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Revenue:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{curItem.revenue} VNĐ</p>
                                                            </td>
                                                        </tr>



                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">PR:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{Libs.formatNum(((t4 / 12)), '#,###.##')}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>


                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>


                            <div className="report-year-content">
                                <div className="section-table">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="title">{t('report.monthly_engery_yield')}</div>
                                            <div className="content">
                                                <table className="table table-bordered">
                                                    <thead className="table-light">
                                                        <tr>
                                                            <th></th>
                                                            <th>

                                                                <p className="text-center">{t('report.PVSyst_energy_yield')}</p>
                                                                <p className="text-center">(kWh)</p>
                                                            </th>
                                                            <th>
                                                                <p className="text-center">{t('report.energy_yield')}</p>
                                                                <p className="text-center">(kWh)</p>
                                                            </th>
                                                            <th>
                                                                <p className="text-center">{t('report.diff_Energy')}</p>
                                                                <p className="text-center">(kWh)</p>
                                                            </th>
                                                            <th>
                                                                <p className="text-center">{t('report.diff_Energy')}</p>
                                                                <p className="text-center">(%)</p>
                                                            </th>
                                                            <th>
                                                                <p className="text-center">PR</p>
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {dataEnergyMonthRender}

                                                    </tbody>
                                                    <tfoot>
                                                        <tr>
                                                            <td><p className="text-center"><strong>{t('report.total')}</strong></p></td>
                                                            <td><p className="text-center"><strong>{Libs.formatNum(t1, '#,###')}</strong></p></td>
                                                            <td><p className="text-center"><strong>{Libs.formatNum(t2, '#,###')}</strong></p></td>
                                                            <td><p className="text-center"><strong>{Libs.formatNum(t2 - t1, '#,###')}</strong></p></td>
                                                            <td><p className="text-center"><strong>{Libs.formatNum(((t3 / t2) * 100), '#,###')}</strong></p></td>
                                                            <td><p className="text-center"><strong>{Libs.formatNum(((t4 / 12)), '#,###.##')}</strong></p></td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="page-break" />
                                            <div className="main-break-page">
                                                <div className="title">{t('report.monthly_accumulated')}</div>
                                                <div className="content">
                                                    <table className="table table-bordered">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th></th>
                                                                <th>
                                                                    <p className="text-center">{t('report.PVSyst_energy_yield')}</p>
                                                                    <p className="text-center">(kWh)</p>
                                                                </th>
                                                                <th>
                                                                    <p className="text-center">{t('report.energy_yield')}</p>
                                                                    <p className="text-center">(kWh)</p>
                                                                </th>
                                                                <th>
                                                                    <p className="text-center">{t('report.diff_Energy')}</p>
                                                                    <p className="text-center">(kWh)</p>
                                                                </th>
                                                                <th>
                                                                    <p className="text-center">{t('report.diff_Energy')}</p>
                                                                    <p className="text-center">(%)</p>
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {dataEnergyMonthRenderET}

                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <td><p className="text-center"><strong>{t('report.total')}</strong></p></td>
                                                                <td><p className="text-center"><strong>{Libs.formatNum(m1, '#,###')}</strong></p></td>
                                                                <td><p className="text-center"><strong>{Libs.formatNum(m2, '#,###')}</strong></p></td>
                                                                <td><p className="text-center"><strong>{Libs.formatNum(m2 - m1, '#,###')}</strong></p></td>
                                                                <td><p className="text-center"><strong>{Libs.formatNum(((m3 / m2) * 100), '#,###')}</strong></p></td>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>


                                <div className="section-chart">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="report-chart-section">
                                                <div className="title">{t('report.measured_vs_calculated')}</div>
                                                <div className="content-chart">
                                                    {!Libs.isObjectEmpty(chartOption1) && Libs.isArrayData(dataEnergyMonth) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption1} /> : ""}
                                                </div>
                                            </div>
                                            <div className="page-break" />
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main-break-page">
                                                <div className="report-chart-section">
                                                    <div className="title">{t('report.monthly_accumulated_chart')}</div>
                                                    <div className="content-chart">
                                                        {!Libs.isObjectEmpty(chartOption2) && Libs.isArrayData(dataEnergyMonth) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption2} /> : ""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="main-break-page">
                                                <div className="report-chart-section">
                                                    <div className="title">{t('report.chart_error')}</div>
                                                    <div className="content-chart">
                                                        {!Libs.isObjectEmpty(chartOptionAlarm) && Libs.isArrayData(dataAlarms) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOptionAlarm} /> : ""}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="report-chart-section">
                                                <div className="title">Total Fleet Alerts</div>
                                                <div className="box-item-chart">
                                                    <div className="item-alarm-sum">
                                                        <table className="table">
                                                            <tbody>
                                                                {rowTotalFeetAlarms}
                                                                <tr>
                                                                    <td></td>
                                                                    <td><strong>Total</strong></td>
                                                                    <td><p className="text-center">{totalAlarms}</p></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>

                        </div>
                        :
                        <div className="export-month">
                            <div className="report-header-info">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td style={{ width: "50%" }}>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">{t('report.estimation_data')}</p>
                                                            </td>
                                                            <td>
                                                                <p className="value">PVSYST</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">{t('report.report_data')}</p>
                                                            </td>
                                                            <td>
                                                                <p className="value" style={{ borderTop: "none" }}>Solarmon</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>

                                                </table>

                                                <table className="table" style={{ marginTop: "15px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">{t('report.report_month')}</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double">
                                                                    <span style={{ borderRight: "1px solid #DDD" }}>{curItem.month_string}</span>
                                                                    <span>{curItem.year}</span></p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <table className="table" style={{ marginTop: "15px" }}>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">{t('report.reporter')}</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px" }}>{this.employee.full_name}</p>
                                                            </td>
                                                        </tr>


                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">{t('report.report_time')} </p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ borderTop: "none", textAlign: "left", paddingLeft: "5px" }}> {curItem.current_day}</p>
                                                            </td>
                                                        </tr>

                                                    </tbody>
                                                </table>

                                            </td>
                                            <td style={{ width: "50%" }}>
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Installed power:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px" }}>{curItem.installed_power}</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Commissioning date:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{curItem.commisioning_date}</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Energy start of month:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{Libs.formatNum(curItem.min_activeEnergy, '#,###.#')} kWh</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Energy end of month:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{Libs.formatNum(curItem.max_activeEnergy, '#,###.#')} kWh</p>
                                                            </td>
                                                        </tr>


                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Energy yield in month:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{Libs.formatNum(curItem.energyMonth, '#,###.#')} kWh</p>
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">Revenue in month:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{curItem.revenue} VNĐ</p>
                                                            </td>
                                                        </tr>



                                                        <tr>
                                                            <td style={{ width: "200px" }}>
                                                                <p className="text">PR:</p>
                                                            </td>
                                                            <td>
                                                                <p className="value double" style={{ textAlign: "left", paddingLeft: "5px", borderTop: "none" }}>{Libs.formatNum(((t4 / 12)), '#,###.##')}</p>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>



                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="report-month-content">
                                <div className="title">
                                    {t('report.energy_yield_today')}
                                </div>

                                <div className="chart-month" style={{ width: this.state.statusPrint ? "1200px" : "100%" }}>
                                    {!Libs.isObjectEmpty(chartMonthOption) && Libs.isArrayData(curItem.dataEnergyMonth) ? <HighchartsReact key={Math.random()} highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartMonthOption} /> : ""}
                                </div>

                                <div className="month-table">
                                    <div className="table-responsive">
                                        <table className="table table-bordered">
                                            <thead className="table-light">
                                                <tr>
                                                    <th colSpan="32"><p className="text-center">{curItem.month_year}</p></th>
                                                </tr>
                                                <tr>
                                                    <th>Day</th>
                                                    {dataRenderDay}
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td>kWh</td>
                                                    {dataEneryRender}
                                                </tr>
                                            </tbody>


                                            <thead className="table-light">
                                                <tr>
                                                    <th>Day</th>
                                                    {dataRenderDay1}
                                                </tr>
                                            </thead>

                                            <tbody>
                                                <tr>
                                                    <td>kWh</td>
                                                    {dataEneryRender1}
                                                </tr>
                                            </tbody>

                                        </table>
                                    </div>
                                </div>



                                <div className="report-alarm-open">
                                    <div className="title">
                                        <h2>Alarms</h2>
                                    </div>

                                    <div className="box-item-chart">
                                        <div className="main-alarm">
                                            <div className="main-header">
                                                <div className="header-row">
                                                    <div className="header-col width5"><p></p></div>
                                                    <div className="header-col width10"><p>Type</p></div>
                                                    <div className="header-col width10"><p>Level</p></div>
                                                    <div className="header-col width25"><p>Component</p></div>
                                                    <div className="header-col width25"><p>Issue</p></div>
                                                    <div className="header-col width15"><p>Opened</p></div>
                                                    <div className="header-col width10"><p>Status</p></div>
                                                </div>
                                            </div>

                                            <div className="main-body">
                                                <div className="body">
                                                    {!Libs.isBlank(alarmOPenedRender) ? alarmOPenedRender : <div className="data-empty">{t('common.data_empty')}</div>}
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    }
                </div>
            }

        </div>
    );
};