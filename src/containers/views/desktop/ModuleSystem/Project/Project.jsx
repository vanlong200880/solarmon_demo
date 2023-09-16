import React from 'react';
import RowItem from './RowItem';
import { Paging } from '../../../../../components/Paging';
import AddPopup from './AddPopup';
import DeletePopup from './DeletePopup';
import { RText } from '../../../../../components/Controls';
import Libs from '../../../../../utils/Libs';
import Auth from '../../../../../utils/Auth';
import Constants from '../../../../../utils/Constants';
import AddDevicePopup from './AddDevicePopup';
import SetupPopup from './SetupPopup';
import MoveDevicePopup from './MoveDevicePopup';

export default function Project() {
    const { t } = this.props;
    var { curItem, dataList, allLanguage, searchParam } = this.state;
    var RowItems = null;
    RowItems = dataList.map((item, index) => {
        return <RowItem
            key={'row_item_' + index}
            index={index}
            dataItem={item}
            onItemClick={this.onItemClick}
            onItemClickDelete={this.onItemClickDelete}
            onStatusChange={this.onStatusChange}
            actions={this.actions}
            onClickAddDevice={this.onClickAddDevice}
            onItemClickSetup={this.onItemClickSetup}
            onItemClickMove={this.onItemClickMove}
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
        /> : '';

    var DeletePopupLayout = this.state.delete
        ? <DeletePopup
            t={t}
            curItem={curItem}
            onClickCloseDelete={this.onClickCloseDelete}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';




    var AddDevicePopupLayout = this.state.addDevice
        ? <AddDevicePopup
            t={t}
            curItem={curItem}
            onClickCloseAddDevice={this.onClickCloseAddDevice}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';

    var SetupPopupLayout = this.state.setup
        ? <SetupPopup
            t={t}
            curItem={curItem}
            onItemClickCloseSetup={this.onItemClickCloseSetup}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';

    var MoveDevicePopupLayout = this.state.moveDevice
        ? <MoveDevicePopup
            t={t}
            curItem={curItem}
            onItemClickCloseMove={this.onItemClickCloseMove}
            auth={this.props.auth}
            actions={this.actions}
        /> : '';


    return (
        <div className="project-system">
            {AddPopupLayout}
            {DeletePopupLayout}
            {AddDevicePopupLayout}
            {SetupPopupLayout}
            {MoveDevicePopupLayout}
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6"><h2>{t('project.title')}</h2>
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li><div className="search" onClick={this.onSearch.bind(this)}><span className="icon icon-search"></span></div></li>
                            <li><div className={Auth.getPermisson(this.actions, Constants.AUTH_MODE.NEW) ? "add" : "add disabled"} onClick={Auth.getPermisson(this.actions, Constants.AUTH_MODE.NEW) ? this.onClickAdd.bind(this) : null}><span className="icon icon-plus"></span></div></li>
                        </ul>
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
                                <RText label={t('project.name')}
                                    inputClass="form-control"
                                    inputId="keyword"
                                    inputName="keyword"
                                    value={searchParam.keyword}
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
                <div className="main-header">
                    <div className="header-row">
                        <div onClick={e => this.onSort(e, 'id')} className={searchParam.sort_column === "id" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('common.id')}</p></div>
                        <div onClick={e => this.onSort(e, 'name')} className={searchParam.sort_column === "name" ? "header-col width20 sorting " + searchParam.order_by : "header-col width20 sorting"}><p>{t('project.name')}</p></div>
                        <div onClick={e => this.onSort(e, 'id_group')} className={searchParam.sort_column === "id_group" ? "header-col width20 sorting " + searchParam.order_by : "header-col width20 sorting"}><p>{t('project.id_group')}</p></div>
                        <div className="header-col width10"><p>{t('project.device')}</p></div>
                        <div onClick={e => this.onSort(e, 'power')} className={searchParam.sort_column === "power" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('project.power')}</p></div>
                        <div onClick={e => this.onSort(e, 'today')} className={searchParam.sort_column === "today" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('project.today')}</p></div>
                        <div onClick={e => this.onSort(e, 'status')} className={searchParam.sort_column === "status" ? "header-col width10 sorting text-center " + searchParam.order_by : "header-col width10 sorting text-center "}><p>{t('common.status')}</p></div>
                        <div className="header-col width10 text-end"><strong>{t('common.action')}</strong></div>
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