import randomColor from 'randomcolor';

// Gives a similarity score for two hex values
export function hexColorDelta(hex1, hex2) {
  // get red/green/blue int values of hex1
  let r1 = parseInt(hex1.substring(0, 2), 16);
  let g1 = parseInt(hex1.substring(2, 4), 16);
  let b1 = parseInt(hex1.substring(4, 6), 16);
  // get red/green/blue int values of hex2
  let r2 = parseInt(hex2.substring(0, 2), 16);
  let g2 = parseInt(hex2.substring(2, 4), 16);
  let b2 = parseInt(hex2.substring(4, 6), 16);
  // calculate differences between reds, greens and blues
  let r = 255 - Math.abs(r1 - r2);
  let g = 255 - Math.abs(g1 - g2);
  let b = 255 - Math.abs(b1 - b2);
  // limit differences between 0 and 1
  r /= 255;
  g /= 255;
  b /= 255;
  // 0 means opposit colors, 1 means same colors
  return (r + g + b) / 3;
}

// Returns an array of random colors, length given as parameter
// Ensures they are somewhat different from each other
export function randomColors(num) {
  let colors = [];
  for(let i = 0; i < num; i++) {

    let color;
    let tries = 10;
    // Compares a color to the current color. Lint was yelling at me for
    // doing this inside a loop
    let newColorGood = c => {
      if(hexColorDelta(c, color) > .8) {
        return false;
      }
      return true;
    };

    while(tries > 0) {
      // Pick a color, any color
      color = randomColor({ luminosity: 'dark' });

      // Check if this color is different than the rest
      let colorIsUniqueEnough = colors.every(newColorGood);

      // If it is, congrats!
      if(colorIsUniqueEnough) {
        break;
      }
    }

    colors.push(color);
  }
  return colors;
}
