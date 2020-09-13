import React from 'react';
import './Header.css';

export default ({black}) => {
    return(
        <header className={black ? 'black' : ''}>
            <div className="logo">
                <a href="/">
                    <img src="/assets/img/filmesLogo.png" alt="Logo"/>
                </a>
            </div>
            <div className="user">
                <a href="/">
                    <img src="/assets/img/userLogado.png" alt="Usuario"/>
                </a>
            </div>
        </header>
    )
};

