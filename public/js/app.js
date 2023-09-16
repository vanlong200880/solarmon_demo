/* 
Define common use functions
Author: Long.Pham
----------------------------------------*/
if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}


/**
 * @description Set validate message
 * @author long.pham
 * @since 06/09/2018
 * @param {*} errors
 ******** IMPORTANT surround input field must have class form-group
 */
var setValidateMessage = (errors, validateOne, wrapEleId) => {
    var wrapEle = $('#'+wrapEleId);
    function isEmpty( el ){
        return !$.trim(el.html())
    }
    if (typeof errors === 'undefined' || errors == null || Object.keys(errors).length == 0) return;
    validateOne = (typeof validateOne === 'boolean') ? validateOne : false;
    var validateMessageClass = ".validate-message",
        formGroupClass = ".form-group",
        inputErrorClass = ".input-error";


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
            removeAllValidateMessage();
        }
        for (let key in errors) {
            let message = errors[key];
            var input = $('[name="' + key + '"]');
            if(!isEmpty(wrapEle)){
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
            let nodeName =input[0].nodeName; 
            if(nodeName=="SELECT"){
                nextElement.classList.add(inputErrorClass.replace(".", ""));
            }
            parent[0].appendChild(paragraph);
            parent[0].classList.add("group-error");
        } else {
            removeOldParagraph(input, parent);
            input[0].classList.remove(inputErrorClass.replace(".", ""));
            parent[0].classList.remove("group-error");
            let nextElement = input[0].nextElementSibling;
            let nodeName =input[0].nodeName; 
            if(nodeName=="SELECT"){
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
var removeAllValidateMessage = () => {
    if($('.validate-message').length)
    {
        $('.validate-message').remove();
    }
    if($('.input-error').length)
    {
        $('.input-error').removeClass('input-error');
    }
    if($('.group-error').length)
    {
        $('.group-error').removeClass('group-error');
    }
    
    if($('.select2-error').length)
    {
        $('.select2-error').removeClass('select2-error');
    }
}
/**
* @description Display error messages for validation fields
* @param object errors: Error field values
* @param string wrapperElement: Tag the fields, otherwise it will take all the files with names from errors and assignments and error messages
* @author long.pham 2018-11-24
*/
function setValidationError(errors, wrapperElement)
{
    if (typeof errors === 'undefined' || errors == null || Object.keys(errors).length <= 0) return;
    $.each(errors, function(key, val){
        var ele = $('[name=\"'+key+'\"]');
        if (wrapperElement !== 'undefined' && wrapperElement != null && wrapperElement != ''){
            var wrapEle = $('.' + wrapperElement);
			if (!wrapEle || wrapEle.length <= 0) {
				wrapEle = $('#' + wrapperElement);
            }
            ele = wrapEle.find('[name=\"'+key+'\"]');
        }
        if(ele.length)
        {
            if(val && val != null)
            {
                ele.removeClass('input-error');
                ele.addClass('input-error');
                ele.next('.validate-message').remove();
                ele.after('<p class="validate-message">'+val+'</p>');
            }
            else
            {
                ele.removeClass('input-error');
                ele.next('.validate-message').remove();
            }
        }
    });
}