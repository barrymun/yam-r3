function printScene() {
  let lines = drawCards({});
  lines.forEach(line => console.log(line))
}

function drawCards({n = 3, ...props}) {
  const totalLines = 5;
  let lines = [];

  for (let i = 0; i < totalLines; i++) {
    if (lines[i] == null) lines[i] = '';
    for (let j = 0; j < n; j++) {
      if (i === 0 || i === totalLines - 1) {
        lines[i] += '========== ';
      } else {
        lines[i] += '|        | ';
      }
    }
  }
  return lines;
}

async function Main() {
  printScene()
}

Main();