export async function fetchGardenInfo(id) {
  const response = await fetch(
    `http://garden-project.sigmalabs.co.uk/garden/${id}`
  );
  const data = await response.json();
  return data;
}
