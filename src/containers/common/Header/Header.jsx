import React from 'react';
import { NavLink } from 'react-router-dom';
import Libs from '../../../utils/Libs';
import Constants from '../../../utils/Constants';
import Auth from '../../../utils/Auth';

export default function Header() {
    const { t, i18n } = this.props;
    var { menuProfile, employee, totalAlerts } = this.state;

    var languages = employee.languages;
    var RowLanguage = null;
    var LanguageActive = null;


    let info = localStorage.getItem(Constants.COMMON.ACCESS_PARAM);
    let permissions = JSON.parse(Libs.base64Decrypt(info));

    if (Libs.isArrayData(languages)) {
        var itemLang = Libs.find(languages, 'is_default', 1);
        if (!Libs.isObjectEmpty(itemLang)) {
            LanguageActive = <NavLink to="/" className="text-uppercase" onClick={(e) => { this.setMenuProfile(e, 'language'); e.preventDefault(); }}><img src={"/" + itemLang.icon} alt={itemLang.name} />{itemLang.iso_code}</NavLink>
        }

        RowLanguage = languages.map((item, index) => {
            return <NavLink to="/" key={index} activeClassName={item.is_default === 1 ? "active-lang" : ""} onClick={(e) => { i18n.changeLanguage(item.iso_code); this.setMenuProfile(e, ''); this.setLanguage(e, item.iso_code); e.preventDefault(); }} ><img src={"/" + item.icon} alt={item.name} /> {item.name} </NavLink>
        })
    }

    return (
        <div className="header">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <div className="logo">
                            <NavLink to={!Libs.isBlank(employee.type) && employee.type == 'main' ? '/main' : "/dashboard"}>
                                <img src="/logo.png" alt="Logo" />
                            </NavLink>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="menu-top">
                            <ul ref={this.wrapperRef}>
                                {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/notify']) && Auth.getPermisson(permissions['/notify'].auth, Constants.AUTH_MODE.VIEW) ?
                                    <li>
                                        <NavLink className="round" to="/notify"><span className="icon icon-alert"></span><var className="notification">{totalAlerts >= 100 ? "99+" : totalAlerts}</var></NavLink>
                                    </li>
                                : ""}



                                <li>
                                    <NavLink className="avatar" to="/user">
                                        <span>
                                            {employee.avatar !== null ? <img src={Constants.SERVER_DATA + "/" + employee.avatar} alt="Avatar" /> : <var className="icon-man-people-streamline-user"></var>}
                                        </span>
                                    </NavLink>
                                </li>
                                <li className="username">
                                    <NavLink className="avatar" to="/user">{employee.full_name}</NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={(e) => { this.setMenuProfile(e, 'setup'); e.preventDefault(); }} className="round" to="#"><span className="icon icon-settings-streamline-1"></span></NavLink>
                                    {menuProfile === 'setup' ?
                                        <ul className="on">
                                            <li>
                                                <div className="item">
                                                    <div className="main-item">
                                                        <div className="header-avatar">

                                                            {employee.avatar !== null ? <img src={Constants.SERVER_DATA + "/" + employee.avatar} alt="Avatar" /> : <var className="icon-man-people-streamline-user"></var>}
                                                        </div>

                                                        <div className="channel-container">
                                                            <p><strong>{employee.full_name}</strong></p>
                                                            <p><NavLink to="/user">{t('account.manage_account')}</NavLink></p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="item-group">
                                                    {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/main']) && Auth.getPermisson(permissions['/main'].auth, Constants.AUTH_MODE.VIEW) ?
                                                        <NavLink onClick={(e) => { this.setClosedMenuDropdown(e); }} to="/main"><span className="icon-bars"></span>{t('account.main')}</NavLink>
                                                        : ""}
                                                    {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/dashboard']) && Auth.getPermisson(permissions['/dashboard'].auth, Constants.AUTH_MODE.VIEW) ?
                                                        <NavLink onClick={(e) => { this.setClosedMenuDropdown(e); }} to="/dashboard"><span className="icon-list-unordered"></span> {t('account.projects')}</NavLink>
                                                        : ""}

                                                    {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/system']) && Auth.getPermisson(permissions['/system'].auth, Constants.AUTH_MODE.VIEW) ?
                                                        <NavLink onClick={(e) => { this.setClosedMenuDropdown(e); }} to="/system"><span className="icon icon-settings-streamline-1"></span> {t('account.system')}</NavLink>
                                                        : ""}

                                                    {!Libs.isObjectEmpty(permissions) && !Libs.isBlank(permissions['/user/config-receive-email']) && Auth.getPermisson(permissions['/user/config-receive-email'].auth, Constants.AUTH_MODE.VIEW) ?
                                                        <NavLink onClick={(e) => { this.setClosedMenuDropdown(e); }} to="/user/config-receive-email"><span className="icon-email-mail-streamline"></span> {t('account.mail_notify')}</NavLink>
                                                        : ""}

                                                    <NavLink onClick={(e) => { this.setClosedMenuDropdown(e); }} to="/user/documents"><span className="icon icon-book"></span> {t('account.documents')}</NavLink>
                                                    <NavLink to="/" onClick={(e) => { this.setClosedMenuDropdown(e); }} onClick={this.logout.bind(this)} ><span className="icon icon-logout"></span> {t('account.logout')}</NavLink>
                                                </div>
                                            </li>
                                        </ul>
                                        : ""}
                                </li>
                                <li>
                                    {LanguageActive}
                                    {menuProfile === 'language' && Libs.isArrayData(languages) && languages.length > 1 ?
                                        <ul className="on language">
                                            <li>
                                                <div className="item-group">
                                                    {RowLanguage}
                                                </div>
                                            </li>
                                        </ul>
                                        : ''}

                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};