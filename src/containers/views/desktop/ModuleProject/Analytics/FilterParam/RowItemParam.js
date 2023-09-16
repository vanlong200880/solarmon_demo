import React, { Component } from 'react';
import { RCheckbox } from '../../../../../../components/Controls';
import Libs from '../../../../../../utils/Libs';

class RowItemParam extends Component {

    render() {
        var item = this.props.dataItem;
        var paramerter = item.dataParameter;
        return (
            <li key={this.props.index}>
                <div className="item-title">{item.device_group_name}</div>
                <div className="sub-parameter">
                    <ul>
                        {Libs.isArrayData(paramerter) ?
                            paramerter.map((v, k) => {
                                return (
                                    <li key={v.id}>
                                        <RCheckbox
                                            inputId={"parameter_"+ this.props.index +"_" + v.id }
                                            inputName={"parameter_"+ this.props.index +"_" + v.id }
                                            labelClass="no-label"
                                            checked={v.is_checked}
                                            onChange={(e) => {this.props.handleParameterInputChange(e, this.props.index, k)}}
                                            label={v.name}
                                        />
                                    </li>
                                );
                            })
                            : ""}
                    </ul>
                </div>
            </li>
        );
    }
}
export default RowItemParam;
