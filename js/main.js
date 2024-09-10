document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".header-nav");
  const burgerBtn = document.querySelector(".burger-btn");

  burgerBtn.addEventListener("click", function () {
    this.classList.toggle("open");
    nav.classList.toggle("active");
  });

  document.addEventListener("click", function (event) {
    if (!nav.contains(event.target) && !burgerBtn.contains(event.target)) {
      nav.classList.remove("active");
      burgerBtn.classList.remove("open");
    }
  });

  if (window.innerWidth <= 870) {
    const subNav = document.querySelector(".sub-menu");
    const subItem = document.querySelector('.menu-item-has-children')
    const btnSubNav = document.querySelector(".menu-item-has-children > a");

    if (subNav) {
      subNav.classList.add("active");
    }

    if (btnSubNav) {
      btnSubNav.addEventListener("click", (e) => {
        e.preventDefault();
        if (subNav) {
          subNav.classList.toggle("active");
          subItem.classList.toggle("hidden");
        }
      });
    }

    function checkSubNavVisibility() {
      const rect = nav.getBoundingClientRect();
      if (rect.top > window.innerHeight || rect.bottom < 0) {
        nav.classList.remove("active");
      }
    }

    window.addEventListener("scroll", checkSubNavVisibility);
  }

  nav.addEventListener("click", (e) => {
    const target = e.target.closest("a");

    if (target) {
      const menuItem = target.closest(".menu-item-has-children");

      if (menuItem) {
        e.preventDefault();
        burgerBtn.classList.add("open");
        nav.classList.add("active");
      } else {
        burgerBtn.classList.remove("open");
        nav.classList.remove("active");
      }
    }
  });

  ScrollTrigger.create({
    trigger: "#content1",
    start: "bottom center",
  });

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".fixed-block").forEach((block, i) => {
    const content = block.querySelector(".fixed-content");
    const media = block.querySelector(".media-content");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 80%",
        end: "top 40%",
        scrub: true,
        markers: false,
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          });

          gsap.to(media, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          });

          if (i > 0) {
            const prevContent = gsap.utils
              .toArray(".fixed-block")
              [i - 1].querySelector(".fixed-content");
            gsap.to(prevContent, {
              opacity: 0,
              y: 20,
              duration: 1,
              ease: "power2.out",
            });
          }
        },
        onEnterBack: () => {
          if (i > 0) {
            const prevContent = gsap.utils
              .toArray(".fixed-block")
              [i - 1].querySelector(".fixed-content");
            gsap.to(prevContent, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            });
          }

          gsap.to(content, {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power2.out",
          });

          gsap.to(media, {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          });
        },
      },
    });

    tl.fromTo(
      media,
      { opacity: 0, x: i % 2 === 0 ? 50 : -50 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" }
    );
  });
});

function updateVideoContainerPosition() {
  const videoContainer = document.querySelector(".video-container-scale");

  if (!videoContainer) return;

  const startScroll = 0;
  const endScroll = 0;
  const initialTop = 0;
  const finalTop = 0;

  if (window.scrollY >= startScroll && window.scrollY <= endScroll) {
    const scrollFraction =
      (window.scrollY - startScroll) / (endScroll - startScroll);
    const newTop = initialTop - scrollFraction * initialTop;

    videoContainer.style.top = `${newTop}px`;
    videoContainer.style.position = "absolute";
    videoContainer.style.bottom = "0";
  } else if (window.scrollY < startScroll) {
    videoContainer.style.top = `${initialTop}px`;
    videoContainer.style.position = "absolute";
    videoContainer.style.bottom = "0";
  } else {
    videoContainer.style.top = `${finalTop}px`;
    videoContainer.style.position = "absolute";
    videoContainer.style.bottom = "0";
  }
}

updateVideoContainerPosition();
window.addEventListener("scroll", updateVideoContainerPosition);

function checkScreenWidth() {
  const videoContainer = document.getElementById("parallax1");

  if (!videoContainer) return;

  const image = videoContainer.querySelector(".video-box");
  const content1 = document.getElementById("content1");

  if (!image || !content1) return;

  if (window.scrollY >= 100 && window.scrollY <= 600) {
    const scaleValue = Math.min(1 + ((window.scrollY - 80) / 130) * 0.5, 3.5);
    image.style.transform = `scale(${scaleValue})`;

    const topValue = `${Math.max(100 * ((window.scrollY - 100) / 80), 0)}%`;
    image.style.top = topValue;

    if (scaleValue >= 1.5) {
      content1.style.opacity = "1";
      content1.style.transition = "opacity 1s ease";
    } else {
      content1.style.opacity = "0";
    }

    if (parseFloat(topValue) >= 0) {
      image.style.position = "sticky";
      image.style.top = "0";
    } else {
      image.style.position = "absolute";
    }
  } else if (window.scrollY < 100) {
    image.style.transform = "scale(1)";
    image.style.top = "0";
    content1.style.opacity = "0";
    image.style.position = "absolute";
  }
}

checkScreenWidth();
window.addEventListener("scroll", checkScreenWidth);
window.addEventListener("resize", checkScreenWidth);

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll("a[data-item]");
  const contentItems = document.querySelectorAll(
    ".types-modular-content-item ul"
  );

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = tab.getAttribute("data-item");
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      contentItems.forEach((item) => item.classList.remove("active"));
      document.getElementById(targetId).classList.add("active");
    });
  });
});
if (window.innerWidth >= 575) {
  const swiperElements = document.querySelectorAll(".swiperProgect");

  if (swiperElements.length > 0) {
    var swiper = new Swiper(".swiperProgect", {
      slidesPerView: 2.2,
      spaceBetween: 20,
      loop: true,
      breakpoints: {
        575: {
          slidesPerView: 2.1,
          spaceBetween: 20,
        },
        767: {
          slidesPerView: 2.2,
        },
        1199: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        1450: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
      },
    });
  }
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
});

document.querySelectorAll(".sticky").forEach((box) => {
  observer.observe(box);
});
