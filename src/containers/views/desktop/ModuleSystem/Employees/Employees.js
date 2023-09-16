import EmployeesJsx from './Employees.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../utils/Constants';
import EmployeeService from '../../../../../services/EmployeeService';
import './Employees.scss';

class Employees extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = EmployeesJsx;
        this.state = {
            curItem: {},
            dataList: [],
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
            },
            add: false,
            delete: false,
            formSearch: false,
            allLanguage: Libs.isBlank(this.employee) ? [] : this.employee.languages
        };

        this.paging = {
            total: 0,
            current: 1,
            currentInput: 1
        };
        this.inputChangedHandler = this.inputChangedHandler.bind(this);
        this.inputChangedEnter = this.inputChangedEnter.bind(this);
        this.inputChangedBlue = this.inputChangedBlue.bind(this);
    }


    componentDidMount() {
        this.getList();
    }

    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getList() {
        let self = this;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_employee = this.employee.id_employee;
        EmployeeService.instance.getList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataList: data
                });

                var total = parseInt(total_row / self.state.searchParam.limit);
                if (total_row % self.state.searchParam.limit > 0) {
                    total = total + 1;
                }
                self.paging.total = total;
                self.paging.current = self.state.searchParam.index;
                self.paging.currentInput = self.state.searchParam.index;
                self.state.total_row = total_row;

            } else {
                self.setState({
                    dataList: [],
                    total_row: 0
                });
                self.paging.total = 0;
                self.paging.current = 1;
                self.paging.currentInput = 1;
            }
            self.forceUpdate();
        });
    }


    onClickAdd = () => {
        let curItem = {};
        let data = [];
        var allLanguage = this.state.allLanguage;
        curItem.screen_mode = Constants.SCREEN_MODE.ADD;
        curItem.tabActive = '';
        allLanguage.map((language, index) => {
            if (language.default === 1) { curItem.tabActive = language.default === 1 ? language.iso_code : ''; }

            let item = {
                default: language.default,
                iso_code: language.iso_code,
                id_language: language.id,
                name: "",
                description: "",
                icon: "",
                icon_upload: "",
                icon_message: "",
                banner_desktop: "",
                banner_desktop_upload: "",
                banner_desktop_message: "",
                banner_mobile: "",
                banner_mobile_upload: "",
                banner_mobile_message: "",
                meta_title: "",
                meta_keyword: "",
                meta_description: "",
                status: 1
            };
            return data.push(item);
        });

        curItem.data = data;
        this.setState({
            curItem: curItem,
            add: true
        });

    };

    onClickCloseAdd = (status, data) => {
        if (status) {
            this.getList();
        }
        this.setState({
            curItem: {},
            add: false
        })
    }

    onClickCloseDelete = (status, data) => {
        if(status){
            this.getList();
        }
        this.setState({
            delete: false
        })
    }

    /**
     * @description Item click event change status
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
     onStatusChange = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index], self = this;
        item.id_company = this.employee.id_company;
        item.id_language = this.employee.id_language;

        var isActiveUpdate = item.status;
        if (isActiveUpdate * 1 === 1) {
            isActiveUpdate = 0;
        }
        else {
            isActiveUpdate = 1;
        }

        item.status = isActiveUpdate;
        item.updated_by = this.employee.first_name + ' ' + this.employee.last_name;

        EmployeeService.instance.updateStatus(item, function (status, msg) {
            if (status) {
                self.setState({
                    dataList: self.state.dataList
                });
            }
        });
    }


    /**
     * @description Item click event
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    onItemClick = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index], self = this;
        item.id_company = this.employee.id_company;
        item.id_language = this.employee.id_language;

        EmployeeService.instance.getDetail(item, data => {
            if (data) {
                data.screen_mode = Constants.SCREEN_MODE.EDIT;
                self.setState({
                    curItem: data,
                    add: true
                });
            }
        }, false);
    }


    /**
   * @description Item click event delete
   * @author Long.Pham 12-05-2021
   * @param index Order element in the list
   */
    onItemClickDelete = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index];
        this.setState({
            curItem: item,
            delete: true
        });
    }


    inputChangedHandler(event) {
        let self = this;
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name === 'current') {
            if (!Libs.isBlank(value)) {
                var { t } = this.props;
                if (!Libs.isNumber(value)) {
                    self.toast(t('common.page_is_number'), "error");
                    return;
                }
            }

            self.paging.currentInput = value;
            self.forceUpdate();
        }

        if (name === 'limit') {
            var { searchParam } = this.state;
            searchParam.limit = value;
            this.setState({
                searchParam: searchParam
            }, () => {
                self.getList();
            })
        }
    }

    inputChangedEnter(event) {
        let self = this;
        if (event.key === 'Enter') {
            var currentInput = this.paging.currentInput;
            if (!Libs.isBlank(currentInput)) {
                var { t } = this.props;
                if (!Libs.isNumber(currentInput)) {
                    self.toast(t('common.page_is_number'), "error");
                    return;
                }
            }

            if (Libs.isBlank(currentInput) && !Libs.isNumber(currentInput)) return;
            if (parseInt(currentInput) > this.paging.total) {
                currentInput = self.paging.total;
            }

            if (currentInput <= 0) {
                currentInput = 1;
            }

            self.paging.current = currentInput;
            self.paging.currentInput = currentInput;
            this.onSelectPage(currentInput);
            self.forceUpdate();
        }
    }

    inputChangedBlue(event) {
        let self = this;
        let target = event.target;
        let name = target.name;
        if (name === 'current') {
            var currentInput = this.paging.currentInput;
            if (!Libs.isBlank(currentInput)) {
                var { t } = this.props;
                if (!Libs.isNumber(currentInput)) {
                    self.toast(t('common.page_is_number'), "error");
                    return;
                }
            }

            if (Libs.isBlank(currentInput) && !Libs.isNumber(currentInput)) return;
            if (parseInt(currentInput) > this.paging.total) {
                currentInput = self.paging.total;
            }

            if (currentInput <= 0) {
                currentInput = 1;
            }

            self.paging.current = currentInput;
            self.paging.currentInput = currentInput;
            this.onSelectPage(currentInput);
            self.forceUpdate();
        }
    }


    /**
     * @description Select page in pagging
     * @author long.pham 09/05/2021
     * @param {int} index
     */
    onSelectPage(index) {
        let self = this;
        self.state.searchParam.index = index;
        if (index > 0) {
            self.state.searchParam.offset = (index - 1) * self.state.searchParam.limit;
        } else {
            self.state.searchParam.offset = 0;
        }
        self.getList();
    }


    /**
     * @description reload data
     * @author long.pham 09/05/2021
     * @param {int} index
     */
    onClickReload() {
        let self = this;
        self.getList();
    }


    /**
    * Func filter table
    * @author Long.Pham 12-05-2021
    * @param  {Object} e
    */

    onSort(event, sortKey) {
        this.state.searchParam.sort_column = sortKey;
        this.state.searchParam.order_by = (this.state.searchParam.order_by === '' || this.state.searchParam.order_by === 'asc') ? 'desc' : 'asc';
        this.getList();
    }

    /**
     * @description Call form search
     * @author Long.Pham 12/05/2021
     */
    onSearch() {
        let self = this;
        let formSearch = (this.state.formSearch === false) ? true : false;
        this.setState({
            formSearch: formSearch
        });
    }

    onResetSearch() {
        let self = this;
        let searchParam = this.state.searchParam;
        searchParam.full_name = null;
        searchParam.index = 1;
        searchParam.offset = 0;
        self.paging.current = 1;
        self.paging.currentInput = 1;
        self.paging.total = 1;
        self.setState({
            searchParam: searchParam
        }, () => {
            self.getList();
        });
    }

    /**
     * Func search
     * @author Long.Pham 12/05/2021
     * @param  {Object} e
     */
    handleSearch() {
        this.getList();
    }



    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Employees)
export default HighOrderComponentTranslated;