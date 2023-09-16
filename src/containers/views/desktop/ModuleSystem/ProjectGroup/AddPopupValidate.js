import BaseValidate from '../../../../../validator/BaseValidate';
class AddPopupValidate extends BaseValidate{
    constructor(props){
        super();
        var {t, iso_code_language} = props;
        this.trans = t;
        this.iso_code_language = iso_code_language;

    }
    setRule(){
        if(this.iso_code_language === 'vi'){
            this.addRuleForField('name_vi', 'trim', true);
            this.addRuleForField('name_vi', 'required', true, this.trans('validate_rule.required'), this.trans('project_group.name'));
            this.addRuleForField('name_vi', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('project_group.name'));
        }
        if(this.iso_code_language === 'en'){
            this.addRuleForField('name_en', 'trim', true);
            this.addRuleForField('name_en', 'required', true, this.trans('validate_rule.required'), this.trans('project_group.name'));
            this.addRuleForField('name_en', 'maxLength', 200, this.trans('validate_rule.maxLength_input'), this.trans('project_group.name'));
        }
    }
    
    setAlias(){
        if(this.iso_code_language ==='vi'){
            this.v.setAlias({
                name_vi: this.trans('project_group.name')
            });
        }

        if(this.iso_code_language ==='en'){
            this.v.setAlias({
                name_en: this.trans('project_group.name')
            });
        }
        
    }
}
export default AddPopupValidate;