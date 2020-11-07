const cases = require('./cases');
const Cube = require('cubejs');

const SEQUENCE_LENGTH = 4;
const NUM_SEQUENCES = 3;

function main() {
  console.log("Initializing solver...");
  Cube.initSolver();
  console.log("Done.");

  for (let j = 0; j < NUM_SEQUENCES; j++) {
    const selectedCases =
      new Array(SEQUENCE_LENGTH).fill(undefined)
        .map(_ => randomChoice(Object.keys(cases)));

    const solutions = selectedCases.map(letterPair => cases[letterPair]);

    for (let i = 0; i < SEQUENCE_LENGTH; i++) {
      const flip = randomChoice([true, false]);
      if (flip) {
        selectedCases[i] =
          Array.from(selectedCases[i])
            .reverse()
            .join('');
        solutions[i] = Cube.inverse(clean(solutions[i]));
      }
    }

    const cube = new Cube();
    const fullSolution = solutions.join(' ');
    cube.move(clean(fullSolution));
    console.log();
    console.log(cube.solve());
    console.log(selectedCases);
  }
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// cubejs doesn't like R2' etc so change them to R2 etc
function clean(alg) {
  return alg.replace(/2'/g, "2");
}

main();
