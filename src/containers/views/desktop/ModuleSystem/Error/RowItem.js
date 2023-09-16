import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { RSwitch } from '../../../../../components/Controls';
import Auth from '../../../../../utils/Auth';
import Constants from '../../../../../utils/Constants';
import Libs from '../../../../../utils/Libs';

class RowItem extends Component {
    onItemClick = () => {
        if (!this.props.onItemClick || typeof this.props.onItemClick !== 'function') return;
        this.props.onItemClick(this.props.index);
    }

    onItemClickDelete = () => {
        if (!this.props.onItemClickDelete || typeof this.props.onItemClickDelete !== 'function') return;
        this.props.onItemClickDelete(this.props.index);
    }
    /**
     * @description Status change event
     * @author long.pham 27-07-2019
     */
    onStatusChange = () => {
        if (!this.props.onStatusChange || typeof this.props.onStatusChange !== 'function') return;
        this.props.onStatusChange(this.props.index);
        return;
    }


    render() {
        var item = this.props.dataItem;
        const { t } = this.props;
        return (
            <div className="body-row" key={item.id}>
                <ReactTooltip />
                <div className="body-col width20">
                    <p><strong>{t('common.id')}:</strong> {item.id}</p><hr></hr>
                    <p><strong>{t('error.code')}:</strong> {item.error_code}</p>
                </div>
                <div className="body-col width20">

                    <p><strong>{t('error.field')}: </strong>{item.error_state_name}</p>
                    <hr></hr>
                    <p><strong>{t('error.id_error_type')}: </strong>{item.error_type_name}</p>
                    <hr></hr>
                    <p><strong>{t('error.id_error_level')}: </strong>{item.error_level_name}</p>
                </div>
                <div className="body-col width40">
                    <p><strong>{t('error.device')}:</strong> {item.device_group_name}</p> <hr></hr>
                    <p><strong>Message: </strong> {item.message}</p>
                    <hr></hr>
                    <p><strong>Description: </strong> {item.description}</p>
                    <hr></hr>
                    <p><strong>Solutions: </strong>{item.solutions}</p>
                </div>
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
