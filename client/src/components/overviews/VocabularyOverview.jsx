import React from 'react'
import './overview.css';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const VocabularyOverview = () => {

    const NavbarContents = [];

    const Data = ``;

    return (
        <>
        <section className='overview'>
            <div className="container">
                <Navbar contents={NavbarContents} />
                <div className="main-content">
                    
                </div>
                <Footer/>
            </div>
        </section>
        </>
    )
}

export default VocabularyOverview;