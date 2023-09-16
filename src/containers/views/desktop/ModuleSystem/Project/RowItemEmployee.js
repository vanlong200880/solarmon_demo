import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { RCheckbox } from '../../../../../components/Controls';
import Libs from '../../../../../utils/Libs';

class RowItemEmployee extends Component {
    onIsCheckedChange = () => {
        if (!this.props.onIsCheckedChange || typeof this.props.onIsCheckedChange !== 'function') return;
        this.props.onIsCheckedChange(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
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
                <div className="body-col width45"><p><strong>{item.full_name} </strong></p>
                </div>
                <div className="body-col width45"><p>{item.email}</p></div>

            </div>
        );
    }
}
export default RowItemEmployee;
