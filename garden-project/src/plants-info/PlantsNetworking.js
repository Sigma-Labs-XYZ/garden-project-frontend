export async function fetchPlantInfo() {
  const response = await fetch("http://garden-project.sigmalabs.co.uk/plants");
  const data = await response.json();
  return data;
}

export async function addPlantToGarden(plantInfoID, gardenID) {
  console.log(plantInfoID, gardenID);
  const response = await fetch(
    "http://garden-project.sigmalabs.co.uk/new-plant",
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plantInfoID, gardenID }),
    }
  );
  console.log(await response.json());
}

export async function searchFilter(name) {
  const response = await fetch(
    `http://garden-project.sigmalabs.co.uk/plants?name=${name}`
  );
  const json = response.json();
  return json;
}
