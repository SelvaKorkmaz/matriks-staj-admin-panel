(() => {
  "use strict";

  const form = document.getElementById("forgotForm");
  const successAlert = document.getElementById("successAlert");
  const successMessage = document.getElementById("successMessage");
  const backToLogin = document.getElementById("backToLogin");

  form.addEventListener("submit", (event) => {

    event.preventDefault();

    if (!form.checkValidity()) {

      event.stopPropagation();

    } else {

      const email = document.getElementById("email").value;

      successMessage.innerHTML = `
        <strong>${email}</strong> adresine
        şifre sıfırlama bağlantısı başarıyla gönderildi.
        <br><br>
        Lütfen e-posta kutunuzu kontrol ediniz.
      `;

      successAlert.classList.remove("d-none");

      // Formu gizle
      form.style.display = "none";

      // Giriş sayfasına dön linkini göster
      backToLogin.classList.remove("d-none");
    }

    form.classList.add("was-validated");

  });

})();