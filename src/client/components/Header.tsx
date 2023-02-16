import React from 'react';
import './Header.scss';
import documentPng from '../assets/document.png';
import feedbackPng from '../assets/feedback.png';
import supportPng from '../assets/support.png';


export const Header = () => {
  return (
    <header className="header">
      {/* add drop down image inside button */}
      <button className="header-store-button">
        Zustand Store
        <svg height="20" stroke="white" fill="white" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" className="arrow-down"><path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path></svg>
      </button>
      <div className="header-image-container">
        <a href='https://github.com/oslabs-beta/Zukeeper'><img src={documentPng} alt="Documentation" width='25px'/></a>
        <a href='https://github.com/oslabs-beta/Zukeeper/issues'><img src={feedbackPng} alt="feedback" width='25px'/></a>
        <a href='#'><img src={supportPng} alt="support us" width='25px'/></a> 
      </div>
    </header>
  );
};

