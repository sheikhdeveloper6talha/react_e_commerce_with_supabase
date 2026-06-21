import React, { useContext, useState } from 'react';
import './Login.css';
import { connectSupabase } from '../supabase/supabase';
import ErrorToast from '../Error/Error';
import { userContext } from '../contextApi/Context';
import Loader from '../loader/Loader';
const LoginForm = () => {
   let {setToogle ,  setRerender , Rerender , DobaraChala, setDobaraChala, GoToLogin} = useContext(userContext)    
    
let [isErrorText , setisErrorText] = useState('')
let [checkLoader , setcheckLoader] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '', // Prefilled as per your screenshot
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setcheckLoader(true)
    const { data : UsersIbfo , error } = await connectSupabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password,
  })
   if(error){
setisErrorText(error.message)
    setcheckLoader(false)

   }else{
    console.log(UsersIbfo.user.id);
    
   const { error } = await connectSupabase
  .from('UsersIfo')
  .update({ agreeTerms: true })
  .eq('id', UsersIbfo.user.id)
    
    
   setRerender(!Rerender)
   setDobaraChala(!DobaraChala)
   GoToLogin()
   setcheckLoader(false) 
}  
};
if(!checkLoader){


  return (
    <div className="sml-login-wrapper">
      
      <userContext.Provider value={{ isErrorText, setisErrorText}}>
  {/* Jab jab isErrorText mein kuch likha hoga, yeh component automatic reset hokar chalega */}
  {isErrorText && <ErrorToast />}
</userContext.Provider>
      <div className="sml-login-container">
        
        {/* Left Side Banner */}
        <div className="sml-login-banner">
          <div className="sml-banner-content">
            <h2>Welcome to<br />SMLibas</h2>
            <p>Discover premium collections tailored to your lifestyle.</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="sml-login-form-section">
          
 {/* Tabs Navigation (Sirf UI ke liye, Register Active hai) */}
          <div className="sml-auth-tabs">
            <div className='btnTab'>

            <button type="button" className="sml-tab-btn  active">
              Sign In
            </button>
            <button type="button" className="sml-tab-btn " onClick={()=> setToogle(false)}>
              Register
            </button>
            </div>
            <div className='close'>
            <h3 onClick={()=> GoToLogin()}>✕</h3>
            </div>
          </div>


          {/* Header Typography */}
          <div className="sml-form-header">
            <h3>Welcome Back</h3>
            <p>Please enter your account details.</p>
          </div>

          {/* Actual Login Form */}
          <form onSubmit={handleSubmit} className="sml-actual-form">
            
            {/* Email Address */}
            <div className="sml-input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="sheikhdeveloper6@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Password with Inline Forgot Link */}
            <div className="sml-input-group">
              <div className="sml-label-row">
                <label htmlFor="password">Password</label>
                <a href="#forgot" className="sml-forgot-link">Forgot?</a>
              </div>
              <div className="sml-password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button
                  type="button"
                  className="sml-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="sml-submit-btn">
              Sign In
            </button>

            {/* Bottom Toggle Text */}
            <p className="sml-switch-mode-text">
              Don't have an account? <span onClick={()=> setToogle(false)}>Sign up now</span>
            </p>

          </form>
        </div>

      </div>
    </div>
  );}else{
    return (
      <Loader/>
    )
  }
};

export default LoginForm;