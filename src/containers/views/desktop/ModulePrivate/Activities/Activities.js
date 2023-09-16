import ActivitiesJsx from './Activities.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../utils/Constants';
import MainActivitiesService from '../../../../../services/MainActivitiesService';
import ErrorLevelService from '../../../../../services/ErrorLevelService';
import ErrorTypeService from '../../../../../services/ErrorTypeService';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';

class Activities extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = ActivitiesJsx;
        this.state = {
            hash_id: !Libs.isObjectEmpty(this.params) ? this.params.id : null,
            checked_all: 0,
            curItem: {},
            dataList: [],
            dataErrorType: [],
            dataErrorLevel: [],
            dataStatus: [
                {
                    id: 1,
                    value: 1,
                    label: "Opened",
                    is_checked: 0
                },
                {
                    id: 0,
                    value: 0,
                    label: "Closed",
                    is_checked: 0
                }
            ],
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
            },
            viewActivities: false,
            formSearch: false,
            delete: false,
            deleteAll: false,
            add: false
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
        this.getListErrorLevel();
        this.getListErrorType();
    }

    componentWillReceiveProps(nextProps) {
        let self = this;
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                hash_id: nextProps.match.params.id
            }, () => {
                self.getListErrorLevel();
                self.getListErrorType();
            });
        }
    }


    handleCheckStatusInputChange = (event, index) => {
        var { dataStatus } = this.state;
        if (!Libs.isArrayData(dataStatus)) return;
        dataStatus[index].is_checked = dataStatus[index].is_checked ? 0 : 1

        this.setState({
            dataStatus: dataStatus
        })
    }


    handleCheckTypeInputChange = (event, index) => {
        var { dataErrorType } = this.state;
        if (!Libs.isArrayData(dataErrorType)) return;
        dataErrorType[index].is_checked = dataErrorType[index].is_checked ? 0 : 1

        this.setState({
            dataErrorType: dataErrorType
        })
    }

    handleCheckLevelInputChange = (event, index) => {
        var { dataErrorLevel } = this.state;
        if (!Libs.isArrayData(dataErrorLevel)) return;
        dataErrorLevel[index].is_checked = dataErrorLevel[index].is_checked ? 0 : 1

        this.setState({
            dataErrorLevel: dataErrorLevel
        })
    }

    downloadData = () => {
        var { dataList } = this.state;
        var { t } = this.props;
        if (!Libs.isArrayData(dataList)) return;

        var dataExport = [];
        for (var i = 0, len = dataList.length; i < len; i++) {
            var timeAgo = dataList[i].times_ago + " " + t("common." + dataList[i].times_ago_unit) + (dataList[i].times_ago > 1 && "s");
            dataExport.push({
                'ID': dataList[i].id,
                'Device Name': dataList[i].name,
                'Type': dataList[i].error_type_name,
                'Level': dataList[i].error_level_name,
                'Opened': dataList[i].start_date_format,
                'Open period': timeAgo,
                'Message': dataList[i].message,
                'Description': dataList[i].description,
                'Solutions': dataList[i].solutions,
                'Note': dataList[i].note,
                'Review status': dataList[i].alert_state_name
            });
        }

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(dataExport, { skipHeader: false });
        const wb = {
            SheetNames: ['Alerts'],
            Sheets: { 'Alerts': ws }
        };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "Export-alerts-" + moment().format('YYYY-MM-DD_hh:mm:ss') + fileExtension);
    }

    handleCheckItemInputChange = (index) => {
        var { dataList } = this.state;
        if (!Libs.isArrayData(dataList)) return;
        var item = dataList[index];
        if (Libs.isObjectEmpty(item)) return;
        dataList[index].is_checked = dataList[index].is_checked ? 0 : 1;
        this.setState({
            dataList: dataList
        })
    }

    handleCheckAllInputChange = () => {
        var { dataList, checked_all } = this.state;
        if (!Libs.isArrayData(dataList)) return;
        for (var i = 0, len = dataList.length; i < len; i++) {
            dataList[i].is_checked = checked_all ? 0 : 1;
        }

        this.setState({
            dataList: dataList,
            checked_all: checked_all ? 0 : 1
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

        if (name === 'status') {
            if (Libs.isObjectEmpty(item)) {
                searchParam.status = '';
            }
        }

        searchParam[name] = value;
        self.setState({
            searchParam: searchParam
        });
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
                }, () => {
                    self.getList();
                });
            } else {
                self.setState({
                    dataErrorLevel: []
                });
            }
        })
    }

    onClickCloseDeleteAll = (status, data) => {
        if (status && data) {
            this.getList();
        }
        this.setState({
            deleteAll: false
        })
    }

    /**
 * @description Item click event delete all
 * @author Long.Pham 12-05-2021
 * @param index Order element in the list
 */
    onItemClickDeleteAll = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index];
        this.setState({
            curItem: item,
            deleteAll: true
        });
    }


    onClickCloseDelete = (status, data) => {
        if (status && data) {
            this.getList();
        }
        this.setState({
            delete: false
        })
    }

    onClickCloseAdd = (status) => {
        if (status) {
            this.getList();
        }
        this.setState({
            add: false
        })
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

    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getList() {
        let self = this;
        var { dataErrorLevel, dataErrorType, dataStatus } = this.state;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_employee = this.employee.id_employee;
        params.hash_id = this.state.hash_id;
        params.errorLevel = dataErrorLevel.filter((item) => item.is_checked == 1);
        params.errorType = dataErrorType.filter((item) => item.is_checked == 1);
        params.dataStatus = dataStatus.filter((item) => item.is_checked == 1);
        params.type = 'private';

        MainActivitiesService.instance.getList(params, (data, total_row) => {
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


    /**
     * @description Item click event
     * @author Long.Pham 12-05-2021
     * @param index element in the list
     */
    onItemClick = (index) => {
        if (!Libs.isArrayData(this.state.dataList)) return;
        var item = this.state.dataList[index];
        if (Libs.isObjectEmpty(item)) return;
        var params = this.state.curItem;
        params.id = item.id;
        item.screen_mode = Constants.SCREEN_MODE.EDIT;
        this.setState({
            curItem: item,
            add: true
        })
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
        searchParam.status = null;
        searchParam.is_follow = null;
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

const HighOrderComponentTranslated = withTranslation('common')(Activities)
export default HighOrderComponentTranslated;