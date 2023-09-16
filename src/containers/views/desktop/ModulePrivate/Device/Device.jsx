import React from 'react';
import RowItem from './RowItem';
import { Paging } from '../../../../../components/Paging';
import { RText } from '../../../../../components/Controls';
import Libs from '../../../../../utils/Libs';
import ViewDevicePopup from './ViewDevicePopup';
import OnOffPopup from './OnOffPopup';

import ControlCalendar from './ControlCalendar';

import RowItemOnOff from './RowItemOnOff';
import MenuPrivateProject from '../../../../common/MenuPrivateProject/MenuPrivateProject';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import './Device.scss';

export default function Device() {
    const { t } = this.props;
    var { curItem, dataList, allLanguage, searchParam, show_tab, tab_on_off, dataListInverter } = this.state;
    var RowItems = null;
    RowItems = dataList.map((item, index) => {
        return <RowItem
            key={'row_item_' + index}
            index={index}
            dataItem={item}
            actions={this.actions}
            onClickViewDevice={this.onClickViewDevice}
            onClickChartDevice={this.onClickChartDevice}
            viewAlertDevice={this.viewAlertDevice}
            t={t}
        />
    });


    var ViewDevicePopupLayout = this.state.viewDevice
        ? <ViewDevicePopup
            t={t}
            allLanguage={allLanguage}
            curItem={curItem}
            onClickCloseViewDevice={this.onClickCloseViewDevice}
            auth={this.props.auth}
            actions={this.actions}
            show_tab={show_tab}
            iso_code_language={this.employee.lang}
        /> : '';


        
        var OnOffPopupLayout = this.state.showOnOffPopup
        ? <OnOffPopup
            t={t}
            curItem={curItem}
            onClickCloseOnOff={this.onClickCloseOnOff}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';


        var ControlCalendarLayout = this.state.showControlCalendar
        ? <ControlCalendar
            t={t}
            curItem={curItem}
            onCloseControlCalender={this.onCloseControlCalender}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';

    return (
        <div className="devices">
            <MenuPrivateProject hash_id={this.state.hash_id} key={Math.random()} />
            {ViewDevicePopupLayout}
            {OnOffPopupLayout}
            {ControlCalendarLayout}

            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6">
                        <div className="device-tab-scada">
                            <ol>
                                <li onClick={this.setTabOnOff.bind(this, 1)} className={tab_on_off == 1 ? "active" : ""}>{t('device.title')}</li>
                                {/* <li onClick={this.setTabOnOff.bind(this, 2)} className={tab_on_off == 2 ? "active" : ""}>{t('device.control')}</li> */}
                            </ol>
                        </div>
                    </div>
                    {tab_on_off == 1 ?
                        <div className="col-md-6 text-end">
                            <ul>
                                <li><div onClick={this.downloadData.bind(this)} className="btn-download"><span className="icon-download"></span></div></li>
                                <li><div className="search" onClick={this.onSearch.bind(this)}><span className="icon icon-search"></span></div></li>
                            </ul>
                            <div className="date">
                                <CMSDatePicker
                                    value={searchParam.current_date}
                                    inputId="current_date"
                                    format="DD/MM/YYYY"
                                    dateFormat="dd/MM/yyyy"
                                    inputClass="form-control"
                                    inputName="current_date"
                                    maxDate={searchParam.max_date}
                                    handleChange={this.handleInputDateChange.bind(this)}
                                    maxLength={20}
                                    showIconCalendar={true}
                                />
                            </div>
                        </div>
                        : ""}

                </div>
            </div>

            {tab_on_off == 2 ?
                <div className="tab-control">
                    <ul className="row">
                        {Libs.isArrayData(dataListInverter) ?
                            dataListInverter.map((item, index) => {
                                return (
                                    <RowItemOnOff
                                        key={'row_item_' + index}
                                        index={index}
                                        dataItem={item}
                                        actions={this.actions}
                                        onClickOnOff={this.onClickOnOff}
                                        onClickControlCalender = {this.onClickControlCalender}
                                        // onClickChartDevice={this.onClickChartDevice}
                                        // viewAlertDevice={this.viewAlertDevice}
                                        t={t}
                                    />

                                    // <li key={index} className="col-md-3">
                                    //     <div className="inverter-item">
                                    //         <div className="title">{item.name}</div>
                                    //         <div className="iv-title">
                                    //             <div className="row">
                                    //                 <div className="col-md-6">
                                    //                     <img src="/inverter.png" className={item.status == 1 ? "on" : "off"} />
                                    //                 </div>
                                    //                 <div className="col-md-6">
                                    //                     <div className="mccb">MCCB</div>
                                    //                     <div onClick={this.onClickOnOff.bind(this, index)} className={item.status == 1 ? "action-on-off on" : "action-on-off off"}>
                                    //                         {item.status == 1 ? "ON" : "OFF"}
                                    //                     </div>
                                    //                 </div>
                                    //             </div>
                                    //         </div>

                                    //         <div className="iv-content">
                                    //             <div className="row">
                                    //                 <div className="col-md-4"><span>Power</span></div>
                                    //                 <div className="col-md-4 text-center"><span>{item.activePower}</span></div>
                                    //                 <div className="col-md-4 text-center"><span>kW</span></div>
                                    //             </div>

                                    //             <div className="row">
                                    //                 <div className="col-md-4"><span>PF</span></div>
                                    //                 <div className="col-md-4 text-center"><span>{item.powerFactor}</span></div>
                                    //                 <div className="col-md-4 text-center"><span></span></div>
                                    //             </div>

                                    //             <div className="row">
                                    //                 <div className="col-md-4"><span>Temp</span></div>
                                    //                 <div className="col-md-4 text-center"><span>{item.internalTemperature}</span></div>
                                    //                 <div className="col-md-4 text-center"><span>℃</span></div>
                                    //             </div>


                                    //             <div className="row">
                                    //                 <div className="col-md-4"><span>Efficiency</span></div>
                                    //                 <div className="col-md-4 text-center"><span>90</span></div>
                                    //                 <div className="col-md-4 text-center"><span>%</span></div>
                                    //             </div>
                                    //         </div>
                                    //     </div>
                                    // </li>
                                );
                            })
                            : ""}
                    </ul>
                </div> :
                <div className="main-device-tab">
                    {this.state.formSearch ?
                        <div className="form-search">
                            <div className="row">
                                <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                    <div className="mb-3">
                                        <RText label={t('common.id')}
                                            inputClass="form-control"
                                            inputId="id"
                                            inputName="id"
                                            value={searchParam.id}
                                            onChange={(e) => { this.handleSearchInputChange(e); }}
                                            maxLength={100} />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                    <div className="mb-3">
                                        <RText label={t('device.name')}
                                            inputClass="form-control"
                                            inputId="name"
                                            inputName="name"
                                            value={searchParam.name}
                                            onChange={(e) => { this.handleSearchInputChange(e); }}
                                            maxLength={100} />
                                    </div>
                                </div>

                                <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                                    <div className="mb-3">
                                        <button type="button" className="btn btn-search" onClick={this.handleSearch.bind(this)}> {t('common.search')} </button>
                                        <button type="button" className="btn btn-reset" onClick={this.onResetSearch.bind(this)}> {t('common.reset')} </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                        : ""}

                    <div className="data-view">
                        <div className="main-device-scroll">
                            <div className="main-header">
                                <div className="header-row">
                                    <div style={{ width: "100px" }} className="header-col width5"><p></p></div>
                                    <div style={{ width: "150px" }} onClick={e => this.onSort(e, 'name')} className={searchParam.sort_column === "name" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('device.device_name')}</p></div>
                                    <div style={{ width: "150px" }} onClick={e => this.onSort(e, 'model')} className={searchParam.sort_column === "model" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('device.model')}</p></div>
                                    <div style={{ width: "250px" }} onClick={e => this.onSort(e, 'serial_number')} className={searchParam.sort_column === "serial_number" ? "header-col width15 sorting " + searchParam.order_by : "header-col width15 sorting"}><p>{t('device.serial_number')}</p></div>
                                    <div style={{ width: "150px" }} className="header-col width10"><p>{t('device.id_device_type')}</p></div>
                                    <div style={{ width: "150px" }} className="header-col width10"><p>{t('device.power')}</p></div>
                                    <div style={{ width: "150px" }} className="header-col width10"><p>{t('device.energy')}</p></div>
                                    <div style={{ width: "150px" }} className="header-col width10"><p>{t('device.last_month')}</p></div>
                                    <div style={{ width: "150px" }} className="header-col width10"><p>{t('device.lifetime')}</p></div>
                                    <div style={{ width: "150px" }} className="header-col width10"><p>{t('device.last_updated')}</p></div>
                                    <div style={{ width: "150px" }} className="header-col width10 text-end"><strong>{t('common.action')}</strong></div>
                                </div>
                            </div>
                            <div className="main-body">
                                <div className="body">
                                    {!Libs.isBlank(RowItems) ? RowItems : <div className="data-empty">{t('common.data_empty')}</div>}
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="main-paging">
                        <Paging
                            total={parseInt(this.paging.total)}
                            current={(this.paging.current)}
                            currentInput={this.paging.currentInput}
                            inputChangedHandler={this.inputChangedHandler}
                            inputChangedEnter={this.inputChangedEnter}
                            inputChangedBlue={this.inputChangedBlue}
                            onClickReload={(e) => this.onClickReload.bind(this)}
                            onSelectPage={(index) => this.onSelectPage.bind(this, index)}>
                        </Paging>
                    </div>
                </div>
            }



        </div>
    );
};