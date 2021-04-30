import React from 'react';
import { getIcon } from '../../actions/getIcon'

const ScoreView = ({players}) => {

  const generateTable = players.map((player, index) => {
    if (index >= 3) {
      return (
        <div class="table-place">
          <img src={getIcon(player.icon)} alt="Player Icon" />
          <span>{index + 1}</span>
          <h5>{player.name}</h5>
          <p>{player.count}</p>
        </div>
      );
    }
  });

  return (
    <div className="scoreview text-center">
      <div className="row">
        { players[0] ?
          <div class="first-place col-sm-4">
            <img src={getIcon(players[0].icon)} alt="Player Icon" />
            <span>1</span>
            <h5>{players[0].name}</h5>
            <p>{players[0].count}</p>
          </div>
          :
          <></>
        }
        { players[1] ?
          <div class="second-place col-sm-4">
            <img src={getIcon(players[1].icon)} alt="Player Icon" />
            <span>2</span>
            <h5>{players[1].name}</h5>
            <p>{players[1].count}</p>
          </div>
          :
          <></>
        }
        { players[2] ?
          <div class="third-place col-sm-4">
            <img src={getIcon(players[2].icon)} alt="Player Icon" />
            <span>3</span>
            <h5>{players[2].name}</h5>
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