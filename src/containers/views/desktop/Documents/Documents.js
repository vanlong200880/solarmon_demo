import BaseComponent from '../../../BaseComponent';
import DocumentsJsx from './Documents.jsx';
import { withTranslation } from 'react-i18next';

class Documents extends BaseComponent {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = DocumentsJsx;
        this.state = {
            curItem: {}
        };
    }

    render() {
        return this.jsxTemplate.call(this);
    }

}

const HighOrderComponentTranslated = withTranslation('common')(Documents)
export default HighOrderComponentTranslated;