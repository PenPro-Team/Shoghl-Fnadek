import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/auth/FormInput';
import PasswordInput from '../components/auth/PasswordInput';
import SubmitButton from '../components/auth/SubmitButton';
import AuthCard from '../components/auth/AuthCard';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            
            try {
                // API call would go here
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Login attempted', formData);

                // navigate('/dashboard');
                alert('Login successful!');
            } catch (error) {
                console.error('Login error:', error);
                setErrors({ submit: 'Invalid email or password. Please try again.' });
            } finally {
                setIsSubmitting(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <AuthCard 
            title="Sign in to your account"
            footerText="Don't have an account?"
            footerLinkText="Register"
            footerLinkTo="/register"
        >
            {errors.submit && (
                <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                    {errors.submit}
                </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
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

                <PasswordInput
                    id="password"
                    name="password"
                    label="Password"
                    value={formData.password}
                    onChange={handleChange}
                    error={errors.password}
                    required={true}
                    autoComplete="current-password"
                />

                <SubmitButton 
                    isSubmitting={isSubmitting} 
                    label="Sign in" 
                    loadingLabel="Signing in..." 
                />
            </form>
        </AuthCard>
    );
};

export default Login;