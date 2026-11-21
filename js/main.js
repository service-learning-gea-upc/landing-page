/* Interacciones progresivas: el contenido de la página ya está en el HTML. */
(() => {
  "use strict";

  function initNavigation() {
    const header = document.querySelector("header");
    const menu = document.querySelector(".mobile-menu");
    const sections = [...document.querySelectorAll("main > .landing-section")];
    const links = [...document.querySelectorAll('#main-nav a[href^="#"]')];
    let scrollScheduled = false;

    function trackSection() {
      const boundary = window.scrollY + Math.max(132, window.innerHeight * 0.32);
      let current = "inicio";

      for (const section of sections) {
        if (section.offsetTop <= boundary) current = section.id;
      }

      links.forEach((link) => {
        const active = link.getAttribute("href") === `#${current}`;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }

    function setMenuOpen(opened) {
      header.classList.toggle("nav-open", opened);
      menu.setAttribute("aria-expanded", String(opened));
      menu.setAttribute("aria-label", opened ? "Cerrar menú" : "Abrir menú");
      menu.querySelector("span").textContent = opened ? "×" : "☰";
    }

    window.addEventListener("scroll", () => {
      if (scrollScheduled) return;
      scrollScheduled = true;
      requestAnimationFrame(() => {
        trackSection();
        scrollScheduled = false;
      });
    }, { passive: true });
    window.addEventListener("resize", trackSection, { passive: true });
    trackSection();

    if (!header || !menu) return;
    links.forEach((link) => link.addEventListener("click", () => setMenuOpen(false)));
    menu.addEventListener("click", () => {
      setMenuOpen(!header.classList.contains("nav-open"));
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    });
    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) setMenuOpen(false);
    });
  }

  function initLearningPrinciples() {
    const grid = document.querySelector(".how-grid");
    const note = document.querySelector(".how-detail");
    if (!grid || !note) return;

    const stages = [
      "Aprender: ponemos conocimientos y habilidades en práctica durante experiencias de servicio y trabajo en equipo.",
      "Colaborar: compartimos tiempo, escuchamos a otras personas y construimos vínculos con la comunidad.",
      "Transformar: reflexionamos sobre lo vivido y reconocemos cómo una acción puede generar aprendizajes mutuos."
    ];
    const principles = [...grid.querySelectorAll(".how-part")];

    principles.forEach((principle, index) => {
      const activate = () => {
        principles.forEach((item) => item.setAttribute("aria-pressed", "false"));
        principle.setAttribute("aria-pressed", "true");
        note.textContent = stages[index];
        note.hidden = false;
      };
      principle.addEventListener("click", activate);
      principle.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });
    });
  }

  function initGallery() {
    const gallery = document.querySelector(".gallery");
    if (!gallery) return;

    const cards = [...gallery.querySelectorAll(".gallery-card")];
    const filters = [...document.querySelectorAll(".filter")];

    cards.forEach((card) => {
      card.addEventListener("click", () => showLightbox(card));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          showLightbox(card);
        }
      });
    });

    filters.forEach((filter) => {
      const change = () => {
        const category = filter.dataset.category;
        filters.forEach((item) => {
          item.classList.remove("active");
          item.setAttribute("aria-pressed", "false");
        });
        filter.classList.add("active");
        filter.setAttribute("aria-pressed", "true");
        cards.forEach((card) => {
          card.hidden = category !== "todas" && card.dataset.category !== category;
        });
        gallery.classList.toggle("is-filtered", category !== "todas");
      };
      filter.addEventListener("click", change);
      filter.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          change();
        }
      });
    });
  }

  function initPayments() {
    const options = [...document.querySelectorAll(".payment-option")];
    const box = document.querySelector(".pending-box");
    if (!options.length || !box) return;

    const title = box.querySelector("strong");
    const paragraph = box.querySelector("p");
    const messages = [
      ["Yape", "El número y el titular deberán publicarse únicamente cuando la Comisión de Finanzas los confirme."],
      ["Plin", "Antes de aportar, verifica en las redes oficiales el número de Plin autorizado y su titular."],
      ["Transferencia", "Los datos bancarios oficiales están pendientes de autorización. No realices transferencias con información no verificada."],
      ["Enlace de pago", "El enlace seguro estará disponible solo si Finanzas habilita este medio. Por ahora no existe un enlace de pago en el MVP."]
    ];

    options.forEach((option, index) => {
      const choose = () => {
        options.forEach((item) => item.setAttribute("aria-pressed", "false"));
        option.setAttribute("aria-pressed", "true");
        title.textContent = `${messages[index][0]}: pendiente de confirmación oficial`;
        paragraph.textContent = messages[index][1];
      };
      option.addEventListener("click", choose);
      option.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          choose();
        }
      });
    });
  }

  function showLightbox(card) {
    const image = card.querySelector("img");
    const caption = card.querySelector(".caption strong").textContent;
    const previousFocus = document.activeElement;
    const dialog = document.createElement("div");
    dialog.className = "lightbox";
    dialog.setAttribute("role", "dialog");
    dialog.setAttribute("aria-modal", "true");
    dialog.setAttribute("aria-label", `Fotografía ampliada: ${caption}`);
    dialog.innerHTML = `
      <div class="lightbox-panel">
        <button type="button" class="lightbox-close" aria-label="Cerrar fotografía">×</button>
        <img alt="">
        <div class="lightbox-caption"></div>
      </div>`;
    dialog.querySelector("img").src = image.src;
    dialog.querySelector("img").alt = image.alt;
    dialog.querySelector(".lightbox-caption").textContent = caption;

    const close = () => {
      dialog.remove();
      document.removeEventListener("keydown", onKeydown);
      previousFocus?.focus();
    };
    const onKeydown = (event) => {
      if (event.key === "Escape") close();
      else if (event.key === "Tab") {
        event.preventDefault();
        dialog.querySelector(".lightbox-close").focus();
      }
    };
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog || event.target.closest(".lightbox-close")) close();
    });
    document.body.append(dialog);
    document.addEventListener("keydown", onKeydown);
    dialog.querySelector("button").focus();
  }

  initNavigation();
  initLearningPrinciples();
  initGallery();
  initPayments();
})();
