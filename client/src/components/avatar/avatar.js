import React from 'react';

import './avatar.scss';

const Avatar = ({src = '/images/default_avatar.png'}) => {
    return  <img src={src} className="avatar" />;
}

export default Avatar;