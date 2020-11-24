import React from 'react';

const MenuSurfaceAnchor = ({className, children}) => {
    const getClassNames = () => {
        return [`mdc-menu-surface--anchor`, className].filter(Boolean).join(' ');
    }
    return (
        <div className={getClassNames()}>
            {children}
        </div>
    );
}

export default MenuSurfaceAnchor;