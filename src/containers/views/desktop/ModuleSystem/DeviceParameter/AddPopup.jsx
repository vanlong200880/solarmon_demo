import React from 'react';
import { RText, RTextArea, RSwitch } from '../../../../../components/Controls';
import FormReactSelect from '../../../../../components/FormReactSelect';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';


export default function AddPopup() {

    var { curItem, dataDeviceGroup } = this.state;
    const { t } = this.props;
    return (
        <Modal visible={true} className="modal-add" dialogClassName="modal-lg modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('device_parameter.edit_title') : t('device_parameter.add_title')}
                </h5>
                <span className="close" onClick={this.props.onClickCloseAdd.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <div className="box-info">
                    <h2>{t('common.info')}</h2>
                    <div className="box-info-content">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div className="mb-3">
                                    <p className="control-label">{t('employee.status')}</p>
                                    <div className="checkmark">
                                        <RSwitch
                                            inputId="status"
                                            inputName="status"
                                            checked={curItem.status}
                                            onChange={(e) => { this.handleInputChange(e) }}
                                        />
                                    </div>
                                </div>

                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <FormReactSelect
                                        label={t('device_parameter.id_device_group')}
                                        required="required"
                                        instanceId="id_device_group"
                                        className="id_device_group"
                                        name="id_device_group"
                                        value={dataDeviceGroup.filter(function (item) { return item.id === curItem.id_device_group })}
                                        onChange={(e) => { this.handleDropdownChange(e, 'id_device_group') }}
                                        optionList={dataDeviceGroup}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('device_parameter.name')}
                                        required="required"
                                        inputClass="form-control"
                                        inputId="name"
                                        inputName="name"
                                        value={curItem.name}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={100} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('device_parameter.slug')}
                                        required="required"
                                        inputClass="form-control"
                                        inputId="slug"
                                        inputName="slug"
                                        value={curItem.slug}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={100} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('device_parameter.unit')}
                                        inputClass="form-control"
                                        inputId="unit"
                                        inputName="unit"
                                        value={curItem.unit}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={20} />
                                </div>
                            </div>


                        </div>
                    </div>

                </div>


            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={this.props.onClickCloseAdd.bind(this, false)}>
                    {t('common.cancel')}
                </button>
                <button type="button" className="btn btn-save" onClick={this.onSave.bind(this)}>
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('common.update') : t('common.create')}
                </button>
            </div>
        </Modal>

    )
}