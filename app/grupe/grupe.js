function getAll() {
  fetch("https://localhost:44360/api/grupe")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed. Status: " + response.status);
      }
      return response.json();
    })
    .then((grupe) => renderData(grupe))
    .catch((error) => {
      console.error("Error:", error.message);

      let table = document.querySelector("table");
      if (table) {
        table.style.display = "none";
      }

      alert("Došlo je do greške, pokušajte ponovo.");
    });
}

function renderData(data) {
  let table = document.querySelector("table tbody");

  table.innerHTML = "";

  let tableHeader = document.querySelector("table thead");
  data.forEach((grupa) => {
    let newRow = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.textContent = grupa.ime;
    newRow.appendChild(cell1);

    let cell2 = document.createElement("td");
    cell2.textContent = new Date(grupa.datumOsnivanja).toLocaleDateString(
      "sr-RS",
      {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      },
    );
    newRow.appendChild(cell2);

    let cell3 = document.createElement("td");
    cell3.style.padding = "0";
    let detaljiBtn = document.createElement("button");
    detaljiBtn.textContent = "Detalji";
    detaljiBtn.addEventListener("click", () => {
      window.location.href = "../korisnici/index.html?id=" + grupa.id;
    });
    cell3.appendChild(detaljiBtn);

    newRow.appendChild(cell3);

    table.appendChild(newRow);
  });
}

document.addEventListener("DOMContentLoaded", getAll);
