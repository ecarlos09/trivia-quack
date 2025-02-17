import React from 'react';
import { ScoreView } from '../../components';

import icon1 from '../../images/player-1.png';
import icon2 from '../../images/player-2.png';
import icon3 from '../../images/player-3.png';
import icon4 from '../../images/player-4.png';
import icon5 from '../../images/player-5.png';
import icon6 from '../../images/player-6.png';
import icon7 from '../../images/player-7.png';
import icon8 from '../../images/player-8.png';
import icon9 from '../../images/player-9.png';
import icon10 from '../../images/player-10.png';

const fakePlayers = ["123123", "213424", "234234", "234345"];
const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10];

const players = [
  {
    player: "123",
    icon: icon1,
    score: "95%",
  },
  {
    player: "124",
    icon: icon2,
    score: "90%",
  },
  {
    player: "125",
    icon: icon3,
    score: "85%",
  },
  {
    player: "125",
    icon: icon3,
    score: "85%",
  },
  {
    player: "125",
    icon: icon3,
    score: "85%",
  },
  {
    player: "125",
    icon: icon3,
    score: "85%",
  },
  {
    player: "125",
    icon: icon3,
    score: "85%",
  },
  {
    player: "125",
    icon: icon3,
    score: "85%",
  }
]

const Highscore = () => {
  return (
    <main id="highscore" className="container">
      <h1>Highscores</h1>
      <ScoreView players={players}/>
    </main>
  );
}

export default Highscore;