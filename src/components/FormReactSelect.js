import { Component } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
class FormReactSelect extends Component {
	constructor(props) {
		super(props);
		this.state = {
			className: 'form-control-label',
		}
	}
	

	render() {
		let {
			selectKey,
			name,
			id,
			onChange,
			className,
			value,
			label,
			required,
			optionList,
			isDisabled,
			isLoading,
			isClearable,
			isMulti,
			isRtl,
			isSearchable,
			isOptionDisabled,
			defaultValue,
			placeHolder,
			instanceId,
		} = this.props;

		const customStyles = {
			option: (provided, state) => ({
				...provided,
				fontWeight: state.isSelected ? "bold" : "normal",
			}),
			singleValue: (provided, state) => ({
				...provided,
				minHeight: "34px",
				lineHeight: "34px"
			}),
			control: (provided, state) => ({
				...provided,
				minHeight: "34px",
				outline: 'none',
				border: "1px solid #ced4da",
			}),
			input: (provided, state) => ({
				...provided,
				minHeight: "28px",
				outline: "none"
			}),

			dropdownIndicator: (provided, state) => ({
				...provided,
				padding: "5px",
			}),
			indicatorSeparator: (provided, state) => ({
				...provided,
				padding: "0px",
			}),
			clearIndicator: (provided, state) => ({
				...provided,
				padding: "0px",
			}),
			
			

			placeholder: (provided, state) => ({
				...provided,
				padding: "0px 8px",
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
				maxWidth: "calc(100% - 8px)"

			}),

			valueContainer: (provided, state) => ({
				...provided,
				padding: "0px 8px",
			}),
			menu: (provided, state) => ({
				...provided,
				zIndex: 9,
			}),
		};


		return (
			<>
				{label ?
					<label className="control-label" htmlFor={name}>
						{label} {required === 'required' ? <span className="required">*</span> : null}
					</label>
					: ''}

				<Select
					key={selectKey}
					id={id}
					placeholder={placeHolder}
					className={className}
					classNamePrefix="select"
					defaultValue={defaultValue}
					isDisabled={isDisabled}
					isLoading={isLoading}
					isClearable={isClearable}
					isMulti={isMulti}
					isRtl={isRtl}
					isSearchable={isSearchable}
					name={name}
					value={value}
					options={optionList}
					onChange={onChange}
					isOptionDisabled={isOptionDisabled}
					instanceId={instanceId}
					styles={customStyles}
					components={{
						IndicatorSeparator: () => null
					  }}
				/>
			</>
		);

	}

}


FormReactSelect.propTypes = {
	selectKey: PropTypes.string,
	id: PropTypes.string,
	errorMsg: PropTypes.string,
	value: PropTypes.any,
	label: PropTypes.string,
	optionValue: PropTypes.string,
	className: PropTypes.string.isRequired,
	defaultValue: PropTypes.object,
	isDisabled: PropTypes.bool,
	isLoading: PropTypes.bool,
	isClearable: PropTypes.bool,
	isMulti: PropTypes.bool,
	isRtl: PropTypes.bool,
	isSearchable: PropTypes.bool,
	name: PropTypes.string.isRequired,
	optionList: PropTypes.array.isRequired,
	onChange: PropTypes.func.isRequired,
	isOptionDisabled: PropTypes.bool,
	placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	instanceId: PropTypes.string,
	required: PropTypes.string,
};

export default FormReactSelect;