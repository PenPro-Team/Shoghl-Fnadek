import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/auth/FormInput';
import PasswordInput from '../components/auth/PasswordInput';
import SubmitButton from '../components/auth/SubmitButton';
import AuthCard from '../components/auth/AuthCard';
import { AxiosRegisterInstance } from '../Network/Remote/AxiosInstance';

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '', // Added phone field
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (name === 'password') {
            checkPasswordStrength(value);
        }
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const checkPasswordStrength = (password) => {
        let score = 0;
        let message = '';
        
        if (password.length > 0) {
            score = 1;
            message = 'Weak';
        }
        
        if (password.length >= 6) {
            score = 2;
            message = 'Fair';
        }
        
        if (password.length >= 8 && 
            /[A-Z]/.test(password) && 
            /[a-z]/.test(password)) {
            score = 3;
            message = 'Good';
        }
        
        if (password.length >= 10 && 
            /[A-Z]/.test(password) && 
            /[a-z]/.test(password) && 
            /[0-9]/.test(password)) {
            score = 4;
            message = 'Strong';
        }
        
        if (password.length >= 12 && 
            /[A-Z]/.test(password) && 
            /[a-z]/.test(password) && 
            /[0-9]/.test(password) && 
            /[^A-Za-z0-9]/.test(password)) {
            score = 5;
            message = 'Very Strong';
        }
        
        setPasswordStrength({ score, message });
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (formData.phone && !/^(\+20|0)?1[0125]\d{8}$/.test(formData.phone)) {
            newErrors.phone = 'Invalid Egyptian phone number';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            
            try {
               const response = await AxiosRegisterInstance.post('', {
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone_number: formData.phone,
                    password: formData.password,
                   
                });
                console.log('Registration successful:', response.data);

                navigate('/login');
           
            } catch (error) {
                console.error('Registration error:', error);
                setErrors({ submit: 'Registration failed. Please try again.' });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <AuthCard 
            title="Create your account"
            footerText="Already have an account?"
            footerLinkText="Sign in"
            footerLinkTo="/login"
        >
            {errors.submit && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errors.submit}
                </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <FormInput
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        error={errors.firstName}
                        required={true}
                        autoComplete="given-name"
                    />

                    <FormInput
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        error={errors.lastName}
                        required={true}
                        autoComplete="family-name"
                    />
                </div>

                <FormInput
                    id="email"
                    name="email"
                    type="email"
                    label="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required={true}
                    autoComplete="email"
                />

                <FormInput
                    id="phone"
                    name="phone"
                    type="tel"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    placeholder="e.g. 01012345678"
                    autoComplete="tel"
                />

                <PasswordInput
                    id="password"
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required={true}
                    autoComplete="new-password"
                    strengthMeter={true}
                    passwordStrength={passwordStrength}
                />

                <PasswordInput
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    required={true}
                    autoComplete="new-password"
                />

                <SubmitButton 
                    isSubmitting={isSubmitting} 
                    label="Register" 
                    loadingLabel="Creating Account..." 
                />
            </form>
        </AuthCard>
    );
};

export default Register;