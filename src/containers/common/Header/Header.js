import React, { Component } from 'react';
// import BaseComponent from '../../BaseComponent';
import HeaderJsx from './Header.jsx';
import { withTranslation } from 'react-i18next';
import Constants from '../../../utils/Constants';
import ClientNotifyService from '../../../services/ClientNotifyService';
import Libs from '../../../utils/Libs';
import './Header.scss';

class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = HeaderJsx;
        this.state = {
            curItem: {},
            menuProfile: "",
            menu_collapse: true,
            totalAlerts: 0
        };
        this.wrapperRef = React.createRef()
    }

    componentWillMount() {
        let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
        let employeeInfo = JSON.parse(Libs.base64Decrypt(info));
        this.setState({
            employee: employeeInfo
        })

    }

    menuCollapseSidebar = () => {
        var { menu_collapse } = this.state;
        let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
        let employeeInfo = JSON.parse(Libs.base64Decrypt(info));
        if (!Libs.isObjectEmpty(employeeInfo)) {
            menu_collapse = menu_collapse ? false : true;
            this.setState({
                menu_collapse: menu_collapse
            }, () => {
                if (menu_collapse) {
                    document.body.classList.remove('menu_collapse');
                } else {
                    document.body.classList.add('menu_collapse')
                }
            })
        }
    }

    setLanguage = (e, iso_code) => {
        let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
        let employeeInfo = JSON.parse(Libs.base64Decrypt(info));

        var languages = employeeInfo.languages;
        if (Libs.isArrayData(languages)) {
            var findItemLang = Libs.find(languages, 'iso_code', iso_code);
            if (!Libs.isObjectEmpty(employeeInfo)) {
                employeeInfo.id_language = findItemLang.id;
                employeeInfo.lang = findItemLang.iso_code;

                for (var i = 0; i < languages.length; i++) {
                    if (employeeInfo.id_language === languages[i].id) {
                        languages[i].is_default = 1;
                    } else {
                        languages[i].is_default = 0;
                    }
                }
            }

            let jsonUser = JSON.stringify(employeeInfo);
            localStorage.setItem(Constants.COMMON.EMPLOYEE_INFO, Libs.base64Encrypt(jsonUser));
            window.location.reload();

        }
    }

    setMenuProfile = (e, index) => {
        this.setState({
            menuProfile: index
        })
    }

    setClosedMenuDropdown = () => {
        this.setState({
            menuProfile: ''
        })
    }

    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getNotifySize() {
        let self = this;
        let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
        let employeeInfo = JSON.parse(Libs.base64Decrypt(info));

        let params = {
            id_language: employeeInfo.id_language,
            id_employee: employeeInfo.id_employee
        };

        ClientNotifyService.instance.getNotifySize(params, (data, total_row) => {
            if (total_row > 0) {
                self.setState({
                    totalAlerts: total_row
                });
            } else {
                self.setState({
                    totalAlerts: 0
                });
            }

        });
    }


    componentDidMount() {
        this.getNotifySize();
        document.addEventListener('click', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        const { target } = event;
        var { menuProfile } = this.state, self = this;
        if (!this.wrapperRef.current.contains(target)) {
            if (menuProfile) {
                self.setState({
                    menuProfile: ''
                })
            }
        }
    }

    logout() {
        localStorage.clear();
        window.location.href = '/';
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Header)
export default HighOrderComponentTranslated;