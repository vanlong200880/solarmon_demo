import PermissionsJsx from './Permissions.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../utils/Constants';
import './Permissions.scss';
import RoleService from '../../../../../services/RoleService';

class Permissions extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = PermissionsJsx;
        this.state = {
            curItem: {},
            dataList: [],
            dataRoles: [],
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
            }
        };

        this._selectFullCheckedChange = this._selectFullCheckedChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentDidMount() {
        this.getDataRole();
    }

    _setPermissions(data) {
        data.view = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.VIEW));
        data.new = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.NEW));
        data.edit = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.EDIT));
        data.excel = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.EXCEL));
        data.pdf = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.PDF));
        data.translate = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.TRANSLATE));
        data.print = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.PRINT));
        data.delete = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.DEL));
        data.approval = data.auths & parseInt(Math.pow(2, Constants.AUTH_MODE.APPROVAL));
        return data;
    }
    _setAuths(data) {
        data.auths = data.view + data.new + data.edit + data.excel + data.pdf + data.translate + data.print + data.delete + data.approval;
        return data;
    }


    handleInputChange = (event, item, dataKey, vAuth, index) => {
        let self = this;
        let checked = event.target.checked;
        let mask = 0;
        let dataList = this.state.dataList;

        if (checked) {
            for (let k = 0; k < vAuth + 1; k++) {
                mask = 1 << k;
            }

            // add view permission if other permission has been checked
            if (!Libs.isBlank(vAuth) && vAuth != Constants.AUTH_MODE.VIEW) {
                item[Constants.AUTH_DATA_KEY.VIEW] = 1;
            }

        } else {
            if (!Libs.isBlank(vAuth) && vAuth == Constants.AUTH_MODE.VIEW) {
                item[Constants.AUTH_DATA_KEY.NEW] = 0;
                item[Constants.AUTH_DATA_KEY.EDIT] = 0;
                item[Constants.AUTH_DATA_KEY.DEL] = 0;
                item[Constants.AUTH_DATA_KEY.PRINT] = 0;
                item[Constants.AUTH_DATA_KEY.PDF] = 0;
                item[Constants.AUTH_DATA_KEY.EXCEL] = 0;
                item[Constants.AUTH_DATA_KEY.TRANSLATE] = 0;
                item[Constants.AUTH_DATA_KEY.APPROVAL] = 0;
                item[Constants.AUTH_DATA_KEY.FULL] = 0;
            }
        }

        item[dataKey] = mask;

        if (parseInt(item.has_child) === 1) {
            dataList.map((value, key) => {
                if (item.id === value.parent) {
                    let maskTemp = 0;
                    if (checked) {
                        for (let k = 0; k < vAuth + 1; k++) {
                            maskTemp = 1 << k;
                        }
                        // add view permission if other permission has been checked
                        if (!Libs.isBlank(vAuth) && vAuth !== Constants.AUTH_MODE.VIEW) {
                            value[Constants.AUTH_DATA_KEY.VIEW] = 1;
                        }
                    } else {
                        if (!Libs.isBlank(vAuth) && vAuth === Constants.AUTH_MODE.VIEW) {
                            value[Constants.AUTH_DATA_KEY.NEW] = 0;
                            value[Constants.AUTH_DATA_KEY.EDIT] = 0;
                            value[Constants.AUTH_DATA_KEY.DEL] = 0;
                            value[Constants.AUTH_DATA_KEY.PRINT] = 0;
                            value[Constants.AUTH_DATA_KEY.PDF] = 0;
                            value[Constants.AUTH_DATA_KEY.EXCEL] = 0;
                            value[Constants.AUTH_DATA_KEY.TRANSLATE] = 0;
                            value[Constants.AUTH_DATA_KEY.APPROVAL] = 0;
                            value[Constants.AUTH_DATA_KEY.FULL] = 0;
                        }
                    }

                    value[dataKey] = maskTemp;
                    value = this._setAuths(value);

                    dataList[key] = value;

                }
            });
        }
        
        dataList[index] = item;

        // if (parseInt(item.has_child) === 1) {
        // dataList.map((value, key) => {
        //     if (item.id === value.parent) {
        //         let action = 0;
        //         let maskTemp = 0;
        //         if (checked) {
        //             // for (let k = 0; k < vAuth + 1; k++) {
        //             //     maskTemp = 1 << k;
        //             // }
        //             // add view permission if other permission has been checked
        //             if (!Libs.isBlank(vAuth) && vAuth !== Constants.AUTH_MODE.VIEW) {
        //                 value[Constants.AUTH_DATA_KEY.VIEW] = 1;
        //             }
        //         } else {
        //             if (!Libs.isBlank(vAuth) && vAuth === Constants.AUTH_MODE.VIEW) {
        //                 value[Constants.AUTH_DATA_KEY.NEW] = 0;
        //                 value[Constants.AUTH_DATA_KEY.EDIT] = 0;
        //                 value[Constants.AUTH_DATA_KEY.DEL] = 0;
        //                 value[Constants.AUTH_DATA_KEY.PRINT] = 0;
        //                 value[Constants.AUTH_DATA_KEY.PDF] = 0;
        //                 value[Constants.AUTH_DATA_KEY.EXCEL] = 0;
        //                 value[Constants.AUTH_DATA_KEY.TRANSLATE] = 0;
        //                 value[Constants.AUTH_DATA_KEY.APPROVAL] = 0;
        //                 value[Constants.AUTH_DATA_KEY.FULL] = 0;
        //             }
        //         }
        //         // value[dataKey] = maskTemp;
        //         value = this._setAuths(value);

        //     }
        // });
        // } else {
        // dataList.map((v, k) => {
        //     if (v.id == item.parent) {
        //         var dataLevel = dataList.filter((k) => k.parent === item.parent);

        //         if (Libs.isArrayData(dataLevel)) {
        //             var countNew = 0, countEdit = 0, countView = 0, countDelete = 0, countPrint = 0, countApproval = 0, countPdf = 0, countExcel = 0, countTranslate = 0;
        //             dataLevel.map((val, key) => {
        //                 if (val.id === item.id) {
        //                     v[key] = item;
        //                     if (item.new > 0) { countNew++; }
        //                     if (item.edit > 0) { countEdit++; }
        //                     if (item.view > 0) { countView++; }
        //                     if (item.delete > 0) { countDelete++; }
        //                     if (item.print > 0) { countPrint++; }
        //                     if (item.pdf > 0) { countPdf++; }
        //                     if (item.excel > 0) { countExcel++; }
        //                     if (item.translate > 0) { countTranslate++; }
        //                     if (item.approval > 0) { countApproval++; }
        //                 } else {
        //                     if (val.new > 0) { countNew++; }
        //                     if (val.edit > 0) { countEdit++; }
        //                     if (val.view > 0) { countView++; }
        //                     if (val.delete > 0) { countDelete++; }
        //                     if (val.print > 0) { countPrint++; }
        //                     if (val.pdf > 0) { countPdf++; }
        //                     if (val.excel > 0) { countExcel++; }
        //                     if (val.translate > 0) { countTranslate++; }
        //                     if (val.approval > 0) { countApproval++; }
        //                 }
        //             });

        //             if (countNew > 0) { v[Constants.AUTH_DATA_KEY.NEW] = 2; } else { v[Constants.AUTH_DATA_KEY.NEW] = 0; }
        //             if (countEdit > 0) { v[Constants.AUTH_DATA_KEY.EDIT] = 8; } else { v[Constants.AUTH_DATA_KEY.EDIT] = 0; }
        //             if (countView > 0) { v[Constants.AUTH_DATA_KEY.VIEW] = 1; } else { v[Constants.AUTH_DATA_KEY.VIEW] = 0; }
        //             if (countDelete > 0) { v[Constants.AUTH_DATA_KEY.DEL] = 4; } else { v[Constants.AUTH_DATA_KEY.DEL] = 0; }
        //             if (countPrint > 0) { v[Constants.AUTH_DATA_KEY.PRINT] = 64; } else { v[Constants.AUTH_DATA_KEY.PRINT] = 0; }
        //             if (countPdf > 0) { v[Constants.AUTH_DATA_KEY.PDF] = 32; } else { v[Constants.AUTH_DATA_KEY.PDF] = 0; }
        //             if (countExcel > 0) { v[Constants.AUTH_DATA_KEY.EXCEL] = 16; } else { v[Constants.AUTH_DATA_KEY.EXCEL] = 0; }
        //             if (countApproval > 0) { v[Constants.AUTH_DATA_KEY.APPROVAL] = 256; } else { v[Constants.AUTH_DATA_KEY.APPROVAL] = 0; }
        //             if (countTranslate > 0) { v[Constants.AUTH_DATA_KEY.TRANSLATE] = 128; } else { v[Constants.AUTH_DATA_KEY.TRANSLATE] = 0; }

        //             v = this._setAuths(v);
        //             dataList[k] = v;

        //         }

        //     }
        // });
        // }

        item = this._setAuths(item);

        self.setState({
            dataList: dataList
        });
        this._updateData(item);
    }



    /**
     * Khi checked toàn quyền của màn hình thì tự động checked toàn bộ quyền của màn hình đó
     * @author Long.Pham 2019-09-20
     * @param {Object} data 
     * @param {Object} e 
     */
    _selectFullCheckedChange = (event, item, index) => {
        let self = this;
        let checked = event.target.checked;
        let mask = 0;
        let dataList = this.state.dataList;
        if (checked) {
            mask = 511;
            dataList[index].auths = mask;
            if (parseInt(item.has_child) === 1) {
                dataList.map((v, k) => {
                    if (parseInt(item.id) === parseInt(v.parent)) {
                        dataList[k].auths = mask;
                    }
                });
            } else {
                var findParent = Libs.find(dataList, 'id', item.parent);
                if (!Libs.isObjectEmpty(findParent)) {
                    dataList.map((m, n) => {
                        if (parseInt(findParent.id) === parseInt(m.id)) {
                            dataList[n].auths = mask;
                        }
                    });
                }
            }
        } else {
            dataList[index].auths = mask;
            if (parseInt(item.has_child) === 1) {
                dataList.map((v, k) => {
                    if (parseInt(item.id) === parseInt(v.parent)) {
                        dataList[k].auths = 0;
                    }
                });
            }
        }

        self.setState({
            dataList: dataList
        });

        this._updateData(item);
    }


    /**
     * Update quyền đã chọn
     * @author Long.Pham 2019-09-20
     * @param {Array} data
     */
    async _updateData(data) {
        var { t } = this.props;
        let self = this, screens = [];
        let curItem = self.state.curItem;
        if (Libs.isObjectEmpty(data)) {
            this.toast(t("message.msg_err_unknown"), "error");
            return;
        }

        let dataList = self.state.dataList;

        if (!Libs.isBlank(data.has_child)) {
            screens.push({
                id_role: curItem.id_role,
                id_screen: data.id_screen,
                id_package_screen: data.id_package_screen,
                auths: data.auths
            });

            if (Libs.isArrayData(dataList)) {


                dataList.map((v, k) => {
                    if (v.parent === data.id) {
                        screens.push({
                            id_role: curItem.id_role,
                            id_screen: v.id_screen,
                            id_package_screen: v.id_package_screen,
                            auths: v.auths
                        });
                    }
                })
            }

        } else {
            if (!Libs.isArrayData(dataList)) return;
            let item = Libs.find(dataList, 'id', data.id);
            if (Libs.isObjectEmpty(item)) return;
            screens.push({
                id_role: curItem.id_role,
                id_screen: data.id_screen,
                id_package_screen: data.id_package_screen,
                auths: data.auths
            });

            var dataParent = Libs.find(dataList, 'id', data.parent);
            if (!Libs.isObjectEmpty(dataParent)) {
                screens.push({
                    id_role: curItem.id_role,
                    id_screen: dataParent.id_screen,
                    id_package_screen: dataParent.id_package_screen,
                    auths: dataParent.auths
                });
            }
        }


        if (!Libs.isArrayData(screens)) {
            this.toast(t("message.msg_err_unknown"), "error");
            return;
        }

        curItem.screens = screens;
        RoleService.instance.updateRolePermissions(curItem, function (status, msg) {
            if (status) {
                self.getListScreenPermissions();
            } else {
                self.toast(msg, "error");
            }
        });
        this.setState({
            dataList: dataList
        })
    }

    handleDropdownChange = (obj) => {
        if (Libs.isObjectEmpty(obj)) return;
        let curItem = this.state.curItem;
        curItem = obj;
        var self = this;
        self.setState({
            curItem: curItem
        }, () => {
            self.getListScreenPermissions();
        });
    }


    /**
         * ge list roles
         * @author Long.Pham 2019-06-03
         */
    getDataRole() {
        let self = this, curItem = this.state.curItem;
        let params = self.state.searchParam;
        params.id_company = this.employee.id_company;
        params.id_language = this.employee.id_language;

        RoleService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                curItem = data[0];
                self.setState({
                    dataRoles: data,
                    curItem: curItem
                }, () => {
                    self.getListScreenPermissions();
                });
            }
        })
    }


    /**
     * get list screen
     * @author long.pham 27/07/2019
     */

    getListScreenPermissions() {
        let self = this, curItem = this.state.curItem;
        curItem.id_language = this.employee.id_language;
        curItem.id_role = curItem.id;
        RoleService.instance.getListScreenPermissions(curItem, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataList: data
                });
            } else {
                self.setState({
                    dataList: []
                });
            }
        })
    }

    onClickUpdateRole() {
        var curItem = this.state.curItem, self = this;
        RoleService.instance.updateRoleMapScreen(curItem, function (status, data, msg) {
            if (status) {
                self.toast(msg, "info");
                self.getListScreenPermissions();
            }
            else if (!Libs.isBlank(msg)) {
                self.toast(msg, "error");
            }
        }, true);

    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Permissions)
export default HighOrderComponentTranslated;