import React from 'react'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import {TextField, Button, Paper}  from '@mui/material';


function Login() {

    // const Login = () => {
        const dispatch = useDispatch();
        const [email , setEmail] = useState('');
        const [password , setPassword] = useState('')
        const [emailError, setEmailError] = useState(false)
        const [passwordError, setPasswordError] = useState(false);
    
        const handleEmailChange = (e) => {
            const emailValue = e.target.value;
            dispatch(setEmail(emailValue));
        
            if (!validateEmail(emailValue)) {
              setEmailError('Please enter a valid email address.');
            } else {
              setEmailError('');
            }
          };
          const validateEmail = (email) => {
            // Simple email validation regex
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
          };    
          const handlePasswordChange = (e) => {
            const passwordValue = e.target.value;
            dispatch(setPassword(passwordValue));
            setPasswordError(!passwordValue);  // Set error if password is empty
          };
    const handleSubmit = (e) => {
        e.preventDeafault()
        const isEmailValid = !emailError && email;
        const isPasswordValid = !passwordError && password;
    
        if (!isEmailValid || !isPasswordValid) {
          if (!email) setEmailError(true);
          if (!password) setPasswordError(true);
          return;
        }
        dispatch(login())
    };
      
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
         <Paper className='p-8 max-w-md w-full shadow-2xl rounded-3xl'>
           <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Login</h1>
           <form onSubmit={handleSubmit}>
             <div className='mb-6'>
             <label class="block text-black-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Email
            </label>
                <TextField
                label="abcd@gmail.com"
                type='email'
                fullWidth
                variant='outlined'
                value={email}
                onChange={handleEmailChange}
                error={emailError}
                helperText={emailError ? "Please enter a valid email address." : ""}
                className='mb-4'
                required
                />
             </div>
             <div className='mb-6'>
             <label class="block text-black-500 font-bold md:text-left mb-1 md:mb-0 pr-4" for="inline-full-name">
                  Password
            </label>
                <TextField
                label='********'
                type='password'
                fullWidth
                variant='outlined'
                value={password}
                onChange={handlePasswordChange}
                error={passwordError}
                helperText={passwordError ? "Password cannot be empty." : ""}
                required
                className='mb-4'
                />
             </div>
             <Button
             type='submit'
             variant='contained'
             color='primary'
             fullWidth
             className='py-2'
             >Login</Button>
           </form>
         </Paper>
    </div>
  )
}

export default Login
