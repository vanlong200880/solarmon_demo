import Libs from '../utils/Libs';
import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class ClientDeviceService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new ClientDeviceService();
        }
        return this._instance;
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
            http.post(Constants.URL.CLIENT_DEVICE.LIST, objE, function (status, rs) {
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
            http.post(Constants.URL.CLIENT_DEVICE.PARAMETER, objE, function (status, rs) {
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
            http.post(Constants.URL.CLIENT_DEVICE.PARAMETER, objE, function (status, rs) {
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
            // var data = [
            //     {
            //         "priority_name": "FATAL",
            //         "level": "FATAL",
            //         "status_name": "Open",
            //         "id_site": 38,
            //         "id_error_level": 11,
            //         "start": "2021-07-27 19:55:49 PM",
            //         "open_period": 27387,
            //         "message": "No communication",
            //         "site_name": "C&G Farms",
            //         "duration": "19d 0h 27m",
            //         "id_device": 106,
            //         "error_code": "1001",
            //         "devicename": "Satcon PVS-375 Inverter",
            //         "icon_alert": "icons/yUFYKvdWLaHqAOKT.png",
            //         "id": 103788,
            //         "status": true,
            //         "start_date": "07/26/2021 22:55 PM"
            //     },
                
            // ];

            http.post(Constants.URL.CLIENT_DEVICE.LIST_ALERT, objE, function (status, rs) {
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


//     /**
//      * @author long.pham 2018-07-27
//      * @param  {Device.Entity} objE
//      * @param  {function(data,total_row,msg)} callBack
//      * @param  {Boolean} isShowProgress
//      */
//      getListAlertByDevice(objE, callBack) {
//         try {
//             var http = new CMSHttp(true);
//             var data = [
//                 {
//                     "priority_name": "FATAL",
//                     "level": "FATAL",
//                     "status_name": "Open",
//                     "id_site": 38,
//                     "id_error_level": 11,
//                     "start": "2021-07-27 19:55:49 PM",
//                     "open_period": 27387,
//                     "message": "No communication",
//                     "site_name": "C&G Farms",
//                     "duration": "19d 0h 27m",
//                     "id_device": 106,
//                     "error_code": "1001",
//                     "devicename": "Satcon PVS-375 Inverter",
//                     "icon_alert": "icons/yUFYKvdWLaHqAOKT.png",
//                     "id": 103788,
//                     "status": true,
//                     "start_date": "07/26/2021 22:55 PM"
//                 },
//                 {
//                     "priority_name": "FATAL",
//                     "level": "FATAL",
//                     "status_name": "Open",
//                     "id_site": 38,
//                     "id_error_level": 11,
//                     "start": "2021-07-27 19:55:41 PM",
//                     "open_period": 27387,
//                     "message": "No communication",
//                     "site_name": "C&G Farms",
//                     "duration": "19d 0h 27m",
//                     "id_device": 105,
//                     "error_code": "1001",
//                     "devicename": "Shark 100",
//                     "icon_alert": "icons/yUFYKvdWLaHqAOKT.png",
//                     "id": 103787,
//                     "status": true,
//                     "start_date": "07/26/2021 22:55 PM"
//                 },
//                 {
//                     "priority_name": "INFO",
//                     "level": "INFO",
//                     "status_name": "Open",
//                     "id_site": 38,
//                     "id_error_level": 2,
//                     "start": "2021-07-27 12:55:00 PM",
//                     "open_period": 27808,
//                     "message": "Connection refused",
//                     "site_name": "C&G Farms",
//                     "duration": "19d 7h 28m",
//                     "id_device": 105,
//                     "error_code": "111",
//                     "devicename": "Shark 100",
//                     "icon_alert": "icons/wtiKjpBVegrhIKdT.png",
//                     "id": 103785,
//                     "status": true,
//                     "start_date": "07/26/2021 15:55 PM"
//                 },
//                 {
//                     "priority_name": "INFO",
//                     "level": "INFO",
//                     "status_name": "Open",
//                     "id_site": 38,
//                     "id_error_level": 2,
//                     "start": "2021-07-27 10:40:44 AM",
//                     "open_period": 27942,
//                     "message": "Device Failed to Respond (the Modbus device may be off or disconnected)\r",
//                     "site_name": "C&G Farms",
//                     "duration": "19d 9h 42m",
//                     "id_device": 106,
//                     "error_code": "139",
//                     "devicename": "Satcon PVS-375 Inverter",
//                     "icon_alert": "icons/wtiKjpBVegrhIKdT.png",
//                     "id": 103779,
//                     "status": true,
//                     "start_date": "07/26/2021 13:40 PM"
//                 },
//                 {
//                     "priority_name": "INFO",
//                     "level": "INFO",
//                     "status_name": "Open",
//                     "id_site": 38,
//                     "id_error_level": 2,
//                     "start": "2021-07-27 10:40:36 AM",
//                     "open_period": 27942,
//                     "message": "Device Failed to Respond (the Modbus device may be off or disconnected)\r",
//                     "site_name": "C&G Farms",
//                     "duration": "19d 9h 42m",
//                     "id_device": 105,
//                     "error_code": "139",
//                     "devicename": "Shark 100",
//                     "icon_alert": "icons/wtiKjpBVegrhIKdT.png",
//                     "id": 103778,
//                     "status": true,
//                     "start_date": "07/26/2021 13:40 PM"
//                 },
//                 {
//                     "priority_name": "FATAL",
//                     "level": "FATAL",
//                     "status_name": "Open",
//                     "id_site": 38,
//                     "id_error_level": 11,
//                     "start": "2021-07-27 10:24:00 AM",
//                     "open_period": 27959,
//                     "message": "No production",
//                     "site_name": "C&G Farms",
//                     "duration": "19d 9h 59m",
//                     "id_device": 106,
//                     "error_code": "1000",
//                     "devicename": "Satcon PVS-375 Inverter",
//                     "icon_alert": "icons/yUFYKvdWLaHqAOKT.png",
//                     "id": 103770,
//                     "status": true,
//                     "start_date": "07/26/2021 13:24 PM"
//                 },
//                 {
//                     "priority_name": "FATAL",
//                     "level": "FATAL",
//                     "status_name": "Open",
//                     "id_site": 38,
//                     "id_error_level": 11,
//                     "start": "2021-07-27 10:24:00 AM",
//                     "open_period": 27959,
//                     "message": "No production",
//                     "site_name": "C&G Farms",
//                     "duration": "19d 9h 59m",
//                     "id_device": 105,
//                     "error_code": "1000",
//                     "devicename": "Shark 100",
//                     "icon_alert": "icons/yUFYKvdWLaHqAOKT.png",
//                     "id": 103769,
//                     "status": true,
//                     "start_date": "07/26/2021 13:24 PM"
//                 }
//             ];
//             callBack(data, 40, "");

//             // http.post(Constants.URL.DEVICE.LIST, objE, function (status, rs) {
//             //     if (typeof callBack === 'function') {
//             //         if (!status || !rs) {
//             //             //lỗi do http nên không làm gì vì đã có http thư viện xử lý
//             //             return;
//             //         }
//             //         var data = [];
//             //         var total_row = 0;
//             //         if (rs.status && Array.isArray(rs.data)) {
//             //             data = rs.data;
//             //             total_row = rs.total_row;
//             //         }
//             //         callBack(data, total_row, "");
//             //     }
//             // });
//         } catch (error) {
//             var msg = error;
//             callBack(false, 0, msg);
//         }
//     }




//     /**
//      * @author long.pham 2018-07-27
//      * @param  {Device.Entity} objE
//      * @param  {function(data,total_row,msg)} callBack
//      * @param  {Boolean} isShowProgress
//      */
//     getDataListHardware(objE, callBack) {
//         try {
//             var http = new CMSHttp(true);
//             var data = [
//                 {
//                     "id": 131,
//                     "id_device_group": 0,
//                     "name": "Today kWh",
//                     "description": null,
//                     "unit": "kWh",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "today_kwh",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "10.49",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 132,
//                     "id_device_group": 0,
//                     "name": "YTD kWh Total",
//                     "description": null,
//                     "unit": "kWh",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "ytd_kwh_total",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "646375.813",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 133,
//                     "id_device_group": 0,
//                     "name": "Life kWh Total",
//                     "description": null,
//                     "unit": "kWh",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "life_kwh_total",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "646375.813",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 134,
//                     "id_device_group": 0,
//                     "name": "YTD kWh",
//                     "description": null,
//                     "unit": "kWh",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "ytd_kwh",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "646365.313",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 135,
//                     "id_device_group": 0,
//                     "name": "Life kWh",
//                     "description": null,
//                     "unit": "kWh",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "life_kwh",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 136,
//                     "id_device_group": 0,
//                     "name": "Last 15 min kWh",
//                     "description": null,
//                     "unit": "kWh",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "last_15min_kwh",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "5.651",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 137,
//                     "id_device_group": 0,
//                     "name": "Timestamp 15 minutes",
//                     "description": null,
//                     "unit": "1970 + sec",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "timestamp_15minutes",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "1.628949023E9",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 138,
//                     "id_device_group": 0,
//                     "name": "Last restart",
//                     "description": null,
//                     "unit": "1970 + sec",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "last_restart",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "1.626707433E9",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 139,
//                     "id_device_group": 0,
//                     "name": "Uptime ",
//                     "description": null,
//                     "unit": "seconds",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "uptime",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "2242553.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 140,
//                     "id_device_group": 0,
//                     "name": "AC Power",
//                     "description": null,
//                     "unit": "kW",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "ac_power",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "28.3",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 141,
//                     "id_device_group": 0,
//                     "name": "AC Frequency",
//                     "description": null,
//                     "unit": "Hz",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "ac_frequency",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "60.01",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 142,
//                     "id_device_group": 0,
//                     "name": "PV Voltage",
//                     "description": null,
//                     "unit": "VDC",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "pv_voltage",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "731.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 143,
//                     "id_device_group": 0,
//                     "name": "PV Current",
//                     "description": null,
//                     "unit": "ADC",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "pv_current",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "39.4",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 144,
//                     "id_device_group": 0,
//                     "name": "Common mode",
//                     "description": null,
//                     "unit": "Vrms",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "common_mode",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "11.3",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 145,
//                     "id_device_group": 0,
//                     "name": "Ambient temperature",
//                     "description": null,
//                     "unit": "degrees C",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "ambient_temperature",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "21.6",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 146,
//                     "id_device_group": 0,
//                     "name": "Coolant temperature",
//                     "description": null,
//                     "unit": "degrees C",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "coolant_temperature",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "24.7",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 147,
//                     "id_device_group": 0,
//                     "name": "Reactor temperature",
//                     "description": null,
//                     "unit": "degrees C",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "reactor_temperature",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "28.7",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 148,
//                     "id_device_group": 0,
//                     "name": "Cabinet temperature",
//                     "description": null,
//                     "unit": "degrees C",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "cabinet_temperature",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "26.4",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 149,
//                     "id_device_group": 0,
//                     "name": "Bus voltage",
//                     "description": null,
//                     "unit": "V",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "bus_voltage",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "729.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 150,
//                     "id_device_group": 0,
//                     "name": "Ground current",
//                     "description": null,
//                     "unit": "A",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "ground_current",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.68",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 151,
//                     "id_device_group": 0,
//                     "name": "Reactive Power",
//                     "description": null,
//                     "unit": "kVAr",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "reactive_power",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.1",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 152,
//                     "id_device_group": 0,
//                     "name": "Active Faults 1",
//                     "description": null,
//                     "unit": "int bitmap",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "active_faults1",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 153,
//                     "id_device_group": 0,
//                     "name": "Active Faults 2",
//                     "description": null,
//                     "unit": "int bitmap",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "active_faults2",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 154,
//                     "id_device_group": 0,
//                     "name": "Active Faults 3",
//                     "description": null,
//                     "unit": "int bitmap",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "active_faults3",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 155,
//                     "id_device_group": 0,
//                     "name": "Status ",
//                     "description": null,
//                     "unit": "int bitmap",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "status",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "1289.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 156,
//                     "id_device_group": 0,
//                     "name": "Warnings 1",
//                     "description": null,
//                     "unit": "int bitmap",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "warnings1",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 157,
//                     "id_device_group": 0,
//                     "name": "Warnings 2 (reserved)",
//                     "description": null,
//                     "unit": "int bitmap",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "warnings2_reserved",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 158,
//                     "id_device_group": 0,
//                     "name": "Warnings 3 (reserved)",
//                     "description": null,
//                     "unit": "int bitmap",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "warnings3_reserved",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 159,
//                     "id_device_group": 0,
//                     "name": "Limits ",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "limits",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 160,
//                     "id_device_group": 0,
//                     "name": "Year",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "year",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "2021.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 161,
//                     "id_device_group": 0,
//                     "name": "Month",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "month",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "8.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 162,
//                     "id_device_group": 0,
//                     "name": "Day ",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "day",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "14.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 163,
//                     "id_device_group": 0,
//                     "name": "Hour",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "hour",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "7.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 164,
//                     "id_device_group": 0,
//                     "name": "Minutes ",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "minutes",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "5.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 165,
//                     "id_device_group": 0,
//                     "name": "Seconds ",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "seconds",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "27.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 166,
//                     "id_device_group": 0,
//                     "name": "Current time",
//                     "description": null,
//                     "unit": "1970 + sec",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "current_time",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "1.628949927E9",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 167,
//                     "id_device_group": 0,
//                     "name": "AC Current",
//                     "description": null,
//                     "unit": "Arms",
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "ac_current",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "34.7",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 168,
//                     "id_device_group": 0,
//                     "name": "Requset/Set AC Power Limit",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "requset_set_ac_power_limit",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 169,
//                     "id_device_group": 0,
//                     "name": "Request/Set Instantaneous Reactive Power Set Point",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "request_set_instantaneous_reactive_power_set_point",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 170,
//                     "id_device_group": 0,
//                     "name": "Autostart Status",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "autostart_status",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 171,
//                     "id_device_group": 0,
//                     "name": "Set/Read Reactive Power Mode",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "set_read_reactive_power_mode",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 172,
//                     "id_device_group": 0,
//                     "name": "Set/Read P AC Limit ",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "set_read_p_ac_limit",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 173,
//                     "id_device_group": 0,
//                     "name": "Set/Read Instantaneous Reactive Power Set Point",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "set_read_instantaneous_reactive_power_set_point",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 174,
//                     "id_device_group": 0,
//                     "name": "Set/Read Power Factor Set Point",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "set_read_power_factor_set_point",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 175,
//                     "id_device_group": 0,
//                     "name": "AC Power Ramp Rate",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "ac_power_ramp_rate",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 176,
//                     "id_device_group": 0,
//                     "name": "Reactive Power Ramp Rate",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "reactive_power_ramp_rate",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 },
//                 {
//                     "id": 177,
//                     "id_device_group": 0,
//                     "name": "Power Factor Ramp Rate",
//                     "description": null,
//                     "unit": null,
//                     "is_filter": 0,
//                     "status": 0,
//                     "is_delete": 0,
//                     "created_date": null,
//                     "created_by": null,
//                     "updated_date": null,
//                     "updated_by": null,
//                     "text": null,
//                     "slug": "power_factor_ramp_rate",
//                     "id_device": 0,
//                     "register": null,
//                     "hide": null,
//                     "standard_alert_message": null,
//                     "address": null,
//                     "value": "0.0",
//                     "id_devices": null
//                 }
//             ];
//             callBack(data, 40, "");

//             // http.post(Constants.URL.DEVICE.LIST, objE, function (status, rs) {
//             //     if (typeof callBack === 'function') {
//             //         if (!status || !rs) {
//             //             //lỗi do http nên không làm gì vì đã có http thư viện xử lý
//             //             return;
//             //         }
//             //         var data = [];
//             //         var total_row = 0;
//             //         if (rs.status && Array.isArray(rs.data)) {
//             //             data = rs.data;
//             //             total_row = rs.total_row;
//             //         }
//             //         callBack(data, total_row, "");
//             //     }
//             // });
//         } catch (error) {
//             var msg = error;
//             callBack(false, 0, msg);
//         }
//     }

//     /**
//       * API call for update Role status
//       * @author long.pham
//       * @param @param {Device.Entity} objE
//       * @param {function(status,msg)} callBack 
//       * @param  {boolean} isShowProgress
//       */
//     updateStatus(objE, callBack) {
//         try {
//             var http = new CMSHttp(false);
//             http.post(Constants.URL.DEVICE.UPDATE_STATUS, objE, function (status, rs) {
//                 if (typeof callBack === 'function') {
//                     if (!status || !rs) {
//                         return;
//                     }
//                     var msg = rs.mess;
//                     callBack(rs.status, msg);
//                 }
//             })
//         } catch (error) {
//             callBack(false, error);
//         }
//     }


    
//    /**
//       * API call for update is virtual
//       * @author long.pham
//       * @param @param {Device.Entity} objE
//       * @param {function(status,msg)} callBack 
//       * @param  {boolean} isShowProgress
//       */
//     updateIsVirtual(objE, callBack) {
//         try {
//             var http = new CMSHttp(false);
//             http.post(Constants.URL.DEVICE.UPDATE_IS_VIRTUAL, objE, function (status, rs) {
//                 if (typeof callBack === 'function') {
//                     if (!status || !rs) {
//                         return;
//                     }
//                     var msg = rs.mess;
//                     callBack(rs.status, msg);
//                 }
//             })
//         } catch (error) {
//             callBack(false, error);
//         }
//     }



    
//     /**
//      * API call for save data
//      * @author long.pham 2018-07-27
//      * @param {Function} callBack
//      * @param {boolean} isShowProgress
//      */
//      saveDeviceShare(objE, callBack) {
//         try {
//             var http = new CMSHttp(true);
//             http.post(Constants.URL.DEVICE.SAVE_DEVICE_SHARE, objE, function (status, rs) {
//                 if (typeof callBack === 'function') {
//                     if (!status || !rs) {
//                         return;
//                     }
//                     var data = null;
//                     var msg = rs.mess;
//                     if (!Libs.isObjectEmpty(rs.data)) {
//                         data = rs.data;
//                     }
//                     callBack(rs.status, data, msg);
//                 }
//             })
//         } catch (error) {
//             callBack(false, null, error);
//         }
//     }

//     /**
//      * API call for save data
//      * @author long.pham 2018-07-27
//      * @param {Function} callBack
//      * @param {boolean} isShowProgress
//      */
//     save(objE, callBack) {
//         try {
//             var http = new CMSHttp(true);
//             http.post(Constants.URL.DEVICE.SAVE, objE, function (status, rs) {
//                 if (typeof callBack === 'function') {
//                     if (!status || !rs) {
//                         return;
//                     }
//                     var data = null;
//                     var msg = rs.mess;
//                     if (!Libs.isObjectEmpty(rs.data)) {
//                         data = rs.data;
//                     }
//                     callBack(rs.status, data, msg);
//                 }
//             })
//         } catch (error) {
//             callBack(false, null, error);
//         }
//     }

//     /**
//       * API call for delete
//       * @author long.pham
//       * @param @param {Device.Entity} objE
//       * @param {function(status,msg)} callBack 
//       * @param  {boolean} isShowProgress
//       */
//     delete(objE, callBack) {
//         try {
//             var http = new CMSHttp(true);
//             http.post(Constants.URL.DEVICE.DELETE, objE, function (status, rs) {
//                 if (typeof callBack === 'function') {
//                     if (!status || !rs) {
//                         return;
//                     }
//                     var data = null;
//                     var msg = rs.mess;
//                     if (!Libs.isObjectEmpty(rs.data)) {
//                         data = rs.data;
//                     }
//                     callBack(rs.status, data, msg);
//                 }
//             })
//         } catch (error) {
//             callBack(false, error);
//         }
//     }


//     /**
//      * API get detail
//      * @author Long.Pham 2019-05-28
//      * @param {RegenncyEntity} objE 
//      * @param {function(data)} callBack
//      * @param {boolean} isShowProgress 
//      */

//     getDetail(objE, callBack) {
//         try {
//             var http = new CMSHttp(true);
//             http.post(Constants.URL.DEVICE.DETAIL, objE, function (status, rs) {
//                 if (typeof callBack === 'function') {
//                     if (!status || !rs) {
//                         //error http => lib http  proccess
//                         return;
//                     }
//                     var data = {};
//                     if (rs.status && typeof rs.data === 'object') {
//                         data = rs.data;
//                     }
//                     callBack(data);
//                 }
//             })
//         } catch (error) {
//             callBack({});
//         }
//     }



//     /**
//     * Get dropdown list
//     * @author Long.Pham
//     * @param {function (data,total_row,msg)} callBack 
//     * @param {boolean} isShowProgress 
//     */
//     getDropdownList(objE, callBack) {
//         try {
//             var http = new CMSHttp(false);
//             http.post(Constants.URL.DEVICE.DROPDOWN_LIST, objE, function (status, rs) {
//                 if (typeof callBack === 'function') {
//                     if (!status || !rs) {
//                         return;
//                     }
//                     var data = [];
//                     var total_row = 0;
//                     if (rs.status && Array.isArray(rs.data)) {
//                         data = rs.data;
//                         total_row = rs.total_row;
//                     }
//                     callBack(data, total_row, "");
//                 }
//             });
//         } catch (error) {
//             var msg = error;
//             callBack(false, 0, msg);
//         }
//     }



//     /**
//     * Get dropdown list all attr
//     * @author Long.Pham
//     * @param {function (data,total_row,msg)} callBack 
//     * @param {boolean} isShowProgress 
//     */
//     getDropdownListAttr(objE, callBack) {
//         try {
//             var http = new CMSHttp(false);
//             http.post(Constants.URL.DEVICE.DROPDOWN_LIST_ATTR, objE, function (status, rs) {
//                 if (typeof callBack === 'function') {
//                     if (!status || !rs) {
//                         return;
//                     }
//                     var data = [];
//                     var total_row = 0;
//                     if (rs.status && Array.isArray(rs.data)) {
//                         data = rs.data;
//                         total_row = rs.total_row;
//                     }
//                     callBack(data, total_row, "");
//                 }
//             });
//         } catch (error) {
//             var msg = error;
//             callBack(false, 0, msg);
//         }
//     }

}
