const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwq4TzVYyrg7eyIrDYoe2Gb6uEdQovD8gBS8QKGRE9gnpmf9e0Uuf1BvSN6gb7e0TCarw/exec";

/* Google Script Form Submit */
document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    affiliation: formData.get("affiliation"),
    phone: formData.get("phone"),
    subject: formData.get("subject"),
    message: formData.get("message")
  };

  try {
    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (result.status === "success") {
      alert("Submitted successfully! Your ID: " + result.id);
      document.getElementById("contactForm").reset();
    } else {
      alert("Error: " + result.message);
    }

  } catch (error) {
    alert("Submission failed!");
    console.error(error);
  }
});


/* EmailJS Init */
(function () {
  emailjs.init("7WbiGKQP6WXStFQQT"); // replace
})();


/* EmailJS Send Form */
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm(
    "service_mi5z5da",   // replace
    "template_zwg5tsq",  // replace
    this
  )
    .then(function (response) {
      alert("Message sent successfully!");
      document.getElementById("contactForm").reset();
    }, function (error) {
      alert("Failed to send message!");
      console.error(error);
    });
});
