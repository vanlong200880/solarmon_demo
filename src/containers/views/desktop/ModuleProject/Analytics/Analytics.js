import React from 'react';
import AnalyticsJsx from './Analytics.jsx';
import BaseComponent from '../../../../BaseComponent';
import Libs from '../../../../../utils/Libs';
import { withTranslation } from 'react-i18next';
import Constants from '../../../../../utils/Constants';
class Analytics extends BaseComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            hash_id: !Libs.isObjectEmpty(this.params) ? this.params.id : null,
            curItem: {
                data_send_time: 1,
                type: 3
            },
            dataStatus: [
                {
                    id: 1,
                    value: 1,
                    label: "Performance analytics"
                },
                {
                    id: 2,
                    value: 2,
                    label: "Device analytics"
                },
                // {
                //     id: 3,
                //     value: 3,
                //     label: "Alarm dashboard"
                // },
                // {
                //     id: 4,
                //     value: 4,
                //     label: "Inverter diagnostic"
                // },
                
            ],
            dataList: [],
            searchParam: {
                limit: Constants.COMMON.LIMIT,
                offset: 0,
                index: 1,
            },
        };


        this.jsxTemplate = AnalyticsJsx;

    }

    componentWillReceiveProps(nextProps) {
        let self = this;
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.setState({
                hash_id: nextProps.match.params.id
            });
        }
    }
    
    reloadData = () =>{
        this.forceUpdate();
    }

    handleDropdownChange = (item, name) => {
        var self = this;
        let curItem = self.state.curItem;

        if (Libs.isObjectEmpty(item)) {
            curItem.type = 2;
        } else {
            var value = item.value;
            curItem[name] = value;
        }

        self.setState({
            curItem: curItem
        });
    }

    render() {
        return this.jsxTemplate.call(this)
    }
}

const HighOrderComponentTranslated = withTranslation('common')(Analytics)
export default HighOrderComponentTranslated;