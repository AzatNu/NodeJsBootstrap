document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;

    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  } else if (event.target.dataset.type === "edit") {
    event.target.closest("li").querySelector(".edit-buttons").style.display =
      "flex";
    event.target.closest("li").querySelector(".main-buttons").style.display =
      "none";
      event.target.closest("li").querySelector("input").disabled = false
  }

  if (event.target.dataset.type === "save") {
    event.target.closest("li").querySelector(".edit-buttons").style.display =
    "none";
    event.target.closest("li").querySelector(".main-buttons").style.display =
      "flex";
    const title = event.target.closest("li").querySelector("input").value;
    const id = event.target.dataset.id;

    update(id, title).then(() => {
      const span = event.target.closest("li").querySelector("span");
      if (span) {
        span.textContent = title;
      }
    })

      event.target.closest("li").querySelector("input").disabled = true
} else if (event.target.dataset.type === "cancel") {
    event.target.closest("li").querySelector(".edit-buttons").style.display =
      "none";
    event.target.closest("li").querySelector(".main-buttons").style.display =
      "flex";
      event.target.closest("li").querySelector("input").disabled = true
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function update(id, title) {
await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

}
