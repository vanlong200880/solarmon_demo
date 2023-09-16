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
    getDataChartProfile(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_ANALYTICS.CHART_PROFILE, objE, function (status, rs) {
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
         * @author long.pham 2018-07-27
         * @param  {RoleEntity} objE
         * @param  {function(data,total_row,msg)} callBack
         * @param  {Boolean} isShowProgress
         */
    getListDeviceByProject(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_ANALYTICS.LIST_DEVICE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
                        return;
                    }
                    var data = [];
                    var total_row = 0;
                    if (rs.status && Array.isArray(rs.data)) {
                        data = rs.data;
                        total_row = rs.total_row;
                    }
                    callBack(data, total_row, "");
                }
            });
        } catch (error) {
            var msg = error;
            callBack(false, 0, msg);
        }
    }




    /**
         * @author long.pham 2018-07-27
         * @param  {RoleEntity} objE
         * @param  {function(data,total_row,msg)} callBack
         * @param  {Boolean} isShowProgress
         */
    getChartByListDevice(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_ANALYTICS.CHART_PARAMETER_DEVICE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
                        return;
                    }
                    var data = [];
                    var total_row = 0;
                    if (rs.status && Array.isArray(rs.data)) {
                        data = rs.data;
                        total_row = rs.total_row;
                    }
                    callBack(data, total_row, "");
                }
            });
        } catch (error) {
            var msg = error;
            callBack(false, 0, msg);
        }
    }



    /**
     * API get chart mini site inverter performance
     * @author long.pham 2020-11-02
     * @param {function(data)} callBack
     * @param {int} id_site 
     * @return Object
     */
    getChartAlarm(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_ANALYTICS.CHART_ALARM, objE, function (status, rs) {
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
