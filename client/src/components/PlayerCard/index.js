import React from 'react';

const PlayerCard = ({player, icon, ready, username, me}) => {
  return (
    <div className="player-holder">
      <div className="row align-items-center">
        <div className="col-2">
          <img style={{borderRadius: '50px', border : me ? 'solid 4px green' : null}} src={icon} alt="Player Icon"/>
        </div>
        <div className="col-8">
          <h5>{username ? username : 'Guest-' + player} {me && '(you)'}</h5>
        </div>
        <div className="col-2 d-none d-sm-block">
          <span className={ready ? "marker-ready" : "marker-not"}></span>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard;