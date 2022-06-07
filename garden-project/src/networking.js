export async function validateSession(sessionID) {
  const response = await fetch("https://garden-project.sigmalabs.co.uk/validate-session", {
    method: "POST",
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionID: sessionID,
    }),
  });
  return response.response;
}
