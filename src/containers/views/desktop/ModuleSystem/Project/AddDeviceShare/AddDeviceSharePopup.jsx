import React from 'react';
import Modal from 'react-bootstrap4-modal';
import FormReactSelect from '../../../../../../components/FormReactSelect';
import Libs from '../../../../../../utils/Libs';
import RowItemDevice from './RowItemDevice';

export default function AddDeviceSharePopup() {

    var { curItem, dataListProject, dataList } = this.state;
    const { t } = this.props;
    var dataShare = dataList.filter((item) => item.is_checked == 1);
    var RowItems = null;
    RowItems = dataList.map((item, index) => {
        return <RowItemDevice
            key={'row_item_' + index}
            index={index}
            dataItem={item}
            onIsCheckedChange={this.onIsCheckedChange}
            actions={this.actions}
            t={t}
        />
    });



    return (
        <Modal visible={true} className="modal-device" dialogClassName="modal-xl screen-full modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {t('device.add_device_share')}
                </h5>
                <span className="close" onClick={this.props.onClickCloseDeviceShare.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <div className="box-info">
                    <h2>{t('device.choose_device_title')}</h2>

                    <div className="box-info-content">
                        <div className="row">
                            <div className="col-md-11">
                                <div className="row">
                                    <div className="col-xl-2 col-lg-2 col-md-2 col-12">
                                        <div className="mb-3">
                                            <FormReactSelect
                                                instanceId="id_project"
                                                className="id_project"
                                                name="id_project"
                                                isSearchable={true}
                                                value={dataListProject.filter(function (item) { return item.id === curItem.id_project })}
                                                onChange={(e) => { this.handleDropdownChange(e, 'id_project'); }}
                                                optionList={dataListProject}
                                                placeHolder={t('common.choose')}
                                            />
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>

                        <div className="list-device">
                            <div className="data-view">
                                <div className="main-header">
                                    <div className="header-row">
                                        <div className="header-col width10"><strong>{t('device.checked')}</strong></div>
                                        <div className="header-col width20"><p>{t('device.device_name')}</p></div>
                                        <div className="header-col width15"><p>{t('device.model')}</p></div>
                                        <div className="header-col width25"><p>{t('device.serial_number')}</p></div>
                                        <div className="header-col width15"><p>{t('device.id_device_type')}</p></div>
                                        <div className="header-col width15"><p>{t('device.manufacturer')}</p></div>

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

            <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={this.props.onClickCloseDeviceShare.bind(this, false)}>
                    {t('common.cancel')}
                </button>
                    <button type="button" disabled = {!Libs.isArrayData(dataShare) ? true: false} className="btn btn-save" onClick={this.onSave.bind(this)}>
                        {t('common.save')}
                    </button>

            </div>
        </Modal>

    )
}