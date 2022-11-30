import React from 'react';
import InfoModal from './Modals/InfoModal';
import PatchModal from './Modals/PatchModal';
import StatsModal from './Modals/StatsModal';
import QuestionModal from './Modals/QuestionModal';
import Daily from './Daily';
import './navBar.css';

const NavBar = () => {
  return (
    <div className="navBar-container">
      <div className="navBar-left">
        <QuestionModal />
        <PatchModal />
      </div>
      <div className="navBar-right">
        <Daily />
        <StatsModal />
        <InfoModal />
      </div>
    </div>
  );
};

export default NavBar;
