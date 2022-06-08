export async function validateSession(sessionID) {
  const response = await fetch("https://garden-project.sigmalabs.co.uk/validate-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionID: sessionID,
    }),
  });
  const jsonObj = await response.json();
  return jsonObj.response;
}

export async function checkCookiesAndRedirect(navigate) {
  const cookies = document.cookie;
  if (!cookies.includes("session")) navigate("/login");
  else {
    const sessionID = cookies
      .split("; ")
      .find(row => row.startsWith("session="))
      .split("=")[1];

    if (!(await validateSession(sessionID))) navigate("/login");
  }
}
