document
  .getElementById("vacationPhotoContestForm")
  .addEventListener("submit", (e) => {
    e.preventDefault();
    const body = new FormData(e.target);
    const container = document.getElementById(
      "vacationPhotoContestFormContainer"
    );
    fetch("/api/contest/vacation-photo", { method: "post", body })
      .then((res) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(`Request failed with status ${res.status}`);
        }

        return res.json();
      })
      .then(() => {
        container.innerHTML = "<b>Thank you for submitting you photo!</b>";
      })
      .catch(() => {
        container.innerHTML =
          "We're sorry, we had a problem processing your submission. Please <a href='/contest/vacation-photo'>try again</a>";
      });
  });
