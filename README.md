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
