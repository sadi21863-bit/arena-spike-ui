# Press Counter

A tiny single-page web app with one interactive button that counts presses.

## Run

Zero dependencies, just Node >= 20.

```sh
npm start        # starts the server on http://127.0.0.1:3000 (set PORT to override)
npm test         # runs the test suite (node:test)
```

Open `http://127.0.0.1:3000`, click **Press me**, and watch the counter tick up.

## Endpoints

- `GET /` — serves the single-page app (`public/index.html` + `public/app.js`)
- `GET /health` — returns `{"status":"ok"}`
