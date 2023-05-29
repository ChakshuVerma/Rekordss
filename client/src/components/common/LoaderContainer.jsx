import React from 'react';
import LoadingGIF from '../../resources/loading_gif.gif';

const LoaderContainer = () =>{
    const containerStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    }
    return(
        <>
            <div className="loader-container" style={containerStyle}>
                <img src={LoadingGIF} alt="loader"/>
            </div>
        </>
    );

}

export default LoaderContainer;