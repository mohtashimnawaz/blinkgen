# BlinkGen

BlinkGen is a portfolio-grade Next.js app to generate Solana Blinks (social links) that allow donations or ticket purchases directly from the social feed.

Phases:
- Phase 1: Architecture & Data Flow (design)
- Phase 2: Project setup & dependencies (scaffold) ✅
- Phase 3: Implement Action API (GET/POST + transaction build)
- Phase 4: Frontend generator UI & preview
- Phase 5: Validation & deployment

Local dev commands (once dependencies are installed):
- npm run dev

See the project board (TODOs) in the repo for next steps.

## Phase 3 — Action API (completed)

The `/api/actions/donate` endpoint now supports:
- GET: returns ActionGetResponse metadata for Blink Inspector (title, icon, label, description, actions)
- POST: accepts body `{ "account": { "key": "USER_PUBKEY" } }` and returns `{ "serializedTransaction": "base64..." }` (an unsigned transfer transaction that the wallet can sign and submit)

### Testing locally (devnet)

1) GET metadata (example):

```bash
curl "http://localhost:3000/api/actions/donate?to=RecipientPubkeyHere&amount=0.1&label=Donate&title=Event&icon=https://example.com/icon.png"
```

2) POST to get serialized unsigned transaction (example):

```bash
curl -X POST "http://localhost:3000/api/actions/donate?to=RecipientPubkeyHere&amount=0.1&network=devnet" \
  -H 'Content-Type: application/json' \
  -d '{"account":{"key":"YourWalletPubkeyHere"}}'
```

Response:

```json
{
  "serializedTransaction": "<base64-encoded-unsigned-tx>",
  "network": "devnet",
  "to": "RecipientPubkeyHere",
  "amount": "0.1"
}
```

To test in a browser or the Dialect Blink Inspector, you will need a publicly accessible HTTPS URL (see Phase 5 for Vercel deployment instructions).

## Phase 4 — Testing & Deployment Guide

### Local dev with devnet

1. Run the app locally:

```bash
npm install
npm run dev
```

2. Use the generator at `http://localhost:3000/generate` to create a Blink. The generated URL defaults to `network=devnet` for safe testing.

3. Inspect metadata (GET) and request an unsigned transaction (POST) using `curl` (see Phase 3 examples).

4. If you receive a `serializedTransaction` (base64), you can sign & send it from the browser using a wallet provider (example with Phantom-like provider):

```js
import { Transaction } from '@solana/web3.js'

async function signAndSendBase64(base64Tx, provider, connection) {
  const tx = Transaction.from(Buffer.from(base64Tx, 'base64'))
  // Wallet providers typically require feePayer to be set already
  const signed = await provider.signTransaction(tx)
  const sig = await connection.sendRawTransaction(signed.serialize())
  await connection.confirmTransaction(sig)
  return sig
}
```

> Note: Wallet provider APIs differ; consult the wallet docs for the exact sign/send methods.


### Deploy to Vercel (public HTTPS required for Blink Inspectors)

1. Push this repo to GitHub.
2. On Vercel, create a new project and import the repo.
3. Build command: `npm run build` (or the default), Framework: Next.js.
4. No special environment variables required for the simple stateless MVP.
5. After deployment, verify `https://your-deployment.vercel.app/api/actions/donate?to=...&amount=0.1` returns the metadata with a CORS header.

Production notes:
- For production you may want to change the default network to `mainnet-beta` and restrict `Access-Control-Allow-Origin` instead of `*` to your app domain for safety.
- If you later introduce state (tickets, receipts), add API keys and server-side persistence.

---

If you'd like, I can also add automated tests (unit tests for transaction building & integration tests mocking `Connection`) and a GitHub Actions workflow that runs them on push. Let me know which you prefer next.
