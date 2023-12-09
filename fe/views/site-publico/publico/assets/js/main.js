(function() {
    
    "use strict";

    window.onload = function() {
        window.setTimeout(fadeout, 500);
    }

    function fadeout() {
        document.querySelector('.preloader').style.opacity = '0';
        document.querySelector('.preloader').style.display = 'none';
    }

    
    /*Sticky */
    window.onscroll = function () {
        var header_navbar = document.getElementById("header_navbar");
        var logo = document.querySelector("img#logo");
        var sticky = header_navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            header_navbar.classList.add("sticky");
            logo.setAttribute("src", "/assets/images/logo-2.svg")
        } else {
            header_navbar.classList.remove("sticky");
            logo.setAttribute("src", "/assets/images/logo.svg")
        }



        // show or hide the back-top-top button
        var backToTop = document.querySelector("back-to-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    };


    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');
    
    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();
            document.querySelector(elem.getAttribute('href')).scrollIntoView({
                behavior: 'smooth',
                offsetTop: 1 - 60,
            });
        });
    });

    // section menu 
    function onScroll(event) {
        var sections = document.querySelectorAll('.page-scroll');
        var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

        for (var i = 0; i < sections.length; i++) {
            var currLink = sections[i];
            var val = currLink.getAttribute('href');
            var refElement = document.querySelector(val);
            var scrollTopMinus = scrollPos + 73;
            if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
                document.querySelector('.page-scroll').classList.remove('active');
                currLink.classList.add('active');
            } else {
                currLink.classList.remove('active');
            }
        }
    };

    window.document.addEventListener('scroll', onScroll);


    // fechar nav-bar  quando clicado
    let navbarToggler = document.querySelector(".navbar-toggler");    
    var navbarCollapse = document.querySelector(".navbar-collapse");

    navbarToggler.addEventListener('click', () => {
        navbarToggler.classList.toggle('active')
    })

    document.querySelectorAll(".page-scroll").forEach(e =>
        e.addEventListener("click", () => {
            navbarToggler.classList.remove("active");
            navbarCollapse.classList.remove('show')
        })
    );


    
    tns({
        container: '.testimonial_active',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        mouseDrag: true,
        gutter: 0,
        nav: true,
        controls: false,
    });

    var wow = new WOW({
        //disabled for mobile
        mobile: false
    });
    wow.init();


        // scroll top js
    function scrollTo(element, to = 0, duration= 1000) {

        const start = element.scrollTop;
        const change = to - start;
        const increment = 20;
        let currentTime = 0;

        const animateScroll = (() => {

            currentTime += increment;

            const val = Math.easeInOutQuad(currentTime, start, change, duration);

            element.scrollTop = val;

            if (currentTime < duration) {
                setTimeout(animateScroll, increment);
            }
        });

        animateScroll();
    };

    Math.easeInOutQuad = function (t, b, c, d) {

        t /= d/2;
        if (t < 1) return c/2*t*t + b;
        t--;
        return -c/2 * (t*(t-2) - 1) + b;
    };
    
})();


let text = document.getElementById('text');

window.addEventListener('scroll' ,function(){
     let.value=this.window.scrollY;
     
    text.style.marginRight = value * 4 + 'px';
})

window.onscroll = function() { showScrollButton() };

    function showScrollButton() {
      const scrollButton = document.getElementById('.back-to-top');
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block";
      } else {
        scrollButton.style.display = "none";
      } 
    }

    function scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }

   



