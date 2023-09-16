import BaseValidate from '../../../../validator/BaseValidate';
class AddChangePasswordValidate extends BaseValidate{
    constructor(props){
        super();
        var {t} = props;
        this.trans = t;
    }
    setRule(){
        this.addRuleForField('current_password', 'trim', true);
        this.addRuleForField('current_password', 'required', true, this.trans('validate_rule.required'), this.trans('employee.current_password'));
        this.addRuleForField('current_password', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('employee.current_password'));
        this.addRuleForField('current_password', 'minLength', 8, this.trans('validate_rule.minLength_input'), this.trans('employee.current_password'));

        this.addRuleForField('password', 'trim', true);
        this.addRuleForField('password', 'required', true, this.trans('validate_rule.required'), this.trans('employee.new_password'));
        this.addRuleForField('password', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('employee.new_password'));
        this.addRuleForField('password', 'minLength', 8, this.trans('validate_rule.minLength_input'), this.trans('employee.new_password'));

        this.addRuleForField('password_confirm', 'trim', true);
        this.addRuleForField('password_confirm', 'required', true, this.trans('validate_rule.required'), this.trans('employee.password_confirm'));
        this.addRuleForField('password_confirm', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('employee.password_confirm'));
        this.addRuleForField('password_confirm', 'minLength', 8, this.trans('validate_rule.minLength_input'), this.trans('employee.password_confirm'));
    }
    setAlias(){
        this.v.setAlias({
            current_password: this.trans('employee.current_password'),
            password: this.trans('employee.new_password'),
            password_confirm: this.trans('employee.password_confirm')
        });
        
    }
}
export default AddChangePasswordValidate;