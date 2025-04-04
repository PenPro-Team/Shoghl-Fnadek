import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../components/auth/FormInput';
import PasswordInput from '../components/auth/PasswordInput';
import SubmitButton from '../components/auth/SubmitButton';
import AuthCard from '../components/auth/AuthCard';
import { AxiosLoginInstance } from '../Network/Remote/AxiosInstance';
import { setToLocalStorage } from '../Network/local/localstorage';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const returnPath = location.state?.from || '/';
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
   
    let isAuthenticated = false;
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length === 0) {
            setIsSubmitting(true);
            
            try {
                 const response = await AxiosLoginInstance.post('', {
                    email: formData.email,
                    password: formData.password
                });
            
              
                console.log('Login successful:', response.data);
                setToLocalStorage('auth',{
                    user: response.data.user,
                    access: response.data.access,
                    refresh: response.data.refresh,
                    isAuthenticated: true
                });
                navigate(returnPath);

            } catch (error) {
                console.error('Login error:', error);
                if (error.response) {
                    
                    if (error.response.status === 401) {
                        setErrors({ submit: 'Invalid email or password. Please try again.' });
                    } else {
                        setErrors({ submit: `Login failed: ${error.response.data.message || 'Please try again later.'}` });
                    }
                } else if (error.request) {
                    setErrors({ submit: 'Network error. Please check your connection and try again.' });
                } else {
                    setErrors({ submit: 'An error occurred. Please try again later.' });
                }
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