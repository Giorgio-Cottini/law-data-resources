# Law & Data Closed Questions Quiz

Driving-license-style practice quiz for the Law & Data closed questions.

## Develop

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Build

```bash
npm run build   # outputs to dist/
```

## Deploy (Netlify)

Push this folder to a GitHub repo and connect it in Netlify. Build settings come
from `netlify.toml` (`npm run build`, publish `dist`). No environment variables.

## Data

All 29 questions live in `src/questions.json`, extracted from
`closed_questions/closed_questions.tex` (the source of truth). To update, edit the
JSON and keep the test in `src/lib/questions.test.js` green.
