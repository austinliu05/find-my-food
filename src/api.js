export const updateVote = async (itemId, votes) => {
  console.log(votes)
  // http://127.0.0.1:5000/menu-items
  // https://apoxie.pythonanywhere.com/menu-items
  fetch("https://apoxie.pythonanywhere.com/menu-items", {
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
  // http://127.0.0.1:5000/menu-items
  // https://apoxie.pythonanywhere.com/menu-items
  const response = await fetch("https://apoxie.pythonanywhere.com/menu-items", {
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
