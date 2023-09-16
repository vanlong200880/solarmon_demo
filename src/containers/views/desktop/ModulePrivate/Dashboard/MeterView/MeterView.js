import MeterViewJsx from './MeterView.jsx';
import BaseComponent from '../../../../../BaseComponent';
import Libs from '../../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import MainProjectService from '../../../../../../services/MainProjectService';

class MeterView extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            curItem: {},
            showInfoWindow: false,
            showIconHover: false,
            mode: 'grid',
            dataList: [],
            dataListSummary: [],
            searchParam: {
                limit: 16,
                offset: 0,
                index: 1,
            },
            formSearch: false
        };

        this.paging = {
            total: 0,
            current: 1,
            currentInput: 1
        };

        this.jsxTemplate = MeterViewJsx;

        this.inputChangedHandler = this.inputChangedHandler.bind(this);
        this.inputChangedEnter = this.inputChangedEnter.bind(this);
        this.inputChangedBlue = this.inputChangedBlue.bind(this);

    }

    componentDidMount() {
        this.getListMeterByEmplpyee();
    }

    /**
     * get list
     * @author Long.Pham 2019-06-03
     */
     getListMeterByEmplpyee() {
        let self = this;
        let params = this.state.searchParam;
        params.id_language = this.employee.id_language;
        params.id_employee = this.employee.id_employee;
        MainProjectService.instance.getListMeterByEmplpyee(params, (data, total_row) => {

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
                self.getListMeterByEmplpyee();
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
        self.getListMeterByEmplpyee();
    }


    /**
     * @description reload data
     * @author long.pham 09/05/2021
     * @param {int} index
     */
    onClickReload() {
        let self = this;
        self.getListMeterByEmplpyee();
    }


    /**
    * Func filter table
    * @author Long.Pham 12-05-2021
    * @param  {Object} e
    */

    onSort(event, sortKey) {
        this.state.searchParam.sort_column = sortKey;
        this.state.searchParam.order_by = (this.state.searchParam.order_by === '' || this.state.searchParam.order_by === 'asc') ? 'desc' : 'asc';
        this.getListMeterByEmplpyee();
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
            self.getListMeterByEmplpyee();
        });
    }

    /**
     * Func search
     * @author Long.Pham 12/05/2021
     * @param  {Object} e
     */
    handleSearch() {
        this.getListMeterByEmplpyee();
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(MeterView)
export default HighOrderComponentTranslated;