import React, { Component } from 'react';
import { RCheckbox } from '../../../../../components/Controls';

class RowItemDevice extends Component {

    handleDeviceInputChange = () => {
        if (!this.props.handleDeviceInputChange || typeof this.props.handleDeviceInputChange !== 'function') return;
        this.props.handleDeviceInputChange(this.props.index);
        return;
    }

    render() {
        var item = this.props.dataItem;
        return (
            <li key={item.id}>
                <RCheckbox
                    inputId={"id_device_" + this.props.index + "_" + item.id}
                    inputName={"id_device_" + this.props.index + "_" + item.id}
                    labelClass="no-label"
                    checked={item.is_checked}
                    onChange={(e) => { this.handleDeviceInputChange(e, this.props.index) }}
                    label={item.name}
                />
            </li>
        );
    }
}
export default RowItemDevice;
