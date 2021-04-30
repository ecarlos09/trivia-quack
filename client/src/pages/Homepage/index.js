import React from 'react';
import logo from '../../images/logo.png';
import planet_left from '../../images/planet-1.png';
import planet_right from '../../images/planet-2.png';

import { NewGame, JoinGame } from '../../layout';
import { HighscoreButton } from '../../components';

const Homepage = () => {
  return (
    <main id="homepage" className="container">
      <img className="logo-img" src={logo} alt="Trivia Duck" />
      <img className="planet-left" src={planet_left} alt="Blue Planet" />
      <img className="planet-right" src={planet_right} alt="Orange Planet" />
      <div className="text-center">
        <NewGame />
        <JoinGame />
        <HighscoreButton />
      </div>
    </main>
  );
};

export default Homepage;