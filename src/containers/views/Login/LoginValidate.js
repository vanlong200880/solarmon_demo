import BaseValidate from '../../../validator/BaseValidate';
class LoginValidate extends BaseValidate{
    constructor(props){
        super();
        var {t} = props;
        this.trans = t;
    }
    setRule(){
        this.addRuleForField('email', 'trim', true);
        this.addRuleForField('email', 'required', true, this.trans('validate_rule.required'), this.trans('login.email'));
        this.addRuleForField('email', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('login.email'));
        this.addRuleForField('email', 'type', 'email', this.trans('validate_rule.type_email'), this.trans('login.email'));

        this.addRuleForField('password', 'trim', true);
        this.addRuleForField('password', 'required', true, this.trans('validate_rule.required'), this.trans('login.password'));
    }
    setAlias(){
        this.v.setAlias({
            email: this.trans('login.email'),
            password: this.trans('login.password')
        });
        
    }
}
export default LoginValidate;