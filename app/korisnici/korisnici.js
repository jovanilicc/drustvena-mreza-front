function getAll() {
  fetch("https://localhost:44360/api/korisnici")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed. Status: " + response.status);
      }
      return response.json();
    })
    .then((korisnici) => renderData(korisnici))
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

  let tableHeader = document.querySelector("table thead"); // Zaglavlje tabele

  // Za svaku knjigu dodajemo red u tabeli koji ima dve ćelije (naziv i autor)
  data.forEach((korisnik) => {
    let newRow = document.createElement("tr");

    let cell1 = document.createElement("td");
    cell1.textContent = korisnik.korisnickoIme;
    newRow.appendChild(cell1);

    let cell2 = document.createElement("td");
    cell2.textContent = korisnik.ime;
    newRow.appendChild(cell2);

    table.appendChild(newRow);
    let cell3 = document.createElement("td");
    cell3.textContent = korisnik.prezime;
    newRow.appendChild(cell3);

    table.appendChild(newRow);
    let cell4 = document.createElement("td");
    cell4.textContent = new Date(korisnik.datumRodjenja).toLocaleDateString(
      "sr-RS",
      {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      },
    );
    newRow.appendChild(cell4);

    let cell5 = document.createElement("td");
    cell5.style.padding = "0";
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", () => {
      let id = korisnik.id;
      let serchParams = new URLSearchParams();
      serchParams.set(id);
      // fetch();
    });
    cell5.appendChild(editBtn);

    newRow.appendChild(cell5);

    table.appendChild(newRow);
  });
}

document.addEventListener("DOMContentLoaded", getAll);
