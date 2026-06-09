import React, { useContext, useState } from 'react';
import './SignUp.css';
import { userContext } from '../contextApi/Context';
import Loader from '../loader/Loader';
import ErrorToast from '../Error/Error';
import { connectSupabase } from '../supabase/supabase';
const SingUp = () => {
    let {setToogle ,  setRerender , Rerender , DobaraChala, setDobaraChala,} = useContext(userContext)    

    
    
 
  const [isErrorText, setisErrorText] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkLoader, setcheckLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
setcheckLoader(true)
  const { name, email, password, agreeTerms } = formData;

  // 1. Fields validation fix
  if (name.trim() === '' || email.trim() === '' || password.trim() === '' || !agreeTerms) {
    setcheckLoader(false)
    setisErrorText('Please Fill All Inputs Fields & Agree to Terms.');
    return;
  } 

  // 2. Name Length validation
  if (name.length < 3) {
    setisErrorText('Please Name Must be 3 Characters.');
    setcheckLoader(false)
    return;
  }

  // 3. Password length validation
  if (password.length < 8) {
    setisErrorText('Please Password Must be 8 Characters.');
    setcheckLoader(false)
    return;
  }

  try {
    // Purane validations ke errors ko clear karein taaki fresh request jaye
    setisErrorText('');

    // 4. Supabase Auth Sign Up Call
    const { data, error: authError } = await connectSupabase.auth.signUp({
      email,
      password,
      options: {
        // user_metadata mein name save karwane ka standard tarika
        data: {
          full_name: name,
        }
      },
    });

    // AGAR SUPABASE AUTH MEIN ERROR AYE (Most Important Fix)
    if (authError) {
        setcheckLoader(false)
      setisErrorText(authError.message); // Yeh aapke ErrorToast ko trigger karega
      return;
    }

    // 5. Custom Table ('UsersIfo') mein data insert karein
    if (data?.user) {
      const { error: dbError } = await connectSupabase
        .from('UsersIfo')
        .insert([
          {
            id: data.user.id, // Auth user ki unique ID link karein
            name: name,
            email: email,
            createAt: new Date().toTimeString().split(' ')[0],
            agreeTerms : agreeTerms,
          }
        ]);

      if (dbError) {
          setcheckLoader(false)
        setisErrorText(dbError.message);
        return;
      }
      
      
      
      
      // Form fields clear kar sakte hain yahan
    }

  } catch (err) {
    console.error("Unexpected Error:", err);
      setcheckLoader(false)
    setisErrorText("Something went wrong. Please try again.");
  }
  setRerender(!Rerender)
  setDobaraChala(!DobaraChala)
  setcheckLoader(false)
};


if(!checkLoader){



  return (
      <div className="sml-auth-wrapper">
<userContext.Provider value={{ isErrorText, setisErrorText}}>
  {/* Jab jab isErrorText mein kuch likha hoga, yeh component automatic reset hokar chalega */}
  {isErrorText && <ErrorToast />}
</userContext.Provider>
      <div className="sml-auth-container">
        
        {/* Left Side Banner (Dark Slate/Charcoal) */}
        <div className="sml-auth-banner">
          <div className="sml-banner-content">
            <h2>Welcome to<br />SMLibas</h2>
            <p>Discover premium collections tailored to your lifestyle.</p>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="sml-auth-form-section">
          
          {/* Tabs Navigation (Sirf UI ke liye, Register Active hai) */}
          <div className="sml-auth-tabs">
            <button type="button" className="sml-tab-btn" onClick={()=> setToogle(true)}>
              Sign In 
            </button>
            <button type="button" className="sml-tab-btn active">
              Register
            </button>
          </div>

          {/* Static Register Header */}
          <div className="sml-form-header">
            <h3>Create Account</h3>
            <p>Join us today to get started.</p>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="sml-actual-form">
            
            {/* Full Name Input */}
            <div className="sml-input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Muhammad Talha Sheikh"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Email Input */}
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

            {/* Password Input */}
            <div className="sml-input-group sml-password-group">
              <label htmlFor="password">Password</label>
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

            {/* Terms and Conditions Checkbox */}
            <div className="sml-checkbox-group">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
                required
              />
              <label htmlFor="agreeTerms">
                I agree to the <span className="sml-link-text">Terms of Service</span> & <span className="sml-link-text">Privacy Policy</span>
              </label>
            </div>

            {/* Create Account Button */}
            <button type="submit" className="sml-submit-btn">
              Create Account
            </button>

            {/* Bottom Redirect Text */}
            <p className="sml-switch-mode-text">
              Already have an account? <span className="sml-redirect-link" onClick={()=> setToogle(true)}>Log in here</span>
            </p>

          </form>
        </div>

      </div>
    </div>
  )
 } else{
    return(
        <Loader/>
    )
 } 
 
 
};

export default SingUp;