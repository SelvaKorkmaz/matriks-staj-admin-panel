$(function () {
  $.datepicker.setDefaults({
    dateFormat: "dd.mm.yy",

    monthNames: [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ],

    monthNamesShort: [
      "Oca",
      "Şub",
      "Mar",
      "Nis",
      "May",
      "Haz",
      "Tem",
      "Ağu",
      "Eyl",
      "Eki",
      "Kas",
      "Ara",
    ],

    dayNames: [
      "Pazar",
      "Pazartesi",
      "Salı",
      "Çarşamba",
      "Perşembe",
      "Cuma",
      "Cumartesi",
    ],

    dayNamesMin: ["Pz", "Pt", "Sa", "Ça", "Pe", "Cu", "Ct"],

    firstDay: 1,
  });

  $("#startDate").datepicker({
    onSelect: function (selectedDate) {
      $("#endDate").datepicker("option", "minDate", selectedDate);
    },
  });

  $("#endDate").datepicker({
    onSelect: function (selectedDate) {
      $("#startDate").datepicker("option", "maxDate", selectedDate);
    },
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // Kullanıcı adını göster
  const loggedUser = document.getElementById("loggedUser");
  const username = localStorage.getItem("username");

  if (loggedUser && username) {
    loggedUser.textContent =
      username.charAt(0).toUpperCase() + username.slice(1);
  }

  // Logout Butonları
  const logoutButtons = document.querySelectorAll(
    "#logoutBtn, #sidebarLogout, #mobileLogout",
  );

  logoutButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      localStorage.removeItem("username");

      window.location.href = "login.html";
    });
  });

  // Sidebar Active
  const navLinks = document.querySelectorAll(
    ".sidebar .nav-link, .offcanvas .nav-link",
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Logout butonları active olmasın
      if (this.id === "sidebarLogout" || this.id === "mobileLogout") return;

      navLinks.forEach((item) => item.classList.remove("active"));

      this.classList.add("active");
    });
  });
});


// Sidebar Active Menu

const navLinks = document.querySelectorAll(".sidebar .nav-link, .offcanvas .nav-link");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(item => item.classList.remove("active"));

        this.classList.add("active");

    });

});

// Footer Yılı

const currentYear = document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}