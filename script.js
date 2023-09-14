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
    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});
var curs = document.querySelector(".visit")
document.addEventListener("mousemove",function(dets){
  gsap.to(curs,{
    top:dets.y ,
    left:dets.x
  })

})
document.querySelectorAll(".projects").forEach(function(elem){
  elem.addEventListener("mouseenter",function(){
    elem.firstChild.firstChild.play()
    gsap.to(curs,{
      transform:" scale(1)"
    })
  })
  elem.addEventListener("mouseleave",function(){
    gsap.to(curs,{
      transform:" scale(0)"
    })
    elem.firstChild.firstChild.pause()
  })
  console.log()
})

var tm= gsap.timeline()
tm
.from(".nav1",{
  y:"-100",
  opacity:0
},"a")
.from(".nav2 a",{
  y:"-100",
  stagger:.1
},"a")
.from(".nav2 .nav-2,.nav2 .nav-3",{
  y:"-100",
  stagger:.3
})
.from("#page1 .pic",{
  x:"-200",
  opacity:0
})
.from("#page1 .profile-1",{
  x:"-100",
  opacity:0,
})
.from("#page1 .about h1 ,#page1 .about p,#page1 .about .buttons a",{
  x:"200",
  opacity:0,
  stagger:.1
})


gsap.from("#page3>h1,#page3 .edu",{
  x:"-100",
  opacity:0,
  stagger:.3,
  scrollTrigger:{
    trigger:"#page3",
    scroller:"#main",
    start:"top 50%",
    end:"top 00%",
    scrub:2,
  }
})
gsap.from(".edu li .progs",{
  width:0,
  stagger:.5,
  scrollTrigger:{
    scroller:"#main",
    trigger:".skills",
    start:"top 10%",
    end:"top 100%",
    scrub:2
  }
})

gsap.from("#page2>h1",{
  y:"-100",
  opacity:0,
  scrollTrigger:{
    trigger:"#page2",
    scroller:"#main",
    start:"top 40%",
    end:"top -40%",
  }
})
gsap.from("#page2 .swiper-slide",{
  opacity:0,
  scale:0,
  stagger:.3,
  scrollTrigger:{
    trigger:"#page2",
    scroller:"#main",
    start:"top 45%",
    end:"top -40%",
  }
})
gsap.from("#page4>h1",{
  opacity:0,
  scale:0,
  scrollTrigger:{
    trigger:"#page4",
    scroller:"#main",
    start:"top 10%",
    end:"top -40%",
  }
})

document.querySelectorAll(".projects").forEach(function(elem){
  gsap.from(elem,{
    opacity:0,
    scale:0,
    duration:.5,
    scrollTrigger:{
      trigger:elem,
      scroller:"#main",
      start:"top 80%",
      end:"top -50%",
    }
  })
})

var menu = document.querySelector("#menu")
var i2 =document.querySelector("#navbar .nav-3")
var fog = 0
i2.addEventListener("click",function(){
  if(fog === 0){
    gsap.to(menu,{
      top:"8vw",
      duration:1
    })
    gsap.to(i2,{
      rotate:"-90deg"
    })
    fog =1
  }else{
    gsap.to(menu,{
      top:"-100%",
      duration:1
    })
    gsap.to(i2,{
      rotate:"0deg"
    })
    fog = 0
  }
})


