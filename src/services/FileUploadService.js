import Libs from '../utils/Libs';
import CMSHttp from '../utils/CMSHttp';
import Constants from '../utils/Constants';

export default class FileUploadService {
    static _instance;
    static get instance() {
        if (!this._instance) {
            this._instance = new FileUploadService();
        }
        return this._instance;
    }

    /**
     * API call for save data
     * @author long.pham 2018-07-27
     * @param {NewsEntity} objE
     * @param {Function} callBack
     * @param {boolean} isShowProgress
     */
     saveUploadImage(objE, callBack) {
        try {
            var http = new CMSHttp(false);
            http.post(Constants.URL.FILES.UPLOAD_IMG, objE, function (status, rs) {
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
