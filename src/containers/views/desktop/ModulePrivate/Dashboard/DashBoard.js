import DashBoardJsx from './DashBoard.jsx';
import BaseComponent from '../../../../BaseComponent';
import { withTranslation } from 'react-i18next';

class DashBoard extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            curItem: {},
            showInfoWindow: false,
            showIconHover: false,
            mode: 'grid', // grid
            dataList: [],
            searchParam: {
                limit: 16,
                offset: 0,
                index: 1,
            },
            formSearch: false
        };

        this.jsxTemplate = DashBoardJsx;
    }
    
    onClickChangeMode = (mode) => {
        var self = this;
        this.setState({
            mode: mode
        });
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
        });
    }

    /**
     * Func search
     * @author Long.Pham 12/05/2021
     * @param  {Object} e
     */
    handleSearch() {
        var {searchParam} = this.state;
        this.setState({
            searchParam: searchParam
        })
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(DashBoard)
export default HighOrderComponentTranslated;