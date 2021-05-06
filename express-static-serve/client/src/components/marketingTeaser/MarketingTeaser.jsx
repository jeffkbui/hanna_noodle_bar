import React, { useState } from 'react';
import './MarketingTeaser.scss';
import hannaLogo from '../../images/hanna-main-logo-transparent.png';
import { TextField, Button } from '@material-ui/core';
import ClassNames from 'classnames';
import { useEasybase } from 'easybase-react';
import { validateEmail } from '../../utils/Utils';

export const MarketingTeaser = ({isMobile}) => {
    const [userEmail, setUserEmail] = useState('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [successSubscribe, setSuccessSubscribe] = useState(false);
    const { Frame, sync } = useEasybase();

    const handleEmailChange = (e) => {
        setUserEmail(e.target.value);
    }

    const handleSignUpClick = () => {
        if (validateEmail(userEmail)) {
            Frame().push({
                email: userEmail
            });
            sync();
            setInvalidEmail(false);
            setSuccessSubscribe(true);
        } else {
            setInvalidEmail(true);
        }
    }

    return (
        <div className={ClassNames('marketing-teaser-main-container', {isMobile})}>
            <img className='hanna-logo' src={hannaLogo} alt='Hanna Noodle Bar'/>
            <div className='email-section'>
                <div className='header'>Get notified when we launch</div>
                <div className='input-section'>
                    <TextField id="standard-basic" label="Email Address" onChange={(item) => handleEmailChange(item)} />
                    <Button variant="contained" color="primary" onClick={handleSignUpClick}>Sign Up</Button>
                </div>
                {invalidEmail && <span className='invalid-email-msg'>Please enter a valid email address.</span>}
                {successSubscribe && <span className='success-msg'>Thank you for signing up!</span>}
                <div className={ClassNames('coming-soon', {hasMsg: (invalidEmail || successSubscribe)})}>COMING SOON</div>
            </div>
        </div>
    )
};

export default MarketingTeaser;