import Libs from '../utils/Libs';
import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class ClientNotifyService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new ClientNotifyService();
        }
        return this._instance;
    }

    

    /**
     * @author long.pham 2018-07-27
     * @param  {Entity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getNotifySize(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.CLIENT_NOTIFY.NOTIFY_SIZE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        //lỗi do http nên không làm gì vì đã có http thư viện xử lý
                        return;
                    }
                    var data = [];
                    var total_row = 0;
                    if (rs.status) {
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
     * @param  {Entity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
    getList(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.CLIENT_NOTIFY.LIST, objE, function (status, rs) {
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
      * API call for delete
      * @author long.pham
      * @param @param {Entity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
      delete(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.CLIENT_NOTIFY.DELETE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var data = null;
                    var msg = rs.mess;
                    if (!Libs.isObjectEmpty(rs.data)) {
                        data = rs.data;
                    }
                    callBack(rs.status, data, msg);
                }
            })
        } catch (error) {
            callBack(false, error);
        }
    }

    
     /**
      * API call for delete
      * @author long.pham
      * @param @param {Entity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
      closeAlert(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.CLIENT_NOTIFY.CLOSE_ALL, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var data = null;
                    var msg = rs.mess;
                    if (!Libs.isObjectEmpty(rs.data)) {
                        data = rs.data;
                    }
                    callBack(rs.status, data, msg);
                }
            })
        } catch (error) {
            callBack(false, error);
        }
    }


     /**
     * API call for save data
     * @author long.pham 2018-07-27
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
      save(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.CLIENT_NOTIFY.SAVE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var data = null;
                    var msg = rs.mess;
                    if (!Libs.isObjectEmpty(rs.data)) {
                        data = rs.data;
                    }
                    callBack(rs.status, data, msg);
                }
            })
        } catch (error) {
            callBack(false, null, error);
        }
    }
}
