import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class ProjectService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new ProjectService();
        }
        return this._instance;
    }

    /**
     * @author long.pham 2018-07-27
     * @param  {ProjectEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getProjectSideBar(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.CLIENT_PROJECT.PROJECT_SIDEBAR, objE, function (status, rs) {
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
     * @param  {ProjectEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getListProjectByEmplpyee(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.CLIENT_PROJECT.LIST_PROJECT_BY_EMPLOYEE, objE, function (status, rs) {
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
     * @param  {ProjectEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getListPlantSummary(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.CLIENT_PROJECT.LIST_PLANT_SUMMARY, objE, function (status, rs) {
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
     * @param  {ProjectEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getAllProjectByEmployeeId(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.CLIENT_PROJECT.LIST_SCOPE, objE, function (status, rs) {
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
}
