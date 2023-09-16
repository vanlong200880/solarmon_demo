import Constants from "./Constants";
import Libs from "./Libs";
import qs from 'qs';
import axios from 'axios';
import Auth from './Auth';
import $ from 'jquery';
// import { useTranslation } from "react-i18next";
// import { Translation } from 'react-i18next';
// import { Trans } from 'react-i18next';
// import { Trans, useTranslation, Translation } from 'react-i18next';

// import i18n from 'i18next';
// import download from 'js-file-download';
//import envConfig from 'EnvConfig.js'
export default class CMSHttp {
    
    constructor(showProcess) {
        this.showProcess = showProcess || false;
        // this.showProcess = true;
        // this.printObject;
        
    }

    initialize(url, data, method, contentType) {
        var self = this;
        // Setting URL and headers for request
        var json = null;
        if (method === Constants.METHOD.get) {
            if (typeof data !== undefined && data !== null) {
                json = qs.stringify(data);
            }
        } else {
            if (typeof data !== undefined && data !== null) {
                json = JSON.stringify(data);
            }
        }
        
        // const protocol = window.location.protocol;
        // const API_HOST = process.api_host || Constants.API_HOST;
        // const API_HTTP_PORT = process.api_http_port || Constants.API_HTTP_PORT;
        // const API_HTTPS_PORT = process.api_https_port || Constants.API_HTTPS_PORT ;
        // const API_CONTEXT = process.api_context || Constants.API_CONTEXT;
        let baseUrl = Constants.API_HOST + url;
        // if (protocol == 'https:') {
        //     baseUrl = protocol + "//" + API_HOST + ":" + API_HTTPS_PORT
        // } else {
        //     baseUrl = protocol + "//" + API_HOST + ":" + API_HTTP_PORT
        // }

        // if(!Libs.isBlank(API_CONTEXT)){
        //     baseUrl = baseUrl+ "/"+ API_CONTEXT;
        // }
        // baseUrl = baseUrl + "/" + url

        // set header
        let header = this.setHeader(method, contentType);

        let idShowProcess = 0;
        if (this.showProcess == true) {
            idShowProcess = this.showProcessLoading();
        }
        // Return new promise 
        return new Promise(function (resolve, reject) {
            if (!Auth.checkIsLogin()) {
                var public_url = Constants.SITE_URL.PUBLIC_URL;
                if(public_url.indexOf(window.location.pathname) === -1){
                    self.hideProcessLoading(idShowProcess);
                    window.location.href = Constants.SITE_URL.LOGIN;
                }
                // if (window.location.pathname != Constants.SITE_URL.LOGIN) {
                    
                // }
            }

            // Do async job
            axios.post(baseUrl, json, header)
                .then(function (response) {
                    self.hideProcessLoading(idShowProcess);
                    resolve(response);
                })
                .catch(function (error) {
                    self.hideProcessLoading(idShowProcess);
                    if (error.response && error.response.status == 401) {
                        // if (window.location.pathname == Constants.FRONT_SITE_URL.LOGIN) {
                        //     resolve(error.response);
                        // }
                        // else
                        // {
                        //     window.location.href = Constants.FRONT_SITE_URL.LOGIN;
                        // }
                        // return;
                    }else if (error.response && error.response.status == 400) 
                    {
                        resolve(error.response);
                        return;
                    }
                    reject(error);
                });
        })
    }

    // initializeGet(url, data, method, contentType) {
    //     var self = this;
    //     // Setting URL and headers for request
    //     var json = null;
    //     if (method === Constants.METHOD.get) {
    //         if (typeof data !== undefined && data !== null) {
    //             json = qs.stringify(data);
    //         }
    //     } else {
    //         if (typeof data !== undefined && data !== null) {
    //             json = JSON.stringify(data);
    //         }
    //     }
    //     const protocol = window.location.protocol;
    //     const API_HOST = process.api_host || Constants.API_HOST;
    //     const API_HTTP_PORT = process.api_http_port || Constants.API_HTTP_PORT;
    //     const API_HTTPS_PORT = process.api_https_port || Constants.API_HTTPS_PORT;
    //     if (protocol == 'https:') {
    //         url = protocol + "//" + API_HOST + ":" + API_HTTPS_PORT +"/" + Constants.CONTEXT_PATH + "/" + url
    //     } else {
    //         url = protocol + "//" + API_HOST + ":" + API_HTTP_PORT +"/" + Constants.CONTEXT_PATH + "/" + url
    //     }
    //     let isGetToken = false;
    //     if(url.indexOf('oauth/token')>=0){
    //         isGetToken = true;
    //     }
    //     // set header
    //     let header = this.setHeader(method, contentType, isGetToken, 'password', 'backoffice');

    //     let idShowProcess = 0;
    //     if (this.showProcess == true) {
    //         idShowProcess = this.showProcessLoading();
    //     }
    //     // Return new promise 
    //     return new Promise(function (resolve, reject) {
    //         if (!Auth.checkIsLogin()) {
    //             if (window.location.pathname != Constants.FRONT_SITE_URL.LOGIN) {
    //                 self.hideProcessLoading(idShowProcess);
    //                 window.location.href = Constants.FRONT_SITE_URL.LOGIN;
    //             }
    //         }
    //         // Do async job
    //         axios.get(url, json, header)
    //             .then(function (response) {
    //                 self.hideProcessLoading(idShowProcess);
    //                 resolve(response);
    //             })
    //             .catch(function (error) {
    //                 self.hideProcessLoading(idShowProcess);
    //                 if (error.response && error.response.status == 401) {
    //                     if (window.location.pathname == Constants.FRONT_SITE_URL.LOGIN) {
    //                         resolve(error.response);
    //                     }
    //                     else
    //                     {
    //                         window.location.href = Constants.FRONT_SITE_URL.LOGIN;
    //                     }
    //                     return;
    //                 }else if (error.response && error.response.status == 400) 
    //                 {
    //                     resolve(error.response);
    //                     return;
    //                 }
    //                 console.log(error);
    //                 reject(error);
    //             });
    //     })
    // }

    post(url, params, callBack) {
        let self = this;
        // self.showError(true);
        // 
        var initializePromise = this.initialize(url, params, Constants.METHOD.POST, Constants.CONTENT_TYPE.json);

        // console.log("initializePromise: ", initializePromise);
        initializePromise.then(function (result) {
            if (result.status != 200 && result.status != 400) {
                if(result.status != 401)
                {
                    self.showError(result.status);
                }
                callBack(false, {});
                return;
            }
            let data = result.data;
            if (data != null) {
                callBack(true, data);
                return;
            } else {
                self.showError(Constants.ERROR_CODE.CODE_01);
                callBack(false, {});
            }
        }, function (status, err) {
            self.showError(status);
            callBack(false, err);
        });
    }
    /**
     * Method of exporting to excel file
     * @author khanh.le
     * @param {string} url 
     * @param {json object} params 
     * @param {string} filename : file name
     */
    // postExcel(url, params, filename = "report") {
    //     let self = this;
    //     var initializePromise = this.initialize(url, params, Constants.METHOD.POSTEXCEL, Constants.CONTENT_TYPE.json);
    //     initializePromise.then(function (result) {
    //         if (result.status != 200) {
    //             self.showError(result.status);
    //             return;
    //         }
    //         filename = filename + '.xlsx';
    //         download(result.data, filename);
    //     }, function (status, err) {
    //         self.showError(err);
    //     });
    // }
    /**
     * Method of exporting to csv file
     * @param {*} url 
     * @param {*} params 
     * @param {*} filename 
     */
    // postCsv(url, params, filename = "report") {
    //     let self = this;
    //     var initializePromise = this.initialize(url, params, Constants.METHOD.POST, Constants.CONTENT_TYPE.json);
    //     initializePromise.then(function (result) {
    //         if (result.status != 200) {
    //             self.showError(result.status);
    //             return;
    //         }
    //         filename = filename + '.csv';
    //         download(result.data, filename);
    //     }, function (status, err) {
    //         self.showError(err);
    //     });
    // }
    
    /**
    * Method of exporting to pdf file
    * @author khanh.le
    * @param {string} url 
    * @param {json object} params 
    * @param {string} filename : fine name
    */
    // postPdf(url, params, filename = "report") {
    //     let self = this;
    //     var initializePromise = this.initialize(url, params, Constants.METHOD.POSTPDF, Constants.CONTENT_TYPE.json);
    //     initializePromise.then(function (result) {
    //         if (result.status != 200) {
    //             self.showError(result.status);
    //             return;
    //         }
    //         filename = filename + '.pdf';
    //         download(result.data, filename);
    //     }, function (status, err) {
    //         self.showError(err);
    //     });
    // }

    postPrint(url, params) {
        let self = this;
        var initializePromise = this.initialize(url, params, Constants.METHOD.POSTPDF, Constants.CONTENT_TYPE.json);
        initializePromise.then(function (result) {
            if (result.status != 200) {
                self.showError(result.status);
                return;
            }
            //callBack(result.status, result.data);
            let blobURL = window.URL.createObjectURL(result.data, { type: 'application/pdf' });
            // console.log(blobURL);
            self.print_pdf(blobURL)
        }, function (status, err) {
            self.showError(err);
        });
    }

    // postMultipart(url, params, callBack) {
    //     let self = this;
    //     var initializePromise = this.initialize(url, params, Constants.METHOD.POST, Constants.CONTENT_TYPE.multipart);
    //     initializePromise.then(function (result) {
    //         if (result.status != 200) {
    //             self.showError(result.status);
    //             callBack(false, {});
    //             return;
    //         }
    //         let data = result.data;
    //         if (data != null) {
    //             callBack(true, data);
    //             return;
    //         } else {
    //             self.showError(Constants.ERROR_CODE.CODE_01);
    //             callBack(false, {});
    //         }
    //     }, function (status, err) {
    //         //self.showError(status);
    //         callBack(false, err);
    //     });
    // }

    // async postSynch(url, params) {
    //     var initializePromise = await this.initialize(url, params, Constants.METHOD.POST, Constants.CONTENT_TYPE.json);
    //     return initializePromise.data;
    // }

    // get(url, params, callBack) {
        
    //     var initializePromise = this.initializeGet(url, params, Constants.METHOD.GET, Constants.CONTENT_TYPE.json);
    //     initializePromise.then(function (result) {
    //         callBack(result.status, result.data);
    //     }, function (status, err) {
    //         callBack(false, err);
    //     });
    // }
    // async getSynch(url, params) {
        
    //     var initializePromise = await this.initializeGet(url, params, Constants.METHOD.GET, Constants.CONTENT_TYPE.json);
    //     return initializePromise.data;
    // }
    setHeader(method, contentType) {
        let lang = "vi";
        let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
        if (!Libs.isBlank(info)) {
            try {
                let userInfo = JSON.parse(Libs.base64Decrypt(info));
                lang = userInfo.lang;
            } catch (e) {
                lang = "vi";
            }
        }
        let headers = {
            'Content-Type': contentType,
            'req-path': Libs.isBlank(window.location.pathname) ? '/': window.location.pathname,
            'x-access-token': localStorage.getItem('cms-access-token'),
            'lang': lang
        }
        let header = { headers: headers,timeout:180000 };
        if (method == Constants.METHOD.POSTEXCEL) {
            header['responseType'] = 'blob';
            headers['Accept'] = 'application/vnd.ms-excel';
            header.headers = headers;
        }
        if (method == Constants.METHOD.POSTPDF) {
            header['responseType'] = 'blob';
            headers['Accept'] = 'application/pdf';
            header.headers = headers;
        }
        
        return header;
    }
    /**
     * show process loading
     */
    showProcessLoading() {
        var globalIdProgress = 0;
        var progress_id = "disabled_div" + ++globalIdProgress;
        var div = document.createElement("div");
        div.className = 'disabled_div';
        div.id = progress_id;
        div.style.position = 'fixed';
        div.style.width = '100%';
        div.style.height = '100%';
        div.style.zIndex = 2000;
        div.style.left = '0px';
        div.style.top = '0px';
        var divInner = document.createElement("div");
        divInner.style.width = '66px';
        divInner.style.height = '66px';
        divInner.style.display = 'block';
        divInner.style.position = 'fixed';
        divInner.style.top = '50%';
        divInner.style.left = '50%';
        divInner.style.marginLeft = '-33px';
        divInner.style.marginTop = '-33px';
        divInner.style.zIndex = 1500;
        var img = document.createElement("img");
        img.src = "/loading.gif";
        divInner.appendChild(img);
        div.appendChild(divInner);
        var body = document.getElementById("root");
        body.appendChild(div);
        return globalIdProgress;
    };
    /**
     * hide process loading
     * @param {string} id 
     */
    hideProcessLoading(id) {
        if (id != null) {
            $('#' + "disabled_div" + id).remove();
        } else {
            $('.' + "disabled_div").remove();
        }
    };
    checkIsLogin() {
        // This code is not active
        // var token = localStorage.getItem(Constants.TOKEN) || null;
        // if (!token) {
        // 	window.location.href = Constants.FRONT_SITE_URL.LOGIN;
        // 	return false;
        // }
        return true;
    }

    /**
     * show error popup with style modal bootstrap
     */
    showError(message_code) {
        var message = this.getErrorMessage(message_code);
        this.showErrorMessage( message );
    };
    getErrorMessage(code) {
        var msg = "";
        switch (code) {
            case 201:
                msg = "Request được chấp nhận cho xử lý, nhưng việc xử lý chưa hoàn thành";
                break;
            case 203:
                msg = "Non-authoritative Information";
                break;
            case 204:
                msg = "No Content: Server đã xử lý thành công request nhưng không trả về bất cứ content nào.";
                break;
            case 205:
                msg = "Reset Content: Server đã xử lý thành công request nhưng không trả về bất cứ content nào. Không giống với 204 No Content Response này yêu cầu phía Client phải thiết lập lại document view.";
                break;
            case 206:
                msg = "Partial Content: Server chỉ trả về một phần của resouce(dạng byte) do một range header được gửi bởi phía Client. Các Range Header được sửa dụng bởi Client để cho phép nối lại các phần của file download bị dán đoạn hoặc chia thành nhiều luồng download.";
                break;
            case 500:
                msg = "Internal Server Error";
                break;
            case 501:
                msg = "Not Implemented";
                break;
            case 502:
                msg = "Bad Gateway";
                break;
            case 503:
                msg = "Service Unavailable";
                break;
            case 504:
                msg = "Gateway Timeout";
                break;
            case 505:
                msg = "HTTP Version Not Supported";
                break;
            default: msg = code;
                break;
        }

        return msg;
    }

    printPreview(url) {
        // var urlPrintPreview = "printPreview.htm?url=" + URLEncoder.encode(url);
        var urlPrintPreview = "printPreview.htm?url=" + encodeURIComponent(url);
        
        var iframe = "<html><head><style>body{margin:0;padding:0;}</style></head><body><iframe id=\"framePrintId\" name=\"framePrintId\" onload=\"this.contentWindow.focus();\" " +
            "frameborder=\"0\"  style=\"width: 100%; height: 100%;  margin: 0px 0px 0px 0px;\" src=\"" + urlPrintPreview + "\"></iframe></body></html>";
        return iframe;
    }

    print_pdf(url) {

        /*In PDF*/
        var popError = document.querySelector('#showPrint');
        if (popError != null && popError != 'undefined') {
            return;
        }

        var close = () => {
            popError = document.querySelector('#showPrint');
            popError.remove();

        }
        var div = document.createElement("div");
        div.id = "showPrint";
        div.className = "modal fade show";
        div.role = "dialog"
        div.ariaHidden = "false"
        div.tabIndex = "-1"
        div.ariaLabelledby = "contained-modal-title"
        div.style.cssText = "display: block;"
        var modalDialog = document.createElement("div");
        modalDialog.className = "modal-dialog  modal-xl modal-dialog-scrollable modal-printf";
        modalDialog.role = "document";
        var modalContent = document.createElement("div");
        modalContent.className = "modal-content";

        var modalHeader = document.createElement("div");
        modalHeader.className = "modal-header";

        var printBtn = document.createElement("button");
        printBtn.type = "button";
        printBtn.className = "btn btn-main-color";
        printBtn.dataDismiss = "modal";
        printBtn.ariaHidden = "true";
        printBtn.innerHTML = "<i class='fa fa-print'>In</i>";
        // closeBt.style.cssText = "margin-top: -10px;";
        // closeBt.innerText = "x";
        printBtn.onclick = function () { this.callPrint() };
        modalHeader.append(printBtn);
        // modalContent.append(modalHeader);
        // var pdf = '<object	data="' + url + '#toolbar=1&amp;navpanes=0&amp;scrollbar=1&amp;page=1&amp;view=FitH" type="application/pdf" width="100%" height="100%">'
        // var pdf = '<embed src="' + url + '" type="application/pdf" class="pdf-view"/>'
       
        var pdf_url = document.location.origin;
        pdf_url += '/libs/pdfjs/web/viewer.html?file=';
        pdf_url = pdf_url + url;
        var pdf = '<iframe src="' + pdf_url + '" style="width: 100%;position: absolute;height: 100%;box-sizing: border-box;left: 0;top: 0;" frameborder="0" scrolling="no"></iframe>'
        var modalBody = document.createElement("div");
        modalBody.className = "modal-body";
        modalBody.innerHTML = pdf;
        // modalBody.append();
        modalContent.append(modalBody);
        modalDialog.append(modalContent);
        div.append(modalDialog);
        var body = document.getElementById("root");
        body.append(div);
    }

    /**
     * @description Add text error message when not calling server or api error
     * @author Long.Pham 13/06/2021
     */
    showErrorMessage(msg) {
        document.body.classList.add('system-error');
        var html = '<div class="notification-error">';
        html += '<p>';
        html += msg;
        html += '<a class="close-notification-error icon-cancel-music"></a>';
        html += '</p>'
        html += '</div>';

        if (!$('.notification-error').length) {
            $('#root').prepend(html);
        }

        if ($('.close-notification-error').length) {
            $('.close-notification-error').on('click', function () {
                if ($('.system-error').length) {
                    $('body').removeClass('system-error');
                }
                if ($('.notification-error').length) {
                    $('.notification-error').remove();
                }
            });
        }
        setTimeout(function () {
            if ($('.system-error').length) {
                $('body').removeClass('system-error');
            }
            if ($('.notification-error').length) {
                $('.notification-error').remove();
            }
        }, Constants.ERROR_MSG_TIMEOUT);
    }
}

