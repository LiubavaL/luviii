import React from 'react';

import Typography from '../../typography';
import Link from '../../link';

import './404-page.scss';

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <div className="not-found-page__content">
                <Typography use="headline1" theme="light" className="not-found-page__code">404</Typography>
                <div className="not-found-page__desc">
                    <Typography use="headline3"  theme="light">Oops, the page is gone</Typography>
                    <Typography theme="light">Take me back to <Link to="/" className="not-found-page__link">luviii.love</Link></Typography>
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;