import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { RCheckbox } from '../../../../components/Controls';
import Auth from '../../../../utils/Auth';
import Constants from '../../../../utils/Constants';
import Libs from '../../../../utils/Libs';

class RowItem extends Component {
    onItemClick = () => {
        if (!this.props.onItemClick || typeof this.props.onItemClick !== 'function') return;
        this.props.onItemClick(this.props.index);
    }


    handleCheckItemInputChange = () => {
        if (!this.props.handleCheckItemInputChange || typeof this.props.handleCheckItemInputChange !== 'function') return;
        this.props.handleCheckItemInputChange(this.props.index);
    }

    onItemClickDelete = () => {
        if (!this.props.onItemClickDelete || typeof this.props.onItemClickDelete !== 'function') return;
        this.props.onItemClickDelete(this.props.index);
    }


    render() {
        var item = this.props.dataItem;
        const { t } = this.props;
        return (
            <div className="body-row" key={item.id}>
                <ReactTooltip />
                <div className="body-col width5">
                    <p className="d-inline-block"> <img style={{ width: "20px", height: "20px" }} src={Constants.SERVER_DATA + "/" + item.thumbnail} /> </p>
                </div>


                <div className="body-col width10">
                    <p className="d-inline-block">{item.id} </p>
                </div>
                <div className="body-col width10">
                    <p>{item.error_type_name}</p>
                </div>
                <div className="body-col width10"><p>{item.error_level_name} </p></div>
                <div className="body-col width25">
                <p className="text-truncate">
                    <NavLink to = {"/project/"+item.hash_id + "/activities"} ><strong>Project: {item.project_name}</strong></NavLink>
                    </p>
                    <p className="text-truncate">Device: {item.name}</p>
                    <p data-for={"tooltip_" + this.props.index} className="d-inline-block text-truncate" style={{ maxWidth: '100%' }} data-tip={""} data-type="error" data-class="tooltip-action custom-tooltip">
                        {!Libs.isBlank(item.message) ? item.message : item.description}
                    </p>
                    <ReactTooltip id={"tooltip_" + this.props.index}>
                        <div className="error-content">
                            <h2>issue</h2>
                            <div className="content">
                                {!Libs.isBlank(item.message) ? <p><strong>{t('activities.message')}:</strong> {item.message}</p> : ""}
                                {!Libs.isBlank(item.description) ? <p><strong>{t('activities.description')}:</strong> {item.description}</p> : ""}
                                {!Libs.isBlank(item.solutions) ? <p><strong>{t('activities.solutions')}:</strong> {item.solutions}</p> : ""}
                            </div>
                        </div>
                    </ReactTooltip>
                </div>
                <div className="body-col width10">
                    <p>
                        {item.status == 1 ? <span className="opened">{t('activities.opened')}</span> : <span className="closed">{t('activities.close')}</span>}
                    </p>
                </div>
                <div className="body-col width10"><p>{item.start_date_format}</p></div>
                <div className="body-col width10">
                    <p>
                        {item.times_ago > 0 ? item.times_ago : ""}
                        {" " + t("common." + item.times_ago_unit)}
                        {item.times_ago > 1 && "s"}
                    </p>
                </div>

                <div className="body-col width5">
                    <div className="functions">
                        <ul>
                            <li className={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.EDIT) ? '' : 'disabled'} onClick={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.EDIT) ? this.onItemClick.bind(this) : ''} data-tip={t('common.view')} data-type="warning" data-class="tooltip-action"><var className="icon-eye" aria-hidden="true"></var></li>
                            <li className={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.DEL) ? '' : 'disabled'} onClick={Auth.getPermisson(this.props.actions, Constants.AUTH_MODE.DEL) ? this.onItemClickDelete.bind(this) : ''} data-tip={t('common.delete')} data-type="warning" data-class="tooltip-action"><var className="icon-trash-o" aria-hidden="true"></var></li>
                        </ul>
                    </div>
                </div>

                <div className="body-col width5 text-end">
                    <RCheckbox
                        inputId={"alert_" + item.id}
                        inputName="alert"
                        labelClass="no-label"
                        checked={item.is_checked}
                        onChange={(e) => { this.handleCheckItemInputChange(e, this.props.index); }}
                        label={item.label}
                    />
                </div>

            </div>
        );
    }
}
export default RowItem;
