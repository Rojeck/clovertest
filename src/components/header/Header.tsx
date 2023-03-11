import { FC } from "react";
import { Link } from "react-router-dom";

import logo from '../../resourses/logo.png'

import './header.scss';

const Header: FC = () => {
    return (
        <header className="header">
            <div className="container row">
            <div className="col">
                <img src={logo} alt='logo' className="header__logo" />
            </div>
            <div className="col">
                <nav className="header__nav">
                    <Link className="header__nav-item" to='/'>Home</Link>
                    <Link className="header__nav-item" to='/about'>About</Link>
                </nav>
            </div>
            </div>
        </header>)
}

export default Header;