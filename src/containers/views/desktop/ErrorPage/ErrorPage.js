import React from 'react';
import ErrorPageJsx from './ErrorPage.jsx';
import { withTranslation } from 'react-i18next';
import './ErrorPage.scss';

class ErrorPage extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.jsxTemplate = ErrorPageJsx;
        this.state = {
            curItem: {},
        };
    }

    render() {
        return this.jsxTemplate.call(this);
    }

}

const HighOrderComponentTranslated = withTranslation('common')(ErrorPage)
export default HighOrderComponentTranslated;