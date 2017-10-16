import React from 'react';

const GameRoomPreview = ({ 
  dispatch, 
  gameRoom, 
  navigate
}) => {
  let { spectators } = gameRoom;
  return (
    <div className='list-group-item' style={{ color: 'black' }}>
      <h4>Host: { gameRoom.creatorName }</h4>
      <div>
        Spectators: {(spectators ? spectators.join(', ') : '')}
      </div>
      <button onClick={ () => navigate(`/GameRoom/${gameRoom.key}`) }>
        <h3>Join Game</h3> 
      </button>
      <button onClick={ () => navigate(`/Spectate/${gameRoom.key}`) }>
        <h3>Spectate Game</h3>
      </button>
    </div>
  );
};

export default GameRoomPreview;