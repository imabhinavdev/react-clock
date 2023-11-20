import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

const ThemeState = (props) => {
    const [theme, setTheme] = useState('pinkBody');



    return (
        <ThemeContext.Provider value={{ theme, updateTheme: setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    );
};

export default ThemeState;
