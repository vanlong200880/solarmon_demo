import React, { Component } from 'react';
import Constants from '../../../../../../utils/Constants';

class RowItemDevice extends Component {
    
    render() {
        var item = this.props.dataItem;
        const { t } = this.props;
        return (
            <div className="body-row" key={item.id}>
                <div className="body-col width10"><p><img style={{ width: "20px", height: "20px" }} src={Constants.SERVER_DATA + "/" + item.thumbnail} /> </p></div>
                <div className="body-col width15"><p>{item.error_level_name} </p></div>
                <div className="body-col width40">
                <p><strong>{t('device.id_error_type')}: </strong>{item.error_type_name}</p> <hr></hr>
                    <p><strong>{t('device.description')}: </strong> {item.description}</p></div>
                <div className="body-col width20"><p>{item.start_date_format}</p></div>
                <div className="body-col width15 text-end">
                    <p>
                        {item.times_ago > 0 ? item.times_ago : ""}
                        {" " + t("common." + item.times_ago_unit)}
                        {item.times_ago > 1 && "s"}
                    </p></div>
            </div>
        );
    }
}
export default RowItemDevice;
