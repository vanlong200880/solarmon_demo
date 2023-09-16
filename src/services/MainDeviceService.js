import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';
import Libs from '../utils/Libs';

export default class MainDeviceService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new MainDeviceService();
        }
        return this._instance;
    }

    
    

    /**
     * @author long.pham 2018-07-27
     * @param  {Device.Entity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getListInverter(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.LIST_INVERTER, objE, function (status, rs) {
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
     * @param  {Device.Entity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
    getListDeviceByHashId(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.LIST, objE, function (status, rs) {
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
     * @param  {Device.Entity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getDataListHardware(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.PARAMETER, objE, function (status, rs) {
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


    
    getListParameterByDevice(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.PARAMETER, objE, function (status, rs) {
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
     * @param  {Device.Entity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getListAlertByDevice(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.LIST_ALERT, objE, function (status, rs) {
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
      * API call for update Role status
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     updateOnOff(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.MAIN_DEVICE.UPDATE_ON_OFF, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = rs.mess;
                    callBack(rs.status, msg);
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
     saveControlCalendar(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.SAVE_CONTROL_CALENDAR, objE, function (status, rs) {
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


     /**
     * API call for save data
     * @author long.pham 2018-07-27
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
      saveArrControlCalendar(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.SAVE_ARR_CONTROL_CALENDAR, objE, function (status, rs) {
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

    /**
     * @author long.pham 2018-07-27
     * @param  {Device.Entity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getListControlCalendar(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.LIST_CONTROL_CALENDAR, objE, function (status, rs) {
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
     * @param  {Device.Entity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
     getListBySiteControlCalendar(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.LIST_BY_SITE_CONTROL_CALENDAR, objE, function (status, rs) {
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
      * API call for update Role status
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     deleteListCalendarControl(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.MAIN_DEVICE.DELETE_LIST_CALENDAR, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = rs.mess;
                    callBack(rs.status, msg);
                }
            })
        } catch (error) {
            callBack(false, error);
        }
    }


    
    /**
      * API call for update Role status
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     deleteItemCalendarControl(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.MAIN_DEVICE.DELETE_ITEM_CALENDAR, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = rs.mess;
                    callBack(rs.status, msg);
                }
            })
        } catch (error) {
            callBack(false, error);
        }
    }


    
    /**
      * API call for update Role status
      * @author long.pham
      * @param @param {ErrorEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     updateControlMode(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.MAIN_DEVICE.UPDATE_MODE, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = rs.mess;
                    callBack(rs.status, msg);
                }
            })
        } catch (error) {
            callBack(false, error);
        }
    }


    /**
     * API get detail
     * @author Long.Pham 2019-05-28
     * @param {RegenncyEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */

     getProjectDetail(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.MAIN_DEVICE.PROJECT_DETAIL, objE, function (status, rs) {
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
      * API call for update Role status
      * @author long.pham
      * @param @param {ErrorEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
     updateModePowerAndEnergy(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.MAIN_DEVICE.UPDATE_MODE_POWER_ENERGY, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
                        return;
                    }
                    var msg = rs.mess;
                    callBack(rs.status, msg);
                }
            })
        } catch (error) {
            callBack(false, error);
        }
    }


    
    getPowerNowByDay(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.MAIN_DEVICE.POWER_NOW_BY_DAY, objE, function (status, rs) {
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
