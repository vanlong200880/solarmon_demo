import React from 'react';
import MenuProject from '../../../../common/MenuProject/MenuProject';
import './Analytics.scss';
import FormReactSelect from '../../../../../components/FormReactSelect';
import ChartDevice from './ChartDevice/ChartDevice';
import ChartDeviceProfile from './ChartDeviceProfile/ChartDeviceProfile';
import ChartAlarm from './ChartAlarm/ChartAlarm';
import ChartDeviceDiagnostics from './ChartDeviceDiagnostics/ChartDeviceDiagnostics';


export default function Analytics() {
    const { t } = this.props;
    var { curItem, dataStatus } = this.state;
    var LayoutChart = null;
    switch (curItem.type) {
        case 1:
            LayoutChart = <ChartDeviceProfile key={Math.random()} hash_id={this.state.hash_id} t={t} curItem={curItem} auth={this.props.auth} actions={this.actions} />;
            break;
        case 2:
            LayoutChart = <ChartDevice key={Math.random()} hash_id={this.state.hash_id} t={t} curItem={curItem} auth={this.props.auth} actions={this.actions} />;
            break;
        case 3:
            LayoutChart = <ChartAlarm key={Math.random()} hash_id={this.state.hash_id} t={t} curItem={curItem} auth={this.props.auth} actions={this.actions} />;
            break;
        case 4:
            LayoutChart = <ChartDeviceDiagnostics key={Math.random()} hash_id={this.state.hash_id} t={t} curItem={curItem} auth={this.props.auth} actions={this.actions} />;
            break;

    }
    return (
        <div className="analytics">
            <MenuProject hash_id={this.state.hash_id} key = {Math.random()} />
            <div className="header-title">
                <div className="row">
                    <div className="col-md-12">
                        <div className="group-header">
                            <FormReactSelect
                                instanceId="status"
                                className="status"
                                name="status"
                                required="required"
                                value={dataStatus.filter(function (item) { return item.id === curItem.type })}
                                onChange={(e) => { this.handleDropdownChange(e, 'type'); }}
                                optionList={dataStatus}
                                placeHolder={t('common.choose')}
                            />

                            <div className="reload-chart" onClick={this.reloadData.bind(this)}><span className="icon-arrows-ccw"></span></div>
                        </div>
                    </div>
                </div>
            </div>
            {LayoutChart}
        </div>
    );
};