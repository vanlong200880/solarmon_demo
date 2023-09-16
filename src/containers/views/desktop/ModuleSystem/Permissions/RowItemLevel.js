import React, { Component } from 'react';
import Libs from '../../../../../utils/Libs';
import { RCheckbox } from '../../../../../components/Controls';
import Constants from '../../../../../utils/Constants';

class RowItemLevel extends Component {
    constructor(props) {
        super(props);
    }

    /**
     * @description click item level 1
     * @author long.pham 27-07-2019
     */
    onClickItemLevel2 = () => {
        if (!this.props.onClickItemLevel2 || typeof this.props.onClickItemLevel2 !== 'function') return;
        this.props.onClickItemLevel2(this.props.index, this.props.id);
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row" key={this.props.index}>
                    <div className="body-col screen-name">
                        <p className="level">
                            {item.has_child ?
                                <span onClick={this.onClickItemLevel2.bind(this)}>
                                    <i className={item.collapse == 1 ? 'fa fa-minus-circle' : 'fa fa-plus-circle'} aria-hidden="true"></i>{item.screen_name}
                                </span>
                                :
                                <span>
                                    <i className='fa fa-minus-circle' aria-hidden="true"></i>{item.screen_name}
                                </span>
                            }

                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"full_" + this.props.id}
                                inputName="full"
                                labelClass="no-label"
                                checked={(item.auths === Constants.AUTH_MODE.FULL) || (Constants.AUTH_MODE.FULL - item.auths === 256)}
                                onChange={(e) => { this.props._selectFullCheckedChange(e, item, this.props.index) }}
                                // onChange={(e) => { this.props.handleInputChange(e, this.props.index, item.id, 2, this.props.rootIndex, this.props.rootIndexLevel1); }} 
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"new_" + this.props.id}
                                inputName="new"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.NEW)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.NEW, Constants.AUTH_MODE.NEW, this.props.index); }}
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"edit_" + this.props.id}
                                inputName="edit"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.EDIT)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.EDIT, Constants.AUTH_MODE.EDIT, this.props.index); }}
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"delete_" + this.props.id}
                                inputName="delete"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.DEL)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.DEL, Constants.AUTH_MODE.DEL, this.props.index); }}
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"view_" + this.props.id}
                                inputName="view"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.VIEW)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.VIEW, Constants.AUTH_MODE.VIEW, this.props.index); }}
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"print_" + this.props.id}
                                inputName="print"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.PRINT)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.PRINT, Constants.AUTH_MODE.PRINT, this.props.index); }}
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"import_" + this.props.id}
                                inputName="import"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.APPROVAL)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.APPROVAL, Constants.AUTH_MODE.APPROVAL, this.props.index); }}
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"export_pdf_id" + this.props.id}
                                inputName="export_pdf"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.PDF)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.PDF, Constants.AUTH_MODE.PDF, this.props.index); }}
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"export_excel_" + this.props.id}
                                inputName="export_excel"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.EXCEL)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.EXCEL, Constants.AUTH_MODE.EXCEL, this.props.index); }}
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"translate_" + this.props.id}
                                inputName="translate"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.TRANSLATE)}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.TRANSLATE, Constants.AUTH_MODE.TRANSLATE, this.props.index); }}
                            />
                        </p>
                    </div>
                </div>

        );
    }
}
export default RowItemLevel;
