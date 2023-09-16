import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { RSwitch } from '../../../../../../components/Controls';
import Auth from '../../../../../../utils/Auth';
import Constants from '../../../../../../utils/Constants';
import Libs from '../../../../../../utils/Libs';

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
            <div className="body-row" key = {item.id}>
                <ReactTooltip />
                <div className="body-col width25"><p>{item.name} </p></div>
                <div className="body-col width15"><p>{item.power}</p></div>
                <div className="body-col width15"><p>{item.irradiance}</p></div>
                <div className="body-col width15"><p>{item.today}</p></div>
                <div className="body-col width15"><p>{item.lifetime}</p></div>
                <div className="body-col width15"><p>{Libs.formatNum(item.revenue, '#.###.##')}</p></div>
            </div>
        );
    }
}
export default RowItem;
