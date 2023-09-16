import BaseValidate from '../../../../../validator/BaseValidate';
class AddPopupValidate extends BaseValidate {
    constructor(props) {
        super();
        var { t, iso_code_language } = props;
        this.trans = t;
        this.iso_code_language = iso_code_language;

    }
    setRule() {
        if (this.iso_code_language === 'vi') {
            this.addRuleForField('name_vi', 'trim', true);
            this.addRuleForField('name_vi', 'required', true, this.trans('validate_rule.required'), this.trans('project.name'));
            this.addRuleForField('name_vi', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('project.name'));
        }
        if (this.iso_code_language === 'en') {
            this.addRuleForField('name_en', 'trim', true);
            this.addRuleForField('name_en', 'required', true, this.trans('validate_rule.required'), this.trans('project.name'));
            this.addRuleForField('name_en', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('project.name'));
        }

        this.addRuleForField('id_project_group', 'trim', true);
        this.addRuleForField('id_project_group', 'required', true, this.trans('validate_rule.required'), this.trans('project.id_project_group'));
        this.addRuleForField('id_project_group', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.id_project_group'));

        this.addRuleForField('installed_date', 'trim', true);
        this.addRuleForField('installed_date', 'required', true, this.trans('validate_rule.required'), this.trans('project.installed_date'));
        this.addRuleForField('installed_date', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.installed_date'));


        this.addRuleForField('address', 'trim', true);
        this.addRuleForField('address', 'required', true, this.trans('validate_rule.required'), this.trans('project.address'));
        this.addRuleForField('address', 'maxLength', 500, this.trans('validate_rule.maxLength_input'), this.trans('project.address'));

        this.addRuleForField('lat', 'trim', true);
        this.addRuleForField('lat', 'required', true, this.trans('validate_rule.required'), this.trans('project.lat'));
        this.addRuleForField('lat', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.lat'));


        this.addRuleForField('lng', 'trim', true);
        this.addRuleForField('lng', 'required', true, this.trans('validate_rule.required'), this.trans('project.lng'));
        this.addRuleForField('lng', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.lng'));


        this.addRuleForField('installed_power', 'trim', true);
        this.addRuleForField('installed_power', 'required', true, this.trans('validate_rule.required'), this.trans('project.installed_power'));
        this.addRuleForField('installed_power', 'maxLength', 100, this.trans('validate_rule.maxLength_input'), this.trans('project.installed_power'));

        this.addRuleForField('installed_power_client', 'trim', true);
        this.addRuleForField('installed_power_client', 'required', true, this.trans('validate_rule.required'), this.trans('project.installed_power'));
        this.addRuleForField('installed_power_client', 'maxLength', 100, this.trans('validate_rule.maxLength_input'), this.trans('project.installed_power'));

        this.addRuleForField('commisioning_date', 'trim', true);
        this.addRuleForField('commisioning_date', 'required', true, this.trans('validate_rule.required'), this.trans('project.commisioning_date'));
        this.addRuleForField('commisioning_date', 'maxLength', 20, this.trans('validate_rule.maxLength_input'), this.trans('project.commisioning_date'));
    }

    setAlias() {
        if (this.iso_code_language === 'vi') {
            this.v.setAlias({
                name_vi: this.trans('project.name'),
                id_project_group : this.trans('project.id_project_group'),
                installed_date : this.trans('project.installed_date'),
                address : this.trans('project.address'),
                lat : this.trans('project.lat'),
                lng : this.trans('project.lng'),
                installed_power : this.trans('project.installed_power'),
                installed_power_client : this.trans('project.installed_power_client'),
                commisioning_date : this.trans('project.commisioning_date')

            });
        }

        if (this.iso_code_language === 'en') {
            this.v.setAlias({
                name_en: this.trans('project.name'),
                id_project_group : this.trans('project.id_project_group'),
                installed_date : this.trans('project.installed_date'),
                address : this.trans('project.address'),
                lat : this.trans('project.lat'),
                lng : this.trans('project.lng'),
                installed_power : this.trans('project.installed_power'),
                installed_power_client : this.trans('project.installed_power_client'),
                commisioning_date : this.trans('project.commisioning_date')
            });
        }

    }
}
export default AddPopupValidate;