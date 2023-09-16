import React from 'react';
import MenuPrivateProject from '../../../../common/MenuPrivateProject/MenuPrivateProject';
import './Config.scss';
import FormReactSelect from '../../../../../components/FormReactSelect';
import Libs from '../../../../../utils/Libs';
import RowItemDevice from './RowItemDevice';
import AlertTrigger from './AlertTrigger/AlertTrigger';
import PVModelSetting from './PVModelSetting/PVModelSetting';
import DataField from './DataField/DataField';
// import ChartDeviceProfile from './ChartDeviceProfile/ChartDeviceProfile';
// import ChartAlarm from './ChartAlarm/ChartAlarm';
// import ChartDeviceDiagnostics from './ChartDeviceDiagnostics/ChartDeviceDiagnostics';


export default function Config() {
    const { t } = this.props;
    var { curItem, dataListDevice, itemDevice } = this.state;
    var layoutDevice = null;
    if (Libs.isArrayData(dataListDevice)) {
        layoutDevice = dataListDevice.map((item, index) => {
            return <RowItemDevice
                dataItem={item}
                key={index}
                index={index}
                handleDeviceInputChange={this.handleDeviceInputChange}
                auth={this.props.auth}
                actions={this.props.actions}
            />
        });
    }
    var LayoutSetting = null;
    switch (curItem.type) {
        case 1:
            LayoutSetting = <AlertTrigger key={Math.random()} hash_id={this.state.hash_id} t={t} curItem={curItem} itemDevice={itemDevice} auth={this.props.auth} actions={this.actions} />;
            break;
        case 2:
            LayoutSetting = <PVModelSetting key={Math.random()} hash_id={this.state.hash_id} t={t} curItem={curItem} itemDevice={itemDevice} auth={this.props.auth} actions={this.actions} />;
            break;
        case 3:
            LayoutSetting = <DataField key={Math.random()} hash_id={this.state.hash_id} t={t} curItem={curItem} itemDevice={itemDevice} auth={this.props.auth} actions={this.actions} />;
            break;
        case 4:
            // LayoutSetting = <ChartDeviceDiagnostics key={Math.random()} hash_id={this.state.hash_id} t={t} curItem={curItem} auth={this.props.auth} actions={this.actions} />;
            break;

    }
    return (
        <div className="config">
            <MenuPrivateProject hash_id={this.state.hash_id} key={Math.random()} />
            <div className="list-device">
                <h2>{t('config.device')}</h2>
                <div className="content-list-device">
                    <ul>
                        {layoutDevice}
                    </ul>
                </div>
            </div>
            <div className="main-config">
                <div className="header-title">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="group-header">
                                <ul>
                                    <li className={curItem.type == 1 ? "active" : ""} onClick={this.onTabSetting.bind(this, 1)}>{t('config.alert_trigger')}</li>
                                    <li className={curItem.type == 2 ? "active" : ""} onClick={this.onTabSetting.bind(this, 2)}>{t('config.pv_model_setting')}</li>
                                    <li className={curItem.type == 3 ? "active" : ""} onClick={this.onTabSetting.bind(this, 3)}>{t('config.data_field')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main-layout">
                    {LayoutSetting}
                </div>

            </div>
            {/* {LayoutChart} */}
        </div>
    );
};