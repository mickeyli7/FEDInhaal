function initNav() {
  const hamburger = document.querySelector(
    'header button[aria-label="Open menu"]'
  );
  const nav = document.querySelector('header section nav');
  const closeMenu = nav.querySelector('button');

  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  closeMenu.addEventListener('click', () => {
    nav.classList.remove('active');
  });

  const topHeaders = nav.querySelectorAll(':scope > ul > li > h2');

  topHeaders.forEach(header => {
    header.addEventListener('click', (e) => {
      const parentLi = header.parentElement;
      const subMenus = parentLi.querySelectorAll(':scope > ul');

      subMenus.forEach(ul => {
        ul.style.maxHeight = ul.style.maxHeight
          ? null
          : ul.scrollHeight + 'px';
      });

      parentLi.classList.toggle('open');
      e.stopPropagation();
    });
  });
}


window.initNav = initNav;

