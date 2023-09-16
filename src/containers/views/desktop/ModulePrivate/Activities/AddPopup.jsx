import React from 'react';
import { RTextArea, RCheckbox } from '../../../../../components/Controls';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';
import FormReactSelect from '../../../../../components/FormReactSelect';
import Libs from '../../../../../utils/Libs';


export default function AddPopup() {

    var { curItem, dataErrorLevel, dataStatus, dataErrorType, dataAlertState } = this.state;
    const { t } = this.props;

    return (
        <Modal visible={true} className="modal-add" dialogClassName="modal-lg modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {t('activities.alert_detail')}
                </h5>
                <span className="close" onClick={this.props.onClickCloseAdd.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">

                <div className="box-info">
                    <h2>{t('activities.device')}: {curItem.name}</h2>
                    <div className="box-info-content">
                        <div className="alert-information">
                            <p><span className="alert alert-success">{t('activities.opened')}: {curItem.start_date_format}</span></p>
                            <hr></hr>
                            <div className="alert alert-danger">

                                {!Libs.isBlank(curItem.message) ? <p><strong>{t('activities.message')}:</strong> {curItem.message}</p> : ""}
                                {!Libs.isBlank(curItem.description) ? <p><strong>{t('activities.description')}:</strong> {curItem.description}</p> : ""}

                            </div>
                            {!Libs.isBlank(curItem.solutions) ?
                                <div className="solutions">
                                    <p><strong>{t('activities.solutions')}:</strong></p>
                                    <p>{curItem.solutions}</p>
                                </div>
                                : ""}

                            <hr></hr>
                            <div className="row">
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                    <div className="mb-3">
                                        <RCheckbox
                                            inputId="is_follow"
                                            inputName="is_follow"
                                            labelClass="no-label"
                                            checked={curItem.is_follow}
                                            onChange={(e) => { this.handleInputChange(e); }}
                                            label="Follow Alert"
                                        />
                                    </div>
                                </div>


                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                    <div className="mb-3">
                                        <FormReactSelect
                                            label={t('activities.id_error_level')}
                                            instanceId="id_error_level"
                                            className="id_error_level"
                                            name="id_error_level"
                                            isDisabled={true}
                                            value={dataErrorLevel.filter(function (item) { return item.id === curItem.id_error_level })}
                                            onChange={(e) => { this.handleDropdownChange(e, 'id_error_level'); }}
                                            optionList={dataErrorLevel}
                                            placeHolder={t('common.choose')}
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                    <div className="mb-3">
                                        <FormReactSelect
                                            label={t('activities.id_error_type')}
                                            instanceId="id_error_type"
                                            className="id_error_type"
                                            name="id_error_type"
                                            value={dataErrorType.filter(function (item) { return item.id === curItem.id_error_type })}
                                            onChange={(e) => { this.handleDropdownChange(e, 'id_error_type'); }}
                                            optionList={dataErrorType}
                                            isDisabled={true}
                                            placeHolder={t('common.choose')}
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12">
                                    <div className="mb-3">
                                        <FormReactSelect
                                            label={t('activities.status')}
                                            instanceId="status"
                                            className="status"
                                            name="status"
                                            value={dataStatus.filter(function (item) { return item.id === curItem.status })}
                                            onChange={(e) => { this.handleDropdownChange(e, 'status'); }}
                                            optionList={dataStatus}
                                            placeHolder={t('common.choose')}
                                        />
                                    </div>
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                    <div className="mb-3">
                                        <div className="reminder">
                                            <ul>
                                                {Libs.isArrayData(dataAlertState) ?
                                                    dataAlertState.map((item, index) => {
                                                        return (
                                                            <li key={index}>
                                                                <RCheckbox
                                                                    inputId={"reminder" + item.id}
                                                                    inputName="reminder"
                                                                    labelClass="no-label"
                                                                    checked={curItem.id_alert_state === item.id ? 1 : 0}
                                                                    onChange={(e) => { this.handleAlertStateInputChange(index); }}
                                                                    label={item.label}
                                                                />
                                                            </li>
                                                        )
                                                    })
                                                    : ""}
                                            </ul>
                                        </div>

                                    </div>
                                </div>




                                <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                    <div className="mb-3">
                                        <RTextArea label={t('activities.note')}
                                            inputClass="form-control"
                                            inputId="note"
                                            inputName="note"
                                            value={curItem.note}
                                            onChange={(e) => { this.handleInputChange(e); }}
                                            maxLength={1000} />
                                    </div>
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
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('common.save') : t('common.save')}
                </button>
            </div>
        </Modal>

    )
}