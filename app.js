
function initializeDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(dropdown => {
    const toggleButton = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    toggleButton.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    dropdown.addEventListener("mouseleave", () => {
      menu.classList.remove("show");
    });
  });
}
initializeDropdowns()