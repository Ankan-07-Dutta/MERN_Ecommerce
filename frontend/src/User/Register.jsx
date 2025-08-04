import React, { useState } from 'react';
import '../UserStyles/Form.css';
import { Link } from 'react-router-dom';


const Register = () => {
    const [user, setUser] = useState({
        name:'',
        email:'',
        password:'',
    })

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState('./images/profile.png')
    const {name, email, password } = user;
  return (
    <div>
        <div className="form-container container">
            <div className="form-content">
                <form className="form">
                    <h2>Sign Up</h2>
                    <div className="input-group">
                        <input 
                        type="text" 
                        placeholder='Username' 
                        name='name'
                        value={name} />
                    </div>
                    <div className="input-group">
                        <input 
                        type="email" 
                        placeholder='Email' 
                        name='email'
                        value={email} />
                    </div>
                    <div className="input-group">
                        <input 
                        type="password" 
                        placeholder='Password' 
                        name='password'
                        value={password} />
                    </div>
                    <div className="input-group avatar-group">
                        <input type="file" name='avatar' className='file-input' accept='image/' />
                        <img src={avatarPreview} alt="Avatar Preview" className='avatar' />
                    </div>
                    <button className="authBtn">Sign Up</button>
                    <p className="form-links">
                        Already have an account ?<Link to="/login">Sign in here</Link> 
                    </p>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register
