export async function fetchPlantInfo(
  name,
  classification = undefined,
  timeUntilHarvest = undefined,
  spacing = undefined
) {
  let path = "https://garden-project.sigmalabs.co.uk/plants";

  let firstFilterAdded = false;
  const addFilterChar = () => {
    if (!firstFilterAdded) {
      path += "?";
      firstFilterAdded = true;
    } else path += "&";
  };

  if (name) {
    addFilterChar();
    path += `name=${name}`;
  }
  if (classification) {
    addFilterChar();
    path += `classification=${classification}`;
  }
  if (timeUntilHarvest) {
    addFilterChar();
    path += `timeUntilHarvest=${timeUntilHarvest}`;
  }
  if (spacing) {
    addFilterChar();
    path += `spacing=${spacing}`;
  }

  const response = await fetch(path);
  const data = await response.json();
  return data;
}

export async function addPlantToGarden(plantInfoID, gardenID) {
  const response = await fetch("https://garden-project.sigmalabs.co.uk/new-plant", {
    method: "POST",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantInfoID, gardenID }),
  });
}

export async function harvestPlant(plantID) {
  await fetch("https://garden-project.sigmalabs.co.uk/harvest", {
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantID }),
  });
}

export async function plantPlant(plantID, quantity, date) {
  await fetch("https://garden-project.sigmalabs.co.uk/update-plant-status", {
    method: "PATCH",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ plantID, quantity, date }),
  });
}
