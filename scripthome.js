document.addEventListener("DOMContentLoaded", () => {
  const ul = document.querySelector("section ul");
  const items = ul.querySelectorAll("li");
  const buttons = document.querySelectorAll("section button");
  let current = 0;
  const total = items.length;
  const intervalTime = 3000;
  let autoScroll;

  function showItem(index) {
    items.forEach((item, i) => {
      item.style.display = i === index ? "list-item" : "none";
    });
  }


  function nextItem() {
    current = (current + 1) % total;
    showItem(current);
  }

  function prevItem() {
    current = (current - 1 + total) % total;
    showItem(current);
  }


  buttons[0].addEventListener("click", () => {
    prevItem();
    resetAutoScroll();
  });

  buttons[1].addEventListener("click", () => {
    nextItem();
    resetAutoScroll();
  });


  function startAutoScroll() {
    autoScroll = setInterval(nextItem, intervalTime);
  }

  function resetAutoScroll() {
    clearInterval(autoScroll);
    startAutoScroll();
  }


  showItem(current);
  startAutoScroll();









  const hamburger = document.querySelector('header ul li button');
  const nav = document.querySelector('nav');
  const closeMenu = document.querySelector('nav > button');


  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  closeMenu.addEventListener('click', () => {
    nav.classList.remove('active');
  });

  const topHeaders = document.querySelectorAll('nav > ul > li > h2');

  topHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      const parentLi = header.parentElement;
      const subMenus = parentLi.querySelectorAll(':scope > ul');

      subMenus.forEach(ul => {
        if (ul.style.maxHeight) {
          ul.style.maxHeight = null;
        } else {
          ul.style.maxHeight = ul.scrollHeight + 'px';
        }
      });

      parentLi.classList.toggle('open');
      e.stopPropagation();
    });
  });







  const section8 = document.querySelector('main>section:nth-of-type(8)');
  const input = section8.querySelector('input[type="text"]');
  const button = section8.querySelector('button');

  let touched = false;

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.com$/.test(email);
  }

  input.addEventListener('input', () => {
    touched = true;

    if (touched && !isValidEmail(input.value.trim())) {
      input.style.border = '2px solid red';
      input.style.outline = 'none';
    } else {
      input.style.border = 'none';
      input.style.outline = '';
    }
  });


  button.addEventListener('click', (e) => {
    e.preventDefault();

    const prevError = section8.querySelector('.error-message');
    if (prevError) prevError.remove();

    if (!isValidEmail(input.value.trim())) {
      const error = document.createElement('p');
      error.textContent = "Your email is invalid format";
      error.className = "error-message";

      error.style.color = "red";
      error.style.fontWeight = "bold";
      error.style.marginBottom = "1em";

      section8.insertBefore(error, section8.firstChild);

      input.focus();

      setTimeout(() => {
        error.remove();
      }, 3000);

    } else {
      alert("Email submitted successfully!");
      input.value = "";
      input.style.border = 'none';
      touched = false;
    }
  });
});