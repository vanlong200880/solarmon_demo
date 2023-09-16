import React from 'react';
import { RText, RPassword } from '../../../../components/Controls';
import Modal from 'react-bootstrap4-modal';


export default function AddChangePassword() {

    var { curItem } = this.state;
    const { t } = this.props;


    return (
        <Modal visible={true} className="modal-add" dialogClassName="modal-small modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">{t('employee.change_password')}</h5>
                <span className="close" onClick={this.props.onCloseChangePassword.bind(this)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">

                <div className="box-info clear-margin-bottom">
                    <div className="box-info-content">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div className="mb-3">
                                    <RPassword label={t('employee.current_password')}
                                        inputClass="form-control"
                                        required="required"
                                        inputId="current_password"
                                        inputName="current_password"
                                        value={curItem.current_password}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div className="mb-3">
                                    <div className="group-password">
                                        <RText label={t('employee.new_password')}
                                            inputClass="form-control"
                                            required="required"
                                            inputId="password"
                                            inputName="password"
                                            value={curItem.password}
                                            onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                            maxLength={20} />
                                        <span onClick = {this.generatePassword.bind(this)} className="generate-pass"> {t('employee.random')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div className="mb-3">
                                    <RText label={t('employee.password_confirm')}
                                        inputClass="form-control"
                                        required="required"
                                        inputId="password_confirm"
                                        inputName="password_confirm"
                                        value={curItem.password_confirm}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={20} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>





            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={this.props.onCloseChangePassword.bind(this)}>{t('common.close')}</button>
                <button type="button" className="btn btn-save" onClick={this.onSave.bind(this)}> {t('common.save')} </button>
            </div>
        </Modal>

    )
}