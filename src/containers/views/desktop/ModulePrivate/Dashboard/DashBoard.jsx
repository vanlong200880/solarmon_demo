import React from 'react';
import { RText } from '../../../../../components/Controls';
import ListView from './ListView/ListView';
import SummaryGroup from './SummaryGroup/SummaryGroup';
import MeterView from './MeterView/MeterView';
import './Dashboard.scss';
import MapView from './MapView/MapView';
import Libs from '../../../../../utils/Libs';

export default function DashBoard() {
    const { t } = this.props;
    var { dataList, searchParam, mode } = this.state;

    var layoutRender = null;
    switch (mode) {
        case 'map':
            layoutRender = <MapView
                dataList={dataList}
                searchParam={searchParam}
                auth={this.props.auth}
                actions={this.actions}
            />;
            break;
        case 'summary':
            layoutRender = <SummaryGroup
                dataList={dataList}
                searchParam={searchParam}
                auth={this.props.auth}
                actions={this.actions}
            />;
            break;
        case 'meter':
            layoutRender = <MeterView
                dataList={dataList}
                searchParam={searchParam}
                auth={this.props.auth}
                actions={this.actions}
            />;
            break;
        default:
            layoutRender = <ListView
                dataList={dataList}
                searchParam={searchParam}
                auth={this.props.auth}
                actions={this.actions}
            />;
            break;
    }


    return (
        <div className="dashboard">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6"><h2>{t('dashboard.title')}</h2>
                    </div>
                    <div className="col-md-6">
                        <ul>
                            {!Libs.isBlank(mode) && mode == 'grid' ?
                                <li><div className="search" onClick={this.onSearch.bind(this)}><span className="icon icon-search"></span></div></li>
                                : ""}
                            <li><div className={this.state.mode === 'grid' ? 'active' : ''} onClick={this.onClickChangeMode.bind(this, 'grid')}><span className="icon-list-unordered"></span></div></li>
                            <li><div className={this.state.mode === 'map' ? 'active' : ''} onClick={this.onClickChangeMode.bind(this, 'map')}><span className="icon-map-streamline-user"></span></div></li>
                            <li><div className={this.state.mode === 'summary' ? 'active' : ''} onClick={this.onClickChangeMode.bind(this, 'summary')}><span className="icon-graph-bar"></span></div></li>
                            <li><div className={this.state.mode === 'meter' ? 'active' : ''} onClick={this.onClickChangeMode.bind(this, 'meter')}><span className="icon-gauge"></span></div></li>
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

            {layoutRender}

        </div>
    );
};