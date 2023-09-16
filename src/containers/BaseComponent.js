import React from 'react';
import Constants from '../utils/Constants';
import $ from 'jquery';
import { toast } from 'react-toastify';
import Libs from '../utils/Libs';

export default class BaseComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentMode: Constants.SCREEN_MODE.VIEW, // mode cập nhật hoặc edit
        }
        this.jsxTemplate = function () { };

        this.searchParam = {};
        if (props.baseParam && props.baseParam.match) {
            this.params = props.baseParam.match.params;
            this.path = props.baseParam.match.path;
        }


        var public_url = Constants.SITE_URL.PUBLIC_URL;

        if (public_url.indexOf(window.location.pathname) === -1) {
            this.setEmployeeInfo();
            if (Libs.isObjectEmpty(props.auth)) {
                window.location.href = Constants.SITE_URL.LOGIN;
                return;
            }
            var path = null;
            if (props.baseParam && props.baseParam.match) {
                this.params = props.baseParam.match.params;
                path = props.baseParam.match.path;
            }

            let param = props.auth[path];
            this.permission = props.auth;
            if (!Libs.isBlank(this.path)) {
                if (param) {
                    this.actions = param.auth;
                    
                    if (param.auth <= 0) {
                        window.location.href = Constants.SITE_URL.ERROR_PAGE;
                        return;
                    }
                } else {
                    window.location.href = Constants.SITE_URL.ERROR_PAGE;
                    return;
                }
            }

        }


        if (this.constructor === BaseComponent) {
            // Error Type 1. Abstract class can not be constructed.
            throw new TypeError("Can not construct abstract class.");
        }
    }



    /**
     * set user info param and set user permission
     */
    setEmployeeInfo() {
        let info = localStorage.getItem(Constants.COMMON.EMPLOYEE_INFO);
        let employeeInfo = JSON.parse(Libs.base64Decrypt(info));
        if (Libs.isObjectEmpty(employeeInfo)) {
            localStorage.clear();
            window.location.href = Constants.SITE_URL.LOGIN;
        }

        var expired = employeeInfo.timeout * 1;
        var currentDate = new Date();
        if (currentDate.getTime() > expired) {
            localStorage.clear();
            window.location.href = Constants.SITE_URL.LOGIN;
            return false;
        }
        this.employee = employeeInfo;
    }


    /**
     * @description default function reactJS
     */
    render() {
        return this.jsxTemplate.call(this);
    }

    /**
     * @description Set validate message
     * @author Long.Pham
     * @since 12/05/2021
     * @param {*} errors
     ******** IMPORTANT surround input field must have class form-group
    */
    setValidateMessage = (errors, validateOne, wrapEleId) => {
        var wrapEle = $('#' + wrapEleId);
        function isEmpty(el) {
            return !$.trim(el.html())
        }
        if (typeof errors === 'undefined' || errors === null || Object.keys(errors).length === 0) return;
        validateOne = (typeof validateOne === 'boolean') ? validateOne : false;
        var validateMessageClass = ".validate-message",
            formGroupClass = ".mb-3",
            inputErrorClass = ".input-error", parentErrorClass = '.input-error';
        var createParagraph = (text) => {
            var p = document.createElement("p");
            p.classList.add(validateMessageClass.replace(".", ""));
            p.innerText = text;
            return p;
        }

        var removeOldParagraph = (input, parent) => {
            let oldParagraph = parent.find(validateMessageClass);
            if (oldParagraph.length > 0) {
                oldParagraph.remove();
            }
        }

        /**
         * @description find elements to set message
         * @param  {} errors
         */
        var find = (errors) => {
            if (!validateOne) {
                // remove all validate message
                this.removeAllValidateMessage();
            }
            for (let key in errors) {
                let message = errors[key];
                var input = $('[name="' + key + '"]');
                if (!isEmpty(wrapEle)) {
                    input = wrapEle.find('[name="' + key + '"]');
                }
                if (input.length > 0) {
                    let parent = input.parents(formGroupClass);
                    if (parent.length > 0) {
                        setMessage(message, input, parent);
                    } else { // case input isn't wrap by class form-group
                        let parent = input.parent();
                        setMessage(message, input, parent);
                    }
                }
            }
        }

        /**
         * Create element new paragraph message validate
         * @param  {} message
         * @param  {} input
         * @param  {} parent
         */
        var setMessage = (message, input, parent) => {
            if (typeof message === 'string' && message.length > 0) {
                let paragraph = createParagraph(message);
                removeOldParagraph(input, parent);
                input[0].classList.add(inputErrorClass.replace(".", ""));
                let nextElement = input[0].nextElementSibling;
                let nodeName = input[0].nodeName;
                if (nodeName === "SELECT") {
                    nextElement.classList.add(inputErrorClass.replace(".", ""));
                }
                parent[0].appendChild(paragraph);
                parent[0].classList.add(parentErrorClass.replace(".", ""));
            } else {
                removeOldParagraph(input, parent);
                input[0].classList.remove(inputErrorClass.replace(".", ""));
                parent[0].classList.remove(parentErrorClass.replace(".", ""));
                let nextElement = input[0].nextElementSibling;
                let nodeName = input[0].nodeName;
                if (nodeName === "SELECT") {
                    nextElement.classList.remove(inputErrorClass.replace(".", ""));
                }
            }
        }
        find(errors);
    }

    /**
    * @description Remove validation
    * @author long.pham 2018-11-27
    */
    removeAllValidateMessage = () => {
        if ($('.validate-message').length) {
            $('.validate-message').remove();
        }
        if ($('.input-error').length) {
            $('.input-error').removeClass('input-error');
        }
        if ($('.select2-error').length) {
            $('.select2-error').removeClass('select2-error');
        }
    }

    /**
    * @description Display error messages for validation fields
    * @param object errors: Error field values
    * @param string wrapperElement: Tag the fields, otherwise it will take all the files with names from errors and assignments and error messages
    * @author long.pham 2018-11-24
    */
    setValidationError(errors, wrapperElement) {
        if (typeof errors === 'undefined' || errors === null || Object.keys(errors).length <= 0) return;
        $.each(errors, function (key, val) {
            // var ele = $('[name=\"' + key + '\"]');
            var ele = $('[name="' + key + '"]');
            if (wrapperElement !== 'undefined' && wrapperElement !== null && wrapperElement !== '') {
                var wrapEle = $('.' + wrapperElement);
                if (!wrapEle || wrapEle.length <= 0) {
                    wrapEle = $('#' + wrapperElement);
                }
                // ele = wrapEle.find('[name=\"' + key + '\"]');
                ele = wrapEle.find('[name="' + key + '"]');
            }
            if (ele.length) {
                if (val && val !== null) {
                    ele.removeClass('input-error');
                    ele.addClass('input-error');
                    ele.next('.validate-message').remove();
                    ele.after('<p class="validate-message">' + val + '</p>');
                }
                else {
                    ele.removeClass('input-error');
                    ele.next('.validate-message').remove();
                }
            }
        });
    }


    toast(message, type, pos = "top-right") {
        let posistion = "top-right";
        if (typeof pos !== 'undefined') {
            posistion = pos;
        }
        switch (type) {
            case "error":
                toast.error(message, {
                    position: posistion,
                    autoClose: true,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 10,
                    limit: 1
                });
                break;
            case "warn":
                toast.warn(message, {
                    position: posistion,
                    autoClose: true,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 10
                });
                break;
            default:
                toast.info(message, {
                    position: posistion,
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    draggablePercent: 10
                });
                break;
        }

        toast.clearWaitingQueue();
    }


    /**
     * handle Search Input Change Value
     * @author Long.Pham
     * @param {*} values 
     * @param {*} props 
     */
    handleSearchInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let item = this.state.searchParam;
            item.index = 1;
            item.offset = 0;
            /* check is number and not start with "0" charactor = 0(Phone number) => convert to number*/
            /*Fix lỗi auto convert to string => sql query wrong*/
            if (target.type !== 'checkbox') {
                if (!isNaN(value) && !value.startsWith('0') && !Libs.isBlank(value)) {
                    value = value * 1;
                }
            }
            item[name] = value;
            this.setState({ searchParam: item });
        }
    }


    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let { curItem } = this.state;
            curItem[name] = (event.target.validity.valid) ? value : curItem[name];
            this.setState({ curItem });
        }
    }



    /**
     * setValue method to Input
     * @author Long.Pham 20/05/2021
     */
    handleInputDateChange(event) {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (target.type === 'checkbox') {
            value = target.checked ? 1 : 0;
        }

        if (name) {
            let { curItem } = this.state;
            curItem[name] = value;
            this.setState({ curItem });
        }
    }


    // /**
    //  * set state for numeric number input
    //  * @param {Object} event 
    //  */
    // handleNumberInputChange(event) {
    //     let target = event.target;
    //     let name = target.name;
    //     let value = target.value

    //     if (name) {
    //         var numericExpression = /^[0-9\b]+$/;
    //         if (value == "" || numericExpression.test(value)) {
    //             let item = this.state.curItem;
    //             item[name] = value;
    //             this.setState({ curItem: item });
    //         }
    //     }
    // }
}