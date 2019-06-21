import { Game, Card, Symbol, Player } from "./entities";

export const calculateWinner = (player: Player, game: Game): Symbol | null => {
  const opponent = game.players.find(item => item.id !== player.id);
  if (opponent) {
    if (player.score <= 0) {
      return opponent.symbol;
    } else if (opponent.score <= 0) {
      return player.symbol;
    } else return null;
  }
  return null;
};

export const generateRandomCard = (symbol: Symbol): Card => {
  const randomCard = new Card();
  randomCard.symbol = symbol;
  const randomNumber = Math.floor(Math.random() * 100);
  let color = "";
  if (randomNumber <= 20) {
    color = "green";
    randomCard.points = Math.floor(1 + Math.random() * 5);
  } else if (randomNumber <= 70 && randomNumber >= 21) {
    color = "red";
    randomCard.points = Math.floor(1 + Math.random() * 5);
  } else if (randomNumber <= 86 && randomNumber >= 71) {
    color = "blue";
  } else if (randomNumber <= 93 && randomNumber >= 87) {
    color = "black";
    randomCard.points = Math.floor(1 + Math.random() * 15);
  } else if (randomNumber <= 100 && randomNumber >= 94) {
    color = "purple";
    randomCard.points = Math.floor(1 + Math.random() * 15);
  }
  randomCard.color = color;
  return randomCard;
};

export const calculatePoints = (game: Game, player: Player) => {
  const gameStack = game.stack;
  const opponent = game.players.find(item => item.id !== player.id);
  if (opponent) {
    opponent.score = 20;
  }
  player.score = 20;
  let isValid: boolean = true;

  if (!gameStack && !opponent) return null;
  gameStack.map(card => {
    if (!isValid) {
      return (isValid = true);
    } else if (opponent) {
      switch (card.color) {
        case "red":
          if (card.symbol === player.symbol) {
            opponent.score = opponent.score - card.points;
          } else {
            player.score = player.score - card.points;
          }
          break;

        case "green":
          if (card.symbol === player.symbol) {
            player.score = player.score + card.points;
          } else {
            opponent.score = opponent.score + card.points;
          }
          break;

        case "blue":
          isValid = false;
          break;

        case "black":
          if (card.symbol === player.symbol) {
            opponent.score = opponent.score - card.points;
          } else {
            player.score = player.score - card.points;
          }
          break;

        case "purple":
          if (card.symbol === player.symbol) {
            player.score = player.score + card.points;
          } else {
            opponent.score = opponent.score + card.points;
          }
          break;
      }
    }
  });
  player.save();
  opponent && opponent.save();
};
