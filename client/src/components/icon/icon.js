import React from 'react';

import './icon.scss';

const Icon = React.forwardRef(({src, size = 'm', className, tag = 'i', ...rest}, ref) => {
    if(!src){
        return null;
    }

    const getClassNames = () => {
        return [
            `icon material-icons icon--size_${size}`, 
            className].filter(Boolean).join(' ');
    };

    const renderIcon = (iconSrc) => {
        return (typeof iconSrc === "string") ? 
            <Tag 
                className={getClassNames()} 
                ref={ref} 
                {...rest}>
                    {iconSrc}
            </Tag> 
            : React.cloneElement(iconSrc, {className, ...rest});
    };

    const Tag = `${tag}`,
        iconToRender = renderIcon(src); 

    return iconToRender;
})

export default Icon;