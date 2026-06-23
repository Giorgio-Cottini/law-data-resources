# Law & Data — Study Resources

Study material for the **Law & Data Science** course (Master's in Data Science),
covering EU and international data law: treaties, the GDPR, the 2020 Data Strategy
package, fundamental rights, and leading case law.

## ▶ [Take the quiz](https://law-and-data-quiz.netlify.app)

Two options are selectable in the initial page:

- Interactive multiple-choice quiz built from the closed exam questions — weighted
  scoring, answer review, shuffling, and a dark/light theme. No install needed.
- Open question generator, with optable suggestions to help structure a response - no scoring mechanism, but shuffling and theme selection abailable. No install Needed

## What's in here

| File                                                       | Contents                                                                                                                                                                                                              |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`summary.pdf`](ResourceHub/summary.pdf)                   | Concept-dense summary of the whole course. Enough to answer every exam question; each legal instrument explained in context.                                                                                          |
| [`laws.pdf`](ResourceHub/laws.pdf)                         | Reference catalogue of every legal instrument cited — international, Council of Europe, EU primary law (treaties + Charter), EU secondary law, the 2020 Data Strategy package, and case law, with articles and dates. |
| [`closed_questions.pdf`](ResourceHub/closed_questions.pdf) | Multiple-choice questions **with answers** (correct ones bold and check-marked; some have several). Same set powers the quiz.                                                                                         |
| [`open_questions.pdf`](ResourceHub/open_questions.pdf)     | Open-ended exam questions, short-essay / discussion format.                                                                                                                                                           |

## How to use them

1. Learn the material from `summary.pdf`.
2. Keep `laws.pdf` open to look up exact instruments, articles, and dates.
3. Drill with the [quiz](https://law-and-data-quiz.netlify.app) or `closed_questions.pdf`.
4. Practice writing with `open_questions.pdf`.

## Running the quiz locally

```bash
cd law-quiz
npm install
npm run dev      # dev server
npm test         # run tests
npm run build    # production build
```

Built with React + Vite, deployed on Netlify.

## Authors

From the master mind of Giorgio Cottini, with generous intellectual and practical assistance from Claude Opus 4.8.

## Author's note

I am not an app developer. I am merely an UI vibe-coder, and i delegate the vast majority of UI-related tasks to LLMs.
Not only that, but I'm also cheap: I'm not really prone to spending money (on top of the pro-plan's 20$) in order to polish a secondary project.

These facts are reflected in the code: the app code is sub-optimal and repetitive, the structure is rushed and flat.

BUT, maybe this is a good thing: if you're unexperienced as I am, you can still create your own websites, apps and UIs. Play with these models, let them help you, do stuff.

Just don't forget that this doesn't make you an app developer. It sure didn't make me one, nor will it.

## License

[MIT](LICENSE) — free to use, share, and adapt with attribution.
