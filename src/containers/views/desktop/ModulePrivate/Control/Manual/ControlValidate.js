import BaseValidate from '../../../../../../validator/BaseValidate';
class ControlValidate extends BaseValidate {
    constructor(props) {
        super();
        var { t } = props;
        this.trans = t;

    }
    setRule() {
        // this.addRuleForField('date_from', 'trim', true);
        // this.addRuleForField('date_from', 'required', true, this.trans('validate_rule.required'), this.trans('device.date_from'));
        // this.addRuleForField('date_from', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('device.date_from'));

        // this.addRuleForField('date_to', 'trim', true);
        // this.addRuleForField('date_to', 'required', true, this.trans('validate_rule.required'), this.trans('device.date_to'));
        // this.addRuleForField('date_to', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('device.date_to'));
    }

    setAlias() {
        this.v.setAlias({
            // date_from: this.trans('device.date_from'),
            // date_to: this.trans('device.date_to')
        });
    }
}
export default ControlValidate;