import React, { Component } from 'react';
class RowItemHardware extends Component {
    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row" key = {item.id}>
                <div className="body-col width30"><p>{item.name} </p></div>
                <div className="body-col width30 text-break"><p>{item.slug} </p></div>
                <div className="body-col width20"><p>{item.value}</p></div>
                <div className="body-col width20"><p>{item.unit}</p></div>
            </div>
        );
    }
}
export default RowItemHardware;
