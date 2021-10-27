document
  .getElementById("newsletterSignupForm")
  .addEventListener("submit", (e) => {
    console.log(e.target);
    e.preventDefault();
    var form = e.target;
    var body = JSON.stringify({
      _csrf: form.elements._csrf.value,
      name: form.elements.name.value,
      email: form.elements.email.value
    });
    var headers = { "Content-Type": "application/json" };
    var container = document.getElementById("newsletterSignupFormContainer");
    fetch("/api/newsletter-signup", {
      method: "post",
      body: body,
      headers: headers
    })
      .then(() => {
        container.innerHTML = "<b>Thank you for signing up!</b>";
      })
      .catch(() => {
        container.innerHTML =
          "<b>We're sorry, we hand a problem signing you up. Please <a href='/newsletter'>try again</a></b>";
      });
  });
