// Functie card clickable
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".student").forEach(student => {
    student.addEventListener("click", function (event) {

      // Voorkomen dat een klik op de knoppen (zoals GitHub-link) de hele div laat navigeren
      if (!event.target.closest(".buttons")) {
        window.location.href = this.getAttribute("data-url");
      }
    });
  });
});