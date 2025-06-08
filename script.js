var icon = document.querySelector('.ri-menu-fill')
var tl = gsap.timeline();
var h1Elem = document.querySelectorAll('#page2 h1');

function textSplitting(){
  h1Elem.forEach(function(elem) {
    var splitText = elem.textContent.split("");  // split the text
    var clutter = '';
    splitText.forEach(function(e){
    clutter += `<span>${e}</span>`;
  })
  elem.innerHTML = clutter;  // set the innerHTML of each h1 to the cluttered text
  })
}

function locoScroll(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

icon.style.cursor = 'pointer';


function gsapAnimation(){
// Buttons animate
tl.from('#nav2 button', {
  y: -20,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out",
  stagger: {
    each: 0.3,
    from: "end"
  }
})
.from('#nav1 i', {
  y: -20,
  opacity: 0,
  duration: 0.6,
  ease: "power3.out",
}, "-=0.4")  // overlap icon with buttons

// h1 and h4 start 0.7s before buttons end
.from('#name h1', {
  opacity: 0,
  y:-50,
  scale: 0.5,
  duration: 0.5,
  ease: "power2.inOut"
}, "-=0.7")
.from('#name h4', {
  opacity: 0,
  scale: 0.5,
  y:-50,
  duration: 0.5,
  ease: "power2.inOut"
}, "<")  // start h4 at the same time as h1

// image animation starts 0.7s before h1/h4 finish
.to('#image', {
  height: "100%",
  width: "100%",
  duration: 1,
  ease: "power2.inOut"
}, "-=0.7")
.to('#image img', {
  height: "100%",
  width: "100%",
  duration: 1,
  borderRadius:"0",
  ease: "power2.inOut"
}, "<");

gsap.set('#image img', { borderRadius: "0.5rem" });

gsap.to('#page2 h1 span',{
  color:'#E3E3C4',
  stagger: 0.05,
  scrollTrigger: {
    trigger:'#page2 h1',
    scroller:'#main',
    markers: true,
    start: "top 50%",
    end: "top 10%",
    scrub: 1,
  }
})
}

textSplitting();
locoScroll();
gsapAnimation();