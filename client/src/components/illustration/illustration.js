import React from 'react';
import './illustration.scss';


const Illustration  = ({fixedHeight = false, onError,  ...rest}) => {
    let styles = null;

    const handleError = () => {
        console.error('Error occured while loading image')
        // img.src = '/public/default.png';
        onError();
    };

    if(fixedHeight){
        styles = {
            height: "300px",
            width: "auto"
        }
    }

    return <img 
        className="illustration" 
        style={styles} 
        onError={handleError}
        {...rest} />;
}

export default Illustration;