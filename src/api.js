export const updateVote = async (itemId, votes) => {
  // http://127.0.0.1:5000/menu-items
  // https://findmyfood.pythonanywhere.com/menu-items

  console.log(votes)
  fetch("https://findmyfood.pythonanywhere.com/menu-items", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "updateVote", itemId: itemId, votes: votes })
  })
    .then(res => res.json())
    .then(responseData => {
      console.log("Vote has been updated: ", responseData)
    })
    .catch(error => {
      console.error("Error sending vote data:", error);
    });
}
export const fetchMenuItems = async (halls, meal) => {
  console.log("fetching")
  // http://127.0.0.1:5000/menu-items
  // https://findmyfood.pythonanywhere.com/menu-items
  const response = await fetch("https://findmyfood.pythonanywhere.com/menu-items", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "fetchMenu", halls, meal }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const fetchByName = async (halls, name, meal) => {
  console.log("fetching")
  // http://127.0.0.1:5000/menu-items
  // https://findmyfood.pythonanywhere.com/menu-items
  const response = await fetch("https://findmyfood.pythonanywhere.com/menu-items", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: "fetchByName", halls, name, meal }),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
