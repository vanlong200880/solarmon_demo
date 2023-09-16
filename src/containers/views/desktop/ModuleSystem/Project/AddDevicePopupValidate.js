import BaseValidate from '../../../../../validator/BaseValidate';
class AddDevicePopupValidate extends BaseValidate {
    constructor(props) {
        super();
        var { t } = props;
        this.trans = t;

    }
    setRule() {
        this.addRuleForField('name', 'trim', true);
        this.addRuleForField('name', 'required', true, this.trans('validate_rule.required'), this.trans('device.name'));
        this.addRuleForField('name', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('device.name'));

        this.addRuleForField('id_device', 'trim', true);
        this.addRuleForField('id_device', 'required', true, this.trans('validate_rule.required'), this.trans('device.id_device'));
        this.addRuleForField('id_device', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('device.id_device'));

        this.addRuleForField('model', 'trim', true);
        this.addRuleForField('model', 'required', true, this.trans('validate_rule.required'), this.trans('device.model'));
        this.addRuleForField('model', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('device.model'));

        this.addRuleForField('serial_number', 'trim', true);
        this.addRuleForField('serial_number', 'required', true, this.trans('validate_rule.required'), this.trans('device.serial_number'));
        this.addRuleForField('serial_number', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('device.serial_number'));


        this.addRuleForField('id_device_type', 'trim', true);
        this.addRuleForField('id_device_type', 'required', true, this.trans('validate_rule.required'), this.trans('device.id_device_type'));
        this.addRuleForField('id_device_type', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('device.id_device_type'));

        this.addRuleForField('id_device_group', 'trim', true);
        this.addRuleForField('id_device_group', 'required', true, this.trans('validate_rule.required'), this.trans('device.id_device_group'));
        this.addRuleForField('id_device_group', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('device.id_device_group'));

    }

    setAlias() {
        this.v.setAlias({
            id_device: this.trans('device.id_device'),
            name: this.trans('device.name'),
            model: this.trans('device.model'),
            serial_number: this.trans('device.serial_number'),
            id_device_type: this.trans('device.id_device_type'),
            id_device_group: this.trans('device.id_device_group')
        });

    }
}
export default AddDevicePopupValidate;