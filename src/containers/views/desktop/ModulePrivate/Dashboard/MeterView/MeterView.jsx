import React from 'react';
import { Paging } from '../../../../../../components/Paging';
import Libs from '../../../../../../utils/Libs';
// import { NavLink } from 'react-router-dom';
// import Constants from '../../../../../../utils/Constants';
import RowItem from './RowItem';

export default function MeterView() {
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
        <div className="main-dashboard-view meter-view">
          <div className="main-header">
            <div className="header-row">
              <div className= "header-col width15" style={{ width: "250px" }} ><p>{t('dashboard.name')}</p></div>
              <div className="header-col width10" style={{ width: "250px" }}><p>{t('dashboard.device_name')}</p></div>
              <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.activePower')}</p></div>
              <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.activeEnergy')}</p></div>
              <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.currentPhaseA')}</p></div>
              <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.currentPhaseB')}</p></div>
              <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.currentPhaseC')}</p></div>
              <div className="header-col width10 text-end" style={{ width: "200px" }}><p>{t('dashboard.activeEnergyRate1')}</p></div>
              <div className="header-col width10 text-end" style={{ width: "200px" }}><p>{t('dashboard.activeEnergyRate2')}</p></div>
              <div className="header-col width10 text-end" style={{ width: "200px" }}><p>{t('dashboard.activeEnergyRate3')}</p></div>
              <div className="header-col width10 text-end" style={{ width: "150px" }}><p>{t('dashboard.powerFactor')}</p></div>
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