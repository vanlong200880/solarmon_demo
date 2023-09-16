import BaseValidate from '../../../validator/BaseValidate';
class ForgotPasswordValidate extends BaseValidate{
    constructor(props){
        super();
        var {t} = props;
        this.trans = t;
    }
    setRule(){
        this.addRuleForField('email', 'trim', true);
        this.addRuleForField('email', 'required', true, this.trans('validate_rule.required'), this.trans('forgot_password.email'));
        this.addRuleForField('email', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('forgot_password.email'));
        this.addRuleForField('email', 'type', 'email', this.trans('validate_rule.type_email'), this.trans('forgot_password.email'));
    }
    setAlias(){
        this.v.setAlias({
            email: this.trans('forgot_password.email')
        });
        
    }
}
export default ForgotPasswordValidate;