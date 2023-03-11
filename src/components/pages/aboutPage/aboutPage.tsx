import { FC } from 'react';
import { Helmet } from "react-helmet";

import './aboutPage.scss';

const AboutPage: FC = () => {
    return (
        <>
            <Helmet>
                <meta name="About page description" content="About page content" />
                <title>About</title>
            </Helmet>
            <div className="about-page">
                <div className="container">
                    <h1 className='about-page__title'>Hey, welcome to a Trello clone built with React.js/Express/Mongo/TS</h1>
                    <ul className='about-page__list'>
                        <li className='about-page__list-item'>Go to the "Home" to view it and start managing your tasks</li>
                        <li className='about-page__list-item'>You can sort your tasks in descending and ascending order</li>
                        <li className='about-page__list-item'>In your board you can create as many cards as you want to help you manage your project tasks</li>
                        <li className='about-page__list-item'>This project has been developed like test project for trainee position at the company 'Clover Dynamics'</li>
                    </ul>
                </div>
            </div></>
    )
}

export default AboutPage;