import React from 'react';


export const DropDownSelect = ({options, input, label}) => {
    const renderSelectOptions = ({...item}) => {
        return (
            <option
                key={item.id}
                value={item.id}
            >
                {`${item.name} ${item.lastName}`}
            </option>
        );
    };

    if (options) {
        return (
            <div>
                <label>{label}</label>
                <select {...input} className="browser-default">
                    <option value="">Select</option>
                    {options.map(renderSelectOptions)}
                </select>
            </div>
        )
    }
    return null
};

export default DropDownSelect;