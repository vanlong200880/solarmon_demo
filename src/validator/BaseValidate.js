import Validation from './libs/validation';
import Libs from '../utils/Libs';
class BaseValidate {
    constructor() {
        // Check if all instance methods are implemented.
        if (this.setRule === BaseValidate.prototype.setRule) {
            throw new TypeError("Please implement abstract method setRule.");
        }
        if (this.setAlias === BaseValidate.prototype.setAlias) {
            throw new TypeError("Please implement abstract method setAlias.");
        }
        this.v = new Validation();
    }
    // validationAll(data) {
    //     try {
    //         // data = Libs.convertEmptyPropToNullProp(data);
    //         this.setAlias();
    //         this.setRule();
    //         let self = this
    //         return new Promise(function (resolve, reject) {
    //             self.v.validateAll(data, function (err, path) {
    //                 if (err) {
    //                     resolve(err.message);
    //                 } else {
    //                     resolve(path);
    //                 }
    //             });
    //         });
    //     } catch (e) {
    //         console.log(e);
    //         // callBack(e)
    //     }

    // }

    /**
     * @description validate a field 
     * @author Long.Pham
     * @since 12/05/2021
     * @param {*} data 
     * @param {*} path 
     * @param {*} callBack 
     */
    validateOne(data, path, callBack) {
        try {
            this.setAlias();
            this.setRule();
            let self = this
            return new Promise(function (resolve, reject) {
                self.v.validateOne(data, path, function (err, rPath) {
                    if (err) {
                        resolve({ [path]: err.message });
                    } else {
                        resolve({ [path]: null });
                    }
                });
            });
        } catch (e) {
            callBack(e);
        }

    }

    /**
     * @description validate all data at the same time
     * @author Long.Pham
     * @since 12/05/2021
     * @param {*} data 
     */
    FLValidationAll(data, callBack) {
        try {
            // data = Libs.convertEmptyPropToNullProp(data);
            this.setAlias();
            this.setRule();
            let self = this
            return new Promise(function (resolve, reject) {
                self.v.FLValidateAll(data, function (errs) {
                    if (Object.keys(errs).length > 0) {
                        var count = 0;
                        for (let key in errs) {
                            let message = errs[key];
                            if (message === null) {
                                count++;
                            }
                        }
                        if (count === Object.keys(errs).length) {
                            resolve(null);
                        } else {
                            resolve(errs);
                        }
                    } else {
                        resolve(null);
                    }
                });
            });
        } catch (e) {
            console.log(e);
            callBack(e);
        }
    }


    setRule() {

    }
    setAlias() {

    }

    /**
     * @author Long.Pham
     * @since 12-05-2021
     * @param {field name} field_name 
     * @param {rule name} rule_name 
     * @param {rule value } rule_value 
     * @param {key message} key_msg 
     */
     addRuleForField(field_name, rule_name, rule_value, key_msg, field_key_name) {
        let REG_ASSIGN_VARIBLE = /\$\<([^{}]*?)\>/g;
        if(key_msg){
            
            key_msg = Libs.stringAssign(key_msg, [field_name, field_key_name, rule_value], REG_ASSIGN_VARIBLE);
        }
        this.v.addRule(field_name, rule_name, rule_value);
        this.v.setMsg(field_name, rule_name, key_msg);
    }
}
export default BaseValidate;