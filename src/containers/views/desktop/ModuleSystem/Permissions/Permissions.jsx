import React from 'react';
import RowItem from './RowItem';
import FormReactSelect from '../../../../../components/FormReactSelect';


export default function Roles() {
    const { t } = this.props;
    var { curItem, dataList, dataRoles } = this.state;

    var RowItems = null;
    RowItems = dataList.map((item, index) => {
        return <RowItem
            key={'row_item_' + index}
            index={index}
            dataItem={item}
            onItemClick={this.onItemClick}
            onItemClickDelete={this.onItemClickDelete}
            _selectFullCheckedChange = {this._selectFullCheckedChange}
            handleInputChange={this.handleInputChange}
            t={t}
            actions={this.actions}
        />
    });


    return (
        <div className="permissions">
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-md-6"><h2>{t('permissions.title')}</h2>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-7"></div>
                            <div className="col-md-4">
                                <div className="choose-role">
                                    <FormReactSelect
                                        instanceId="id_role"
                                        className="id_role"
                                        name="id_role"
                                        value={dataRoles.filter(function (item) { return item.id === curItem.id })}
                                        onChange={(e) => { this.handleDropdownChange(e) }}
                                        optionList={dataRoles}
                                        placeHolder={t('common.choose')}
                                    />
                                </div>

                            </div>
                            <div className="col-md-1">
                                <ul>
                                    <li><div className="add" onClick={this.onClickUpdateRole.bind(this)}><span className="icon icon-arrows-ccw none-text"></span></div></li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="form-roles">
                <div className="row">
                    <div className="col-md-4">

                    </div>
                </div>
            </div>

            <div className="data-permissions">
                <div className="box-header">
                    <div className="data-header">
                        <div className="header-row">
                            <div className="header-col screen-name">Modules</div>
                            <div className="header-col widthfix80">Full</div>
                            <div className="header-col widthfix80">View</div>
                            <div className="header-col widthfix80">Add</div>
                            <div className="header-col widthfix80">Del</div>
                            <div className="header-col widthfix80">Edit</div>
                            <div className="header-col widthfix80">Excel</div>
                            <div className="header-col widthfix80">Pdf</div>
                            <div className="header-col widthfix80">Print</div>
                            <div className="header-col widthfix80">Translate</div>
                            <div className="header-col widthfix80">Approval</div>

                        </div>
                    </div>
                </div>
                <div className="box-body">
                    <div className="data-body">
                        {RowItems}
                    </div>
                </div>
            </div>


        </div>
    );
};