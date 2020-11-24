import React from 'react';

import Typography from '../typography';

import './separator.scss';

const Separator = ({label}) => {
    return (
        <div className="separator">
            {label && <div className="separator__label">
                <Typography use="overline">{label}</Typography>
            </div>}
        </div>
    );
}

export default Separator;