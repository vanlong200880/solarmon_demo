import React from 'react';
import NavLink from '../../../components/Link';
import Libs from '../../../utils/Libs';

export default function SidebarSystem() {
    var { permissions } = this.state;
    var RowItems = null;
    var {t} = this.props;
    permissions = permissions.filter((item) => item.auth > 0);
    if(Libs.isArrayData(permissions)){
        RowItems = permissions.map((item, index) => {
            return <li key = {index}><NavLink to={item.module_path}><var className= {item.class_icon}></var>{item.module_path=== '/system' ? <span>Dashboard</span> : <span>{item.title}</span>}</NavLink></li>
        })
    }
    return (
        <div className="sidebar">
            <h2>{t('common.system')}</h2>
            <ul>
                {RowItems}
            </ul>
        </div>
    );
};