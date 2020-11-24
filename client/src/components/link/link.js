import React from 'react';

import {Link as RouteLink} from 'react-router-dom';

import './link.scss';

const Link = ({label, children, type, accentuated, ...rest}) => {
    const getClassNames = function() {
        const typeClass = (!!type) ? ` link--type_${type}` : '',
            accentuatedClass = (!!accentuated) ? ` link--accentuated` : '',
            classNames = `link${typeClass}${accentuatedClass}`;

        return classNames;
    };

    return <RouteLink
                aria-current="page" 
                // tabIndex={!index ? 0 : undefined}
                className={getClassNames()}
                {...rest}
            >{label}{children}</RouteLink>;
}

export default Link;