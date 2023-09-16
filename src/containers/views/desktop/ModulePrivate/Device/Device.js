import DeviceJsx from './Device.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../utils/Constants';
import MainDeviceService from '../../../../../services/MainDeviceService';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import moment from 'moment';

class Device extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = DeviceJsx;
        this.state = {
            hash_id: !Libs.isObjectEmpty(this.params) ? this.params.id : null,
            curItem: {},
            dataList: [],
            dataListInverter: [],
            show_tab: 1,
            tab_on_off: 1,
            showOnOffPopup: false,
            showControlCalendar: false,
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
                max_date: Libs.getCurrentDDMMYYYY(),
                current_date: Libs.getCurrentDDMMYYYY()
            },
            viewDevice: false,
            formSearch: false
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
        var { tab_on_off } = this.state;
        if (tab_on_off == 2) {
            this.getListInverter();
        } else {
            this.getList();
        }

    }

    componentWillReceiveProps(nextProps) {
        let self = this;
        var { tab_on_off } = this.state;
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                hash_id: nextProps.match.params.id
            }, () => {
                if (tab_on_off == 2) {
                    this.getListInverter();
                } else {
                    this.getList();
                }
            });
        }
    }


    onClickControlCalender = (index) => {
        var { dataListInverter } = this.state;
        if (!Libs.isArrayData(dataListInverter)) return;
        var item = dataListInverter[index];
        if (Libs.isObjectEmpty(item)) return;
        this.setState({
            showControlCalendar: true,
            curItem: item
        })

    }

    onCloseControlCalender = () => {
        this.setState({
            showControlCalendar: false
        })

    }


    onClickOnOff = (index) => {
        var { dataListInverter } = this.state;
        if (!Libs.isArrayData(dataListInverter)) return;
        var item = dataListInverter[index];
        if (Libs.isObjectEmpty(item)) return;
        this.setState({
            showOnOffPopup: true,
            curItem: item
        })

    }

    onClickCloseOnOff = (status) => {
        if (status) {
            this.getListInverter();
        }
        this.setState({
            showOnOffPopup: false
        })

    }

    setTabOnOff(index) {
        var self = this;
        this.setState({
            tab_on_off: index
        }, () => {
            if (index == 2) {
                self.getListInverter();
            } else {
                self.getList();
            }
        })

    }


    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getListInverter() {
        let self = this;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_employee = this.employee.id_employee;
        params.hash_id = this.state.hash_id;
        params.type = 'private';
        MainDeviceService.instance.getListInverter(params, (data, total_row) => {
            if (Libs.isArrayData(data)) {
                self.setState({
                    dataListInverter: data
                });
            } else {
                self.setState({
                    dataListInverter: []
                });
            }
            self.forceUpdate();
        });
    }

    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputDateChange(event) {
        let target = event.target;
        let name = target.name;
        var self = this;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let { searchParam } = this.state;
            searchParam[name] = value;
            this.setState({ searchParam }, () => {
                self.getPowerNowByDay();
            });
        }
    }


    async getPowerNowByDay() {
        var { dataList, searchParam } = this.state, self = this;
        if (!Libs.isArrayData(dataList)) return;
        var searchParam = Object.assign({}, searchParam);
        searchParam.current_date = Libs.dateFormat(searchParam.current_date, 'YYYY-MM-DD HH:mm:ss', 'DD/MM/YYYY HH:mm:ss');
        searchParam.dataList = dataList;
        await MainDeviceService.instance.getPowerNowByDay(searchParam, data => {
            if (data) {
                self.setState({
                    dataList: data.dataList
                })
            }
        }, false);
    }

    
    downloadData = () => {
        var { dataList } = this.state;
        var { t } = this.props;
        if (!Libs.isArrayData(dataList)) return;

        var dataExport = [];
        for (var i = 0, len = dataList.length; i < len; i++) {
            var itemLevel = dataList[i].alerts;
            var error = 0, warning = 0, info = 0, fatal = 0, debug = 0;
            if (Libs.isArrayData(itemLevel)) {
                for (var j = 0, leng = itemLevel.length; j < leng; j++) {
                    switch (parseInt(itemLevel[j].id)) {
                        case 1:
                            error = itemLevel[j].total_alert;
                            break;
                        case 2:
                            warning = itemLevel[j].total_alert;
                            break;
                        case 3:
                            info = itemLevel[j].total_alert;
                            break;
                        case 4:
                            fatal = itemLevel[j].total_alert;
                            break;
                        case 5:
                            debug = itemLevel[j].total_alert;
                            break;
                    }
                }
            }
            dataExport.push({
                'ID': dataList[i].id,
                'Device name': dataList[i].name,
                'Model': dataList[i].model,
                'Serial number': dataList[i].serial_number,
                'Device type': dataList[i].device_type_name,
                'Power now': !Libs.isBlank(dataList[i].power_now) ? Libs.formatNum(dataList[i].power_now, '#,###.##') + " kW" : "N/A",
                'Energy today': !Libs.isBlank(dataList[i].energy_today) ? Libs.formatNum(dataList[i].energy_today, '#,###.##') + " kWh": "N/A",
                'Lifetime': !Libs.isBlank(dataList[i].lifetime) ? Libs.formatElectricalUnit(dataList[i].lifetime, 'h') : "N/A",
                'Error': error,
                'Warning': warning,
                'Info': info,
                'Fatal': fatal,
                'Debug': debug
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
    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
    getList() {
        let self = this;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_employee = this.employee.id_employee;
        params.hash_id = this.state.hash_id;
        params.type = 'private';
        MainDeviceService.instance.getListDeviceByHashId(params, (data, total_row) => {
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


    onClickViewDevice = (index) => {
        let { dataList } = this.state;
        if (!Libs.isArrayData(dataList)) return;
        var item = dataList[index];
        if (Libs.isObjectEmpty(item)) return;

        item.screen_mode = Constants.SCREEN_MODE.ADD;
        this.setState({
            show_tab: 1,
            curItem: item,
            viewDevice: true
        });
    };


    onClickChartDevice = (index) => {
        let { dataList } = this.state;
        if (!Libs.isArrayData(dataList)) return;
        var item = dataList[index];
        if (Libs.isObjectEmpty(item)) return;

        item.screen_mode = Constants.SCREEN_MODE.ADD;
        this.setState({
            show_tab: 3,
            curItem: item,
            viewDevice: true
        });

        // let curItem = this.state.curItem;
        // curItem.data_send_time = 1;
        // curItem.type = 1;

        // curItem.screen_mode = Constants.SCREEN_MODE.ADD;
        // this.setState({
        //     curItem: curItem,
        //     show_tab: 3,
        //     viewDevice: true
        // });
    };

    viewAlertDevice = (index) => {
        var { dataList, curItem } = this.state;
        if (!Libs.isArrayData(dataList)) return;
        var item = dataList[index];
        if (Libs.isObjectEmpty(item)) return;
        curItem.screen_mode = Constants.SCREEN_MODE.ADD;
        this.setState({
            curItem: Object.assign(curItem, item),
            show_tab: 2,
            viewDevice: true
        })
    }

    onClickCloseViewDevice = (status) => {
        if (status) {
            // this.getList();
        }
        this.setState({
            viewDevice: false
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
        searchParam.name = null;
        searchParam.id = null;
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

const HighOrderComponentTranslated = withTranslation('common')(Device)
export default HighOrderComponentTranslated;