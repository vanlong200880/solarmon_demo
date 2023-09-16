import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { RCheckbox } from '../../../../../../components/Controls';

class RowItemDevice extends Component {
    /**
     * @description Status change event
     * @author long.pham 27-07-2019
     */
    onIsCheckedChange = () => {
        if (!this.props.onIsCheckedChange || typeof this.props.onIsCheckedChange !== 'function') return;
        this.props.onIsCheckedChange(this.props.index);
        return;
    }

    render() {
        var item = this.props.dataItem;
        return (
            <div className="body-row" key={item.id}>
                <ReactTooltip />
                <div className="body-col width10">
                    <div className="checkmark">
                        <RCheckbox
                            inputId={"is_checked_" + item.id}
                            inputName="is_checked"
                            checked={(item.is_checked * 1 === 1) ? 1 : 0}
                            onChange={this.onIsCheckedChange.bind(this)}
                        />
                    </div>
                </div>
                <div className="body-col width20"><p>{item.name} </p></div>
                <div className="body-col width15"><p>{item.model} </p></div>
                <div className="body-col width25"><p>{item.serial_number}</p></div>
                <div className="body-col width15"><p>{item.device_type_name}</p></div>
                <div className="body-col width15"><p>{item.manufacturer}</p></div>
            </div>
        );
    }
}
export default RowItemDevice;
