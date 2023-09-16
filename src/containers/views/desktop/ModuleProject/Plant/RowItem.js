import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import Libs from '../../../../../utils/Libs';

class RowItem extends Component {
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
