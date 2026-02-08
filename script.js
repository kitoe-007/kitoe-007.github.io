// script.js
(() => {
  const DESIGN_WIDTH = 1920;
  const MIN_SCALE = 0.25;
  const MOBILE_BREAKPOINT = 960;

  const scaleViewport = document.getElementById("scale-viewport");
  const scaleHolder = document.getElementById("scale-holder");
  const scaleWrapper = document.querySelector(".site-scale-wrapper");

  function getScale() {
    const w = window.innerWidth;
    return Math.min(1, Math.max(MIN_SCALE, w / DESIGN_WIDTH));
  }

  function isMobile() {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  function applyScale() {
    if (!scaleHolder || !scaleWrapper) return;
    if (isMobile()) {
      scaleWrapper.style.transform = "none";
      scaleWrapper.style.width = "100%";
      scaleHolder.style.width = "100%";
      scaleHolder.style.height = "auto";
    } else {
      const scale = getScale();
      scaleWrapper.style.transform = `scale(${scale})`;
      scaleWrapper.style.width = "1920px";
      const footer = scaleWrapper.querySelector(".site-footer");
      const contentH = footer ? footer.offsetTop + footer.offsetHeight : scaleWrapper.scrollHeight;
      scaleHolder.style.width = DESIGN_WIDTH * scale + "px";
      scaleHolder.style.height = contentH * scale + "px";
    }
  }

  function setupScale() {
    applyScale();
    window.addEventListener("resize", applyScale);
  }

  const parallaxMask1 = document.getElementById("parallax-mask-1");
  const parallaxMask2 = document.getElementById("parallax-mask-2");
  const parallaxMask3 = document.getElementById("parallax-mask-3");
  const parallaxMask4 = document.getElementById("parallax-mask-4");
  const parallaxMask5 = document.getElementById("parallax-mask-5");
  const parallaxMask6 = document.getElementById("parallax-mask-6");
  const parallaxMask7 = document.getElementById("parallax-mask-7");
  const parallaxMask8 = document.getElementById("parallax-mask-8");
  const parallaxMask9 = document.getElementById("parallax-mask-9");
  const parallaxMask10 = document.getElementById("parallax-mask-10");

  /* Разные скорости для глубины: дальний (медленнее) → ближний (быстрее) */
  const layer1_speed = -0.1;  // дальний слой
  const layer2_speed = -0.3;
  const layer3_speed = -0.7;
  const layer4_speed = -1.2;   // ближний слой

  const layer1_scale = 0.5;
  const layer2_scale = 0.7;
  const layer3_scale = 1.1;
  const layer4_scale = 1.1;

  let parallax_element = [
    [parallaxMask1, layer1_speed, layer1_scale],
    [parallaxMask2, layer3_speed, layer3_scale],
    [parallaxMask3, layer3_speed, layer3_scale],
    [parallaxMask4, layer2_speed, layer2_scale],
    [parallaxMask5, layer3_speed, layer3_scale],
    [parallaxMask6, layer3_speed, layer3_scale],
    [parallaxMask7, layer1_speed, layer1_scale],
    [parallaxMask8, layer3_speed, layer3_scale],
    [parallaxMask9, layer3_speed, layer3_scale],
    [parallaxMask10, layer2_speed, layer2_scale]
  ];

  function updateParallaxElement() {
    const scrollTop = scaleViewport ? scaleViewport.scrollTop : window.scrollY;
    for (let i = 0; i < parallax_element.length; i++) {
      if (parallax_element[i][0]) {
        const y = scrollTop * parallax_element[i][1];
        parallax_element[i][0].style.transform = `translate(0, ${y}px) scale(${parallax_element[i][2]})`;
      }
    }
  }

  function setupParallaxElement() {
    updateParallaxElement();
    (scaleViewport || window).addEventListener("scroll", updateParallaxElement, { passive: true });
  }

  function setupReveal() {
    const targets = document.querySelectorAll([
      ".section-header",
      ".text-main p",
      ".meta-block",
      ".skill-block",
      ".timeline-item",
      ".timeline-content",
      ".contacts-buttons .btn",
      ".hero-text > *",
      ".portrait-frame"
    ].join(","));

    targets.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", `${Math.min(i * 28, 260)}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px", root: scaleViewport || null }
    );

    targets.forEach((el) => io.observe(el));
  }

  function setupAnchorScroll() {
    if (!scaleViewport) return;
    document.addEventListener("click", (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || !a.hash) return;
      const id = a.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const targetTop = target.getBoundingClientRect().top;
        const viewportTop = scaleViewport.getBoundingClientRect().top;
        scaleViewport.scrollTop = Math.max(0, scaleViewport.scrollTop + targetTop - viewportTop - 20);
      }
    });
  }

  function init() {
    setupScale();
    setupParallaxElement();
    setupReveal();
    setupAnchorScroll();
    requestAnimationFrame(applyScale);
    window.addEventListener("load", () => requestAnimationFrame(applyScale));
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

const slowContainer = document.getElementById("slowContainer");
if (slowContainer) {
  let scrollSpeed = 0.3;
  slowContainer.addEventListener("wheel", (e) => {
    e.preventDefault();
    slowContainer.scrollTop += e.deltaY * scrollSpeed;
  }, { passive: false });
}