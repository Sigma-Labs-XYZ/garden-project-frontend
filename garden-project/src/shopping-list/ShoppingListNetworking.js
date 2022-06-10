export async function fetchShoppingList(id) {
  const response = await fetch(
    `https://garden-project.sigmalabs.co.uk/shopping-list/${id}`
  );
  const data = await response.json();
  return data;
}

export async function deleteItem(id) {
  const response = await fetch(
    `https://garden-project.sigmalabs.co.uk/shopping-list/${id}`,
    {
      method: "DELETE",
    }
  );
  const res = await response.json();
  return res;
}

export async function fetchPlantName(id) {
  const response = await fetch(
    `https://garden-project.sigmalabs.co.uk/plants/${id}`
  );
  const name = await response.json();
  return name;
}

export async function patchQuantity(quantity, id) {
  const response = await fetch(
    "https://garden-project.sigmalabs.co.uk/update-quantity",
    {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity, id }),
    }
  );
  const res = await response.json();
  return res;
}

export async function patchBought(bought, id) {
  const response = await fetch(
    "https://garden-project.sigmalabs.co.uk/update-bought",
    {
      method: "PATCH",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bought, id }),
    }
  );
  const res = await response.json();
  return res;
}
