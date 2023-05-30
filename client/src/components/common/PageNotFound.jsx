import React from 'react';
import {Link} from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () =>{
    
    return(
        <>
        <div style={{color: '#fff'}} className='container-404'>
            <div className="text">
                <div>404!</div>
                <div>Page not found</div>
            </div>
            <div className="go-back-btn">
                <Link to='/'>
                    Take me back!
                </Link>
            </div>
        </div>
        </>
    );
}

export default PageNotFound;