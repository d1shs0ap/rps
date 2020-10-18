const Game = require('../../models/game');

function calculateWinner(timeStamps, endTime, playerOneName) {
  let playerOneHand = 'rock';
  let playerOneWinningTime = 0;
  let playerOneLosingTime = 0;
  let playerTwoHand = 'rock';

  for (let i = 0; i < timeStamps.length; ++i) {
    let curStamp = timeStamps[i];
    let timeDiff = 0;
    if (i < timeStamps.length - 1){
      timeDiff = timeStamps[i+1].time - curStamp.time;
    } else {
      timeDiff = endTime - curStamp.time
    }
    
    // keep track of whichever hand was changed
    if (curStamp.player == playerOneName){
      playerOneHand = curStamp.hand;
    } else {
      playerTwoHand = curStamp.hand;
    }

    // check who won in this interval
    if(playerOneHand==='rock') {
      if(playerTwoHand==='paper'){
        playerOneLosingTime += timeDiff;
      }
      else if(playerTwoHand==='scissors'){
        playerOneWinningTime += timeDiff;
      }
    }
    else if(playerOneHand==='paper') {
      if(playerTwoHand==='rock'){
        playerOneWinningTime += timeDiff;
      }
      else if(playerTwoHand==='scissors'){
        playerOneLosingTime += timeDiff;
      }
    }
    else if(playerOneHand==='scissors') {
      if(playerTwoHand==='rock'){
        playerOneLosingTime += timeDiff;
      }
      else if(playerTwoHand==='paper'){
        playerOneWinningTime += timeDiff;
      }
    }
  }

  return [playerOneWinningTime, playerOneLosingTime]

}

module.exports = (io, socket) => {
  socket.on('game over', (uuid) => {
    // Calculate the winner
    Game.findOne({ uuid: uuid }, (err, curGame) => {
      if (err) console.log(err);

      const gameResults = calculateWinner(curGame.timestamps, curGame.endTime, curGame.players[0]);
      
      let winner;
      let winningTime;
      let losingTime;
      
      if(gameResults[0] > gameResults[1]){
        winner = curGame.players[0];

        winningTime = gameResults[0];
        losingTime = gameResults[1];
        
      } else if (gameResults[0] < gameResults[1]) {
        winner = curGame.players[1];

        winningTime = gameResults[1];
        losingTime = gameResults[0];
      } else {
        winner = 'Tie';
        winningTime = gameResults[0];
        losingTime = gameResults[1];
      }
  
      io.in(uuid).emit('winner', winner, winningTime, losingTime);

      // Leave game room
      socket.leave(uuid);
    });
  });
}
