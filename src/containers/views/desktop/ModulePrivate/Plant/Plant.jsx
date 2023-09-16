import React from 'react';
import MenuPrivateProject from '../../../../common/MenuPrivateProject/MenuPrivateProject';
import Libs from '../../../../../utils/Libs';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import './Plant.scss';
import SingleLinePopup from './SingleLinePopup';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';
import bellcurve from "highcharts/modules/histogram-bellcurve";
import Constants from '../../../../../utils/Constants';
bellcurve(Highcharts);
if (typeof Highcharts === 'object') {
    HighchartsExporting(Highcharts)
}


export default function Plant() {
    const { t } = this.props;
    var { curItem, chartParams, dataFilter, chartOption } = this.state;
    var irradiance = Libs.isArrayData(curItem.irradiance) ? curItem.irradiance : [];
    var ambientEmperature = Libs.isArrayData(curItem.ambient_emperature) ? curItem.ambient_emperature : [];
    var humidity = Libs.isArrayData(curItem.humidity) ? curItem.humidity : [];
    var windSpeed = Libs.isArrayData(curItem.wind_speed) ? curItem.wind_speed : [];

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


    var LayoutSingleLine = this.state.single_line ?
        <SingleLinePopup
            onClickCloseSingleLine={this.onClickCloseSingleLine}
            auth={this.props.auth}
            actions={this.actions}
        />
        : "";

    return (
        <div className="plant">
            <MenuPrivateProject hash_id={this.state.hash_id} key={Math.random()} />
            {LayoutSingleLine}
            <div className="main-plant">
                <div className="row">
                    <div className="col-md-9">
                        <div className="plant-chart">
                            <div className="box-header">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="item power">
                                            <h2>{t('plant.power_now')} </h2>
                                            <p>{Libs.formatNum(curItem.power_now, '#,###.##')} kW</p>
                                            <h3>{t('plant.installed_power')} <strong>{curItem.installed_power}</strong></h3>
                                            <div className="item-icon">
                                                <img src="/power.png" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="item energy">
                                            <h2>{t('plant.today_production')}</h2>
                                            <p>{Libs.formatElectricalUnit(curItem.energy_today, 'h')}</p>
                                            <h3>{t('plant.total_production')} <strong>{Libs.formatElectricalUnit(curItem.lifetime, 'h')} </strong></h3>
                                            <div className="item-icon">
                                                <img src="/energy.png" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="item revenue">
                                            <h2>{t('plant.today_revenue')}</h2>
                                            <p>{Libs.formatNum(curItem.today_revenue, '#.###')} VNĐ</p>
                                            <h3>{t('plant.total_revenue')} <strong>{Libs.formatNum(curItem.total_revenue, '#.###')} VNĐ</strong></h3>
                                            <div className="item-icon">
                                                <img src="/revenue.png" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="list-device-status">
                                <h2>{t('plant.energy_flow')} 
                                {/* <span onClick={this.onClickShowSingleLine.bind(this)}><var className="icon-flow-tree"></var> Single line diagram</span> */}
                                </h2>
                                <div className={curItem.using_meter_consumption === 1 ? "main-device-status is-meter" : "main-device-status"}>
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="item">
                                                        <img src="/solar-panel.png" />
                                                        <div className={curItem.dc_power <= 0 ? "line-energy close" : "line-energy"}>
                                                            <span className="string">{Libs.formatNum(curItem.dc_power, '#,###.##')} kW</span>
                                                        </div>
                                                        <div className="text">PV array</div>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className="item">
                                                        {!Libs.isBlank(curItem.totalInverter) ?
                                                            <span className="sum-inverter">Running: {curItem.totalInverterOn}/{curItem.totalInverter}</span>
                                                            : ""}

                                                        <img src="/inverter.png" />
                                                        <div className={curItem.power_now <= 0 ? "line-energy close" : "line-energy"}>
                                                            <span>{Libs.formatNum(curItem.power_now, '#,###.##')} kW</span>
                                                            {curItem.power_now <= 0 ? <span className="close-line"><var className="icon-cancel-music"></var></span> : ""}


                                                        </div>
                                                        <div className="text">PV inverter</div>
                                                    </div>
                                                </div>

                                                <div className="col-md-4">
                                                    <div className={curItem.using_meter_consumption === 1 ? "item solar-meter" : "item"}>
                                                        <img src="/meter.png" />
                                                        <div className="two-line">
                                                            <div className={curItem.power_now <= 0 ? "line-energy close" : "line-energy"}>
                                                                <span>{Libs.formatNum((curItem.power_now - curItem.consumption < 0 ? 0 : curItem.power_now - curItem.consumption), '#,###.##')} kW</span>
                                                                {curItem.power_now <= 0 ? <span className="close-line"><var className="icon-cancel-music"></var></span> : ""}
                                                            </div>
                                                            {curItem.using_meter_consumption === 1 ?
                                                                <div className={curItem.consumption <= 0 ? "line-home close" : "line-home"}>
                                                                    <span>{Libs.formatNum(curItem.consumption, '#,###.##')} kW</span>
                                                                    {curItem.consumption <= 0 ? <span className="close-line"><var className="icon-cancel-music"></var></span> : ""}
                                                                </div>
                                                                : ""}

                                                        </div>
                                                        <div style={{ marginLeft: "-30px" }} className="text">Solar production meter</div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2">
                                            <div className="item power-gird">
                                                <img src="/power-gird.png" />
                                                <div className="text">Power Grid</div>
                                            </div>
                                            {curItem.using_meter_consumption === 1 ?
                                                <div className="item">
                                                    <img src="/consumption.png" />
                                                    <div className="text">Consumption</div>
                                                </div>
                                                : ""}

                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="box-chart">
                                <div className="chart-filter">
                                    <div className="row">
                                        <div className="col-xl-1 col-lg-1 col-md-1">
                                            <div onClick={this.downloadData.bind(this)} className="download"><span><var className="icon-download"></var></span></div>
                                        </div>
                                        <div className="col-xl-11 col-lg-11 col-md-11">
                                            <div className={chartParams.show_filter ? "filter on" : "filter"}>
                                                {chartParams.id_filter == 'today' || chartParams.id_filter == '3_day' ?
                                                    <div className="filter-raw">
                                                        <div className="main-raw">
                                                            <span onClick={this.changeViewMinute.bind(this, 1)} className={chartParams.data_send_time == 1 ? "active" : ""}>5 Minutes</span>
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


                                <div className="chart-content">
                                    {!Libs.isObjectEmpty(chartOption) ? <HighchartsReact highcharts={Highcharts} allowChartUpdate={true} immutable={true} options={chartOption} /> : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="site-info">
                            <div className="info">
                                <div className="info-img">
                                    {!Libs.isBlank(curItem.thumbnail) ? <img src={Constants.SERVER_DATA + "/" + curItem.thumbnail} /> :
                                        <img src="/thumbnail.jpg" />
                                    }
                                </div>
                                {!Libs.isBlank(curItem.name) ? <p><strong>{t('plant.project_name')} :</strong> {curItem.name}</p> : ""}
                                {!Libs.isBlank(curItem.site_name) ? <p><strong>{t('plant.site_name')}:</strong> {curItem.site_name}</p> : ""}
                                {!Libs.isBlank(curItem.address) ? <p><strong>{t('plant.address')}:</strong> {curItem.address}</p> : ""}
                                {!Libs.isBlank(curItem.installed_power) ? <p><strong>{t('plant.installed_power')}:</strong> {curItem.installed_power}</p> : ""}
                                {!Libs.isBlank(curItem.commisioning_date) ? <p><strong>{t('plant.commisioning_date')}:</strong> {curItem.commisioning_date}</p> : ""}
                                {!Libs.isBlank(curItem.instaled_date) ? <p><strong>{t('plant.instaled_date')}:</strong> {curItem.instaled_date}</p> : ""}
                                {!Libs.isBlank(curItem.last_updated) ? <p><strong>{t('plant.last_updated')}:</strong> {curItem.last_updated}</p> : ""}
                            </div>

                            <div className="list-item">
                                <ul>
                                    <li>
                                        <div className="item humidity">
                                            <div className="view-icon"><img src="/tree.png" /></div>
                                            <div className="content">
                                                <p className="text">Equivalent Trees Planted</p>
                                                <p className="value">{Libs.formatNum(((curItem.lifetime / 1000) * 0.0117), '#,###')}</p>
                                            </div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="item irradiance">
                                            <div className="view-icon"><img src="/co2.png" /></div>
                                            <div className="content">
                                                <p className="text">Tons of CO2 Avoided</p>
                                                <p className="value">{Libs.formatNum(((curItem.lifetime / 1000000) * 392), '#,###')}</p>
                                            </div>
                                        </div>
                                    </li>

                                    {Libs.isArrayData(ambientEmperature) ?
                                        ambientEmperature.map((v, k) => {
                                            return (
                                                <li key={"ambient_emperature_" + k}>
                                                    <div className="item temperature">
                                                        <div className="view-icon"><img src="/temperature.png" /></div>
                                                        <div className="content">
                                                            <p className="text">Ambient Temperature {ambientEmperature.length > 1 ? ++k : ''}</p>
                                                            <p className="value">{v.ambientTemp} ℃</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                        : ""}



                                    {Libs.isArrayData(irradiance) ?
                                        irradiance.map((v, k) => {
                                            return (
                                                <li key={"irradiance_" + k}>
                                                    <div className="item irradiance">
                                                        <div className="view-icon"><img src="/irradiance.png" /></div>
                                                        <div className="content">
                                                            <p className="text">Irradiance {irradiance.length > 1 ? ++k : ''}</p>
                                                            <p className="value">{v.irradiancePoA} W/m2</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                        : ""}

                                    {Libs.isArrayData(irradiance) ?
                                        irradiance.map((v, k) => {
                                            return (
                                                <li key={"temp_" + k}>
                                                    <div className="item temp">
                                                        <div className="view-icon"><img src="/temperature.png" /></div>
                                                        <div className="content">
                                                            <p className="text">Module Temp {irradiance.length > 1 ? ++k : ''}</p>
                                                            <p className="value">{v.panelTemp} ℃</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                        : ""}

                                    {Libs.isArrayData(humidity) ?
                                        humidity.map((v, k) => {
                                            return (
                                                <li key={"humidity_" + k}>
                                                    <div className="item humidity">
                                                        <div className="view-icon"><img src="/humidity.png" /></div>
                                                        <div className="content">
                                                            <p className="text">Humidity {irradiance.length > 1 ? ++k : ''}</p>
                                                            <p className="value">{v.panelTemp} %</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                        : ""}


                                    {Libs.isArrayData(windSpeed) ?
                                        windSpeed.map((v, k) => {
                                            return (
                                                <li key={"wind_" + k}>
                                                    <div className="item wind">
                                                        <div className="view-icon"><img src="/wind.png" /></div>
                                                        <div className="content">
                                                            <p className="text">Wind Speed {windSpeed.length > 1 ? ++k : ''}</p>
                                                            <p className="value">{v.panelTemp} km/h</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            );
                                        })
                                        : ""}



                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};