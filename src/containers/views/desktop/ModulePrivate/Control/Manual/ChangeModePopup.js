
import BaseComponent from '../../../../../BaseComponent';
import ChangeModePopupJsx from './ChangeModePopup.jsx';

class ChangeModePopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: this.props.curItem,
            searchParam: this.props.searchParam
        }

        this.jsxTemplate = ChangeModePopupJsx;
    }
    async onClickChangeModeAction() {
        var { searchParam } = this.state;
        searchParam.scheduled_mode = searchParam.scheduled_mode == 1 ? 2 : 1;
        this.props.calbackChangeMode(searchParam);
    }

}
export default ChangeModePopup;