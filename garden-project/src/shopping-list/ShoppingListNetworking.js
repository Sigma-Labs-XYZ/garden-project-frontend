export async function fetchShoppingList() {
  const response = await fetch(
    "http://garden-project.sigmalabs.co.uk/shopping-list"
  );
  const data = await response.json();
  return data;
}

export async function deleteItem(id) {
  const response = await fetch(
    `http://garden-project.sigmalabs.co.uk/shopping-list/${id}`,
    {
      method: "DELETE",
    }
  );
  const res = await response.json();
  return res;
}

export async function fetchPlantName(id) {
  const response = await fetch(
    `http://garden-project.sigmalabs.co.uk/plants/${id}`
  );
  const name = await response.json();
  return name;
}

export async function patchQuantity(quantity, id) {
  const response = await fetch(
    "http://garden-project.sigmalabs.co.uk/update-quantity",
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
