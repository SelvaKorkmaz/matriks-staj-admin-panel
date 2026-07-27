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
});

// Footer Yılı

const currentYear = document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// =========================
// Dynamic Bootstrap Tabs
// =========================

const tabContainer = document.getElementById("dynamicTabs");
const tabContent = document.getElementById("dynamicTabContent");
const pages = document.querySelectorAll("[data-page]");

const icons = {
  dashboard: "fa-chart-line",
  users: "fa-users",
  orders: "fa-box",
  reports: "fa-file-lines",
  settings: "fa-gear",
};

// -------------------------
// Yardımcı Fonksiyonlar
// -------------------------

function closeMobileSidebar() {
  const mobileSidebar = document.getElementById("mobileSidebar");

  if (window.innerWidth < 768 && mobileSidebar) {
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(mobileSidebar);

    offcanvas.hide();
  }
}

function hideEmptyMessage() {
  const emptyMessage = document.getElementById("emptyMessage");

  if (emptyMessage) {
    emptyMessage.remove();
  }
}

function showEmptyMessage() {
  if (tabContainer.children.length === 0) {
    tabContent.innerHTML = `
            <div id="emptyMessage"
                 class="text-center text-muted py-5">

                Sol menüden bir sayfa seçiniz.

            </div>
        `;
  }
}

// -------------------------
// Tab Aç
// -------------------------

function openTab(pageId, pageName) {
  // Tab açıksa sadece aktif yap

  const existingTab = document.getElementById("tab-" + pageId);

  if (existingTab) {
    bootstrap.Tab.getOrCreateInstance(existingTab).show();

    closeMobileSidebar();

    return;
  }

  hideEmptyMessage();

  // TAB

  const li = document.createElement("li");

  li.className = "nav-item";

  li.innerHTML = `
        <button
            class="nav-link"
            id="tab-${pageId}"
            data-bs-toggle="tab"
            data-bs-target="#content-${pageId}"
            type="button">

            <i class="fa-solid ${icons[pageId]} me-2"></i>

            ${pageName}

            <i class="fa-solid fa-xmark ms-2 close-tab"
               data-page="${pageId}"></i>

        </button>
    `;

  tabContainer.appendChild(li);

  // CONTENT

  const content = document.createElement("div");

  content.className = "tab-pane fade";

  content.id = "content-" + pageId;

  content.innerHTML = `
        <h4>${pageName}</h4>

        <hr>

        <p>${pageName} sayfası içerik alanı.</p>
    `;

  tabContent.appendChild(content);

  bootstrap.Tab.getOrCreateInstance(
    document.getElementById("tab-" + pageId),
  ).show();

  closeMobileSidebar();
}

// -------------------------
// Sidebar
// -------------------------

pages.forEach((page) => {
  page.addEventListener("click", function (e) {
    e.preventDefault();

    openTab(this.dataset.page, this.textContent.trim());
  });
});

// -------------------------
// Tab Kapat
// -------------------------

document.addEventListener("click", function (e) {
  if (!e.target.classList.contains("close-tab")) return;

  e.stopPropagation();

  const pageId = e.target.dataset.page;

  const tabButton = document.getElementById("tab-" + pageId);

  const tabPane = document.getElementById("content-" + pageId);

  const navItem = tabButton.closest(".nav-item");

  const wasActive = tabButton.classList.contains("active");

  // Sağdaki sekme
  let nextTab = navItem.nextElementSibling?.querySelector(".nav-link");

  // Sağ yoksa soldaki
  if (!nextTab) {
    nextTab = navItem.previousElementSibling?.querySelector(".nav-link");
  }

  navItem.remove();

  tabPane.remove();

  if (wasActive && nextTab) {
    bootstrap.Tab.getOrCreateInstance(nextTab).show();
  }

  showEmptyMessage();
});

// =========================
// Sortable Tabs
// =========================

new Sortable(tabContainer, {
  animation: 200,
  ghostClass: "tab-ghost",
  chosenClass: "tab-chosen",
  dragClass: "tab-drag",
  filter: ".close-tab",
  preventOnFilter: false,
});

// =========================
// Theme Switch
// =========================

const themeSwitch = document.getElementById("themeSwitch");
const mobileThemeSwitch = document.getElementById("mobileThemeSwitch");

const logo = document.getElementById("logo");

const themeLabel = document.getElementById("themeLabel");
const mobileThemeLabel = document.getElementById("mobileThemeLabel");

// Tema uygula
function applyTheme(isDark) {
  document.body.classList.toggle("dark-mode", isDark);

  // Switchleri senkron tut
  if (themeSwitch) themeSwitch.checked = isDark;
  if (mobileThemeSwitch) mobileThemeSwitch.checked = isDark;

  if (logo) {
    logo.src = isDark
      ? "../assets/images/matriks-logo.png"
      : "../assets/images/matriks-light-logo.png";
  }

  // Label değiştir

  if (themeLabel) {
    themeLabel.textContent = isDark ? "🌙 Koyu Tema" : "☀️ Açık Tema";
  }

  if (mobileThemeLabel) {
    mobileThemeLabel.textContent = isDark ? "🌙 Koyu Tema" : "☀️ Açık Tema";
  }

  // Kaydet
  localStorage.setItem("darkMode", isDark);
}

// Kayıtlı temayı yükle
const savedTheme = localStorage.getItem("darkMode") === "true";

applyTheme(savedTheme);

// Desktop switch
if (themeSwitch) {
  themeSwitch.addEventListener("change", function () {
    applyTheme(this.checked);
  });
}

// Mobil switch
if (mobileThemeSwitch) {
  mobileThemeSwitch.addEventListener("change", function () {
    applyTheme(this.checked);

    const sidebar = document.getElementById("mobileSidebar");

    const offcanvas = bootstrap.Offcanvas.getInstance(sidebar);

    if (offcanvas) {
      offcanvas.hide();
    }
  });
}
