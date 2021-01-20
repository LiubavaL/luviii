import React from 'react';

import {HSLAToString} from '../../helpers/ColorHelper'

import './social-link.scss';

const SocialLink = ({url, color, title, icon, jumping}) => {
    const style= color ? {backgroundColor: HSLAToString(color)} : {}

    const getClassNames = function(){
        return `social-link ${jumping ? 'social-link--jumping' : ''}`
    }

    return <a 
        className={getClassNames()}
        href={url} 
        style={style}
        target="_blank"
    >
        <img src={icon} className="social-link__img" alt={title}/>
    </a>
}

export default SocialLink