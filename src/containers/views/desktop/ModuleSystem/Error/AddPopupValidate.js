import BaseValidate from '../../../../../validator/BaseValidate';
class AddPopupValidate extends BaseValidate {
    constructor(props) {
        super();
        var { t } = props;
        this.trans = t;

    }
    setRule() {
        this.addRuleForField('id_error_type', 'trim', true);
        this.addRuleForField('id_error_type', 'required', true, this.trans('validate_rule.required'), this.trans('error.id_error_type'));
        this.addRuleForField('id_error_type', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('error.id_error_type'));

        this.addRuleForField('id_error_level', 'trim', true);
        this.addRuleForField('id_error_level', 'required', true, this.trans('validate_rule.required'), this.trans('error.id_error_level'));
        this.addRuleForField('id_error_level', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('error.id_error_level'));


        this.addRuleForField('id_error_state', 'trim', true);
        this.addRuleForField('id_error_state', 'required', true, this.trans('validate_rule.required'), this.trans('error.id_error_state'));
        this.addRuleForField('id_error_state', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('error.id_error_state'));

        this.addRuleForField('id_device_group', 'trim', true);
        this.addRuleForField('id_device_group', 'required', true, this.trans('validate_rule.required'), this.trans('error.id_device_group'));
        this.addRuleForField('id_device_group', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('error.id_device_group'));

        
        this.addRuleForField('error_code', 'trim', true);
        this.addRuleForField('error_code', 'required', true, this.trans('validate_rule.required'), this.trans('error.error_code'));
        this.addRuleForField('error_code', 'maxLength', 100, this.trans('validate_rule.maxLength_input'), this.trans('error.error_code'));

    }

    setAlias() {
        this.v.setAlias({
            id_error_type: this.trans('error.id_error_type'),
            id_error_level: this.trans('error.id_error_level'),
            id_error_state: this.trans('error.id_error_state'),
            id_device_group: this.trans('error.id_device_group'),
            error_code : this.trans('error.error_code')
        });
    }
}
export default AddPopupValidate;