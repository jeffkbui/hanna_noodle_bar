import React, { useState, useEffect } from 'react';
import './Admin.scss';
import { TextField } from '@material-ui/core';
import { ADMIN_KEY, MAILING_TABLE_NAME, TABLE_LIMIT } from '../../constants/Admin';
import { useEasybase } from 'easybase-react';

export const Admin = ({}) => {
    const [password, setPassword] = useState('');
    const { Frame, sync, configureFrame } = useEasybase();

    useEffect(() => {
        configureFrame({ tableName: MAILING_TABLE_NAME, limit: TABLE_LIMIT });
        sync();
    }, []);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    };

    return (
        <div className='admin-page-main-container'>
            <div className='password-form'>
                {password !== ADMIN_KEY && <TextField id="standard-basic" label="Password" onChange={(item) => handlePasswordChange(item)} />}
                {password === ADMIN_KEY && <div className='mailing-list-body'>
                    {Frame().map((user => <div className='user'>
                        <td className='user-field'>{user.email}</td>
                    </div>))}
                </div>}
            </div>
        </div>
    )
};

export default Admin;