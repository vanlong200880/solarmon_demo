import BaseValidate from '../../../validator/BaseValidate';
class ResetPasswordValidate extends BaseValidate{
    constructor(props){
        super();
        var {t} = props;
        this.trans = t;
    }
    setRule(){
        this.addRuleForField('password', 'trim', true);
        this.addRuleForField('password', 'required', true, this.trans('validate_rule.required'), this.trans('reset_password.password'));
        this.addRuleForField('password', 'maxLength', 60, this.trans('validate_rule.maxLength_input'), this.trans('reset_password.password'));
        this.addRuleForField('password', 'minLength', 8, this.trans('validate_rule.minLength_input'), this.trans('reset_password.password'));

        this.addRuleForField('password_confirm', 'trim', true);
        this.addRuleForField('password_confirm', 'required', true, this.trans('validate_rule.required'), this.trans('reset_password.password_confirm'));
        this.addRuleForField('password_confirm', 'maxLength', 60, this.trans('validate_rule.maxLength_input'), this.trans('reset_password.password_confirm'));
        this.addRuleForField('password_confirm', 'minLength', 8, this.trans('validate_rule.minLength_input'), this.trans('reset_password.password_confirm'));

    }
    setAlias(){
        this.v.setAlias({
            password: this.trans('reset_password.password'),
            password_confirm: this.trans('reset_password.password_confirm')
        });
        
    }
}
export default ResetPasswordValidate;