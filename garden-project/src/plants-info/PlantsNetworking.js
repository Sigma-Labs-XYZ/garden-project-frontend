export async function fetchPlantInfo() {
  const response = await fetch("http://garden-project.sigmalabs.co.uk/plants");
  const data = await response.json();
  return data;
}
