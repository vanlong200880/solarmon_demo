import React from 'react';
import { RText, RTextArea } from '../../../../../components/Controls';
import Modal from 'react-bootstrap4-modal';
import Constants from '../../../../../utils/Constants';
import FormReactSelect from '../../../../../components/FormReactSelect';
import CMSDatePicker from '../../../../../components/CMSDatePicker/CMSDatePicker';
import Libs from '../../../../../utils/Libs';
import { Tree, TreeNode } from 'react-organizational-chart';
import styled from 'styled-components';


export default function SingleLinePopup() {

    var { curItem, allLanguage, dataProjectGroup } = this.state;
    const { t } = this.props;

    const StyledNode = styled.div`
        padding: 5px;
        border-radius: 8px;
        display: inline-block;
        border: 1px solid red;
    `;

    return (
        <Modal visible={true} className="modal-add" dialogClassName="modal-lg modal-dialog-scrollable full-screen" >
            <div className="modal-header">
                <h5 className="modal-title">
                    Single line diagram
                </h5>
                <span className="close" onClick={this.props.onClickCloseSingleLine.bind(this, false)}><var className="icon-cancel-music"></var></span>
            </div>
            <div className="modal-body">
                <Tree
                    lineWidth={'2px'}
                    lineColor={'green'}
                    lineBorderRadius={'10px'}
                    lineHeight={"50px"}
                    label={<StyledNode>Power Grid</StyledNode>}
                >
                    {/* <TreeNode label={<StyledNode>Child 1</StyledNode>}>
                        <TreeNode label={<StyledNode>Grand Child</StyledNode>} />
                    </TreeNode> */}
                    <TreeNode label={<StyledNode>Revenue Meter</StyledNode>}>
                        <TreeNode label={<StyledNode>AMI Meter</StyledNode>}>
                            <TreeNode label={<StyledNode>Inverter 1</StyledNode>}>
                            <TreeNode label={<StyledNode><p><img style={{width: "80px"}} src="/solar-panel.png"></img></p><p>String 1 to 192.1.1.1</p></StyledNode>} />
                            </TreeNode>
                            <TreeNode label={<StyledNode>Inverter 2</StyledNode>}>
                            <TreeNode label={<StyledNode><p><img style={{width: "80px"}} src="/solar-panel.png"></img></p><p>String 1 to 192.1.1.1</p></StyledNode>} />
                            </TreeNode>
                            <TreeNode label={<StyledNode>Inverter 3</StyledNode>}>
                            <TreeNode label={<StyledNode><p><img style={{width: "80px"}} src="/solar-panel.png"></img></p><p>String 1 to 192.1.1.1</p></StyledNode>} />
                            </TreeNode>
                            <TreeNode label={<StyledNode>Inverter 4</StyledNode>}>
                            <TreeNode label={<StyledNode><p><img style={{width: "80px"}} src="/solar-panel.png"></img></p><p>String 1 to 192.1.1.1</p></StyledNode>} />
                            </TreeNode>
                            <TreeNode label={<StyledNode>Inverter 5</StyledNode>}>
                            <TreeNode label={<StyledNode><p><img style={{width: "80px"}} src="/solar-panel.png"></img></p><p>String 1 to 192.1.1.1</p></StyledNode>} />
                            </TreeNode>
                            <TreeNode label={<StyledNode>Inverter 6</StyledNode>}>
                            <TreeNode label={<StyledNode><p><img style={{width: "80px"}} src="/solar-panel.png"></img></p><p>String 1 to 192.1.1.1</p></StyledNode>} />
                            </TreeNode>
                            <TreeNode label={<StyledNode>Inverter 7</StyledNode>}>
                            <TreeNode label={<StyledNode><p><img style={{width: "80px"}} src="/solar-panel.png"></img></p><p>String 1 to 192.1.1.1</p></StyledNode>} />
                            </TreeNode>
                            <TreeNode label={<StyledNode>Inverter 8</StyledNode>}>
                            <TreeNode label={<StyledNode><p><img style={{width: "80px"}} src="/solar-panel.png"></img></p><p>String 1 to 192.1.1.1</p></StyledNode>} />
                            </TreeNode>
                            <TreeNode label={<StyledNode>Inverter 9</StyledNode>}>
                                <TreeNode label={<StyledNode><p><img style={{width: "80px"}} src="/solar-panel.png"></img></p><p>String 1 to 192.1.1.1</p></StyledNode>} />
                            </TreeNode>
                        </TreeNode>
                    </TreeNode>
                    {/* <TreeNode label={<StyledNode>Child 3</StyledNode>}>
                        <TreeNode label={<StyledNode> <img src='/solar-panel.png' /></StyledNode>} />
                        <TreeNode label={<StyledNode>Grand Child 2</StyledNode>} />
                    </TreeNode> */}
                </Tree>
                {/* <img src="/demo.jpg" /> */}

            </div>

        </Modal>

    )
}