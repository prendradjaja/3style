const cases = require('./cases');
const Cube = require('cubejs');

const SEQUENCE_LENGTH = 4;

function main() {
  // console.log("Initializing solver...");
  Cube.initSolver();
  // console.log("Done.");

  const result = [
    // {
    //   setup,
    //   comms: Array<{
    //     letterPair,
    //     solution
    //   }>
    // }
  ];

  const x = shuffle(Object.keys(cases));

  while (x.length) {
    const selectedCases = x.splice(0, 4);

    const solutions = selectedCases.map(letterPair => cases[letterPair]);

    for (let i = 0; i < selectedCases.length; i++) {
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
    result.push({
      setup: cube.solve(),
      comms: selectedCases.map((letterPair, i) => ({
        letterPair,
        solution: solutions[i]
      }))
    });
  }

  for (let item of result) {
    console.log('// ' + item.setup);
    console.log('// ' + item.comms.map(x => x.letterPair).join(' '));
    console.log();
  }

  for (let item of result) {
    console.log(item.setup);
    for (let comm of item.comms) {
      console.log(`${comm.solution} // ${comm.letterPair}`);
    }
    console.log();
  }
}

function randomChoice(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}


// cubejs doesn't like R2' etc so change them to R2 etc
function clean(alg) {
  return alg.replace(/2'/g, "2");
}

main();
