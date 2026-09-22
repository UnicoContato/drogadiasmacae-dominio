const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
const privacyOpen = document.getElementById("privacyOpen");
const privacyClose = document.getElementById("privacyClose");
const privacyModal = document.getElementById("privacyModal");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const isMovingDown = currentScroll > lastScroll && currentScroll > 120;
  header.style.transform = isMovingDown ? "translateY(-125%)" : "translateY(0)";
  lastScroll = currentScroll;
});

menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("hidden") === false;
  menuButton.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16
});

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const openModal = () => {
  privacyModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  privacyClose.focus();
};

const closeModal = () => {
  privacyModal.classList.add("hidden");
  document.body.style.overflow = "";
  privacyOpen.focus();
};

privacyOpen.addEventListener("click", openModal);
privacyClose.addEventListener("click", closeModal);
privacyModal.querySelector("[data-close-modal]").addEventListener("click", closeModal);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !privacyModal.classList.contains("hidden")) {
    closeModal();
  }
});
