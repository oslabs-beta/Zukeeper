import React from 'react';
import './Header.scss';
// import documentPng from '../assets/document.png';
// import feedbackPng from '../assets/feedback.png';
// import supportPng from '../assets/support.png';


export const Header = () => {
  return (
    <header className="header">
      {/* add drop down image inside button */}
      <button className="header-store-button">Zustand Store</button>
      <div className="header-image-container">
        {/* <a href='https://github.com/oslabs-beta/Zukeeper'><img src="../assets/document.png" alt="Documentation" /></a>
        <a href='https://github.com/oslabs-beta/Zukeeper/issues'><img src="../assets/feedback.png" alt="Feedback" /></a>
        <a href='#'><img src="../assets/support.png" alt="Support Us"/></a> */}
        {/* <img src={../assets/feedback.png} alt="Feedback" /> */}
        <div>X</div>
        <div>X</div>
        <div>X</div>
      </div>
    </header>
  );
};

