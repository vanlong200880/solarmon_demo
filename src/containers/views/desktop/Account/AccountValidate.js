import BaseValidate from '../../../../validator/BaseValidate';
class AccountValidate extends BaseValidate{
    constructor(props){
        super();
        var {t} = props;
        this.trans = t;
    }
    setRule(){
        this.addRuleForField('first_name', 'trim', true);
        this.addRuleForField('first_name', 'required', true, this.trans('validate_rule.required'), this.trans('employee.first_name'));
        this.addRuleForField('first_name', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('employee.first_name'));

        this.addRuleForField('last_name', 'trim', true);
        this.addRuleForField('last_name', 'required', true, this.trans('validate_rule.required'), this.trans('employee.last_name'));
        this.addRuleForField('last_name', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('employee.last_name'));
    }
    setAlias(){
        this.v.setAlias({
            last_name: this.trans('employee.last_name'),
            first_name: this.trans('employee.first_name'),
        });
        
    }
}
export default AccountValidate;