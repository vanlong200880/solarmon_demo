import React from 'react';
import RowItem from './RowItem';
import { Paging } from '../../../../../components/Paging';
import AddPopup from './AddPopup';
import DeletePopup from './DeletePopup';
import { RText } from '../../../../../components/Controls';
import Auth from '../../../../../utils/Auth';
import Constants from '../../../../../utils/Constants';

export default function Employees() {
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
            iso_code_language={this.employee.lang}
        /> : '';

    return (
        <div className="employee">
            {AddPopupLayout}
            {DeletePopupLayout}
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6"><h2>{t('employee.title')}</h2>
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li><div className="search" onClick={this.onSearch.bind(this)}><span className="icon-search"></span></div></li>
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
                                <RText label={t('employee.fullname')}
                                    inputClass="form-control"
                                    inputId="full_name"
                                    inputName="full_name"
                                    value={searchParam.full_name}
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
                        <div onClick={e => this.onSort(e, 'id')} className={searchParam.sort_column === "id" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('employee.id')}</p></div>
                        <div onClick={e => this.onSort(e, 'last_name')} className={searchParam.sort_column === "name" ? "header-col width25 sorting " + searchParam.order_by : "header-col width25 sorting"}><p>{t('employee.fullname')}</p></div>
                        <div className="header-col width25"><p>{t('employee.email')}</p></div>
                        <div className="header-col width20"><p>{t('employee.role_name')}</p></div>
                        <div className="header-col width10 text-center"><p>{t('employee.status')}</p></div>
                        <div className="header-col width10 text-end"><p>{t('common.action')}</p></div>
                    </div>
                </div>
                <div className="main-body">
                    <div className="body">
                        {RowItems ? RowItems : <div className="data-empty">{t('common.data_empty')}</div>}
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