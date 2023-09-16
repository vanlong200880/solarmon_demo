import BaseValidate from '../../../../../validator/BaseValidate';
class AddPopupValidate extends BaseValidate {
    constructor(props) {
        super();
        var { t } = props;
        this.trans = t;

    }
    setRule() {
        this.addRuleForField('id_device_group', 'trim', true);
        this.addRuleForField('id_device_group', 'required', true, this.trans('validate_rule.required'), this.trans('device_parameter.id_device_group'));
        this.addRuleForField('id_device_group', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('device_parameter.id_device_group'));

        
        this.addRuleForField('name', 'trim', true);
        this.addRuleForField('name', 'required', true, this.trans('validate_rule.required'), this.trans('device_parameter.name'));
        this.addRuleForField('name', 'maxLength', 100, this.trans('validate_rule.maxLength_input'), this.trans('device_parameter.name'));


        this.addRuleForField('slug', 'trim', true);
        this.addRuleForField('slug', 'required', true, this.trans('validate_rule.required'), this.trans('device_parameter.slug'));
        this.addRuleForField('slug', 'maxLength', 100, this.trans('validate_rule.maxLength_input'), this.trans('device_parameter.slug'));

    }

    setAlias() {
        this.v.setAlias({
            id_device_group: this.trans('device_parameter.id_device_group'),
            name : this.trans('device_parameter.name'),
            slug: this.trans('device_parameter.slug'),
        });
    }
}
export default AddPopupValidate;