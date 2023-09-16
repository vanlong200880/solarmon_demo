import React from 'react';
import { RText } from '../../../../../components/Controls';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';
import FormReactSelect from '../../../../../components/FormReactSelect';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import Libs from '../../../../../utils/Libs';
import './Project.scss';
import RowItemDevice from './RowItemDevice';
import DeleteDevicePopup from './DeleteDevicePopup';
import AddDeviceSharePopup from './AddDeviceShare/AddDeviceSharePopup';

export default function AddDevicePopup() {

    var { curItemProject, curItem, curItemDelete, dataDeviceType, dataDeviceGroup, dataList } = this.state;
    const { t } = this.props;

    var RowItems = null;
    RowItems = dataList.map((item, index) => {
        return <RowItemDevice
            key={'row_item_' + index}
            index={index}
            dataItem={item}
            onItemClick={this.onItemClick}
            onItemClickDelete={this.onItemClickDelete}
            onIsVirtualChange={this.onIsVirtualChange}
            onStatusChange = {this.onStatusChange}
            actions={this.props.actions}
            auth={this.props.auth}
            onClickDeleteDevice={this.onClickDeleteDevice}
            t={t}
        />
    });


    var LayoutDeleteDevice = this.state.showDeleteDevice ?
        <DeleteDevicePopup
            t={t}
            auth={this.props.auth}
            actions={this.actions}
            curItemDelete={curItemDelete}
            onClickCloseDeleteDevice={this.onClickCloseDeleteDevice}
        />
        : "";

    var LayoutDeviceShare = this.state.showDeviceShare ?
        <AddDeviceSharePopup
            t={t}
            auth={this.props.auth}
            actions={this.actions}
            curItemProject={curItemProject}
            onClickCloseDeviceShare={this.onClickCloseDeviceShare}
        />
        : "";



    return (
        <div className="main-multi-modal">
            <div className="modal-device-share">
                {LayoutDeviceShare}
            </div>
            <div className="modal-delete-device">
                {LayoutDeleteDevice}
            </div>
            <div className="modal-list-device">
                <Modal visible={true} className="modal-device" dialogClassName="modal-xl screen-full modal-dialog-scrollable" >
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {curItemProject.name}
                        </h5>
                        <span className="close" onClick={this.props.onClickCloseAddDevice.bind(this, false)}><var className="icon-cancel-music"></var></span>
                    </div>
                    <div className="modal-body">
                        <div className="box-info">
                            <h2>{t('device.device_title')}
                                <div onClick={this.onClickDeviceShare.bind(this)} className="add-device-share">Add device share</div>
                            </h2>

                            <div className="box-info-content">
                                <div className="row">
                                    <div className="col-md-11">
                                        <div className="row">
                                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                                <div className="mb-3">
                                                    <RText label={t('device.id_device')}
                                                        inputClass="form-control"
                                                        required="required"
                                                        inputId="id_device"
                                                        inputName="id_device"
                                                        value={curItem.id_device}
                                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                        maxLength={200} />
                                                </div>
                                            </div>

                                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                                <div className="mb-3">
                                                    <RText label={t('device.device_name')}
                                                        inputClass="form-control"
                                                        required="required"
                                                        inputId="name"
                                                        inputName="name"
                                                        value={curItem.name}
                                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                        maxLength={200} />
                                                </div>
                                            </div>

                                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                                <div className="mb-3">
                                                    <RText label={t('device.model')}
                                                        inputClass="form-control"
                                                        required="required"
                                                        inputId="model"
                                                        inputName="model"
                                                        value={curItem.model}
                                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                        maxLength={200} />
                                                </div>
                                            </div>


                                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                                <div className="mb-3">
                                                    <RText label={t('device.serial_number')}
                                                        inputClass="form-control"
                                                        required="required"
                                                        inputId="serial_number"
                                                        inputName="serial_number"
                                                        value={curItem.serial_number}
                                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                        maxLength={200} />
                                                </div>
                                            </div>

                                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                                <div className="mb-3">
                                                    <FormReactSelect
                                                        label={t('device.id_device_type')}
                                                        instanceId="id_device_type"
                                                        className="id_device_type"
                                                        name="id_device_type"
                                                        required="required"
                                                        value={dataDeviceType.filter(function (item) { return item.id === curItem.id_device_type })}
                                                        onChange={(e) => { this.handleDropdownChange(e, 'id_device_type'); }}
                                                        optionList={dataDeviceType}
                                                        placeHolder={t('common.choose')}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                                <div className="mb-3">
                                                    <FormReactSelect
                                                        label={t('device.id_device_group')}
                                                        instanceId="id_device_group"
                                                        className="id_device_group"
                                                        name="id_device_group"
                                                        required="required"
                                                        value={dataDeviceGroup.filter(function (item) { return item.id === curItem.id_device_group })}
                                                        onChange={(e) => { this.handleDropdownChange(e, 'id_device_group'); }}
                                                        optionList={dataDeviceGroup}
                                                        placeHolder={t('common.choose')}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-xl-3 col-lg-3 col-md-3 col-6">
                                                <div className="mb-3">
                                                    <CMSDatePicker
                                                        label={t('device.installed_at')}
                                                        value={curItem.installed_at}
                                                        inputId="installed_at"
                                                        format="DD/MM/YYYY"
                                                        dateFormat="dd/MM/yyyy"
                                                        inputClass="form-control"
                                                        inputName="installed_at"
                                                        minDate={curItem.min_date}
                                                        handleChange={(e) => { this.handleInputDateChange(e); this.validateOne(e); }}
                                                        maxLength={20}
                                                        showIconCalendar={true}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-xl-2 col-lg-2 col-md-2 col-6">
                                                <div className="mb-3">
                                                    <RText label={t('device.manufacturer')}
                                                        inputClass="form-control"
                                                        inputId="manufacturer"
                                                        inputName="manufacturer"
                                                        value={curItem.manufacturer}
                                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                        maxLength={200} />
                                                </div>
                                            </div>

                                            <div className="col-xl-1 col-lg-1 col-md-1 col-6">
                                                <div className="mb-3">
                                                    <RText label={t('device.menu_order')}
                                                        inputClass="form-control"
                                                        inputId="menu_order"
                                                        inputName="menu_order"
                                                        value={curItem.menu_order}
                                                        pattern="^[0-9]*$"
                                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                        maxLength={200} />
                                                </div>
                                            </div>


                                        </div>
                                    </div>
                                    <div className="col-md-1">
                                        <button type="button" className="btn btn-save btn-margin-top" onClick={this.onSave.bind(this)}>
                                            {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('common.update') : t('common.create')}
                                        </button>
                                    </div>
                                </div>

                                <div className="list-device">
                                    <div className="data-view">
                                        <div className="main-header">
                                            <div className="header-row">
                                                <div className="header-col width20"><p>{t('device.device_name')}</p></div>
                                                <div className="header-col width10"><p>{t('device.model')}</p></div>
                                                <div className="header-col width10"><p>{t('device.serial_number')}</p></div>
                                                <div className="header-col width10"><p>{t('device.id_device_type')}</p></div>
                                                <div className="header-col width10"><p>{t('device.manufacturer')}</p></div>
                                                <div className="header-col width10 text-center"><p>{t('device.is_share')}</p></div>
                                                <div className="header-col width10 sorting text-center"><p>{t('device.is_virtual')}</p></div>
                                                <div className="header-col width10 sorting text-center"><p>{t('device.status')}</p></div>
                                                <div className="header-col width10 text-end"><strong>{t('common.action')}</strong></div>
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

                        </div>

                    </div>
                </Modal>
            </div>

        </div>
    )
}