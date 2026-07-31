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

  Papa.parse("../data/employees.csv", {
    download: true,
    header: true,
    delimiter: ";",
    skipEmptyLines: true,

    complete: function (results) {
      // Durum sayıları
      let aktif = 0;
      let pasif = 0;
      let izinli = 0;

      const tbody = document.getElementById("employeeTableBody");

      results.data.forEach((employee) => {
        switch (employee.Durum) {
          case "Aktif":
            aktif++;
            break;

          case "Pasif":
            pasif++;
            break;

          case "İzinli":
            izinli++;
            break;
        }

        tbody.innerHTML += `
        <tr>
          <td>${employee.ID}</td>
          <td>${employee["Ad Soyad"]}</td>
          <td>${employee.Departman}</td>
          <td>${employee.Durum}</td>
        </tr>
      `;
      });

      new DataTable("#employeeTable", {
        pageLength: 10,
        lengthMenu: [5, 10, 25, 50],

        language: {
          lengthMenu: "_MENU_ Kayıt Göster",
          zeroRecords: "Kayıt bulunamadı",
          info: "_TOTAL_ kayıttan _START_ - _END_ arası gösteriliyor",
          infoEmpty: "Gösterilecek kayıt yok",
          infoFiltered: "(_MAX_ kayıt içerisinden filtrelendi)",
          search: "Ara:",
          paginate: {
            first: "İlk",
            last: "Son",
            next: "Sonraki",
            previous: "Önceki",
          },
        },
      });

      // =========================
      // Highcharts - Çalışan Durumu
      // =========================

      Highcharts.chart("statusChart", {
        chart: {
          type: "pie",
          backgroundColor: "transparent",
        },

        title: {
          text: null,
        },

        credits: {
          enabled: false,
        },

        exporting: {
          enabled: false,
        },

        tooltip: {
          formatter: function () {
            return (
              "<b>%" +
              Highcharts.numberFormat(this.percentage, 0) +
              "</b> (" +
              this.y +
              " kişi)"
            );
          },
        },

        plotOptions: {
          pie: {
            innerSize: "65%",
            allowPointSelect: true,
            cursor: "pointer",

            dataLabels: {
              enabled: true,

              formatter: function () {
                return (
                  "<b>%" +
                  Highcharts.numberFormat(this.percentage, 0) +
                  "</b><br>" +
                  this.point.name
                );
              },

              style: {
                fontSize: "13px",
                fontWeight: "bold",
                textOutline: "none",
              },
            },
          },
        },

        series: [
          {
            name: "Çalışan",

            data: [
              {
                name: "Aktif",
                y: aktif,
                color: "#22C55E",
              },
              {
                name: "Pasif",
                y: pasif,
                color: "#F59E0B",
              },
              {
                name: "İzinli",
                y: izinli,
                color: "#EF4444",
              },
            ],
          },
        ],
      });
    },
  });

  // Highcharts - Haftalık Kullanıcı Hareketleri

  Highcharts.chart("activityChart", {
    chart: {
      type: "areaspline",
      backgroundColor: "transparent",
    },

    title: {
      text: null,
    },

    credits: {
      enabled: false,
    },

    lang: {
      viewFullscreen: "Tam ekran görüntüle",
      exitFullscreen: "Tam ekrandan çık",
      printChart: "Grafiği Yazdır",
      downloadPNG: "PNG olarak indir",
      downloadJPEG: "JPEG olarak indir",
      downloadSVG: "SVG olarak indir",
      downloadPDF: "PDF olarak indir",
      contextButtonTitle: "Grafik Menüsü",
    },

    legend: {
      enabled: false,
    },

    colors: ["#5B5CEB"],

    xAxis: {
      categories: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],

      lineColor: "#E5E7EB",

      tickColor: "#E5E7EB",

      labels: {
        style: {
          color: "#6B7280",
          fontSize: "13px",
        },
      },
    },

    yAxis: {
      title: {
        text: "Kullanıcı Sayısı",
      },

      gridLineColor: "#F1F5F9",

      labels: {
        style: {
          color: "#6B7280",
        },
      },
    },

    tooltip: {
      backgroundColor: "#ffffff",
      borderColor: "#E5E7EB",
      borderRadius: 10,
      shadow: true,

      style: {
        color: "#1F2937",
        fontSize: "13px",
      },

      formatter: function () {
        return "👤 Kullanıcı: <b>" + this.y + " kullanıcı</b>";
      },
    },

    plotOptions: {
      areaspline: {
        lineWidth: 4,

        marker: {
          radius: 5,

          fillColor: "#5B5CEB",
        },

        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1,
          },

          stops: [
            [0, "rgba(91,92,235,.35)"],

            [1, "rgba(91,92,235,.03)"],
          ],
        },
      },
    },

    series: [
      {
        name: "Kullanıcı",

        data: [35, 52, 48, 80, 95, 120, 105],
      },
    ],
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
                 class="text-center py-5"

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
