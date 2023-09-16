import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import Constants from '../utils/Constants';
import $ from 'jquery';
class CMSSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            params: null,
            selectedValue: null,
            options: [],
            valueChanged: false,
            optionsChanged: false
        }
        this.selector = null;
        this.forceUpdateValue = false;
        this.initialRender = true;
    }
    /**
     * @description Called immediately after the component is mounted in the DOM. Called after the render function
     * @author Long.Pham 12/05/2021
     */
    componentDidMount() {
        this.initSelect2();
        this.updateValue();
    }
    /**
     * @description Called just before the new props ie nextProps
     * @author Long.Pham 12/05/2021
     */
    static getDerivedStateFromProps(nextProps, prevState) {
       // console.log("getDerivedStateFromProps", nextProps.name);
        let nextState = null;
        if (JSON.stringify(nextProps.selectedValue) !== JSON.stringify(prevState.selectedValue)) {
            nextState = { selectedValue: nextProps.selectedValue, valueChanged: true };
        }
        if (JSON.stringify(nextProps.options) !== JSON.stringify(prevState.options)) {
            nextState = { ...nextState, options: nextProps.options, optionsChanged: true };
        }

        return nextState;
    }
    /**
     * @description This function is called immediately after the component is finished rendering
     * @author Long.Pham 12/05/2021
     */
    componentDidUpdate(prevProps, prevState) {
        //update options
        if (this.state.optionsChanged) {
            // if(!this.props.isAjax)
            // {
                this.selector.empty();
                this.selector.select2(this.select2Config());
            //}
            this.state.valueChanged = true;
        }
        //update value
        if (this.state.valueChanged) {
            this.updateValue();
        }
        this.state.valueChanged = false;
        this.state.optionsChanged = false;
    }
    /** 
     * @description Remove select2 after exiting the component
     * @author Long.Pham 12/05/2021
     */
    componentWillUnmount() {
        this.destroySelect2();
    }

    initSelect2() {
        this.selector.select2(this.select2Config());
        this.attachEventHandlers();
    }
    destroySelect2() {
        this.detachEventHandlers();
        this.selector.select2('destroy');
    }

    attachEventHandlers(props) {
        //select2 change event
        this.selector.on('change', this.onSelect2Change);
        //select2 select event
        this.selector.on("select2:select", this.onSelect2Select);
        //select2 unselect event
        this.selector.on('select2:unselect', this.onSelect2Unselect);
        //select2 close event
        this.selector.on('select2:close', this.onSelect2Close);
    }

    detachEventHandlers() {
        //off select2 change event
        this.selector.off('change');
        //off select2 select event
        this.selector.off("select2:select");
        //off select2 unselect event
        this.selector.off('select2:unselect');
        //off select2  close event
        this.selector.off('select2:close');
    }
    updateSelect2Value(value) {
        if (!this.state.options || this.state.options.length <= 0) {
            return;
        } else {
            this.selector.val(value).trigger('change');
        }
    }
    updateValue() {
        this.updateSelect2Value(this.state.selectedValue);
        this.forceUpdateValue = false;
    }
    /**
     * @description 
     * @author Long.Pham 12/05/2021
     */
    onSelect2Change = (event) => {
       
        let self = this;
        setTimeout(function () {
            if (self.props.onChange && typeof self.props.onChange === 'function') {
                var data = self.selector.select2('data');
                self.props.onChange(event, data);
            }
        })
    }
    /**
     * @description Get unselect value
     * @author Long.Pham 12/05/2021
     */
    onSelect2Unselect = (event) => {
        let self = this;
        setTimeout(function () {
            if (self.props.onSelect && typeof self.props.onSelect == 'function'){
                //var data = event.params.data;
                var data = self.selector.select2('data');
                //event.target.value = null;
                self.props.onSelect(event, data);
                return;
            }
            if (self.props.onChange && typeof self.props.onChange == 'function'){
                //var data = event.params.data;
                var data = self.selector.select2('data');
                //event.target.value = null;
                self.props.onChange(event, data);
                return;
            }
        });
    }
    /**
     * @description Get object selected
     * @author Long.Pham 12/05/2021
     */
    onSelect2Select = (event) => {
        let self = this;
        setTimeout(function () {
            if (!self.props.onSelect || typeof self.props.onSelect !== 'function') return;
            var data = self.selector.select2('data');
            self.props.onSelect(event, data);
        });
    }
    /**
    * @description Get object selected
    * @author Long.Pham 12/05/2021
    */
    onSelect2Close = (event) => {
        event.target.focus();
        if (this.props.onSelectClose && typeof this.props.onSelectClose === 'function') {
            this.props.onSelectClose(event);
        }
    }
    /**
    * @description set different select2 parameter
    * @author Long.Pham 12/05/2021
    */
    select2Config() {
        const {
            isAjax,
            allowClear,
            allowSearch,
            allowCheckbox,
            hiddenSelection,
            placeholderId,
            placeholderText,
            options
        } = this.props;
        return {
            placeholder: {
                id: (placeholderId) ? placeholderId : "",
                text: (!placeholderText) ? ('common.all') : placeholderText
            },
            data: options,
            dropdownCssClass: (allowCheckbox) ? 'select2-dropdown-checkbox' : '',
            containerCssClass: (hiddenSelection) ? 'fls-hidden-selection' : '',
            closeOnSelect: (allowCheckbox) ? false : true,
            allowClear: (!allowClear) ? false : true,
            minimumResultsForSearch: (allowSearch) ? null : Infinity,
            // ajax: (isAjax) ? this.ajaxConfig() : null
        }
    }
    /**
    * @description set params for ajax
    * @author Long.Pham 12/05/2021
    */
    // ajaxConfig() {
    //     var {
    //         url
    //     } = this.props;
    //     var self = this;
    //     var http = new flHttp(false);
    //     var setHeader = http.setHeader(Constants.METHOD.POST, Constants.CONTENT_TYPE.json);
    //     // const API_LINK = process.api_host || Constants.API_HOST;
    //     const protocol = location.protocol;
    //     const API_HOST = process.api_host || Constants.API_HOST;
    //     const API_HTTP_PORT = process.api_http_port || Constants.API_HTTP_PORT;
    //     const API_HTTPS_PORT = process.api_https_port || Constants.API_HTTPS_PORT;
    //     if (protocol == 'https:') {
    //         url = protocol + "//" + API_HOST + ":" + API_HTTPS_PORT + "/";
    //     } else {
    //         url = protocol + "//" + API_HOST + ":" + API_HTTP_PORT + "/";
    //     }
    //     return {
    //         url: function () {
    //             return url + self.props.url;
    //         },
    //         headers: setHeader.headers,
    //         dataType: 'json',
    //         data: function (prs) {
    //             var def = {
    //                 name: '',
    //                 headquarter_id: setHeader.headers.headquarter,
    //                 lang: setHeader.headers.lang,

    //             };
    //             var newParams = $.extend(def, (self.props.params) ? self.props.params : {});
    //             newParams.name = $.trim(prs.term);
    //             return newParams;
    //         },
    //         processResults: function (req) {
    //             if (req.status) {
    //                 let dataList = req.data;
    //                 if (self.props.defaultOptionName && dataList && dataList.length > 0) {
    //                     var defaultOption = [{
    //                         id: (self.props.defaultOptionId) ? self.props.defaultOptionId : "-1",
    //                         text: self.props.defaultOptionName
    //                     }];
    //                     dataList = defaultOption.concat(dataList);
    //                 }
    //                 return { results: dataList };
    //             }
    //             else {
    //                 return { results: [] };
    //             }
    //         },
    //         cache: false
    //     }
    // }
    render() {
        let {
            children,
            className,
            tag: Tag,
            label,
            selectedValue,
            placeholderId,
            placeholderText,
            defaultOptionId,
            defaultOptionName,
            allowClear,
            allowSearch,
            allowCheckbox,
            hiddenSelection,
            isAjax,
            url,
            params,
            onChange,
            onSelectChange,
            onSelect,
            onUnselect,
            onSelectClose,
            ...attributes
        } = this.props;
        //set class name to tag
        const classes = classNames(
            'form-control',
            className
        );
        return (
            <React.Fragment>
                {(this.props.label != "" && typeof this.props.label != 'undefined') ?
                    <label className="control-label">{this.props.label}
                        {this.props.required == 'required' ? <span className="required">*</span> : null}
                    </label> : null}
                <Tag {...attributes} ref={(ele) => this.selector = $(ele)} disabled={this.props.disabled} className={classes}>
                </Tag>
            </React.Fragment>
        );
    }
}
CMSSelect.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.string,
    allowClear: PropTypes.bool,
    allowSearch: PropTypes.bool,
    allowCheckbox: PropTypes.bool,
    hiddenSelection: PropTypes.bool,
    placeholderText: PropTypes.string,
    defaultOptionName: PropTypes.string,
    onChange: PropTypes.func,
    onSelectChange: PropTypes.func,
    onSelect: PropTypes.func,
    onUnselect: PropTypes.func,
    onSelectClose: PropTypes.func,
    isAjax: PropTypes.bool,
    url: PropTypes.string
};
CMSSelect.defaultProps = {
    tag: 'select'
};
export default CMSSelect;