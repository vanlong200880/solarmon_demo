import React from 'react';
import FormReactSelect from '../../../../../../components/FormReactSelect';
import CMSDatePicker from '../../../../../../components/CMSDatePicker/CMSDatePicker';
import Libs from '../../../../../../utils/Libs';
import RowItem from './RowItem';
import { Paging } from '../../../../../../components/Paging';

export default function DeviceAlarm() {

    var { searchParam, dataList, dataErrorLevel, dataErrorType } = this.state;
    const { t } = this.props;

    var RowItems = null;
    RowItems = dataList.map((item, index) => {
        return <RowItem
            key={'row_item_' + index}
            index={index}
            dataItem={item}
            actions={this.actions}
            t={t}
        />
    });



    return (
        <div className="box-info-content">
            <div className="device-alarm-search">
                <div className="row">
                    <div className="col-md-10">
                        <div className="row">
                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                <div className="mb-3">
                                    <CMSDatePicker
                                        label={t('common.date_from')}
                                        value={searchParam.date_from}
                                        inputId="date_from"
                                        format="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                        inputClass="form-control"
                                        inputName="date_from"
                                        minDate={searchParam.min_date}
                                        handleChange={this.handleInputDateChange.bind(this)}
                                        maxLength={20}
                                        showIconCalendar={true}
                                    />
                                </div>
                            </div>


                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                <div className="mb-3">
                                    <CMSDatePicker
                                        label={t('common.date_to')}
                                        value={searchParam.date_to}
                                        inputId="date_to"
                                        format="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                        inputClass="form-control"
                                        inputName="date_to"
                                        minDate={searchParam.min_date}
                                        handleChange={this.handleInputDateChange.bind(this)}
                                        maxLength={20}
                                        showIconCalendar={true}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                <div className="mb-3">
                                    <FormReactSelect
                                        label={t('device.id_level')}
                                        instanceId="id_error_level"
                                        className="id_error_level"
                                        name="id_error_level"
                                        value={dataErrorLevel.filter(function (item) { return item.id === searchParam.id_error_level })}
                                        onChange={(e) => { this.handleDropdownChange(e, 'id_error_level'); }}
                                        optionList={dataErrorLevel}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>
                            </div>


                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                <div className="mb-3">
                                    <FormReactSelect
                                        label={t('device.id_error_type')}
                                        instanceId="id_error_type"
                                        className="id_error_type"
                                        name="id_error_type"
                                        value={dataErrorType.filter(function (item) { return item.id === searchParam.id_error_type })}
                                        onChange={(e) => { this.handleDropdownChange(e, 'id_error_type'); }}
                                        optionList={dataErrorType}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className="col-md-2">
                        <div className="mb-3">
                            <button type="button" className="btn btn-search" onClick={this.handleSearch.bind(this)}> {t('common.search')} </button>
                            <button type="button" className="btn btn-reset" onClick={this.onResetSearch.bind(this)}> {t('common.reset')} </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="list-device">
                <div className="data-view">
                    <div className="main-header">
                        <div className="header-row">
                            <div onClick={e => this.onSort(e, 'id')} className={searchParam.sort_column === "id" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('device.alert')}</p></div>
                            <div onClick={e => this.onSort(e, 'id_error_level')} className={searchParam.sort_column === "id_error_level" ? "header-col width15 sorting " + searchParam.order_by : "header-col width15 sorting"}><p>{t('device.level')}</p></div>
                            <div onClick={e => this.onSort(e, 'message')} className={searchParam.sort_column === "message" ? "header-col width40 sorting " + searchParam.order_by : "header-col width40 sorting"}><p>{t('device.issus')}</p></div>
                            <div onClick={e => this.onSort(e, 'start_date')} className={searchParam.sort_column === "start_date" ? "header-col width20 sorting " + searchParam.order_by : "header-col width20 sorting"}><p>{t('device.opened')}</p></div>
                            <div className="header-col width15 text-end"><p>{t('device.open_period')}</p></div>
                        </div>
                    </div>
                    <div className="main-body">
                        <div className="body">
                            {!Libs.isBlank(RowItems) ? RowItems : <div className="data-empty">{t('common.data_empty')}</div>}
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
        </div>

    )
}