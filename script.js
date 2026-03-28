(() => {
  "use strict";

  const animatedSections = document.querySelectorAll(".section-animate");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    animatedSections.forEach((el) => io.observe(el));
  } else {
    animatedSections.forEach((el) => el.classList.add("is-visible"));
  }

  const form = document.getElementById("callback-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = encodeURIComponent(
        form.querySelector("#name")?.value?.trim() || ""
      );
      const mobile = encodeURIComponent(
        form.querySelector("#mobile")?.value?.trim() || ""
      );
      const message = encodeURIComponent(
        form.querySelector("#message")?.value?.trim() || ""
      );

      const text = `Hello, I want to book a laser session.%0AName: ${name}%0AMobile: ${mobile}%0AMessage: ${message}`;
      window.open(`https://wa.me/201044458833?text=${text}`, "_blank", "noopener");
    });
  }
})();
