import React from 'react';
import RowItem from './RowItem';
import { Paging } from '../../../../../components/Paging';
import { RText } from '../../../../../components/Controls';
import Libs from '../../../../../utils/Libs';
import ViewDevicePopup from './ViewDevicePopup';
import MenuProject from '../../../../common/MenuProject/MenuProject';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import './Device.scss';

export default function Device() {
    const { t } = this.props;
    var { curItem, dataList, allLanguage, searchParam, show_tab } = this.state;
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

    return (
        <div className="devices">
            <MenuProject hash_id={this.state.hash_id} key = {Math.random()} />
            {ViewDevicePopupLayout}
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6"><h2>{t('device.title')}</h2>
                    </div>
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
                </div>
            </div>

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
                            <div style={{width: "100px"}} className="header-col width5"><p></p></div>
                            <div style={{width: "150px"}} onClick={e => this.onSort(e, 'name')} className={searchParam.sort_column === "name" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('device.device_name')}</p></div>
                            <div style={{width: "150px"}} onClick={e => this.onSort(e, 'model')} className={searchParam.sort_column === "model" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('device.model')}</p></div>
                            <div style={{width: "250px"}} onClick={e => this.onSort(e, 'serial_number')} className={searchParam.sort_column === "serial_number" ? "header-col width15 sorting " + searchParam.order_by : "header-col width15 sorting"}><p>{t('device.serial_number')}</p></div>
                            <div  style={{width: "150px"}} className="header-col width10"><p>{t('device.id_device_type')}</p></div>
                            <div style={{width: "150px"}} className="header-col width10"><p>{t('device.power')}</p></div>
                            <div style={{width: "150px"}} className="header-col width10"><p>{t('device.energy')}</p></div>
                            <div style={{width: "150px"}} className="header-col width10"><p>{t('device.last_month')}</p></div>
                            <div style={{width: "150px"}} className="header-col width10"><p>{t('device.lifetime')}</p></div>
                            <div style={{width: "150px"}} className="header-col width10"><p>{t('device.last_updated')}</p></div>
                            <div style={{width: "150px"}} className="header-col width10 text-end"><strong>{t('common.action')}</strong></div>
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
    );
};