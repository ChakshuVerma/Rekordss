import React from 'react'
import './overview.css';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const VocabularyOverview = () => {

    const NavbarContents = [{ name: 'logout', link: '/logout' }];
    console.log("hi");
  return (
    <>
    <section>
        <div className="container">
            <Navbar contents={NavbarContents} />
            <Footer/>
        </div>
    </section>
    </>
  )
}

export default VocabularyOverview;