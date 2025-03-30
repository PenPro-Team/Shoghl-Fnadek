import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const PasswordInput = ({ 
  id, 
  name,
  label, 
  value, 
  onChange, 
  error, 
  required = false,
  autoComplete,
  strengthMeter = false,
  passwordStrength = { score: 0, message: '' }
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getStrengthColor = () => {
    switch(passwordStrength.score) {
      case 1: return 'bg-red-500';
      case 2: return 'bg-orange-500';
      case 3: return 'bg-yellow-500';
      case 4: return 'bg-green-400';
      case 5: return 'bg-green-600';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          autoComplete={autoComplete}
          required={required}
          value={value}
          onChange={onChange}
          className={`appearance-none block w-full px-3 py-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <FaEyeSlash className="text-gray-400" /> : <FaEye className="text-gray-400" />}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${id}-error`}>{error}</p>
      )}

      {/* Password strength meter */}
      {strengthMeter && value && (
        <div className="mt-2">
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getStrengthColor()}`} 
              style={{ width: `${passwordStrength.score * 20}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-600">
            Password strength: <span className="font-medium">{passwordStrength.message}</span>
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Use 12+ characters with a mix of uppercase, lowercase, numbers, and symbols for best security.
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
