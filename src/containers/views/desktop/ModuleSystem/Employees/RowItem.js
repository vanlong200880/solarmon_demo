import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { RSwitch } from '../../../../../components/Controls';
import Auth from '../../../../../utils/Auth';
import Constants from '../../../../../utils/Constants';
import Libs from '../../../../../utils/Libs';

class RowItem extends Component {
    onStatusChange = () => {
        if (!this.props.onStatusChange || typeof this.props.onStatusChange !== 'function') return;
        this.props.onStatusChange(this.props.index);
    }

    onItemClick = () => {
        if (!this.props.onItemClick || typeof this.props.onItemClick !== 'function') return;
        this.props.onItemClick(this.props.index);
    }

    onItemClickDelete = () => {
        if (!this.props.onItemClickDelete || typeof this.props.onItemClickDelete !== 'function') return;
        this.props.onItemClickDelete(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        const { t } = this.props;

        var role_name = null;
        var roleNameStr = item.role_name;
        var roleNameArr = [];
        if (!Libs.isBlank(roleNameStr)) {
            roleNameArr = roleNameStr.split(',');
        }
        
        if (Libs.isArrayData(roleNameArr)) {
            role_name = roleNameArr.map((itemR, index) => {
                return <p key={index}><span>{itemR}</span></p>
            });
        }


        return (
            <div className="body-row" key={item.id}>
                <ReactTooltip />
                <div className="body-col width10"><p>{item.id} </p></div>
                <div className="body-col width25"><p><strong>{item.full_name} </strong></p>
                </div>
                <div className="body-col width25"><p>{item.email}</p></div>
                <div className="body-col width20">{role_name}</div>
                <div className="body-col width10 text-center">
                    <div className="checkmark">
                        <RSwitch
                            inputId={"status_" + item.id}
                            inputName="status"
                            checked={(item.status * 1 === 1) ? 1 : 0}
                            disabled={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.APPROVAL) ? false : true}
                            onChange={this.onStatusChange.bind(this)}
                        />
                    </div>

                </div>

                <div className="body-col width10">
                    <div className="functions">
                        <ul>
                            <li className={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.EDIT) ? '' : 'disabled'} onClick={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.EDIT) ? this.onItemClick.bind(this) : null} data-tip={t('common.edit')} data-type="warning" data-class="tooltip-action"><var className="icon-pencil-square-o" aria-hidden="true"></var></li>
                            <li className={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.DEL) ? '' : 'disabled'} onClick={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.DEL) ? this.onItemClickDelete.bind(this) : null} data-tip={t('common.delete')} data-type="warning" data-class="tooltip-action"><var className="icon-trash-o" aria-hidden="true"></var></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default RowItem;
