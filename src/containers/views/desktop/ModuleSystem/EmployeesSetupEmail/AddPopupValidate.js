import Constants from '../../../../../utils/Constants';
import Libs from '../../../../../utils/Libs';
import BaseValidate from '../../../../../validator/BaseValidate';
class AddPopupValidate extends BaseValidate {
    constructor(props) {
        super();
        var { t, curItem } = props;
        this.trans = t;
        this.curItem = curItem;
    }
    setRule() {

        this.addRuleForField('first_name', 'trim', true);
        this.addRuleForField('first_name', 'required', true, this.trans('validate_rule.required'), this.trans('employee.first_name'));
        this.addRuleForField('first_name', 'maxLength', 100, this.trans('validate_rule.maxLength_input'), this.trans('employee.first_name'));

        this.addRuleForField('last_name', 'trim', true);
        this.addRuleForField('last_name', 'required', true, this.trans('validate_rule.required'), this.trans('employee.last_name'));
        this.addRuleForField('last_name', 'maxLength', 100, this.trans('validate_rule.maxLength_input'), this.trans('employee.last_name'));

        this.addRuleForField('phone', 'trim', true);
        this.addRuleForField('phone', 'required', true, this.trans('validate_rule.required'), this.trans('employee.phone'));
        this.addRuleForField('phone', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('employee.phone'));

        this.addRuleForField('email', 'trim', true);
        this.addRuleForField('email', 'required', true, this.trans('validate_rule.required'), this.trans('employee.email'));
        this.addRuleForField('email', 'type', 'email', this.trans('validate_rule.type_email'), this.trans('employee.email'));
        this.addRuleForField('email', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('employee.email'));

        if (this.curItem.screen_mode == Constants.SCREEN_MODE.ADD || (this.curItem.screen_mode == Constants.SCREEN_MODE.EDIT && !Libs.isBlank(this.curItem.password))) {
            this.addRuleForField('password', 'trim', true);
            this.addRuleForField('password', 'required', true, this.trans('validate_rule.required'), this.trans('employee.new_password'));
            this.addRuleForField('password', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('employee.new_password'));
            this.addRuleForField('password', 'minLength', 8, this.trans('validate_rule.minLength_input'), this.trans('employee.new_password'));

            this.addRuleForField('password_confirm', 'trim', true);
            this.addRuleForField('password_confirm', 'required', true, this.trans('validate_rule.required'), this.trans('employee.password_confirm'));
            this.addRuleForField('password_confirm', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('employee.password_confirm'));
            this.addRuleForField('password_confirm', 'minLength', 8, this.trans('validate_rule.minLength_input'), this.trans('employee.password_confirm'));
        }
    }
    setAlias() {
        this.v.setAlias({
            first_name: this.trans('employee.first_name'),
            last_name: this.trans('employee.last_name'),
            phone: this.trans('employee.phone'),
            email: this.trans('employee.email'),
            password: this.trans('employee.password'),
            password_confirm: this.trans('employee.password_confirm')
        });

    }
}
export default AddPopupValidate;