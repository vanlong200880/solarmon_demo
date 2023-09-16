import React, { Component } from 'react';
import FormReactSelect from '../../../../../components/FormReactSelect';

class RowItemMoveDevice extends Component {
    onItemClickDelete = () => {
        if (!this.props.onItemClickDelete || typeof this.props.onItemClickDelete !== 'function') return;
        this.props.onItemClickDelete(this.props.index);
    }

    render() {
        var item = this.props.dataItem;
        var dataListProject = this.props.dataListProject;
        return (
            <div className="body-row" key={item.id}>
                <div className="body-col width10">
                    {(this.props.index) + 1}
                </div>
                <div className="body-col width30">
                    {item.id_device}
                </div>
                <div className="body-col width30">
                    {item.name}
                </div>

                <div className="body-col width30">
                    <FormReactSelect
                        instanceId= {"id_project_"+ this.props.index}
                        className= {"id_project_"+ this.props.index}
                        name= {"id_project_"+ this.props.index}
                        optionList={dataListProject}
                        value={dataListProject.filter(function (v) { return v.id == item.id_project })}
                        onChange={(e) => { this.props.handleDropdownChange(e, 'id_project', this.props.index); }}
                    />
                </div>

            </div>
        );
    }
}
export default RowItemMoveDevice;
