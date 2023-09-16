import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { RSwitch } from '../../../../../components/Controls';
import Auth from '../../../../../utils/Auth';
import Constants from '../../../../../utils/Constants';

class RowItemDevice extends Component {
    onItemClick = () => {
        if (!this.props.onItemClick || typeof this.props.onItemClick !== 'function') return;
        this.props.onItemClick(this.props.index);
    }

    onClickDeleteDevice = () => {
        if (!this.props.onClickDeleteDevice || typeof this.props.onClickDeleteDevice !== 'function') return;
        this.props.onClickDeleteDevice(this.props.index);
    }
    /**
     * @description Status change event
     * @author long.pham 27-07-2019
     */
    onIsVirtualChange = () => {
        if (!this.props.onIsVirtualChange || typeof this.props.onIsVirtualChange !== 'function') return;
        this.props.onIsVirtualChange(this.props.index);
        return;
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
                <div className="body-col width20"><p><strong>{item.name}</strong> </p></div>
                <div className="body-col width10"><p>{item.model} </p></div>
                <div className="body-col width10"><p>{item.serial_number}</p></div>
                <div className="body-col width10"><p>{item.device_type_name}</p></div>
                <div className="body-col width10"><p>{item.manufacturer}</p></div>
                <div className="body-col width10 text-center">
                    <div className="checkmark">
                        <RSwitch
                            inputId={"is_share" + item.id}
                            inputName="is_share"
                            checked={(item.is_share * 1 === 1) ? 1 : 0}
                            readOnly = {true}
                            disabled = {true}
                        />
                    </div>

                </div>

                <div className="body-col width10 text-center">
                    <div className="checkmark">
                        <RSwitch
                            inputId={"is_virtual_" + item.id}
                            inputName="is_virtual"
                            checked={(item.is_virtual * 1 === 1) ? 1 : 0}
                            disabled={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.APPROVAL) ? false : true}
                            onChange={this.onIsVirtualChange.bind(this)}
                        />
                    </div>
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
                            {item.is_share != 1 ?
                                <li className={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.EDIT) ? '' : 'disabled'} onClick={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.EDIT) ? this.onItemClick.bind(this) : ''} data-tip={t('common.edit')} data-type="warning" data-class="tooltip-action"><var className="icon-pencil-square-o" aria-hidden="true"></var></li>
                                : ""}
                            <li className={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.DEL) ? '' : 'disabled'} onClick={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.DEL) ? this.onClickDeleteDevice.bind(this) : ''} data-tip={t('common.delete')} data-type="warning" data-class="tooltip-action"><var className="icon-trash-o" aria-hidden="true"></var></li>
                        </ul>
                    </div>
                </div>

            </div>
        );
    }
}
export default RowItemDevice;
