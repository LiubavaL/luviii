import React from 'react';

import Link from '../link';
import IconButton from '../icon-button';
import Typography from '../typography';
import SocialLink from '../social-link';
import Select from '../select';

import './footer.scss';

const Footer = ({socials}) => {
    const manuLinks = [
            {title: 'О сайте', link: "/about"},
            {title: 'Правила', link: "/rules"},
            {title: 'Приватность', link: "/privacy"},
            {title: 'Связаться', link: "/contact"}
        ];

    const renderMenuLinks = function(){
        const linksToRender = manuLinks.map(({title, link}) => {
            return <li className='footer__menu-item'>
                <Link to={link} type='footer-nav'>{title}</Link>
            </li>;
        });

        return linksToRender;
    };

    const renderSocialLinks = function(socials){
        if(typeof socials === 'undefined') return null

        const linksToRender = socials.map(({_id, icon, url, color, name}) => {
            return <li 
                key={_id}
                className='footer__social-link' 
            >
                <SocialLink 
                    to={url} 
                    bg={color}
                    title={name}
                    icon={icon}
                    jumping
                />
            </li>
        });

        return linksToRender;
    }

    return (
        <footer className='footer'>
            <div className='footer__social'>
                <div className="footer__social-title">
                    <Typography use="headline2">@Follow me</Typography>
                </div>
                <ul className='footer__social-links'>
                    {renderSocialLinks(socials)}
                </ul>
            </div>

            <div className="footer__main">
                <ul className='footer__menu'>
                    {renderMenuLinks()}
                </ul>

                <div className='footer__copyrights'>© 2019 LUVIIILOVE</div>
            </div>
        </footer>
    );
}

export default Footer;