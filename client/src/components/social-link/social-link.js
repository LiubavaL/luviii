import React from 'react';

import {HSLAToString} from '../../helpers/ColorHelper'

import './social-link.scss';

const SocialLink = ({to, bg, title, icon, jumping}) => {
    const style= bg ? {backgroundColor: HSLAToString(bg)} : {}

    const getClassNames = function(){
        return `social-link ${jumping ? 'social-link--jumping' : ''}`
    }

    return <a 
        className={getClassNames()}
        href={to} 
        style={style}
        target="_blank"
    >
        <img src={icon} className="social-link__img" alt={title}/>
    </a>
}

export default SocialLink