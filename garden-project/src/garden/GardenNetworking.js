export async function fetchGardenInfo(id) {
  const response = await fetch(
    `http://garden-project.sigmalabs.co.uk/garden/${id}`
  );
  const data = await response.json();
  return data;
}

export async function deletePlant(id) {
    const response = await fetch(`http://garden-project.sigmalabs.co.uk/${id}`, {
    method: "DELETE"
  });
  const res = await response.json()
  return res
}
