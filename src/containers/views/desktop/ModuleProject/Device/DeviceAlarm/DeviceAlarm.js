import DeviceAlarmJsx from './DeviceAlarm.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../../utils/Constants';
import ClientDeviceService from '../../../../../../services/ClientDeviceService';
import ErrorLevelService from '../../../../../../services/ErrorLevelService';
import ErrorTypeService from '../../../../../../services/ErrorTypeService';

class DeviceAlarm extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = DeviceAlarmJsx;
        this.state = {
            curItem: Object.assign({}, this.props.curItem),
            dataList: [],
            dataErrorLevel: [],
            dataErrorType: [],
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
            },
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
        this.handleInputDateChange = this.handleInputDateChange.bind(this);
    }

    componentDidMount() {
        this.getList();
        this.getListErrorLevel();
        this.getListErrorType();
    }

    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputDateChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let { searchParam } = this.state;
            searchParam[name] = value;
            this.setState({ searchParam: searchParam });
        }
    }

    /**
    * ge list error state
    * @author Long.Pham 2019-06-03
    */
    getListErrorType() {
        let self = this;
        var params = { id_language: this.employee.id_language };

        ErrorTypeService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataErrorType: data
                });
            } else {
                self.setState({
                    dataErrorType: []
                });
            }
        })
    }

    /**
   * ge list error level
   * @author Long.Pham 2019-06-03
   */
    getListErrorLevel() {
        let self = this;
        var params = { id_language: this.employee.id_language };

        ErrorLevelService.instance.getDropdownList(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataErrorLevel: data
                });
            } else {
                self.setState({
                    dataErrorLevel: []
                });
            }
        })
    }




    handleDropdownChange = (item, name) => {
        if (Libs.isObjectEmpty(item)) return;
        var self = this, value = item.value;
        let { searchParam } = self.state;
        if (name === 'id_error_level') {
            if (Libs.isObjectEmpty(item)) {
                searchParam.id_error_level = '';
            }
        }

        if (name === 'id_error_type') {
            if (Libs.isObjectEmpty(item)) {
                searchParam.id_error_type = '';
            }
        }

        searchParam[name] = value;
        self.setState({
            searchParam: searchParam
        });
    }

    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getList() {
        let self = this;
        var { curItem } = this.state;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id = curItem.id;
        params.type = 'customer';
        
        ClientDeviceService.instance.getListAlertByDevice(params, (data, total_row) => {
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
        let formSearch = (this.state.formSearch === false) ? true : false;
        this.setState({
            formSearch: formSearch
        });
    }

    onResetSearch() {
        let self = this;
        let searchParam = this.state.searchParam;
        searchParam.date_from = null;
        searchParam.date_to = null;
        searchParam.id_error_level = null;
        searchParam.id_error_type = null;
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

const HighOrderComponentTranslated = withTranslation('common')(DeviceAlarm)
export default HighOrderComponentTranslated;