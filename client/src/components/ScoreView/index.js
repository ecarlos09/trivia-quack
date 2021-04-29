import React from 'react';
import { getIcon } from '../../actions/getIcon'

const ScoreView = ({players}) => {

  console.log(getIcon());

  const generateTable = players.map((player, index) => {
    if (index >= 3) {
      return (
        <div class="table-place">
          <img src={getIcon()} alt="Player Icon" />
          <span>{index + 1}</span>
          <h5>Guest-{player.name}</h5>
          <p>{player.count}</p>
        </div>
      );
    }
  });

  return (
    <div className="scoreview text-center">
      <div className="row">
        { players[1] ?
          <div class="second-place col-sm-4">
            <img src={getIcon()} alt="Player Icon" />
            <span>2</span>
            <h5>Guest-{players[1].name}</h5>
            <p>{players[1].count}</p>
          </div>
          :
          <></>
        }
        { players[0] ?
          <div class="first-place col-sm-4">
            <img src={getIcon()} alt="Player Icon" />
            <span>1</span>
            <h5>Guest-{players[0].name}</h5>
            <p>{players[0].count}</p>
          </div>
          :
          <></>
        }
        { players[2] ?
          <div class="third-place col-sm-4">
            <img src={getIcon()} alt="Player Icon" />
            <span>3</span>
            <h5>Guest-{players[2].name}</h5>
            <p>{players[2].count}</p>
          </div>
          :
          <></>
        }
      </div>
      { generateTable }
    </div>
  )
}

export default ScoreView;