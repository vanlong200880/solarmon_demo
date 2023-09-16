import React from 'react';
import { RText, RCheckbox, RSwitch } from '../../../../../components/Controls';
import Modal from 'react-bootstrap4-modal';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import Libs from '../../../../../utils/Libs';
import Constants from '../../../../../utils/Constants';


export default function AddPopup() {

    var { curItem, dataRegency, dataRoles } = this.state;
    const { t } = this.props;

    var RowRoles = null;
    if (Libs.isArrayData(dataRoles)) {
        RowRoles = dataRoles.map((item, index) => {
            return (
                <li className="col-xl-4 col-lg-4 col-md-4 col-6" key={index}>
                    <RCheckbox
                        inputId={"role_" + item.id}
                        inputName="role"
                        labelClass="no-label"
                        checked={item.is_checked}
                        onChange={(e) => { this.handleRoleInputChange(e, index); }}
                        label={item.label}
                    />
                </li>
            );
        })
    }




    return (
        <Modal visible={true} className="modal-add" dialogClassName="modal-lg modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('employee.edit_title') : t('employee.add_title')}
                </h5>
                <span className="close" onClick={this.props.onClickCloseAdd.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">

                <div className="box-info">
                    <h2>{t('common.info')}</h2>
                    <div className="box-info-content">
                        <div className="row">

                            <div className="col-xl-12 col-lg-12 col-md-12vcol-12">
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
                                    <RText label={t('employee.first_name')}
                                        inputClass="form-control"
                                        required="required"
                                        inputId="first_name"
                                        inputName="first_name"
                                        value={curItem.first_name}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={100} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('employee.last_name')}
                                        inputClass="form-control"
                                        required="required"
                                        inputId="last_name"
                                        inputName="last_name"
                                        value={curItem.last_name}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={100} />
                                </div>
                            </div>



                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('employee.phone')}
                                        inputClass="form-control"
                                        required="required"
                                        inputId="phone"
                                        inputName="phone"
                                        value={curItem.phone}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9-+()._ ]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <CMSDatePicker
                                        label={t('employee.birthday')}
                                        value={curItem.birthday}
                                        inputId="birthday"
                                        format="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                        inputClass="form-control"
                                        inputName="birthday"
                                        minDate={curItem.min_date}
                                        handleChange={this.handleInputDateChange.bind(this)}
                                        maxLength={20}
                                        showIconCalendar={true}
                                    />
                                </div>
                            </div>


                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="mb-3">
                                    <div className="file-upload">
                                        <label>{t('employee.avatar')}</label>
                                        <ul className="row">
                                            <li className="col-md-12 col-12">
                                                <div className="item-add-file-upload">
                                                    <input onChange={(event) => this.onFileAvatarChange(event)} type="file" id="file_upload" name="file_upload" />
                                                    {!curItem.avatar_upload ?
                                                        <div className="add-file-upload">
                                                            <label htmlFor="file_upload" className="file-upload">
                                                                <i className="icon-picture-o"></i> <span>{t('common.upload_image')}</span>
                                                            </label>
                                                        </div>
                                                        : ""}

                                                    {!Libs.isBlank(curItem.file_upload) ?
                                                        <div className="view-file-upload">
                                                            <img alt="Upload" src={curItem.file_upload} />
                                                            <div className="file-upload-action">
                                                                <label className="edit" htmlFor="file_upload"><var className="icon-pencil-square-o"></var></label>
                                                            </div>
                                                        </div>
                                                        : (!Libs.isBlank(curItem.avatar_full) ?
                                                            <div className="view-file-upload">
                                                                <img alt="Upload" src={Constants.SERVER_DATA + "/"+ curItem.avatar_full} />
                                                                <div className="file-upload-action">
                                                                    <label className="edit" htmlFor="file_upload"><var className="icon-pencil-square-o"></var></label>
                                                                    <span className="delete" onClick={(e) => this.onClickDeleteAvatar(e)} ><var className="icon-trash-o"></var></span>
                                                                </div>
                                                            </div>
                                                            : "")}


                                                </div>
                                            </li>
                                        </ul>
                                        {!Libs.isBlank(curItem.file_message) ?
                                            <div className="alert alert-danger">
                                                {curItem.file_message}
                                            </div>
                                            : ''}

                                    </div>
                                </div>
                            </div>





                        </div>
                    </div>
                </div>



                <div className="box-info">
                    <h2>{t('employee.account_info')}</h2>
                    <div className="box-info-content">
                        <div className="row">
                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                        <div className="mb-3">
                                            <RText label={t('employee.email')}
                                                inputClass="form-control"
                                                required="required"
                                                inputId="email"
                                                inputName="email"
                                                value={curItem.email}
                                                disabled={curItem.screen_mode === Constants.SCREEN_MODE.EDIT ? true : false}
                                                onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                maxLength={200} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                        <div className="mb-3">
                                            <div className="group-password">
                                                <RText label={t('employee.password')}
                                                    inputClass="form-control"
                                                    required="required"
                                                    inputId="password"
                                                    inputName="password"
                                                    value={curItem.password}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                    maxLength={60} />
                                                <span onClick={this.generatePassword.bind(this)} className="generate-pass"> {t('employee.random')}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                        <div className="mb-3">
                                            <div className="group-password">
                                                <RText label={t('employee.re_password')}
                                                    inputClass="form-control"
                                                    required="required"
                                                    inputId="password_confirm"
                                                    inputName="password_confirm"
                                                    value={curItem.password_confirm}
                                                    onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                    maxLength={60} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>







                        </div>
                    </div>
                </div>


                <div className={!Libs.isBlank(curItem.role_message) ? "box-info input-error-role" : "box-info"}>
                    <h2>{t('employee.account_role_info')} <span className="required">*</span></h2>
                    <div className="box-info-content">
                        <div className="list-role">
                            <ul className="row">
                                {RowRoles}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-cancel" onClick={this.props.onClickCloseAdd.bind(this, false)}>{t('common.cancel')}</button>
                <button type="button" className="btn btn-save" onClick={this.onSave.bind(this)}>
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('common.update') : t('common.create')}
                </button>
            </div>
        </Modal>

    )
}