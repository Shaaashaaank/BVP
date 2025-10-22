(function () {
    emailjs.init("SGbqDHIUEgzEqsur1"); // ✅ Your Public Key
  })();

  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      emailjs
        .sendForm("service_eohpaqj", "template_3htsvws", this)
        .then(
          function () {
            alert("✅ Inquiry sent successfully!");
            document.getElementById("contactForm").reset();
          },
          function (error) {
            alert("❌ Failed to send inquiry: " + JSON.stringify(error));
          }
        );
    });