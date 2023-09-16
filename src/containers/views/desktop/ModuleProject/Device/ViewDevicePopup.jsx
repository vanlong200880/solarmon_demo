import React from 'react';
import Modal from 'react-bootstrap4-modal';
import Libs from '../../../../../utils/Libs';
import './Device.scss';
import RowItemHardware from './RowItemHardware';
import DeviceAlarm from './DeviceAlarm/DeviceAlarm';
import DeviceCharting from './DeviceCharting/DeviceCharting';

export default function ViewDevicePopup() {

    var { dataDeviceHardware, curItem } = this.state;
    const { t } = this.props;
    var RowItems = null;
    RowItems = dataDeviceHardware.map((item, index) => {
        return <RowItemHardware
            key={'row_item_' + index}
            index={index}
            dataItem={item}
            actions={this.actions}
            t={t}
        />
    });

    var LayoutTab = null;
    switch (this.state.show_tab) {
        case 1:
            break;
        case 2:
            LayoutTab = <DeviceAlarm curItem = {curItem} actions={this.actions} auth={this.props.auth} />;
            break;
        case 3:
            LayoutTab = <DeviceCharting curItem = {curItem} actions={this.actions} auth={this.props.auth} />;
            break;
    }

    return (
        <Modal visible={true} className="modal-device" dialogClassName="modal-xl modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {curItem.name}
                </h5>
                <span className="close" onClick={this.props.onClickCloseViewDevice.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <div className="box-info">
                    <div className="device-tab">
                        <ul>
                            <li onClick={this.onClickShowTab.bind(this, 1)} className={this.state.show_tab == 1 ? "active" : ""}>{t('device.hardware')}</li>
                            <li onClick={this.onClickShowTab.bind(this, 2)} className={this.state.show_tab == 2 ? "active" : ""}>{t('device.alarms')}</li>
                            <li onClick={this.onClickShowTab.bind(this, 3)} className={this.state.show_tab == 3 ? "active" : ""}>{t('device.charting')}</li>
                        </ul>
                    </div>

                    {LayoutTab ? LayoutTab :
                        <div className="box-info-content">
                            <div className="device-title">
                                <div className="row">
                                    <div className="col-md-4">
                                        <p className="name"><strong>{t('device.device_name')}: </strong>{curItem.name}</p>
                                        <p className="name"><strong>{t('device.model')}: </strong>{curItem.model}</p>
                                        <p className="name"><strong>{t('device.serial_number')}: </strong>{curItem.serial_number}</p>
                                        <p className="name"><strong>{t('device.id_device_type')}: </strong>{curItem.device_type_name}</p>
                                        <p className="name"><strong>{t('device.manufacturer')}: </strong>{curItem.manufacturer}</p>
                                        <p className="name"><strong>{t('device.installed_at')}: </strong>{curItem.installed_at}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-6"><p>{t('device.last_communication')}</p></div>
                                            <div className="col-md-6"><p><strong>{curItem.last_communication}</strong></p></div>

                                            <div className="col-md-6"><p>{t('device.last_attempt')}</p></div>
                                            <div className="col-md-6"><p><strong>{curItem.last_attempt}</strong></p></div>

                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div onClick={this.reloadLatestData.bind(this)} className="reload-device">{t('device.reload_latest_data')}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="list-device">
                                <div className="data-view">
                                    <div className="main-header">
                                        <div className="header-row">
                                            <div className="header-col width30"><p>{t('device.name')}</p></div>
                                            <div className="header-col width30"><p>{t('device.data_name')}</p></div>
                                            <div className="header-col width20"><p>{t('device.value')}</p></div>
                                            <div className="header-col width20"><p>{t('device.unit')}</p></div>
                                        </div>
                                    </div>
                                    <div className="main-body">
                                        <div className="body">
                                            {!Libs.isBlank(RowItems) ? RowItems : <div className="data-empty">{t('common.data_empty')}</div>}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    }



                </div>

            </div>
        </Modal>

    )
}