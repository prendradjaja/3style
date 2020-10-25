// Generates a scramble that can be solved by an 8-move pure commutator.

const solver = require('cube-solver');

function main() {
  const facePairs = [['U', 'D'], ['F', 'B'], ['L', 'R']];
  shuffle(facePairs);
  const [interchangeFace, oppositeFace] = shuffle(facePairs.pop());
  const perpendicularFace = randomChoice(facePairs.flat());

  const interchange   = interchangeFace   + randomChoice(["", "2", "'"]);
  const perpendicular = perpendicularFace + randomChoice(["", "'"]);
  const opposite      = oppositeFace      + randomChoice(["", "'"]);

  const insertion = `${perpendicular} ${opposite} ${inverse(perpendicular)}`;

  const comm = shuffle([interchange, insertion]);
  // console.log(pretty(comm));
  // console.log(expand(comm));
  console.log(solver.solve(expand(comm)));
}

function pretty(comm) {
  const [a, b] = comm;
  return `[${a}, ${b}]`;
}

function expand(comm) {
  const [a, b] = comm;
  return `${a} ${b} ${inverse(a)} ${inverse(b)}`;
}

function inverse(alg) {
  return alg.split(' ').reverse().map(inverseMove).join(' ');
}

function inverseMove(move) {
  if (!move.match(/^[UDFBLR]['2]?$/)) {
    throw new Error("Cannot invert invalid move: " + move);
  }

  if (move.length === 1) {
    return move + "'";
  } else if (move.endsWith('2')) {
    return move;
  } else {
    return move.substring(0, 1);
  }
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

main();
