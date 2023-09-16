
import BaseComponent from '../../../../BaseComponent';
import SingleLinePopupJsx from './SingleLinePopup.jsx';

class SingleLinePopup extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            curItem: {}
        }
        this.jsxTemplate = SingleLinePopupJsx;
    }


    
}
export default SingleLinePopup;