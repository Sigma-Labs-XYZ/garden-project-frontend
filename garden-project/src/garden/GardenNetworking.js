export async function fetchGardenInfo(id) {
  const response = await fetch(
    `https://garden-project.sigmalabs.co.uk/garden/${id}`
  );
  const data = await response.json();
  return data;
}

export async function deletePlant(id) {
  const response = await fetch(`https://garden-project.sigmalabs.co.uk/${id}`, {
    method: "DELETE",
  });
  const res = await response.json();
  return res;
}

export async function updateGarden(name, location, id) {
  const response = await fetch(
    `https://garden-project.sigmalabs.co.uk/garden/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        name: name,
        location: location,
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.json();
}

export async function addGarden(location, garden_name, sessionID) {
  const response = await fetch(
    "http://garden-project.sigmalabs.co.uk/new-garden",
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ location, garden_name, sessionID }),
    }
  );
  const res = await response.json();
  return res;
}
