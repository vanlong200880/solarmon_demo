import React, { Component } from 'react';
import Libs from '../../../../../utils/Libs';
import { RCheckbox } from '../../../../../components/Controls';
import Auth from '../../../../../utils/Auth';
import Constants from '../../../../../utils/Constants';
class RowItem extends Component {
    constructor(props) {
        super(props);
    }
    /**
     * @description click item level 1
     * @author long.pham 27-07-2019
     */
    onClickItemLevel1 = () => {
        if (!this.props.onClickItemLevel1 || typeof this.props.onClickItemLevel1 !== 'function') return;
        this.props.onClickItemLevel1(this.props.index, this.props.id);
    }

    /**
     * @description click item level 2
     * @author long.pham 27-07-2019
     */
    onClickItemLevel2 = (index, id) => {
        if (!this.props.onClickItemLevel2 || typeof this.props.onClickItemLevel2 !== 'function') return;
        this.props.onClickItemLevel2(index, id, this.props.index);
    }


    render() {
        var item = this.props.dataItem;
        var roleFullPermission = ["/dashboard", "/profile"];
        
        return (
            <div className="main-level" key={this.props.index}>
                <div className="body-row">
                    <div className="body-col screen-name">
                        <p className={item.parent != null ? "level" : ""}>
                            {item.screen_name}
                        </p>
                    </div>

                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"full_" + item.id}
                                inputName="full"
                                labelClass="no-label"
                                checked={(item.auths === Constants.AUTH_MODE.FULL)  ? 1 : 0}
                                onChange={(e) => { this.props._selectFullCheckedChange(e, item, this.props.index) }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.VIEW)) ? true : false}
                            />
                        </p>
                    </div>

                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"view_" + item.id}
                                inputName="view"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.VIEW) ? 1 : 0}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.VIEW, Constants.AUTH_MODE.VIEW, this.props.index); }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.VIEW)) ? true : false}
                            />
                        </p>
                    </div>

                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"new_" + item.id}
                                inputName="new"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.NEW) ? 1 : 0}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.NEW, Constants.AUTH_MODE.NEW, this.props.index); }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.NEW)) ? true : false}
                            />
                        </p>
                    </div>

                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"del_" + item.id}
                                inputName="del"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.DEL) ? 1 : 0}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.DEL, Constants.AUTH_MODE.DEL, this.props.index); }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.DEL)) ? true : false}
                            />
                        </p>
                    </div>

                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"edit_" + item.id}
                                inputName="edit"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.EDIT) ? 1 : 0}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.EDIT, Constants.AUTH_MODE.EDIT, this.props.index); }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.EDIT)) ? true : false}
                            />
                        </p>
                    </div>
                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"excel_" + item.id}
                                inputName="excel"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.EXCEL) ? 1 : 0}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.EXCEL, Constants.AUTH_MODE.EXCEL, this.props.index); }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.EXCEL)) ? true : false}
                            />
                        </p>
                    </div>

                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"pdf_" + item.id}
                                inputName="pdf"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.PDF) ? 1 : 0}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.PDF, Constants.AUTH_MODE.PDF, this.props.index); }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.PDF)) ? true : false}
                            />
                        </p>
                    </div>


                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"print_" + item.id}
                                inputName="print"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.PRINT) ? 1 : 0}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.PRINT, Constants.AUTH_MODE.PRINT, this.props.index); }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.PRINT)) ? true : false}
                            />
                        </p>
                    </div>



                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"translate_" + item.id}
                                inputName="translate"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.TRANSLATE) ? 1 : 0}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.TRANSLATE, Constants.AUTH_MODE.TRANSLATE, this.props.index); }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.TRANSLATE)) ? true : false}
                            />
                        </p>
                    </div>




                    <div className="body-col widthfix80">
                        <p>
                            <RCheckbox
                                inputId={"approval_" + item.id}
                                inputName="approval"
                                labelClass="no-label"
                                checked={Libs.checkBitOnOff(item.auths, Constants.AUTH_MODE.APPROVAL) ? 1 : 0}
                                onChange={(e) => { this.props.handleInputChange(e, item, Constants.AUTH_DATA_KEY.APPROVAL, Constants.AUTH_MODE.APPROVAL, this.props.index); }}
                                // disabled={(roleFullPermission.includes(item.path) || !Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.APPROVAL)) ? true : false}
                            />
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
export default RowItem;
