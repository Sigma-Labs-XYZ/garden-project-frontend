export async function fetchPlantInfo() {
  const response = await fetch("http://garden-project.sigmalabs.co.uk/plants");
  const data = await response.json();
  return data;
}

export async function addPlantToGarden(plantInfoID, gardenID) {
  console.log(plantInfoID, gardenID);
  await fetch("http://garden-project.sigmalabs.co.uk/new-plant", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantInfoID, gardenID }),
  });
}

export async function addPlantToShoppingList(plantInfoID, gardenID, quantity) {
  console.log(plantInfoID, gardenID, quantity);
  await fetch("http://garden-project.sigmalabs.co.uk/shopping-list", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantInfoID, gardenID, quantity }),
  });
}

export async function harvestPlant(plantID) {
  await fetch("http://garden-project.sigmalabs.co.uk/harvest", {
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantID }),
  });
}

export async function plantPlant(plantID, quantity, date) {
  await fetch("http://garden-project.sigmalabs.co.uk/update-plant-status", {
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantID, quantity, date }),
  });
}

export async function searchFilter(name) {
  const response = await fetch(
    `http://garden-project.sigmalabs.co.uk/plants?name=${name}`
  );
  const json = response.json();
  return json;
}
