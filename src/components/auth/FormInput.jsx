import React from 'react';

const FormInput = ({ 
  id, 
  name, 
  type = 'text', 
  label, 
  value, 
  onChange, 
  onBlur,
  error, 
  required = false,
  autoComplete,
  placeholder
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="mt-1">
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`appearance-none block w-full px-3 py-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>{error}</p>
        )}
      </div>
    </div>
  );
};

export default FormInput;
