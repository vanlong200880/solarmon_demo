import { Component } from 'react';
import SidebarPrivateJsx from './SidebarPrivate.jsx';
import { withTranslation } from 'react-i18next';
import Libs from '../../../utils/Libs';
import Constants from '../../../utils/Constants';
import ClientProjectService from '../../../services/ClientProjectService';
import { withRouter } from "react-router-dom";

class SidebarPrivate extends Component {
    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = SidebarPrivateJsx;
        this.state = {
            permissions: [],
            dataProjects: [],
            hash_id: null,
            des: null
        };
    }

    componentDidMount() {
        this.getList();
    }

    setActiveLink = (hash_id) => {
        var { des } = this.state;
        var { pathname } = window.location;
        var res = pathname.split("/");
        var params = ['devices', 'activities', 'analytics', 'reports', 'dashboard', 'config', 'control'];
        if (res) {
            des = res[res.length - 1];
            if (params.includes(des)) {
                des = des;
            } else {
                des = null;
            }
        }

        this.props.history.push({pathname: "/private/"+ hash_id + (!Libs.isBlank(des) ? ("/" + des ): '')});
        this.setState({
            hash_id: hash_id ? hash_id : null,
            des: des
        });
    }

    /**
     * get list project
     * @author Long.Pham 12/09/2021
     */
    getList() {
        let self = this;
        let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
        let employeeInfo = JSON.parse(Libs.base64Decrypt(info));
        var params = {
            id_language: employeeInfo.id_language,
            id_employee: employeeInfo.id_employee
        };


        ClientProjectService.instance.getProjectSideBar(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataProjects: data
                });
            } else {
                self.setState({
                    dataProjects: []
                });
            }
        });
    }

    showChildMenu = (index) => {
        var { dataProjects } = this.state;
        var item = dataProjects[index];
        if (Libs.isObjectEmpty(item)) return;
        dataProjects[index].show_child = dataProjects[index].show_child ? false : true;
        this.setState({
            dataProjects: dataProjects
        })


    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(SidebarPrivate)
export default withRouter(HighOrderComponentTranslated);