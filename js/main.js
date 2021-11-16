
const body = document.querySelector('body'),
      html = document.querySelector('html'),
    menu = document.querySelectorAll('.burger, .header__nav, body'),
    burger = document.querySelector('.burger'),
    header = document.querySelector('.header');

    







function popup(id) {

    let popup, popupBg, popupCloseBtn;

    try {
        
        popup = document.querySelector(id);
        popupBg = popup.querySelector('._popup-bg');
        popupCloseBtn = popup.querySelector('._popup-close-btn');

    } catch {
        return false;
    }

    html.style.setProperty('--popup-padding', window.innerWidth - body.offsetWidth + 'px');
    
    body.classList.add('_popup-active');

    window.location.hash = id;

    popup.classList.add('_active');

    function removeFunc() {

        popup.classList.remove('_active');
        setTimeout(function() {
            history.replaceState("", "", location.pathname)
            window.location.hash = '';
            body.classList.remove('_popup-active');
            html.style.setProperty('--popup-padding', '0px');
        },200)
        
    }

    popupBg.addEventListener('click', function() {
        removeFunc();
        setTimeout(function() {
            return false;
        },200)
    });

    popupCloseBtn.addEventListener('click', function() {
        removeFunc();
        setTimeout(function() {
            return false;
        },200)
    });

}


function popupInit() {
    let hash = window.location.hash,
        popupElem;

    try {
        popupElem = document.querySelector(hash);
        popupElem.classList.contains('_popup');
    } catch {
        return false;
    }

    if(popupElem.classList.contains('_popup')) {
        popup(hash);
    }
    
}

popupInit();












function tab(elem) {

    checkTabActive = true;

    elem.closest('._tab-list').querySelectorAll('._tab-link').forEach(element => {
        element.classList.remove('_active');
    })

    elem.classList.add('_active');

    const tabLink = elem;

    let tabBlock, tabBlockActive, tabBlockParent;

    try {
        tabBlock = document.querySelector(tabLink.getAttribute('href'));
        tabBlockParent = tabBlock.parentNode;

        if(tabBlock.classList.contains('_active')) {
            checkTabActive = false;
            return false;
        }

        tabBlockActive = tabBlockParent.querySelector('._tab-block._active');
    } catch {
        return false;
    }

    const tabBlockList      = tabBlockParent.querySelectorAll('._tab-block');

    tabBlockParent.style.minHeight = tabBlockActive.offsetHeight + 'px';
    
    tabBlockActive.classList.add('_fade-out');

    setTimeout(function() {

        tabBlockList.forEach(element => {
            element.classList.remove('_active');
            element.classList.remove('_fade-out');
            element.classList.remove('_fade-in');
        });

        tabBlock.classList.add('_active');

    },300);

    setTimeout(function() {
        tabBlock.classList.add('_fade-in');
        
        
        tabBlockParent.style.minHeight = '0px';

        checkTabActive = false;

    },500);

}











let checkSlide = false;
function slideFunc(elem) {

    if(checkSlide == false) {
        checkSlide = true;

        let list = elem.closest('.faq__tab-block--list'),
        content = elem.parentNode.querySelector('.faq__tab-block--item-content');

        list.querySelectorAll('.faq__tab-block--item').forEach(element => {
            
            if(element.classList.contains('_active')) {
                element.classList.remove('_active');
                slideUp(element.querySelector('.faq__tab-block--item-content'), 500);
            }
        });

        slideToggle(content, 500);

        setTimeout(function() {
            checkSlide = false;
        },500)

        elem.parentNode.classList.add('_active')
    }

}

document.querySelectorAll('.faq__tab-block--item._active').forEach(element => {
    element.querySelector('.faq__tab-block--item-content').style.display = 'block';
});







const swiper = new Swiper('.swiper', {
    loop: true,
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
});








let checkTabActive = false;

body.addEventListener('click', function(e) {

    // Меню в шапке
    if(e.target.classList.contains('burger') || e.target.parentNode.classList.contains('burger')) {
    menu.forEach(elem => {
        elem.classList.toggle('_active')
    })
    }

    if(e.target.classList.contains('_tab-link') || e.target.parentNode.classList.contains('_tab-link') && checkTabActive == false) {
        e.preventDefault();
        tab(e.target);
    }

    if(e.target.classList.contains('faq__tab-block--item-title') && !e.target.parentNode.classList.contains('_active')) {

        slideFunc(e.target);
        
    }

    if(e.target.classList.contains('_popup-btn') || e.target.parentNode.classList.contains('_popup-btn')) {
        e.preventDefault();
        popup(e.target.getAttribute('href'));
    }

// Запуск скрола к секциям
if(e.target.classList.contains('_btn-to-scroll')) {
  
  let section = document.querySelector(e.target.getAttribute('href'));

  if(section) {
      e.preventDefault();
      menu.forEach(elem => {
          elem.classList.remove('_active')
      })
      window.scroll({
          left: 0, 
          top: section.offsetTop - header.offsetHeight, 
          behavior: 'smooth'
      })
      
  }
  
}

})






// Скрипты для header {

function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset
    };

}

function scrollPage() {

const offsetCheckJs = document.querySelector('.offset-check-js');
let top = [getCoords(offsetCheckJs).top, false];

header.classList.add('_loaded');

function scrollPageFunc() {
  top[0] = getCoords(offsetCheckJs).top;
  
  if(top[0] >= 300 && top[1] == false) {

      top[1] = true;
      header.style.setProperty('--pos', '-100%');

      setTimeout(function() {
          header.classList.add('_active');
          header.style.setProperty('--pos', '0%');
      },200);

  } else if(top[0] <= 300 && top[1] == true) {

      top[1] = false;
      header.style.setProperty('--pos', '-100%');

      setTimeout(function() {
          header.style.setProperty('--pos', '0%');
          header.classList.remove('_active');
          
      },200);

  }
}

scrollPageFunc();

window.onscroll = scrollPageFunc;

}

scrollPage();

// }








