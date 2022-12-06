import React from 'react';
import InfoModal from './Modals/InfoModal';
import PatchModal from './Modals/PatchModal';
import StatsModal from './Modals/StatsModal';
import QuestionModal from './Modals/QuestionModal';
import Daily from './Daily';
import './navBar.css';

const NavBar = ({ history }) => {
  return (
    <div className="navBar-container">
      <div className="navBar-left">
        <QuestionModal />
        <PatchModal />
      </div>
      <div className="navBar-right">
        <Daily history={history} />
        <StatsModal history={history} />
        <InfoModal />
      </div>
    </div>
  );
};

export default NavBar;
