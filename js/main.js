document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector('.header-nav');
  const burgerBtn = document.querySelector('.burger-btn');
  
  burgerBtn.addEventListener('click', function() {
      this.classList.toggle('open');
      nav.classList.toggle('active');
  });
  
  document.addEventListener('click', function(event) { 
      if (!nav.contains(event.target) && !burgerBtn.contains(event.target)) { 
          nav.classList.remove('active');
          burgerBtn.classList.remove('open');
      }
  });

  gsap.registerPlugin(ScrollTrigger);

  function initAnimation() {
      const viewportHeight = window.innerHeight; 
  
      // Step 1: Scaling animation for #parallax1
      gsap.timeline({
          scrollTrigger: {
              trigger: '#parallax1',
              start: "top bottom",
              end: `+=${viewportHeight * 1.1 - 100} `, // The scaling animation duration
              pin: true,
              scrub: true,
              anticipatePin: 1,
          }
      }).to('#parallax1', {   
          scale: 5.4,
          ease: "power1.inOut",
          duration: 1, // Controls the speed of the scaling
      });
  }
  
  // Initialize animations on larger screens
  if (window.innerWidth >= 780) {
      initAnimation();
  }
  
  // Reinitialize animations on resize
  window.addEventListener('resize', () => {
      if (window.innerWidth >= 780) {
          initAnimation();
      }
  });
  
  // Step 2: Reveal animation for #content1 on top of #parallax1
  gsap.fromTo(
      "#content1",
      { 
          opacity: 0, // Starting opacity
      },
      {
          opacity: 1, // Full visibility 
          ease: "power1.out",
          duration: 1,
          pointerEvents: "auto", // Allows clicks after it appears
          scrollTrigger: {
              trigger: '#content1',
              start: "top center", // Animation starts when #content1 reaches the center
              end: "bottom center", // Ends when #content1 fully scrolls into view
              scrub: true,
          }
      }
  );
  
  // Step 3: Function to create animations for section backgrounds
  function triggerSectionAnimations() {
      let getRatio = (el) => window.innerHeight / (window.innerHeight + el.offsetHeight);
  
      gsap.utils.toArray("section.fly-box").forEach((section, i) => {
          section.bg = section.querySelector(".bg");
          gsap.fromTo(
              section.bg,
              {
                  backgroundPosition: () => i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px",
              },
              {
                  backgroundPosition: () => `50% ${window.innerHeight * (1 - getRatio(section))}px`,
                  ease: "none",
                  scrollTrigger: {
                      trigger: section,
                      start: () => (i ? "top bottom" : "top top"),
                      end: "bottom top",
                      scrub: true,
                      invalidateOnRefresh: true,
                  },
              }
          );
      });
  }
  
  // Step 4: Delay triggering section animations until #content1 completes
  ScrollTrigger.create({
      trigger: "#content1", 
      start: "bottom center", // Wait until #content1 finishes
      onEnter: triggerSectionAnimations, // Trigger background animations after #content1 is done
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
              const prevContent = gsap.utils.toArray(".fixed-block")[i - 1].querySelector(".fixed-content");
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
              const prevContent = gsap.utils.toArray(".fixed-block")[i - 1].querySelector(".fixed-content");
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
          }
        }
      });
      
      tl.fromTo(media, 
        { opacity: 0, x: i % 2 === 0 ? 50 : -50 }, 
        { opacity: 1, x: 0, duration: 1.2, ease: "power2.out" }
      );
    });
});

    
    
    // Запуск анимации фонов при прокрутке #parallax1
    // gsap.registerPlugin(ScrollTrigger);

    // // Select the content and media elements
    // const contents = document.querySelectorAll('.fixed-content');
    // const mediaContents = document.querySelectorAll('.media-content');
    
    // contents.forEach((content, index) => {
    //   const media = mediaContents[index];
    
    //   // Pin the text in the center while the image scrolls
    //   gsap.to(content, {
    //     scrollTrigger: {
    //       trigger: media, // Trigger the animation when the media element enters
    //       start: "top center", // Start when the media's top hits the center of the viewport
    //       end: "bottom top", // End when the media's bottom hits the top of the viewport
    //       scrub: true, // Sync animation to scrolling
    //       pin: true, // Pin the content in place
    //       onEnter: () => content.style.opacity = 1, // Fade in when entering
    //       onLeave: () => content.style.opacity = 0 // Fade out when leaving
    //     }
    //   });
    
    //   // Animate the image from the bottom right to the top
    //   gsap.fromTo(
    //     media,
    //     {
    //       opacity: 0,
    //       x: '50%', // Start from the right side
    //       y: '100%', // Start from the bottom
    //     },
    //     {
    //       opacity: 1,
    //       x: '50%', // Move to center horizontally
    //       y: '0%', // Move upwards
    //       duration: 1,
    //       scrollTrigger: {
    //         trigger: media,
    //         start: "top bottom", // Start when the top of media is at the bottom of the viewport
    //         end: "bottom top", // End when the media's bottom hits the top of the viewport
    //         scrub: true, // Link animation progress to scroll position
    //       }
    //     }
    //   );
    // });
 







//   function checkScreenWidth() {
//       const videoContainer = document.getElementById("parallax1");
//       const image = videoContainer.querySelector("img");
  
//       if (window.scrollY >= 100 && window.scrollY <= 600) {
//         const scaleValue = 1 + ((window.scrollY - 100) / 200) * 1;
//         image.style.transform = `scale(${scaleValue})`;
//         const topValue = `${-200 * ((window.scrollY - 100) / 200)}%`;
//         image.style.top = topValue;
//         image.style.position = 'stiky'
//       } else if (window.scrollY < 100) {
//         image.style.transform = "scale(1)";
//         image.style.top = "0";
//       }
//     }
    
//     checkScreenWidth();
//     window.addEventListener("scroll", checkScreenWidth);
//     window.addEventListener("resize", checkScreenWidth);
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('a[data-item]');
  const contentItems = document.querySelectorAll('.types-modular-content-item ul');

  tabs.forEach(tab => {
      tab.addEventListener('click', (event) => {
          event.preventDefault();
          const targetId = tab.getAttribute('data-item'); 
          tabs.forEach(t => t.classList.remove('active')); 
          tab.classList.add('active'); 
          contentItems.forEach(item => item.classList.remove('active')); 
          document.getElementById(targetId).classList.add('active');
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
        }
      }
    });
  }
}

