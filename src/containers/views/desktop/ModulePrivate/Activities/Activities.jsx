import React from 'react';
import RowItem from './RowItem';
import { Paging } from '../../../../../components/Paging';
import AddPopup from './AddPopup';
import DeletePopup from './DeletePopup';
import { RCheckbox } from '../../../../../components/Controls';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';

import Libs from '../../../../../utils/Libs';
import './Activities.scss';
import MenuPrivateProject from '../../../../common/MenuPrivateProject/MenuPrivateProject';
import DeleteAllPopup from './DeleteAllPopup';
import Auth from '../../../../../utils/Auth';
import Constants from '../../../../../utils/Constants';

export default function Activities() {
    const { t } = this.props;
    var { curItem, dataList, allLanguage, searchParam, dataErrorLevel, dataStatus, dataErrorType } = this.state;
    var RowItems = null;
    RowItems = dataList.map((item, index) => {
        return <RowItem
            key={'row_item_' + index}
            index={index}
            dataItem={item}
            onItemClick={this.onItemClick}
            onItemClickDelete={this.onItemClickDelete}
            actions={this.actions}
            handleCheckItemInputChange={this.handleCheckItemInputChange}
            t={t}
        />
    });
    var AddPopupLayout = this.state.add
        ? <AddPopup
            t={t}
            allLanguage={allLanguage}
            curItem={curItem}
            onClickCloseAdd={this.onClickCloseAdd}
            auth={this.props.auth}
            actions={this.actions}
            iso_code_language={this.employee.lang}
            dataErrorLevel={dataErrorLevel}
            dataStatus={dataStatus}
            dataErrorType={dataErrorType}
        /> : '';

    var DeletePopupLayout = this.state.delete
        ? <DeletePopup
            t={t}
            curItem={curItem}
            onClickCloseDelete={this.onClickCloseDelete}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';


    var DeleteAllPopupLayout = this.state.deleteAll
        ? <DeleteAllPopup
            t={t}
            curItem={curItem}
            onClickCloseDeleteAll={this.onClickCloseDeleteAll}
            auth={this.props.auth}
            actions={this.actions}
            dataList={dataList}
        /> : '';

    var checkedFilter = Libs.find(dataList, 'is_checked', 1);

    return (
        <div className="activities">
            <MenuPrivateProject hash_id={this.state.hash_id} key={Math.random()} />
            {AddPopupLayout}
            {DeletePopupLayout}
            {DeleteAllPopupLayout}
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6"><h2>{t('activities.title')}</h2>
                    </div>
                    <div className="col-md-6">

                        <ul>
                            <li><div onClick={this.downloadData.bind(this)} className="btn-download"><span className="icon-download"></span></div></li>
                            <li><div className="search" onClick={this.onSearch.bind(this)}><span className="icon icon-search"></span></div></li>
                            {!Libs.isObjectEmpty(checkedFilter) && Auth.getPermisson(this.actions, Constants.AUTH_MODE.DEL) ?
                                <li>
                                    <div data-tip={t('common.delete_all')} data-type="warning" data-class="tooltip-action" className="search" onClick={this.onItemClickDeleteAll.bind(this)}><span className="icon-trash-o"></span></div></li>
                                : ""}
                        </ul>
                    </div>
                </div>
            </div>

            {this.state.formSearch ?
                <div className="form-search">
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

                                    <div className="mb-3">
                                        <RCheckbox
                                            inputId={"is_follow"}
                                            inputName="is_follow"
                                            labelClass="no-label"
                                            checked={searchParam.is_follow}
                                            label={"Follow Alert"}
                                            onChange={(e) => { this.handleInputDateChange(e); }}
                                        />
                                    </div>



                                </div>


                                <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                    <h2>Type</h2>
                                    <ul>
                                        {Libs.isArrayData(dataErrorType) ?
                                            dataErrorType.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <RCheckbox
                                                            inputId={"id_error_type_" + index}
                                                            inputName="id_error_type"
                                                            labelClass="no-label"
                                                            checked={item.is_checked}
                                                            label={item.label}
                                                            onChange={(e) => { this.handleCheckTypeInputChange(e, index); }}
                                                        />
                                                    </li>
                                                )
                                            })
                                            : ""}
                                    </ul>
                                </div>


                                <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                    <h2>Level</h2>
                                    <ul>
                                        {Libs.isArrayData(dataErrorLevel) ?
                                            dataErrorLevel.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <RCheckbox
                                                            inputId={"id_error_level_" + index}
                                                            inputName="id_error_level"
                                                            labelClass="no-label"
                                                            checked={item.is_checked}
                                                            label={item.label}
                                                            onChange={(e) => { this.handleCheckLevelInputChange(e, index); }}
                                                        />
                                                    </li>
                                                )
                                            })
                                            : ""}
                                    </ul>
                                </div>

                                <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                    <h2>Status</h2>
                                    <ul>
                                        {Libs.isArrayData(dataStatus) ?
                                            dataStatus.map((item, index) => {
                                                return (
                                                    <li key={index}>
                                                        <RCheckbox
                                                            inputId={"status_" + index}
                                                            inputName="status"
                                                            labelClass="no-label"
                                                            checked={item.is_checked}
                                                            label={item.label}
                                                            onChange={(e) => { this.handleCheckStatusInputChange(e, index); }}
                                                        />
                                                    </li>
                                                )
                                            })
                                            : ""}
                                    </ul>
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
                : ""}

            <div className="data-view">
                <div className="main-header">
                    <div className="header-row">
                        <div className="header-col width5"></div>
                        <div onClick={e => this.onSort(e, 'id')} className={searchParam.sort_column === "id" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>ID</p></div>

                        <div onClick={e => this.onSort(e, 'id_error_type')} className={searchParam.sort_column === "id_error_type" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('activities.alert_type')}</p></div>
                        <div onClick={e => this.onSort(e, 'id_error_level')} className={searchParam.sort_column === "id_error_level" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('activities.level')}</p></div>
                        <div onClick={e => this.onSort(e, 'message')} className={searchParam.sort_column === "message" ? "header-col width25 sorting " + searchParam.order_by : "header-col width25 sorting"}><p>{t('activities.issus')}</p></div>
                        <div onClick={e => this.onSort(e, 'status')} className={searchParam.sort_column === "status" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('activities.status')}</p></div>
                        <div onClick={e => this.onSort(e, 'start_date_format')} className={searchParam.sort_column === "start_date_format" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('activities.opened')}</p></div>
                        <div className="header-col width10"><p>{t('activities.open_period')}</p></div>
                        <div className="header-col width5 text-end"><strong>{t('common.action')}</strong></div>
                        <div className="header-col width5 text-end">
                            <RCheckbox
                                inputId="checked_all"
                                inputName="checked_all"
                                labelClass="no-label"
                                checked={this.state.checked_all}
                                onChange={(e) => { this.handleCheckAllInputChange(e); }}
                            />
                        </div>
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
    );
};