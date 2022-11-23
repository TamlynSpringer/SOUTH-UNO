const buildDeck = () => {
  const cardData = {colors:['blue', 'green', 'yellow', 'red'], values:['0', '1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8', '9', '9', 'rotate', 'skip', '+2', 'rotate', 'skip', '+2']}
  cardData.colors.forEach(function(color) {
    cardData.values.forEach(function(value) {
      deck.push(`{Numbers:${value}, Color:${color}}`);
    });
  });
  
  deck.sort(() => {
        return Math.random() - 0.5;
    }) 
  };
export default buildDeck();