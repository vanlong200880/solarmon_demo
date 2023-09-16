import BaseValidate from '../../../../../validator/BaseValidate';
class EstimationSensorValidate extends BaseValidate {
    constructor(props) {
        super();
        var { t } = props;
        this.trans = t;

    }
    setRule() {
        this.addRuleForField('config_yi', 'trim', true);
        this.addRuleForField('config_yi', 'required', true, this.trans('validate_rule.required'), this.trans('project.config_yi'));
        this.addRuleForField('config_yi', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.config_yi'));

        this.addRuleForField('config_po', 'trim', true);
        this.addRuleForField('config_po', 'required', true, this.trans('validate_rule.required'), this.trans('project.config_po'));
        this.addRuleForField('config_po', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.config_po'));

        this.addRuleForField('total_loss_factor', 'trim', true);
        this.addRuleForField('total_loss_factor', 'required', true, this.trans('validate_rule.required'), this.trans('project.total_loss_factor'));
        this.addRuleForField('total_loss_factor', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.total_loss_factor'));

        this.addRuleForField('config_yi1', 'trim', true);
        this.addRuleForField('config_yi1', 'required', true, this.trans('validate_rule.required'), this.trans('project.config_yi'));
        this.addRuleForField('config_yi1', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.config_yi'));

        this.addRuleForField('config_po1', 'trim', true);
        this.addRuleForField('config_po1', 'required', true, this.trans('validate_rule.required'), this.trans('project.config_po'));
        this.addRuleForField('config_po1', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.config_po'));

        this.addRuleForField('total_loss_factor1', 'trim', true);
        this.addRuleForField('total_loss_factor1', 'required', true, this.trans('validate_rule.required'), this.trans('project.total_loss_factor'));
        this.addRuleForField('total_loss_factor1', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.total_loss_factor'));
    }

    setAlias() {
        this.v.setAlias({
            config_yi: this.trans('project.config_yi'),
            config_po: this.trans('project.config_po'),
            total_loss_factor: this.trans('project.total_loss_factor'),

            config_yi1: this.trans('project.config_yi'),
            config_po1: this.trans('project.config_po'),
            total_loss_factor1: this.trans('project.total_loss_factor')
        });

    }
}
export default EstimationSensorValidate;