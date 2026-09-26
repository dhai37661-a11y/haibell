// Vercel serverless function: GET /api/cj/status
// Checks CJ API credentials without ever returning the secret or access token.
// Set CJ_API_KEY in Vercel Environment Variables (never in frontend code).

const TOKEN_URL =
  "https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken";

module.exports = async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ connected: false, error: "Method not allowed" });
  }

  const apiKey = process.env.CJ_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      connected: false,
      error: "CJ_API_KEY is not configured in Vercel Environment Variables",
    });
  }

  try {
    const response = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ apiKey }),
    });

    const payload = await response.json().catch(() => null);
    const accessToken = payload && payload.data && payload.data.accessToken;
    const apiReportedSuccess =
      payload && (payload.result === true || payload.code === 200);

    if (!response.ok || !accessToken || !apiReportedSuccess) {
      // Do not return CJ's full response; it may contain sensitive diagnostic data.
      return res.status(502).json({
        connected: false,
        error: "CJ did not authorize this API key. Check the key and CJ API docs.",
      });
    }

    // The access token is deliberately not returned to the browser.
    return res.status(200).json({ connected: true, message: "CJ API key authorized" });
  } catch (_error) {
    return res.status(502).json({
      connected: false,
      error: "Could not reach CJ API from the Vercel function",
    });
  }
};
