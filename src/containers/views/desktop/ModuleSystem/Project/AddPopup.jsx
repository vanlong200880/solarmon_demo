import React from 'react';
import { RText, RTextArea } from '../../../../../components/Controls';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';
import FormReactSelect from '../../../../../components/FormReactSelect';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import Libs from '../../../../../utils/Libs';
import RowItemEmployee from './RowItemEmployee';

export default function AddPopup() {

    var { curItem, allLanguage, dataProjectGroup, dataListEmployee } = this.state;
    const { t } = this.props;
    var tabNavLanguage, tabContent = null;

    if (allLanguage) {
        tabNavLanguage = allLanguage.map((language, index) => {
            return (<li key={index} className="nav-item">
                <span onClick={(e) => { this.onClickShowTab(e, language.iso_code) }} className={curItem.tabActive === language.iso_code ? "nav-link active" : "nav-link"} id={"name-tab-" + language.iso_code} >{language.name}</span>
            </li>);
        });

        tabContent = allLanguage.map((language, index) => {
            return (
                <div key={index} className={curItem.tabActive === language.iso_code ? "tab-pane fade show active" : "tab-pane fade"} id={"name-" + language.iso_code} role="tabpanel" aria-labelledby="home-tab">
                    <div className="info">
                        <div className="row">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="mb-3">
                                    <RText label={t('project.name')}
                                        inputClass="form-control"
                                        required={language.is_default === 1 ? "required" : ""}
                                        inputId={"name_" + language.iso_code}
                                        inputName={"name_" + language.iso_code}
                                        value={curItem.data[index].name}
                                        onChange={(e) => { this.handleInputTranslateChange(e); this.validateOne(e); }}
                                        maxLength={200} />
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="mb-3">
                                    <RText label={t('project.site_name')}
                                        inputClass="form-control"
                                        inputId={"site_name_" + language.iso_code}
                                        inputName={"site_name_" + language.iso_code}
                                        value={curItem.data[index].site_name}
                                        onChange={(e) => { this.handleInputTranslateChange(e); this.validateOne(e); }}
                                        maxLength={200} />
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                <div className="mb-3">
                                    <RTextArea label={t('project.description')}
                                        inputClass="form-control"
                                        inputId={"description_" + language.iso_code}
                                        inputName={"description_" + language.iso_code}
                                        value={curItem.data[index].description}
                                        onChange={(e) => { this.handleInputTranslateChange(e); this.validateOne(e); }}
                                        maxLength={400} />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            );
        });
    }


    var RowItemEmployees = null;
    if (Libs.isArrayData(dataListEmployee)) {
        RowItemEmployees = dataListEmployee.map((item, index) => {
            return (
                <RowItemEmployee
                    key={'row_item_' + index}
                    index={index}
                    dataItem={item}
                    dataEmployees={Libs.isArrayData(curItem.dataEmployees) ? curItem.dataEmployees : []}
                    onIsCheckedChange={this.onIsCheckedChange}
                />
            );
        })
    }

    return (
        <Modal visible={true} className="modal-add" dialogClassName="modal-lg modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('project.edit_title') : t('project.add_title')}
                </h5>
                <span className="close" onClick={this.props.onClickCloseAdd.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <div className="box-info">
                    <h2>{t('common.info')}</h2>
                    <div className="box-info-content">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <FormReactSelect
                                        label={t('project.id_project_group')}
                                        instanceId="id_project_group"
                                        className="id_project_group"
                                        name="id_project_group"
                                        required="required"
                                        value={dataProjectGroup.filter(function (item) { return item.id === curItem.id_project_group })}
                                        onChange={(e) => { this.handleDropdownChange(e, 'id_project_group'); }}
                                        optionList={dataProjectGroup}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <CMSDatePicker
                                        label={t('project.installed_date')}
                                        required="required"
                                        value={curItem.installed_date}
                                        inputId="installed_date"
                                        format="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                        inputClass="form-control"
                                        inputName="installed_date"
                                        handleChange={(e) => { this.handleInputDateChange(e); this.validateOne(e); }}
                                        maxLength={20}
                                        showIconCalendar={true}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
                                <div className="mb-3">
                                    <RText label={t('project.address')}
                                        required="required"
                                        inputClass="form-control"
                                        inputId="address"
                                        inputName="address"
                                        value={curItem.address}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={500} />
                                </div>
                            </div>


                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('project.lat')}
                                        required="required"
                                        inputClass="form-control"
                                        inputId="lat"
                                        inputName="lat"
                                        value={curItem.lat}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9-.]*$"
                                        maxLength={20} />
                                </div>
                            </div>


                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('project.lng')}
                                        required="required"
                                        inputClass="form-control"
                                        inputId="lng"
                                        inputName="lng"
                                        value={curItem.lng}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        pattern="^[0-9-.]*$"
                                        maxLength={20} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('project.installed_power')}
                                        required="required"
                                        inputClass="form-control"
                                        inputId="installed_power"
                                        inputName="installed_power"
                                        value={curItem.installed_power}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={60} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('project.installed_power_client')}
                                        required="required"
                                        inputClass="form-control"
                                        inputId="installed_power_client"
                                        inputName="installed_power_client"
                                        value={curItem.installed_power_client}
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={60} />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <CMSDatePicker
                                        label={t('project.commisioning_date')}
                                        value={curItem.commisioning_date}
                                        required="required"
                                        inputId="commisioning_date"
                                        format="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                        inputClass="form-control"
                                        inputName="commisioning_date"
                                        minDate={curItem.min_date}
                                        handleChange={(e) => { this.handleInputDateChange(e); this.validateOne(e); }}
                                        maxLength={20}
                                        showIconCalendar={true}
                                    />
                                </div>
                            </div>

                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <CMSDatePicker
                                        label={t('project.last_updated')}
                                        value={curItem.last_updated}
                                        inputId="last_updated"
                                        format="DD/MM/YYYY"
                                        dateFormat="dd/MM/yyyy"
                                        inputClass="form-control"
                                        inputName="last_updated"
                                        minDate={curItem.min_date}
                                        handleChange={(e) => { this.handleInputDateChange(e); this.validateOne(e); }}
                                        maxLength={20}
                                        showIconCalendar={true}
                                    />
                                </div>
                            </div>


                            <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                                <div className="mb-3">
                                    <RText label={t('project.menu_order')}
                                        inputClass="form-control"
                                        inputId="menu_order"
                                        inputName="menu_order"
                                        value={curItem.menu_order}
                                        pattern="^[0-9]*$"
                                        onChange={(e) => { this.handleInputChange(e); this.validateOne(e); }}
                                        maxLength={200} />
                                </div>
                            </div>



                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <div className="mb-3">
                                    <div className="file-upload">
                                        <label>{t('project.avatar')}</label>
                                        <ul className="row">
                                            <li className="col-md-12 col-12">
                                                <div className="item-add-file-upload">
                                                    <input onChange={(event) => this.onFileAvatarChange(event)} type="file" id="upload_thumbnail" name="upload_thumbnail" />
                                                    {!curItem.upload_thumbnail ?
                                                        <div className="add-file-upload">
                                                            <label htmlFor="upload_thumbnail" className="file-upload">
                                                                <i className="icon-picture-o"></i> <span>{t('common.upload_image')}</span>
                                                            </label>
                                                        </div>
                                                        : ""}

                                                    {!Libs.isBlank(curItem.upload_thumbnail) ?
                                                        <div className="view-file-upload">
                                                            <img alt="Upload" src={curItem.upload_thumbnail} />
                                                            <div className="file-upload-action">
                                                                <label className="edit" htmlFor="file_upload"><var className="icon-pencil-square-o"></var></label>
                                                            </div>
                                                        </div>
                                                        : (!Libs.isBlank(curItem.thumbnail) ?
                                                            <div className="view-file-upload">
                                                                <img alt="Upload" src={Constants.SERVER_DATA + "/" + curItem.thumbnail} />
                                                                <div className="file-upload-action">
                                                                    <label className="edit" htmlFor="upload_thumbnail"><var className="icon-pencil-square-o"></var></label>
                                                                    <span className="delete" onClick={(e) => this.onClickDeleteAvatar(e)} ><var className="icon-trash-o"></var></span>
                                                                </div>
                                                            </div>
                                                            : "")}


                                                </div>
                                            </li>
                                        </ul>
                                        {!Libs.isBlank(curItem.thumbnail_message) ?
                                            <div className="alert alert-danger">
                                                {curItem.thumbnail_message}
                                            </div>
                                            : ''}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="box-translate">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="tab-main">
                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    {tabNavLanguage}
                                </ul>
                                <div className="tab-content" id="tabContent">
                                    {tabContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="box-info">
                    <h2>{t('project.account_manage')}</h2>
                    <div className="box-info-content">
                        <div className="project-user-manage">
                            <div className="data-view">
                                <div className="main-header">
                                    <div className="header-row">
                                        <div className="header-col width10"><p>{t('employee.id')}</p></div>
                                        <div className="header-col width45"><p>{t('employee.fullname')}</p></div>
                                        <div className="header-col width45"><p>{t('employee.email')}</p></div>
                                    </div>
                                </div>
                                <div className="main-body">
                                    <div className="body">
                                        {RowItemEmployees ? RowItemEmployees : <div className="data-empty">{t('common.data_empty')}</div>}
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
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('common.update') : t('common.create')}
                </button>
            </div>
        </Modal>

    )
}