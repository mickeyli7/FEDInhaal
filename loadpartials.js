
// fetch('partials/nav.html')
//   .then(res => res.text())
//   .then(html => {
//     console.log(html);
//     document.querySelector('header').insertAdjacentHTML('afterbegin', html);
//     initNav();
//   });



// Load footer
fetch('partials/footer.html')
  .then(response => response.text())
  .then(data => {
    document.querySelector('footer').innerHTML = data;
  });




