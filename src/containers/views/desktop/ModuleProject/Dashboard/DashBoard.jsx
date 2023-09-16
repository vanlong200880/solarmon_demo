import React from 'react';
import RowItem from './RowItem';
import { Paging } from '../../../../../components/Paging';
import { RText } from '../../../../../components/Controls';
import Libs from '../../../../../utils/Libs';
import './Dashboard.scss';

export default function DashBoard() {
    const { t } = this.props;
    var { dataList, searchParam, dataListSummary } = this.state;
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

    return (
        <div className="dashboard">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6"><h2>{t('dashboard.title')}</h2>
                    </div>
                    <div className="col-md-6">
                        <ul>
                            <li><div className="search" onClick={this.onSearch.bind(this)}><span className="icon icon-search"></span></div></li>
                            <li><div className={this.state.mode === 'grid' ? 'active' : ''} onClick={this.onClickChangeMode.bind(this, 'grid')}><span className="icon-list-unordered"></span></div></li>
                            <li><div className={this.state.mode === 'map' ? 'active' : ''} onClick={this.onClickChangeMode.bind(this, 'map')}><span className="icon-map-streamline-user"></span></div></li>
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
                                <RText label={t('dashboard.name')}
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

                <div className="main-dashboard-view">
                    <div className="main-header">
                        <div className="header-row">
                            <div className="header-col width5" style={{ width: "100px" }}><p></p></div>
                            <div style={{ width: "250px" }} onClick={e => this.onSort(e, 'name')} className={searchParam.sort_column === "name" ? "header-col width15 sorting " + searchParam.order_by : "header-col width15 sorting"}><p>{t('dashboard.name')}</p></div>
                            <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.installed_power')}</p></div>
                            <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.irradiance1')}</p></div>
                            <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.irradiance2')}</p></div>
                            <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.power_now')}</p></div>
                            <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.today')}</p></div>
                            <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.last_month')}</p></div>
                            <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.lifetime')}</p></div>
                            <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.revenue')}</p></div>
                            <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.last_updated')}</p></div>
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