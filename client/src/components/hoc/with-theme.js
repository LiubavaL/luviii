import React from 'react';

import {ThemeContextConsumer} from '../../contexts/ThemeContext';

const withTheme = (Wrapper) => {
    //возвращаем компонент-функцию
    return (props) => (
        <ThemeContextConsumer>
            {({current, onToggle}) => <Wrapper theme={current} onThemeToggle={onToggle} {...props}/>}
        </ThemeContextConsumer>
    );
}

export default withTheme;