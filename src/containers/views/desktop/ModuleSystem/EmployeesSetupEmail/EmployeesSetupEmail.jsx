import React from 'react';
import RowItem from './RowItem';
import { Paging } from '../../../../../components/Paging';
import { RText } from '../../../../../components/Controls';
import Auth from '../../../../../utils/Auth';
import Constants from '../../../../../utils/Constants';

export default function EmployeesSetupEmail() {
    const { t } = this.props;
    var { dataList, searchParam } = this.state;
    var RowItems = null;
    RowItems = dataList.map((item, index) => {
        return <RowItem
            key={'row_item_' + index}
            index={index}
            dataItem={item}
            onStatusChange={this.onStatusChange}
            actions={this.actions}
            t={t}
        />
    });
    return (
        <div className="employee-config-mail">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6"><h2>{t('account.mail_notify')}</h2>
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li><div className="search" onClick={this.onSearch.bind(this)}><span className="icon-search"></span></div></li>
                        </ul>
                    </div>
                </div>
            </div>

            {this.state.formSearch ?
                <div className="form-search">
                    <div className="row">

                        <div className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
                            <div className="mb-3">
                                <RText label={t('project.name')}
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
                <div className="main-header">
                    <div className="header-row">
                        <div onClick={e => this.onSort(e, 'id')} className={searchParam.sort_column === "id" ? "header-col width10 sorting " + searchParam.order_by : "header-col width10 sorting"}><p>{t('employee.id')}</p></div>
                        <div onClick={e => this.onSort(e, 'name')} className={searchParam.sort_column === "name" ? "header-col width40 sorting " + searchParam.order_by : "header-col width40 sorting"}><p>{t('project.name')}</p></div>
                        <div className="header-col width10 text-center"><p>{t('common.now')}</p></div>
                        <div className="header-col width10 text-center"><p>{t('common.day')}</p></div>
                        <div className="header-col width10 text-center"><p>{t('common.month')}</p></div>
                        <div className="header-col width10 text-center"><p>{t('common.year')}</p></div>
                        <div className="header-col width10 text-center"><p>{t('common.all')}</p></div>
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