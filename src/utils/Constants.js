// var baseUrl = window.location.protocol + "//" + window.location.host;
var url = window.location.hostname;
var serverAPI = '';
var serverData = '';
switch (url) {
    case 'demo.techedge.vn':
    case 'www.dmeo.techedge.vn':
        serverAPI = 'https://apidemo.techedge.vn';
        serverData = 'https://apidemo.techedge.vn/uploads';
        break;
    default:
        serverAPI = 'http://localhost:3015';
        serverData = 'http://localhost:3015/uploads';
        break;
}

const Constants = {
    "API_HOST": serverAPI,
    "SERVER_DATA": serverData,
    "TINY_API_KEY": "w1ac8su5n6gkls7pzfyeg9b7ovfjb6988fm90c8mtr3zs8wt",
    "STATIC_KEY" : "6UTcKodwS4mSBIZgI9pC11vLfcTobNkz5ivqVVGn0PiC44Hev9w3vGZ4NU1RZqQL",
    "GOOLGE_APP": {
        "CLIENT_ID": "56493813142-e54ro8e4vq190rnrvddlmp8v6snke8dg.apps.googleusercontent.com",
        "CLIENT_SECRET": "mpwy4os9Jz7NEeczkX1T3MFC",
        "KEY": "AIzaSyD6YUqRCE3CZjUqj9RHkXXTv4prdpDHM9c", // AIzaSyBrvXJuZWhmWwZbS8GL8iRxODXS1FaTm_Q, AIzaSyAcnxpFfuogXDczwhNGwNTULJ-4h2urdNM
        "CAPTCHA_SITE_KEY": "6Lf5W6YZAAAAAI8Vxghb9fCgBOn3K3Y4pkNT0emm",
        "CAPTCHA_SECRECT_KEY": "6Lf5W6YZAAAAAFQB5HeqzKweF5nmOSYTo4EBJb3j"
    },
    
    "COMMON": {
        "EMPLOYEE_INFO": "employee-info",
        "CONGI_VIEW": "config-view",
        "LIMIT_IMG": 15,
        "MAX_IMAGE_SIZE": 1048576,
        "MAX_VIDEO_SIZE": 31457280,
        "LIMIT":30,
        "TOKEN": "cms-access-token",
        "ACCESS_PARAM": "access-param"
    },
    "URL": {
        "FILES": {
            "UPLOAD_IMG": "/FileUpload/saveUploadImage"
        },

        "PROVINCE": {
            "LIST": "/Province/getList"
        },
        "DISTRICT": {
            "LIST": "/District/getList"
        },
        "WARD": {
            "LIST": "/Ward/getList"
        },

        "PROJECT_GROUP": {
            "SAVE": "/ProjectGroup/saveAction",
            "LIST": "/ProjectGroup/getList",
            "UPDATE_STATUS": "/ProjectGroup/updateStatus",
            "DELETE": "/ProjectGroup/deleteAction",
            "DETAIL": "/ProjectGroup/getDetail",
            "DROPDOWN_LIST": "/ProjectGroup/getDropDownList"
        },

        "DEVICE": {
            "SAVE": "/Device/saveAction",
            "LIST": "/Device/getList",
            "UPDATE_STATUS": "/Device/updateStatus",
            "DELETE": "/Device/deleteAction",
            "DETAIL": "/Device/getDetail",
            "DROPDOWN_LIST": "/Device/getDropDownList",
            "LIST_DEVICE_BY_PROJECT": "/Device/getListDeviceByProject",
            "UPDATE_IS_VIRTUAL": "/Device/updateIsVirtual",
            "LIST_DEVICE_BY_PROJECT_SHARE": "/Device/getListDeviceByProjectShare",
            "SAVE_DEVICE_SHARE": "/Device/saveDeviceShare"
        },

        "DEVICE_TYPE": {
            "SAVE": "/DeviceType/saveAction",
            "LIST": "/DeviceType/getList",
            "UPDATE_STATUS": "/DeviceType/updateStatus",
            "DELETE": "/DeviceType/deleteAction",
            "DETAIL": "/DeviceType/getDetail",
            "DROPDOWN_LIST": "/DeviceType/getDropDownList"
        },

        "DEVICE_GROUP": {
            "SAVE": "/DeviceGroup/saveAction",
            "LIST": "/DeviceGroup/getList",
            "UPDATE_STATUS": "/DeviceGroup/updateStatus",
            "DELETE": "/DeviceGroup/deleteAction",
            "DETAIL": "/DeviceGroup/getDetail",
            "DROPDOWN_LIST": "/DeviceGroup/getDropDownList"
        },


        "ROLE": {
            "SAVE": "/role/saveAction",
            "LIST": "/role/getList",
            "UPDATE_STATUS": "/role/updateStatus",
            "DELETE": "/role/deleteAction",
            "DETAIL": "/role/getDetail",
            "DROPDOWN_LIST": "/role/getDropDownList",
            "PERMISSION": "/role/getListScreenPermissions",
            "UPDATE_PERMISSIONS": "/role/updateRolePermissions",
            "UPDATE_ROLE_MAP_SCREEN": "/role/updateRoleMapScreen"
        },

        "EMPLOYEE": {
            "LOGIN": "/auth/login",
            "FORGOT_PASSWORD": "/employee/forgotPassword",
            "RESET_PASSWORD": "/employee/resetPassword",
            "DETAIL_UPDATE_PROFILE": "/employee/getDetailUpdateProfile",
            "SAVE_UPDATE_PROFILE": "/employee/saveUpdateProfileAction",
            "CHANGE_PASSWORD": "/employee/changePassword",
            "LIST": "/employee/getList",
            "LIST_ALL": "/employee/getListAll",
            "SAVE": "/employee/saveAction",
            "UPDATE_STATUS": "/employee/updateStatus",
            "DELETE": "/employee/deleteAction",
            "DETAIL": "/employee/getDetail",
            "LIST_CONFIG_MAIL": "/employee/getListProjectConfigMail",
            "UPDATE_STATUS_MAIL_CONFIG":  "/employee/updateStatusMailConfig"
        },

        "PROJECT": {
            "SAVE": "/Project/saveAction",
            "LIST": "/Project/getList",
            "UPDATE_STATUS": "/Project/updateStatus",
            "DELETE": "/Project/deleteAction",
            "DETAIL": "/Project/getDetail",
            "DROPDOWN_LIST": "/Project/getDropDownList",
            "SAVE_CONFIG": "/Project/saveConfigAction",
            "DETAIL_CONFIG": "/Project/getDetailConfig",
            "SAVE_CONFIG_SENSOR": "/Project/saveConfigEstimationSensor",
            "SAVE_MOVE_DEVICE": "/Project/saveMoveDevice",
        },

        "ERROR_LEVEL": {
            "SAVE": "/ErrorLevel/saveAction",
            "LIST": "/ErrorLevel/getList",
            "UPDATE_STATUS": "/ErrorLevel/updateStatus",
            "DELETE": "/ErrorLevel/deleteAction",
            "DETAIL": "/ErrorLevel/getDetail",
            "DROPDOWN_LIST": "/ErrorLevel/getDropDownList"
        },

        "ERROR_TYPE": {
            "SAVE": "/ErrorType/saveAction",
            "LIST": "/ErrorType/getList",
            "UPDATE_STATUS": "/ErrorType/updateStatus",
            "DELETE": "/ErrorType/deleteAction",
            "DETAIL": "/ErrorType/getDetail",
            "DROPDOWN_LIST": "/ErrorType/getDropDownList"
        },

        "ERROR_STATE": {
            "SAVE": "/ErrorState/saveAction",
            "LIST": "/ErrorState/getList",
            "UPDATE_STATUS": "/ErrorState/updateStatus",
            "DELETE": "/ErrorState/deleteAction",
            "DETAIL": "/ErrorState/getDetail",
            "DROPDOWN_LIST": "/ErrorState/getDropDownList"
        },

        "ALERT_STATE": {
            "SAVE": "/AlertState/saveAction",
            "LIST": "/AlertState/getList",
            "UPDATE_STATUS": "/AlertState/updateStatus",
            "DELETE": "/AlertState/deleteAction",
            "DETAIL": "/AlertState/getDetail",
            "DROPDOWN_LIST": "/AlertState/getDropDownList"
        },

        "ERROR": {
            "SAVE": "/Error/saveAction",
            "LIST": "/Error/getList",
            "UPDATE_STATUS": "/Error/updateStatus",
            "DELETE": "/Error/deleteAction",
            "DETAIL": "/Error/getDetail"
        },

        "DEVICE_PARAMETER": {
            "SAVE": "/DeviceParameter/saveAction",
            "LIST": "/DeviceParameter/getList",
            "UPDATE_STATUS": "/DeviceParameter/updateStatus",
            "DELETE": "/DeviceParameter/deleteAction",
            "DETAIL": "/DeviceParameter/getDetail"
        },

        "CLIENT_PROJECT": {
            "PROJECT_SIDEBAR": "/ClientProject/getAllProjectByEmployeeId",
            "LIST_PROJECT_BY_EMPLOYEE": "/ClientProject/getListProjectByEmployee",
            "LIST_PLANT_SUMMARY": "/ClientProject/getListPlantSummary",
        },

        "PLANT": {
            "DETAIL": "/Plant/getDetail",
            "CHART_DATA": "/Plant/getChartData"
        },


        "CLIENT_DEVICE": {
            "LIST": "/ClientDevice/getList",
            "PARAMETER": "/ClientDevice/getListParameterByDevice",
            "LIST_ALERT": "/ClientDevice/getListAlertByDevice"
        },
        "CLIENT_ACTIVITIES": {
            "LIST": "/ClientActivities/getList",
            "DELETE": "/ClientActivities/deleteAction",
            "CLOSE_ALL": "/ClientActivities/closeAll",
            "SAVE": "/ClientActivities/saveAction"
        },

        "CLIENT_NOTIFY" : {
            "LIST": "/ClientNotify/getList",
            "DELETE": "/ClientNotify/deleteAction",
            "CLOSE_ALL": "/ClientNotify/closeAll",
            "SAVE": "/ClientNotify/saveAction",
            "NOTIFY_SIZE": "/ClientNotify/getNotifySize",
        },

        "ANALYTICS": {
            "CHART_PROFILE": "/ClientAnalytics/getDataChartProfile",
            "LIST_DEVICE": "/ClientAnalytics/getListDeviceByProject",
            "CHART_PARAMETER_DEVICE": "/ClientAnalytics/getChartParameterDevice",
            "CHART_ALARM": "/ClientAnalytics/getChartAlarm"
        },

        "REPORT": {
            "MOTNH": "/ClientReport/getDataReportMonth",
            "YEAR": "/ClientReport/getDataReportYear"
        },



        "MAIN_PLANT": {
            "DETAIL": "/MainPlant/getDetail",
            "CHART_DATA": "/MainPlant/getChartData"
        },

        "MAIN_PROJECT": {
            "PROJECT_SIDEBAR": "/MainProject/getAllProjectByEmployeeId",
            "LIST_PROJECT_BY_EMPLOYEE": "/MainProject/getListProjectByEmployee",
            "LIST_PLANT_SUMMARY": "/MainProject/getListPlantSummary",
            "LIST_METER_BY_EMPLOYEE": "/MainProject/getListMeterByEmployee",
        },

        "MAIN_DEVICE": {
            "LIST": "/MainDevice/getList",
            "PARAMETER": "/MainDevice/getListParameterByDevice",
            "LIST_ALERT": "/MainDevice/getListAlertByDevice",
            "LIST_INVERTER": "/MainDevice/getListInverter",
            "UPDATE_ON_OFF": "/MainDevice/updateOnOff",
            "SAVE_CONTROL_CALENDAR": "/MainDevice/saveControlCalendar",
            "LIST_CONTROL_CALENDAR": "/MainDevice/getListControlCalendar",
            "SAVE_ARR_CONTROL_CALENDAR": "/MainDevice/saveArrControlCalendar",
            "LIST_BY_SITE_CONTROL_CALENDAR": "/MainDevice/getListBySiteControlCalendar",
            "DELETE_LIST_CALENDAR": "/MainDevice/deleteListCalendarControl",
            "DELETE_ITEM_CALENDAR": "/MainDevice/deleteItemCalendarControl",
            "UPDATE_MODE": "/MainDevice/updateControlMode",
            "PROJECT_DETAIL": "/MainDevice/getProjectDetail",
            "UPDATE_MODE_POWER_ENERGY": "/MainDevice/updateModePowerAndEnergy",
            "POWER_NOW_BY_DAY": "/MainDevice/getPowerNowByDay",
        },

        "MAIN_ACTIVITIES": {
            "LIST": "/MainActivities/getList",
            "DELETE": "/MainActivities/deleteAction",
            "CLOSE_ALL": "/MainActivities/closeAll",
            "SAVE": "/MainActivities/saveAction"
        },

        "MAIN_ANALYTICS": {
            "CHART_PROFILE": "/MainAnalytics/getDataChartProfile",
            "LIST_DEVICE": "/MainAnalytics/getListDeviceByProject",
            "CHART_PARAMETER_DEVICE": "/MainAnalytics/getChartParameterDevice",
            "CHART_ALARM": "/MainAnalytics/getChartAlarm"
        },

        "MAIN_REPORT": {
            "MOTNH": "/MainReport/getDataReportMonth",
            "YEAR": "/MainReport/getDataReportYear"
        },

        "MAIN_CONFIG": {
            "LIST_DEVICE": "/MainConfig/getListAllDeviceByProject",
            "DEVICE_DETAIL": "/MainConfig/getDeviceDetail",
            "UPDATE_DEVICE": "/MainConfig/updateDevice",
            "LIST_DEVICE_SENSOR": "/MainConfig/getListDeviceSensor",
        },

        "CLIENT_CONFIG": {
            "LIST_DEVICE": "/ClientConfig/getListAllDeviceByProject",
            "DEVICE_DETAIL": "/ClientConfig/getDeviceDetail",
            "UPDATE_DEVICE": "/ClientConfig/updateDevice"
        },











        "REGENCY": {
            "SAVE": "/regency/saveAction",
            "LIST": "/regency/getList",
            "UPDATE_STATUS": "/regency/updateStatus",
            "DELETE": "/regency/deleteAction",
            "DETAIL": "/regency/getDetail",
            "DROPDOWN_LIST": "/regency/getDropDownList"
        },
        
        "CATEGORY": {
            "SAVE": "/category/saveAction",
            "LIST": "/category/getList",
            "UPDATE_STATUS": "/category/updateStatus",
            "DELETE": "/category/deleteAction",
            "DETAIL": "/category/getDetail",
            "DROPDOWN_LIST": "/category/getDropDownList",
            "DROPDOWN_LIST_CATEGORY": "/category/getDropDownListCategory"
        },

        "NEWS_CATEGORY": {
            "SAVE": "/NewsCategory/saveAction",
            "LIST": "/NewsCategory/getList",
            "UPDATE_STATUS": "/NewsCategory/updateStatus",
            "DELETE": "/NewsCategory/deleteAction",
            "DETAIL": "/NewsCategory/getDetail",
            "DROPDOWN_LIST": "/NewsCategory/getDropDownList",
            "DROPDOWN_LIST_CATEGORY": "/NewsCategory/getDropDownListCategory"
        },

        "NEWS": {
            "SAVE": "/News/saveAction",
            "LIST": "/News/getList",
            "UPDATE_STATUS": "/News/updateStatus",
            "DELETE": "/News/deleteAction",
            "DETAIL": "/News/getDetail"
        },

        "COLLECTION": {
            "SAVE": "/Collection/saveAction",
            "LIST": "/Collection/getList",
            "UPDATE_STATUS": "/Collection/updateStatus",
            "DELETE": "/Collection/deleteAction",
            "DETAIL": "/Collection/getDetail"
        },

        "PAGES": {
            "SAVE": "/Pages/saveAction",
            "LIST": "/Pages/getList",
            "UPDATE_STATUS": "/Pages/updateStatus",
            "DELETE": "/Pages/deleteAction",
            "DETAIL": "/Pages/getDetail"
        },

        
        

        "BANNER_POSITION": {
            "SAVE": "/BannerPosition/saveAction",
            "LIST": "/BannerPosition/getList",
            "UPDATE_STATUS": "/BannerPosition/updateStatus",
            "DELETE": "/BannerPosition/deleteAction",
            "DETAIL": "/BannerPosition/getDetail",
            "DROPDOWN_LIST": "/BannerPosition/getDropDownList"
        },

        "CUSTOMER_GROUP": {
            "SAVE": "/CustomerGroup/saveAction",
            "LIST": "/CustomerGroup/getList",
            "UPDATE_STATUS": "/CustomerGroup/updateStatus",
            "DELETE": "/CustomerGroup/deleteAction",
            "DETAIL": "/CustomerGroup/getDetail",
            "DROPDOWN_LIST": "/CustomerGroup/getDropDownList"
        },

        "CUSTOMER_TYPE": {
            "SAVE": "/CustomerType/saveAction",
            "LIST": "/CustomerType/getList",
            "UPDATE_STATUS": "/CustomerType/updateStatus",
            "DELETE": "/CustomerType/deleteAction",
            "DETAIL": "/CustomerType/getDetail",
            "DROPDOWN_LIST": "/CustomerType/getDropDownList"
        },

        "COUPON": {
            "SAVE": "/Coupon/saveAction",
            "LIST": "/Coupon/getList",
            "UPDATE_STATUS": "/Coupon/updateStatus",
            "DELETE": "/Coupon/deleteAction",
            "DETAIL": "/Coupon/getDetail",
            "APPLY_COUPON":  "/Coupon/getAppleCoupon"
        },


        "CUSTOMER": {
            "SAVE": "/Customer/saveAction",
            "LIST": "/Customer/getList",
            "UPDATE_STATUS": "/Customer/updateStatus",
            "DELETE": "/Customer/deleteAction",
            "DETAIL": "/Customer/getDetail",
            "DROPDOWN_LIST": "/Customer/getDropDownList",
            "SEARCH_AUTO": "/Customer/getSearchAuto",
            "SAVE_CUSTOMER_ORDER": "/Customer/saveCustomerOrder"
        },

        "NEWSLETTER": {
            "SAVE": "/Newsletter/saveAction",
            "LIST": "/Newsletter/getList",
            "UPDATE_STATUS": "/Newsletter/updateStatus",
            "DELETE": "/Newsletter/deleteAction",
            "DETAIL": "/Newsletter/getDetail"
        },


        "BANNER": {
            "SAVE": "/Banner/saveAction",
            "LIST": "/Banner/getList",
            "UPDATE_STATUS": "/Banner/updateStatus",
            "DELETE": "/Banner/deleteAction",
            "DETAIL": "/Banner/getDetail"
        },


        "CUSTOMER_REVIEW": {
            "SAVE": "/CustomerReview/saveAction",
            "LIST": "/CustomerReview/getList",
            "UPDATE_STATUS": "/CustomerReview/updateStatus",
            "DELETE": "/CustomerReview/deleteAction",
            "DETAIL": "/CustomerReview/getDetail"
        },


        "TYPE": {
            "DROPDOWN_LIST": "/Type/getDropdownList",
            "TYPE_KEY_STRS": "/Type/getListTypeKeyArr"
        },

        "PAYMENT_MOTHOD": {
            "DROPDOWN_LIST": "/PaymentMethod/getDropdownList"
        },
        "ORDER_STATUS" : {
            "DROPDOWN_LIST": "/OrderStatus/getDropdownList"
        },

        "PAYMENT_STATUS" : {
            "DROPDOWN_LIST": "/PaymentStatus/getDropdownList"
        },

        "PRODUCT_TYPE": {
            "SAVE": "/ProductType/saveAction",
            "LIST": "/ProductType/getList",
            "UPDATE_STATUS": "/ProductType/updateStatus",
            "DELETE": "/ProductType/deleteAction",
            "DETAIL": "/ProductType/getDetail",
            "DROPDOWN_LIST": "/ProductType/getDropDownList"
        },

        "ATTRIBUTES": {
            "SAVE": "/attributes/saveAction",
            "LIST": "/attributes/getList",
            "UPDATE_STATUS": "/attributes/updateStatus",
            "DELETE": "/attributes/deleteAction",
            "DETAIL": "/attributes/getDetail",
            "DROPDOWN_LIST": "/attributes/getDropDownList"
        },

        "BRAND": {
            "SAVE": "/brand/saveAction",
            "LIST": "/brand/getList",
            "UPDATE_STATUS": "/brand/updateStatus",
            "DELETE": "/brand/deleteAction",
            "DETAIL": "/brand/getDetail",
            "DROPDOWN_LIST": "/brand/getDropDownList"
        },

        "UNIT": {
            "SAVE": "/unit/saveAction",
            "LIST": "/unit/getList",
            "UPDATE_STATUS": "/unit/updateStatus",
            "DELETE": "/unit/deleteAction",
            "DETAIL": "/unit/getDetail",
            "DROPDOWN_LIST": "/unit/getDropDownList"
        },

        "GALLERY_TYPE": {
            "SAVE": "/GalleryType/saveAction",
            "LIST": "/GalleryType/getList",
            "UPDATE_STATUS": "/GalleryType/updateStatus",
            "DELETE": "/GalleryType/deleteAction",
            "DETAIL": "/GalleryType/getDetail",
            "DROPDOWN_LIST": "/GalleryType/getDropDownList"
        },

        "TAGS": {
            "SAVE": "/tags/saveAction",
            "LIST": "/tags/getList",
            "UPDATE_STATUS": "/tags/updateStatus",
            "DELETE": "/tags/deleteAction",
            "DETAIL": "/tags/getDetail",
            "DROPDOWN_LIST": "/tags/getDropDownList",
            "SEARCH_AUTO": "/tags/getSearchAuto",
        },

        "CUSTOM_FIELD": {
            "SAVE": "/CustomField/saveAction",
            "LIST": "/CustomField/getList",
            "UPDATE_STATUS": "/CustomField/updateStatus",
            "DELETE": "/CustomField/deleteAction",
            "DETAIL": "/CustomField/getDetail",
            "DROPDOWN_LIST": "/CustomField/getDropDownList",
            "GROUP_CUSTOM_FIELD": "/CustomField/getListGroupCustomField",
            "SAVE_FIELD": "/CustomField/saveFieldAction",
            
        },

        "SPECIFICATION": {
            "SAVE": "/specification/saveAction",
            "LIST": "/specification/getList",
            "UPDATE_STATUS": "/specification/updateStatus",
            "DELETE": "/specification/deleteAction",
            "DETAIL": "/specification/getDetail",
            "DROPDOWN_LIST": "/specification/getDropDownList"
        },

        "PRODUCT": {
            "SEARCH_AUTO": "/Product/getSearchAuto",
            "SAVE": "/Product/saveAction",
            "LIST": "/Product/getList",
            "UPDATE_STATUS": "/Product/updateStatus",
            "DELETE": "/Product/deleteAction",
            "DETAIL": "/Product/getDetail"
        },

        "ORDERS": {
            "SEARCH_PRODUCT_AUTO": "/Orders/getSearchProductAuto",
            "SAVE": "/Orders/saveAction",
            "LIST": "/Orders/getList",
            // "UPDATE_STATUS": "/Orders/updateStatus",
            // "DELETE": "/Orders/deleteAction",
            "DETAIL": "/Orders/getDetail",
            "PRINT": "/Orders/exportPrint"
        },


    },

    "SITE_URL": {
        "PUBLIC_URL": ['/', '/forgot-password', '/reset-password'],
        "LOGIN": "/",
        "DEFAULT_PAGE": "/dashboard",
        "DEFAULT_MAIN": "/main",
        "ERROR_PAGE": "/error-404"
    },

    "CONTENT_TYPE": {
        json: "application/json",
        stream: "application/octet-stream",
        excel: "application/vnd.ms-excel",
        multipart: "multipart/form-data"
    },

    "METHOD": {
        POST: "post",
        GET: "get",
        DELETE: "delete",
        PUT: "put",
        POSTEXCEL: "postexcel",
        POSTPDF: "postpdf"
    },

    "ERROR_MSG_TIMEOUT": 8000,

    "ERROR_CODE": {
        "CODE_01": 1,
        "CODE_02": 1,
    },

    "SCREEN_MODE": {
        "VIEW": 0,
        "ADD": 1,
        "EDIT": 2
    },
    "AUTH_MODE": {
        "VIEW": 0,
        "NEW": 1,
        "DEL": 2,
        "EDIT": 3,
        "EXCEL": 4,
        "PDF": 5,
        "PRINT": 6,
        "TRANSLATE": 7,
        "APPROVAL": 8,
        "SET": 9,
        "FULL" : 511
    },
    "AUTH_DATA_KEY" : {
        "VIEW": "view",
        "NEW": "new",
        "EDIT": "edit",
        "DEL": "delete",
        "PRINT": "print",
        "PDF": "pdf",
        "EXCEL": "excel",
        "TRANSLATE": "translate",
        "APPROVAL":"approval",
        "FULL": "auths"
    },
};
export default Constants;