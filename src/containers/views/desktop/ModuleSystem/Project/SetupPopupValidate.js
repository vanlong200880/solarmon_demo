import BaseValidate from '../../../../../validator/BaseValidate';
class SetupPopupValidate extends BaseValidate {
    constructor(props) {
        super();
        var { t } = props;
        this.trans = t;

    }
    setRule() {
        this.addRuleForField('yearly_egrade_default', 'trim', true);
        this.addRuleForField('yearly_egrade_default', 'required', true, this.trans('validate_rule.required'), this.trans('project.yearly_egrade_default'));
        this.addRuleForField('yearly_egrade_default', 'maxLength', 3, this.trans('validate_rule.maxLength_input'), this.trans('project.yearly_egrade_default'));

        this.addRuleForField('yearly_egrade_two', 'trim', true);
        this.addRuleForField('yearly_egrade_two', 'required', true, this.trans('validate_rule.required'), this.trans('project.yearly_egrade_two'));
        this.addRuleForField('yearly_egrade_two', 'maxLength', 3, this.trans('validate_rule.maxLength_input'), this.trans('project.yearly_egrade_two'));

        this.addRuleForField('year', 'trim', true);
        this.addRuleForField('year', 'required', true, this.trans('validate_rule.required'), this.trans('project.year'));
        this.addRuleForField('year', 'maxLength', 4, this.trans('validate_rule.maxLength_input'), this.trans('project.year'));

        this.addRuleForField('jan', 'trim', true);
        this.addRuleForField('jan', 'required', true, this.trans('validate_rule.required'), this.trans('project.jan'));
        this.addRuleForField('jan', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.jan'));

        this.addRuleForField('feb', 'trim', true);
        this.addRuleForField('feb', 'required', true, this.trans('validate_rule.required'), this.trans('project.feb'));
        this.addRuleForField('feb', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.feb'));

        this.addRuleForField('mar', 'trim', true);
        this.addRuleForField('mar', 'required', true, this.trans('validate_rule.required'), this.trans('project.mar'));
        this.addRuleForField('mar', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.mar'));

        this.addRuleForField('apr', 'trim', true);
        this.addRuleForField('apr', 'required', true, this.trans('validate_rule.required'), this.trans('project.apr'));
        this.addRuleForField('apr', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.apr'));

        this.addRuleForField('may', 'trim', true);
        this.addRuleForField('may', 'required', true, this.trans('validate_rule.required'), this.trans('project.may'));
        this.addRuleForField('may', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.may'));

        this.addRuleForField('jun', 'trim', true);
        this.addRuleForField('jun', 'required', true, this.trans('validate_rule.required'), this.trans('project.jun'));
        this.addRuleForField('jun', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.jun'));

        this.addRuleForField('jul', 'trim', true);
        this.addRuleForField('jul', 'required', true, this.trans('validate_rule.required'), this.trans('project.jul'));
        this.addRuleForField('jul', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.jul'));

        this.addRuleForField('aug', 'trim', true);
        this.addRuleForField('aug', 'required', true, this.trans('validate_rule.required'), this.trans('project.aug'));
        this.addRuleForField('aug', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.aug'));

        this.addRuleForField('sep', 'trim', true);
        this.addRuleForField('sep', 'required', true, this.trans('validate_rule.required'), this.trans('project.sep'));
        this.addRuleForField('sep', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.sep'));

        this.addRuleForField('oct', 'trim', true);
        this.addRuleForField('oct', 'required', true, this.trans('validate_rule.required'), this.trans('project.oct'));
        this.addRuleForField('oct', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.oct'));

        this.addRuleForField('nov', 'trim', true);
        this.addRuleForField('nov', 'required', true, this.trans('validate_rule.required'), this.trans('project.nov'));
        this.addRuleForField('nov', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.nov'));

        this.addRuleForField('dec', 'trim', true);
        this.addRuleForField('dec', 'required', true, this.trans('validate_rule.required'), this.trans('project.dec'));
        this.addRuleForField('dec', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.dec'));
    }

    setAlias() {
        this.v.setAlias({
            yearly_egrade_default: this.trans('project.yearly_egrade_default'),
            yearly_egrade_two: this.trans('project.yearly_egrade_two'),
            year: this.trans('project.year'),
            jan: this.trans('project.jan'),
            feb: this.trans('project.feb'),
            mar: this.trans('project.mar'),
            apr: this.trans('project.apr'),
            may: this.trans('project.may'),
            jun: this.trans('project.jun'),
            jul: this.trans('project.jul'),
            aug: this.trans('project.aug'),
            sep: this.trans('project.sep'),
            oct: this.trans('project.oct'),
            nov: this.trans('project.nov'),
            dec: this.trans('project.dec')
        });

    }
}
export default SetupPopupValidate;