import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class MainAnalyticsService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new MainAnalyticsService();
        }
        return this._instance;
    }

    /**
     * API get chart inverter performance
     * @author long.pham 2020-11-02
     * @param {function(data)} callBack
     * @param {int} id_site 
     * @return Object
     */
     getDataReportMonth(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_REPORT.MOTNH, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //error http => lib http  proccess
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(data);
                }
            })
        } catch (error) {
            callBack({});
        }
    }


    /**
     * API get chart inverter performance
     * @author long.pham 2020-11-02
     * @param {function(data)} callBack
     * @param {int} id_site 
     * @return Object
     */
     getDataReportYear(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_REPORT.YEAR, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //error http => lib http  proccess
                        return;
                    }
                    var data = {};
                    if (rs.status && typeof rs.data === 'object') {
                        data = rs.data;
                    }
                    callBack(data);
                }
            })
        } catch (error) {
            callBack({});
        }
    }
}
