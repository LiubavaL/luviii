import React from 'react';

import './logo.scss';

const Logo = ({size = 'm'}) => {
    return <span className={`logo logo--size_${size}`}>luviiilove</span>;
}

export default Logo;