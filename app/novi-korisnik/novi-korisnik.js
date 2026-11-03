const fillForm = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (!id) {
    return;
  }

  fetch("https://localhost:44360/api/korisnici/" + id)
    .then((response) => {
      if (!response.ok) {
        const error = new Error("Request failed. Status: " + response.status);
        error.response = response;
        throw error;
      }
      return response.json();
    })
    .then((korisnik) => {
      document.querySelector("#korisnickoIme").value = korisnik.korisnickoIme;
      document.querySelector("#ime").value = korisnik.ime;
      document.querySelector("#prezime").value = korisnik.prezime;
      document.querySelector("#datumRodjenja").value =
        korisnik.datumRodjenja.split("T")[0];
    })
    .catch((error) => {
      console.error("Error:", error.message);
      if (error.response && error.response.status === 404) {
        alert("Korisnik ne postoji.");
      } else {
        alert("Doslo je do greske. Pokusajte ponovo.");
      }
    });
};

const initializeForm = () => {
  const submitBtn = document.getElementById("submitBtn");
  const form = document.querySelector("form");
  fillForm();
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const korisnik = {
      korisnickoIme: formData.get("korisnickoIme"),
      ime: formData.get("ime"),
      prezime: formData.get("prezime"),
      datumRodjenja: formData.get("datumRodjenja"),
    };

    url = "https://localhost:44360/api/korisnici";
    let method = "POST";
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");
    console.log(id);

    if (id) {
      method = "PUT";
      url = "https://localhost:44360/api/korisnici/" + id;
    }

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(korisnik),
    })
      .then((response) => {
        if (!response.ok) {
          const error = new Error("Doslo je do greske: " + response.status);
          error.response = response;
          throw error;
        }
        return response.json();
      })
      .then((data) => {
        window.location.href = "../korisnici";
      })
      .catch((error) => {
        console.error("Error:", error.message);
        if (error.response && error.response.status === 400) {
          alert("Podaci nisu validni!");
        } else {
          alert(
            "Doslo je do greske prilikom azuriranja podataka. Pokusajte ponovo.",
          );
        }
      });
  });
};

document.addEventListener("DOMContentLoaded", initializeForm);
