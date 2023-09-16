import React from 'react';
import { Paging } from '../../../../../../components/Paging';
import Libs from '../../../../../../utils/Libs';
// import { NavLink } from 'react-router-dom';
// import Constants from '../../../../../../utils/Constants';
import RowItem from './RowItem';

export default function MapView() {
  const { t } = this.props;
  var { dataList, searchParam} = this.state;
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
    <div className="view-list">
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