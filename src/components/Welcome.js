import React, { useState } from 'react'

const Welcome = () => {

    const [startInfo, setStartInfo] = useState(true)
    const [auth, setAuth] = useState(false)
    const [decline, setDecline] = useState(false)

    const yes = () => {
        setStartInfo(false)
        setAuth(true)
    }

    const no = () => {
        setStartInfo(false)
        setDecline(true)
    }

    const getAuth = () => {
        setDecline(false)
        setAuth(true)
    }

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

        {auth && (
            <div className='block-auth'>

            </div>
            
        )}
    </div>
  )
}

export default Welcome
