[![npm](https://img.shields.io/npm/v/rabonajs)](https://www.npmjs.com/package/rabonajs)

<img width="250" alt="Screen Shot 2022-06-09 at 23 16 45" src="https://user-images.githubusercontent.com/812622/172951243-7b294967-7326-40dc-8f8d-cf194cca5510.png">

## RabonaJS - A Javascript library for football/soccer visualisations

**RabonaJS** is a simple D3 wrapper to make soccer visualisations

## Usage

##### ⚠️Currently it is on alpha stage, supports only a few features ⚠️

On npm, you can find it as `rabonajs`.

Add `rabonajs` and its peer dependencies to your project:

```bash
# using yarn
yarn add rabonajs

# using npm
npm install rabonajs
```

# Examples

### Create a football pitch

```typescript
import Rabona from 'rabonajs';

const pitchOptions = {
  height: 80,
  width: 120,
  padding: 100,
  linecolour: '#ffffff',
  fillcolour: '#7ec850',
};

const pitch = Rabona.pitch('pitch', pitchOptions);
```

```html
<div id="pitch" />
```

<img width="734" alt="Screen Shot 2022-06-10 at 00 03 58" src="https://user-images.githubusercontent.com/812622/172945125-be67346f-561a-4c0e-b467-ca638b3b4ae7.png">

### Create a Layer and show passes from free StatsBomb data

```typescript
import Rabona from 'rabonajs';

const competitionId = 43;
const seasonId = 3;
const response = await fetch(
  'https://raw.githubusercontent.com/statsbomb/open-data/master/data/matches/' +
    competitionId +
    '/' +
    seasonId +
    '.json',
);
const sampleMatches = await response.json();
const passResponse = await fetch(
  'https://raw.githubusercontent.com/statsbomb/open-data/master/data/events/' +
    sampleMatches[1].match_id +
    '.json',
);
const _passes = await passResponse.json();
const passes = _passes
  .filter((event: any) => event.type.name === 'Pass')
  .map((pass: any) => ({
    startX: pass.location[0],
    startY: pass.location[1],
    endX: pass.pass.end_location[0],
    endY: pass.pass.end_location[1],
    length: pass.pass.length,
    angle: pass.pass.angle,
  }));

const ballMovement = Rabona.layer({
  type: 'pass',
  data: matchData,
  options: {},
}).addTo(pitch);
```

![Screen Shot 2022-06-10 at 00 26 56](https://user-images.githubusercontent.com/812622/172948262-225d96d9-5006-4872-9b22-ebfb9ba7d9b5.png)

## Docs

![Screen Shot 2022-12-26 at 01 40 49](https://user-images.githubusercontent.com/812622/209483853-c1382e85-4edf-42df-9640-a7ae60d82e43.png)

You can find the docs and examples here.

(https://orabazu.github.io/rabonajs-docs/)

## Contributing

Feel free to open a PR or an issue.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit messages.
When you install the dependencies, husky will run a pre-commit hook to check if your commit message is valid.
To make your life easier you can use commitizen which is already installed as a dev dependency.
To use it, run `npx cz` instead of `git commit` and follow the instructions.

## Shoutouts 🙏

- (https://soccermatics.readthedocs.io/en/latest/index.html)
- (https://www.youtube.com/@McKayJohns)
