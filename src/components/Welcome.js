import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import auth from '../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

const Welcome = () => {

    const [startInfo, setStartInfo] = useState(true);
    const [decline, setDecline] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [signUp, setSignUp] = useState(false);
    const [activeInput, setActiveInput] = useState(null);
    const [passError, setPassError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [login, setLogin] = useState(false)

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');

    const nav = useNavigate();

    const yes = () => {
        setStartInfo(false);
        setSignUp(true);
    };
    const no = () => {
        setStartInfo(false);
        setDecline(true);
    };
    const getAuth = () => {
        setDecline(false)
        setSignUp(true)
    };
    const linkLogin = () => {
        setSignUp(false)
        setSignIn(true)
    };
    const linkReg = () => {
        setSignIn(false)
        setSignUp(true)
    };

    const register = async(e) => {
        e.preventDefault()
        if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(pass)){
            setPassError(true);
            return;
        }else{
            setPassError(false)
        }            
        if(!/^[A-Za-z\s]+$/.test(name)) {
            setNameError(true); 
            return;
        }else{
            setNameError(false)
        }
        try{
            await createUserWithEmailAndPassword(auth, email, pass)
            console.log('Успіх')
            nav('/account')
        }catch (error){
            console.error(error)
        }
    };

    const enter = async(e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, pass);
            nav('/account')
            setLogin(false)
        }catch(error){
            console.error(error)
            setLogin(true)
        }
    };

  return (
    <div className='wrapper'>
        {startInfo && (
            <div className='block-input'>
                <h1 className='block-input-title'>Weather App</h1>
                <p className='block-input-description'>Hello, me and with the help of me you can check the weather. To do this, just register / log in, select a city and you will see the weather. You can choose as many cities as you need, and delete them as well.</p>
                <p className='block-input-question'>Are you ready?</p>
                <div className='block-input-btn'>
                    <button className='block-input-btn-no' onClick={no}></button>
                    <button className='block-input-btn-yes' onClick={yes}></button>  
                </div>
            </div>            
        )}

        {decline && (
            <div className='block-decline'>
                <div className='block-decline-img'></div>
                <p className='block-decline-text'>You are boring... I hope today you will guess with the weather, and if not, you can always find out by remembering about me. Maybe we can continue?</p>
                <button className='block-decline-btn-yes' onClick={getAuth}></button>
            </div>
        )}

        {signUp && (
            <form className='block-signUp' onSubmit={register}>
                <p className='block-signUp-title'>Please create your account. If you already exist account: <p className='block-signUp-title-link' onClick={linkLogin}>signIn</p></p>
                <div className='block-signUp-enter'>
                    <div>
                        
                        <input 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Please enter your email'
                            onFocus={() => setActiveInput('email')}
                            className={`block-signUp-email ${activeInput === 'email' ? 'active' : ''}`}
                            type='email'
                        ></input>
                    </div>
                    <div>
                        {passError && <p className='error'>Please, enter password using 1 upper and lowercase sumbols and numbers. Minimal length 6 sumbols.</p>}
                        <input
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            placeholder='Please enter your pass'
                            onFocus={() => setActiveInput('pass')}
                            className={`block-signUp-pass ${activeInput === 'pass' ? 'active' : ''}`}
                            type='password'
                        ></input>
                    </div>
                    <div>
                        {nameError && <p className='error'>Please, enter name withouth number</p>}
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='Please enter your name'
                            onFocus={() => setActiveInput('name')}
                            className={`block-signUp-name ${activeInput === 'name' ? 'active' : ''}`}
                            type='text'
                        ></input>
                    </div>
                </div>
                <button className='block-signUp-submit' type='submit'>SignUp</button>
            </form>
        )}

            {signIn && (
                <form className='block-signIn' onSubmit={enter}>
                    <p className='block-signIn-title'>Please authorizztion in you'r accout. If you don't have account: <p className='block-signUp-title-link' onClick={linkReg}>signUp</p></p>
                        <div className='block-signIn-enter'>
                            <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Please enter your email'
                                onFocus={() => setActiveInput('email')}
                                className={`block-signIn-email ${activeInput === 'email' ? 'active' : ''}`}
                                type='email'
                            ></input>
                            {login && <p className='error-login'>Account not found</p>}
                            <input
                                value={pass}
                                onChange={(e) => setPass(e.target.value)}
                                placeholder='Please enter your pass'
                                onFocus={() => setActiveInput('pass')}
                                className={`block-sigIn-pass ${activeInput === 'pass' ? 'active' : ''}`}
                                type='password'
                            ></input>
                        </div>
                        
                    <button className='block-signIn-submit' type='submit'>SignIn</button>
                </form>
            )}
    </div>
  )
}

export default Welcome
