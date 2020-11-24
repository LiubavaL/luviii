import React from 'react';
import themes from '../themes.js';

const {
    Provider: ThemeContextProvider,
    Consumer: ThemeContextConsumer
} = React.createContext(
    {
        current: themes.light,
        onToggle: () => {}
    }
);

export  {
    ThemeContextProvider,
    ThemeContextConsumer
}
