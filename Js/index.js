const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const dateRanges = document.querySelectorAll(".date-range");

const parseYearMonth = (value) => {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return null;
  return new Date(year, month - 1, 1);
};

const formatTenure = (months) => {
  if (months <= 0) return "Less than 1 mo";
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  const parts = [];
  if (years > 0) parts.push(`${years} yr${years > 1 ? "s" : ""}`);
  if (remaining > 0) parts.push(`${remaining} mo${remaining > 1 ? "s" : ""}`);
  return parts.join(" ");
};

dateRanges.forEach((range) => {
  const startValue = range.dataset.start;
  const endValue = range.dataset.end;
  const tenureEl = range.parentElement.querySelector(".tenure");
  if (!startValue || !tenureEl) return;

  const startDate = parseYearMonth(startValue);
  if (!startDate) return;

  let endDate;
  if (!endValue || endValue === "present") {
    endDate = new Date();
  } else {
    const endDateRaw = parseYearMonth(endValue);
    if (!endDateRaw) return;
    endDate = new Date(endDateRaw.getFullYear(), endDateRaw.getMonth() + 1, 1);
  }

  const months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth()) -
    (endDate.getDate() < startDate.getDate() ? 1 : 0);

  if (months < 0) return;

  tenureEl.textContent = ` · ${formatTenure(months)}`;
});
