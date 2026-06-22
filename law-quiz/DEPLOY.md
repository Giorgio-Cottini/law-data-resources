# Deploy to Netlify

The app is in this `law-quiz/` folder. Build config is already in `netlify.toml`
(`npm run build` → publish `dist/`). No environment variables.

## 1. Put it on GitHub

From inside `law-quiz/` (it is already a git repo with commits):

```bash
# create an empty repo on github.com first (no README), then:
git remote add origin https://github.com/<you>/law-quiz.git
git branch -M main
git push -u origin main
```

If you'd rather keep this folder inside a larger repo, push that repo instead and
note the subfolder path for step 2 ("Base directory").

## 2. Connect Netlify

1. Log in at https://app.netlify.com → **Add new site** → **Import an existing project**.
2. Pick **GitHub**, authorize, select the `law-quiz` repo.
3. Build settings (Netlify reads `netlify.toml`, so these are pre-filled):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** leave empty if the repo root *is* `law-quiz`; set it to
     `law-quiz` if you pushed a parent repo.
4. **Deploy site.** First build takes ~1 min. Done — you get a `*.netlify.app` URL.

## 3. Updates

Every `git push` to `main` triggers an automatic redeploy. To change questions, edit
`src/questions.json`, keep `npm test` green, commit, push.

## Local check before pushing

```bash
npm install
npm test          # 20 tests should pass
npm run build     # outputs dist/
```
