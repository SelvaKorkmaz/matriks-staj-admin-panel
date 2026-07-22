(() => {
  "use strict";

  const forms = document.querySelectorAll(".needs-validation");

  // Şifre göster / gizle
  const password = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const eyeIcon = togglePassword.querySelector("i");

  togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";

      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    } else {
      password.type = "password";

      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    }
  });

  // Bootstrap Validation
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        event.preventDefault();

        if (!form.checkValidity()) {
          event.stopPropagation();
        } else {
          const username = document.getElementById("username").value.trim();
          const passwordValue = document.getElementById("password").value;

          if (username === "admin" && passwordValue === "matriks123") {
            // Kullanıcı adını sakla
            localStorage.setItem("username", username);

            // Admin paneline git
            window.location.href = "index.html";
          } else {
            alert("Kullanıcı adı veya şifre hatalı!");
          }
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();
