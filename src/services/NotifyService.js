import Libs from '../utils/Libs';
import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class NotifyService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new NotifyService();
        }
        return this._instance;
    }

    /**
     * @author long.pham 2018-07-27
     * @param  {RoleEntity} objE
     * @param  {function(data,total_row,msg)} callBack
     * @param  {Boolean} isShowProgress
     */
    getList(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            var data = [
                {
                    "priority_name": "FATAL",
                    "level": "FATAL",
                    "status_name": "Open",
                    "id_site": 38,
                    "id_error_level": 11,
                    "start": "2021-07-27 19:55:49 PM",
                    "open_period": 27387,
                    "message": "No communication",
                    "site_name": "C&G Farms",
                    "duration": "19d 0h 27m",
                    "id_device": 106,
                    "error_code": "1001",
                    "devicename": "Satcon PVS-375 Inverter",
                    "icon_alert": "icons/yUFYKvdWLaHqAOKT.png",
                    "id": 103788,
                    "status": true,
                    "start_date": "07/26/2021 22:55 PM",
                    "alert_type": "disconnected",
                    "project_name": "Project 1"
                },
                {
                    "priority_name": "FATAL",
                    "level": "FATAL",
                    "status_name": "Open",
                    "id_site": 38,
                    "id_error_level": 11,
                    "start": "2021-07-27 19:55:41 PM",
                    "open_period": 27387,
                    "message": "No communication",
                    "site_name": "C&G Farms",
                    "duration": "19d 0h 27m",
                    "id_device": 105,
                    "error_code": "1001",
                    "devicename": "Shark 100",
                    "icon_alert": "icons/yUFYKvdWLaHqAOKT.png",
                    "id": 103787,
                    "status": true,
                    "start_date": "07/26/2021 22:55 PM",
                    "alert_type": "zerogeneration",
                    "project_name": "Project 1"
                },
                {
                    "priority_name": "INFO",
                    "level": "INFO",
                    "status_name": "Open",
                    "id_site": 38,
                    "id_error_level": 2,
                    "start": "2021-07-27 12:55:00 PM",
                    "open_period": 27808,
                    "message": "Connection refused",
                    "site_name": "C&G Farms",
                    "duration": "19d 7h 28m",
                    "id_device": 105,
                    "error_code": "111",
                    "devicename": "Shark 100",
                    "icon_alert": "icons/wtiKjpBVegrhIKdT.png",
                    "id": 103785,
                    "status": true,
                    "start_date": "07/26/2021 15:55 PM",
                    "alert_type": "performance index",
                    "project_name": "Project 1"
                },
                {
                    "priority_name": "INFO",
                    "level": "INFO",
                    "status_name": "Open",
                    "id_site": 38,
                    "id_error_level": 2,
                    "start": "2021-07-27 10:40:44 AM",
                    "open_period": 27942,
                    "message": "Device Failed to Respond (the Modbus device may be off or disconnected)\r",
                    "site_name": "C&G Farms",
                    "duration": "19d 9h 42m",
                    "id_device": 106,
                    "error_code": "139",
                    "devicename": "Satcon PVS-375 Inverter",
                    "icon_alert": "icons/wtiKjpBVegrhIKdT.png",
                    "id": 103779,
                    "status": true,
                    "start_date": "07/26/2021 13:40 PM",
                    "alert_type": "Stringperformance",
                    "project_name": "Project 1"
                },
                {
                    "priority_name": "INFO",
                    "level": "INFO",
                    "status_name": "Open",
                    "id_site": 38,
                    "id_error_level": 2,
                    "start": "2021-07-27 10:40:36 AM",
                    "open_period": 27942,
                    "message": "Device Failed to Respond (the Modbus device may be off or disconnected)\r",
                    "site_name": "C&G Farms",
                    "duration": "19d 9h 42m",
                    "id_device": 105,
                    "error_code": "139",
                    "devicename": "Shark 100",
                    "icon_alert": "icons/wtiKjpBVegrhIKdT.png",
                    "id": 103778,
                    "status": true,
                    "start_date": "07/26/2021 13:40 PM",
                    "alert_type": "Stringperformance",
                    "project_name": "Project 1"
                },
                {
                    "priority_name": "FATAL",
                    "level": "FATAL",
                    "status_name": "Open",
                    "id_site": 38,
                    "id_error_level": 11,
                    "start": "2021-07-27 10:24:00 AM",
                    "open_period": 27959,
                    "message": "No production",
                    "site_name": "C&G Farms",
                    "duration": "19d 9h 59m",
                    "id_device": 106,
                    "error_code": "1000",
                    "devicename": "Satcon PVS-375 Inverter",
                    "icon_alert": "icons/yUFYKvdWLaHqAOKT.png",
                    "id": 103770,
                    "status": true,
                    "start_date": "07/26/2021 13:24 PM",
                    "alert_type": "Stringperformance",
                    "project_name": "Project 1"
                },
                {
                    "priority_name": "FATAL",
                    "level": "FATAL",
                    "status_name": "Open",
                    "id_site": 38,
                    "id_error_level": 11,
                    "start": "2021-07-27 10:24:00 AM",
                    "open_period": 27959,
                    "message": "No production",
                    "site_name": "C&G Farms",
                    "duration": "19d 9h 59m",
                    "id_device": 105,
                    "error_code": "1000",
                    "devicename": "Shark 100",
                    "icon_alert": "icons/yUFYKvdWLaHqAOKT.png",
                    "id": 103769,
                    "status": true,
                    "start_date": "07/26/2021 13:24 PM",
                    "alert_type": "Stringperformance",
                    "project_name": "Project 1"
                }
            ];
            callBack(data, 40, "");

            // http.post(Constants.URL.GROUP_ATTRIBUTES.LIST, objE, function (status, rs) {
            //     if (typeof callBack === 'function') {
            //         if (!status || !rs) {
            //             //lỗi do http nên không làm gì vì đã có http thư viện xử lý
            //             return;
            //         }
            //         var data = [];
            //         var total_row = 0;
            //         if (rs.status && Array.isArray(rs.data)) {
            //             data = rs.data;
            //             total_row = rs.total_row;
            //         }
            //         callBack(data, total_row, "");
            //     }
            // });
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
    updateStatus(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.GROUP_ATTRIBUTES.UPDATE_STATUS, objE, function (status, rs) {
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
    save(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.GROUP_ATTRIBUTES.SAVE, objE, function (status, rs) {
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
      * API call for delete
      * @author long.pham
      * @param @param {RoleEntity} objE
      * @param {function(status,msg)} callBack 
      * @param  {boolean} isShowProgress
      */
    delete(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.GROUP_ATTRIBUTES.DELETE, objE, function (status, rs) {
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
     * API get detail
     * @author Long.Pham 2019-05-28
     * @param {RegenncyEntity} objE 
     * @param {function(data)} callBack
     * @param {boolean} isShowProgress 
     */

    getDetail(objE, callBack) {
        try {
            var http = new CMSHttp(true);
            http.post(Constants.URL.GROUP_ATTRIBUTES.DETAIL, objE, function (status, rs) {
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
    * Get dropdown list
    * @author Long.Pham
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getDropdownList(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.GROUP_ATTRIBUTES.DROPDOWN_LIST, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
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
    * Get dropdown list all attr
    * @author Long.Pham
    * @param {function (data,total_row,msg)} callBack 
    * @param {boolean} isShowProgress 
    */
    getDropdownListAttr(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.GROUP_ATTRIBUTES.DROPDOWN_LIST_ATTR, objE, function (status, rs) {
                if (typeof callBack === 'function') {
                    if (!status || !rs) {
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
