import RoleJsx from './Role.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../utils/Constants';
import RoleService from '../../../../../services/RoleService';

class Role extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = RoleJsx;
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

    onResetSearch() {
        let self = this;
        let searchParam = this.state.searchParam;
        searchParam.id = null;
        searchParam.name = null;
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
     * get list
     * @author Long.Pham 2019-06-03
     */
    getList() {
        let self = this;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_company = this.employee.id_company;
        RoleService.instance.getList(params, (data, total_row) => {
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
            if (language.is_default === 1) { curItem.tabActive = language.is_default === 1 ? language.iso_code : ''; }
            let item = {
                is_default: language.is_default,
                iso_code: language.iso_code,
                id_language: language.id,
                name: "",
                description: ""
            };
            return data.push(item);
        });

        curItem.data = data;
        this.setState({
            curItem: curItem,
            add: true
        });

    };

    onClickCloseAdd = (status) => {
        if (status) {
            this.getList();
        }
        this.setState({
            add: false
        })
    }

    onClickCloseDelete = (status, data) => {
        if (status && data) {
            this.getList();
        }
        this.setState({
            delete: false
        })
    }

    /**
     * @description Item click event
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    onItemClick = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index], self = this;

        var params = this.state.curItem;
        params.id_company = item.id_company;
        params.id = item.id;

        RoleService.instance.getDetail(params, data => {
            if (data) {
                item.data = data.data;
                item.screen_mode = Constants.SCREEN_MODE.EDIT;
                let curTransItem = Libs.find(data.data,'is_default', 1);
                if(Libs.isObjectEmpty(curTransItem)){ return false; }
                item["name_"+curTransItem.iso_code] = curTransItem.name;

                if(Libs.isArrayData(data.data)){
                    var dataLang = data.data;
                    dataLang.map((row, index) => {
                        if(row.is_default === 1){
                            item.tabActive = row.iso_code;
                        }
                        return 1;
                    });
                }

                self.setState({
                    curItem: item,
                    add: true
                });
            }
        }, false);
    }



    /**
     * @description Item click event change status
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    onStatusChange = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index], self = this;
        item.screen_mode = Constants.SCREEN_MODE.EDIT;
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

        RoleService.instance.updateStatus(item, function (status, msg) {
            if (status) {
                self.setState({
                    dataList: self.state.dataList
                });
            }
        });
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
        if (this.state.formSearch === true) {
            let searchParam = this.state.searchParam;
            searchParam.name = '';
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

        this.setState({
            formSearch: formSearch
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

const HighOrderComponentTranslated = withTranslation('common')(Role)
export default HighOrderComponentTranslated;