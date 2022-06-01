export async function fetchGardenInfo(id) {
  const response = await fetch(`http://localhost:8080/garden/${id}`);
  const data = await response.json();
  return data;
}
