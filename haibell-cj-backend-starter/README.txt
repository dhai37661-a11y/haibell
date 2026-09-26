HAIBELL — CJ BACKEND STARTER

This ZIP adds one Vercel serverless function:
  api/cj/status.js  ->  GET /api/cj/status

WHAT IT DOES
- Calls CJ's Get Access-token endpoint from the server.
- Reports only whether the API key was accepted.
- Never sends the CJ API key or access token back to the browser.

IMPORTANT LIMIT
This is only a secure first connection check. It does NOT yet search/import products, publish selected products, process orders, or connect checkout. Those features require the exact CJ product/order endpoint specifications and more backend code.

INSTALL
1. Extract this ZIP on your computer.
2. Upload the api folder into the ROOT of the existing GitHub repository (the same level as index.html). Do not replace or delete index.html.
3. Commit the upload to main; Vercel should deploy automatically.
4. In Vercel project Settings, open Environment Variables and add:
     Name: CJ_API_KEY
     Value: your newly generated CJ API key
     Environment: Production
   Save it, then redeploy the latest deployment.
5. Test: open https://haibellstore.vercel.app/api/cj/status
   Expected success response: {"connected":true,"message":"CJ API key authorized"}

SECURITY
- A CJ key previously pasted into chat should be revoked. Use a fresh key.
- Never put the key in index.html, GitHub, a public file, or chat.
- Do not upload a .env file with a real key.

CJ API VERSION
This starter uses CJ API v2.0's Get Access-token endpoint. Verify it against the current official CJ documentation before relying on it. Computer internet access was unavailable for a live API test, so this function has not been tested against CJ with your account.
