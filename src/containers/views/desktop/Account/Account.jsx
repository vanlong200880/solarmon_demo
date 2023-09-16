import React from 'react';
import { RText } from '../../../../components/Controls';
import CMSDatePicker from '../../../../components/CMSDatePicker/CMSDatePicker';
import Libs from '../../../../utils/Libs';
import AddChangePassword from './AddChangePassword';


export default function Account() {
    var { t } = this.props;
    var { curItem } = this.state;

    var layoutAddChangePassword = this.state.add ?
        <AddChangePassword
            onCloseChangePassword={this.onCloseChangePassword}
            auth={this.props.auth}
            curItem={curItem}
            actions={this.actions}
            t={t}
        /> : ""
    return (
        <div className="account">
            {layoutAddChangePassword}
            <div className="row">
                <div className="col-md-12">
                    <div className="page-breadcrumb">
                        <div className="row">
                            <div className="col-md-12"><h2>{t('account.title')}</h2>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-account">
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-6">
                                        <div className="mb-3">
                                            <ul>
                                                <li><div className="add" onClick={this.onAddChangePassword.bind(this)}>{t('employee.change_password')}</div></li>
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-4 col-6">
                                        <div className="mb-3">
                                            <RText label={t('employee.first_name')}
                                                inputClass="form-control"
                                                inputId="first_name"
                                                inputName="first_name"
                                                required="required"
                                                value={curItem.first_name}
                                                onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                maxLength={100} />
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-4 col-6">
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

                                    <div className="col-xl-6 col-lg-6 col-md-4 col-6">
                                        <div className="mb-3">
                                            <RText label={t('employee.email')}
                                                inputClass="form-control"
                                                inputId="email"
                                                inputName="email"
                                                value={curItem.email}
                                                disabled={true}
                                                onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                maxLength={200} />
                                        </div>
                                    </div>






                                    <div className="col-xl-6 col-lg-6 col-md-4 col-6">
                                        <div className="mb-3">
                                            <RText label={t('employee.phone')}
                                                inputClass="form-control"
                                                inputId="phone"
                                                inputName="phone"
                                                value={curItem.phone}
                                                onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                                pattern="^[0-9-+()._ ]*$"
                                                maxLength={20} />
                                        </div>
                                    </div>

                                    <div className="col-xl-6 col-lg-6 col-md-4 col-6">
                                        <div className="mb-3">
                                            <CMSDatePicker
                                                label={t('employee.birthday')}
                                                value={curItem.birthday}
                                                inputId="birthday"
                                                format="DD/MM/YYYY"
                                                dateFormat="dd/MM/yyyy"
                                                inputClass="form-control"
                                                inputName="birthday"
                                                maxDate={curItem.max_date}
                                                handleChange={this.handleInputDateChange.bind(this)}
                                                maxLength={20}
                                                showIconCalendar={true}
                                            />
                                        </div>
                                    </div>




                                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                        <div className="row">
                                            <div className="col-xl-4 col-lg-4 col-md-4 col-6">
                                                <div className="mb-3">
                                                    <div className="file-upload">
                                                        <label>{t('employee.avatar')}</label>
                                                        <ul className="row">
                                                            <li className="col-md-12 col-12">
                                                                <div className="item-add-file-upload">
                                                                    <input onChange={(event) => this.onFileAvatarChange(event)} type="file" id="file_upload" name="file_upload" />
                                                                    {!curItem.file_upload ?
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
                                                                                <img alt="Upload" src={curItem.avatar_full} />
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

                                    <div className="col-xl-12 col-lg-12 col-md-12 col-6">
                                        <div className="mb-3">
                                            <button type="button" className="btn btn-save" onClick={this.onSaveAction.bind(this)}> {t('common.save')} </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}