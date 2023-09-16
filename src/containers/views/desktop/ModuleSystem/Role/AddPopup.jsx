import React from 'react';
import { RText, RTextArea } from '../../../../../components/Controls';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';


export default function AddPopup() {

    var { curItem, allLanguage } = this.state;
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
                                    <RText label={t('role.name')}
                                        inputClass="form-control"
                                        required={language.is_default === 1 ? "required" : ""}
                                        inputId={"name_" + language.iso_code}
                                        inputName={"name_" + language.iso_code}
                                        value={curItem.data[index].name}
                                        onChange={(e) => { this.handleInputTranslateChange(e); this.validateOne(e); }}
                                        maxLength={100} />
                                </div>
                            </div>

                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

                                <div className="mb-3">
                                    <RTextArea label={t('role.description')}
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


    return (
        <Modal visible={true} className="modal-add" dialogClassName="modal-lg modal-dialog-scrollable" >
            <div className="modal-header">
                <h5 className="modal-title">
                    {(curItem.screen_mode === Constants.SCREEN_MODE.EDIT) ? t('role.edit_title') : t('role.add_title')}
                    </h5>
                <span className="close" onClick={this.props.onClickCloseAdd.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">

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