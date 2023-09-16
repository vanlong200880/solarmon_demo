import DashBoardJsx from './DashBoard.jsx';
import BaseComponent from '../../../BaseComponent';
import { withTranslation } from 'react-i18next';

class DashBoard extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        
        this.state = {
            curItem: {}
        };

        this.jsxTemplate = DashBoardJsx;

    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(DashBoard)
export default HighOrderComponentTranslated;