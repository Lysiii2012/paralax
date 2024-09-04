document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector('.header-nav')
    document.querySelector('.burger-btn').addEventListener('click', function() {
          this.classList.toggle('open');
          nav.classList.toggle('active');
        }); 



    // Инициализация GSAP и ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Основной таймлайн для масштабирования #parallax1
    let scroll_tl = gsap.timeline({
        scrollTrigger: {
            trigger: '#parallax1', // Элемент, который запускает анимацию
            start: "top bottom",   // Начало анимации, когда верхняя часть элемента #parallax1 достигает нижней части экрана
            pin: true,             // Фиксация элемента во время анимации
            scrub: true,           // Плавное изменение анимации при прокрутке
            end: "+=300"           // Конец анимации через 300px прокрутки
        }
    });

    // Анимация изменения масштаба #parallax1
    scroll_tl.to('#parallax1', {
        scale: 3.5,  
        bottom:200,              // Изменение масштаба до 3.5 раз
        ease: "power1.inOut",      // Плавная анимация
        duration: 1                // Длительность анимации
    });

    // Фиксация контента #content1 поверх #parallax1
    ScrollTrigger.create({
        trigger: "#parallax1",
        start: "top top",
        end: "bottom top",
        pin: "#content1",       // Фиксируем элемент #content1
        pinSpacing: false,      // Без добавления дополнительных отступов
        scrub: true,            // Плавная прокрутка
    });

    // Таймлайн для анимации появления #content1
    const firstTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#content1",
            start: "top bottom",  // Начало анимации, когда #parallax1 достигает центра экрана
            end: "center top",    // Конец анимации, когда #parallax1 уходит вверх
            scrub: true,
            onLeave: () => secondTimeline.play(), // Запуск второго таймлайна при выходе
        },
    });

    // Анимация появления #content1
    firstTimeline.from("#content1", { opacity: 0, y: 0, duration: 1 });

    // Второй таймлайн для анимации фонов секций
    const secondTimeline = gsap.timeline({ paused: true });

    // Функция для создания анимаций фонов секций
    function triggerSectionAnimations() {
        let getRatio = (el) =>
            window.innerHeight / (window.innerHeight + el.offsetHeight);

        gsap.utils.toArray("section.fly-box").forEach((section, i) => {
            section.bg = section.querySelector(".bg");
            secondTimeline.fromTo(
                section.bg,
                {
                    backgroundPosition: () =>
                        i ? `50% ${-window.innerHeight * getRatio(section)}px` : "50% 0px",
                },
                {
                    backgroundPosition: () =>
                        `50% ${window.innerHeight * (1 - getRatio(section))}px`,
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
    ScrollTrigger.create({
        trigger: "#parallax1",
        start: "10% 10%",
        end: "50% 50%",
        onEnter: triggerSectionAnimations,
    });
    // Запуск анимации фонов при прокрутке #parallax1
    
    
    gsap.registerPlugin(ScrollTrigger);

    // Create a timeline for animations
    gsap.utils.toArray(".fixed-block").forEach((block, i) => {
      const content = block.querySelector(".fixed-content");
      const media = block.querySelector(".media-content");
    
      // Create a GSAP timeline for each block
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: block,
          start: "top 80%", // Adjust as needed
          end: "top 40%",   // Adjust as needed
          scrub: true,
          markers: false,   // Set to true for debugging
          onEnter: () => {
            // Fade in current content when scrolling down
            gsap.to(content, {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out",
            });
    
            // Fade in and slide media content when scrolling down
            gsap.to(media, {
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: "power2.out",
            });
    
            // Fade out previous content if it exists
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
            // Fade in previous content when scrolling up
            if (i > 0) {
              const prevContent = gsap.utils.toArray(".fixed-block")[i - 1].querySelector(".fixed-content");
              gsap.to(prevContent, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
              });
            }
    
            // Fade out current content when scrolling up
            gsap.to(content, {
              opacity: 0,
              y: 20,
              duration: 1,
              ease: "power2.out",
            });
    
            // Fade in and slide media content when scrolling up
            gsap.to(media, {
              opacity: 1,
              x: 0,
              duration: 1.2,
              ease: "power2.out",
            });
          }
        }
      });
    
      // Add media slide animation
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
 
    