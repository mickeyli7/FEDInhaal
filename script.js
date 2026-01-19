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














const button = document.querySelector("main > button:first-of-type");
const overlay = document.querySelector("main > section:first-of-type");
const close = overlay.querySelector("article > button:first-of-type");
const messages = overlay.querySelector("article > section:first-of-type");

const messageText =
    "Hello there, I'm the Peet's Virtual Assistant! When you chat with us, please know that your conversation may be recorded by Peet’s, and you agree to our Terms of Use and Privacy Policy.";

let index = 0;
let typing;

function closeChat() {
    overlay.removeAttribute("open");
    clearInterval(typing);
}

button.onclick = () => {
    overlay.setAttribute("open", "");
    messages.innerHTML = "";

    const bubble = document.createElement("article");
    messages.appendChild(bubble);

    index = 0;
    typing = setInterval(() => {
        bubble.textContent += messageText[index];
        index++;
        if (index === messageText.length) clearInterval(typing);
    }, 35);
};

close.onclick = closeChat;

overlay.onclick = (e) => {
    if (e.target === overlay) {
        closeChat();
    }
};















const chatButton = document.querySelector("main > button:nth-of-type(1)");
const grindButton = document.querySelector("main > button:nth-of-type(2)");
const actionButton = document.querySelector("main > button:nth-of-type(3)");

const section3 = document.querySelector("main > section:nth-of-type(3)");



let lastScrollY = window.scrollY;
let actionVisible = false;
let pastSection3 = false;



window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    const sectionTop = section3.getBoundingClientRect().top;


    if (currentScrollY > lastScrollY && !actionVisible) {
        actionButton.style.transform = "translate(-50%, 0)";
        actionButton.style.opacity = "1";
        actionButton.style.pointerEvents = "auto";

        chatButton.style.transform = "translateY(-70px)";
        grindButton.style.transform = "translateY(-70px)";

        actionVisible = true;
    }

    if (currentScrollY < lastScrollY && actionVisible) {
        actionButton.style.transform = "translate(-50%, 80px)";
        actionButton.style.opacity = "0";
        actionButton.style.pointerEvents = "none";

        chatButton.style.transform = "translateY(0)";
        grindButton.style.transform = "translateY(0)";

        actionVisible = false;
    }


    if (sectionTop <= 0 && !pastSection3) {
        actionButton.textContent = "subscribe & ship free";
        pastSection3 = true;
    }

    if (sectionTop > 0 && pastSection3) {
        actionButton.textContent = "choose your grind";
        pastSection3 = false;
    }

    lastScrollY = currentScrollY;




    actionButton.addEventListener("click", () => {
        if (!pastSection3) {
            section3.scrollIntoView({ behavior: "smooth" });
        }
    });








    // quantity selector

    const quantitySection = Array.from(document.querySelectorAll("main > section"))
        .find(s => Array.from(s.querySelectorAll("h2"))
            .some(h2 => h2.textContent.trim().toLowerCase() === "quantity"));

    if (!quantitySection) {
        console.error("Quantity section not found!");
    } else {
        const quantityH2 = Array.from(quantitySection.querySelectorAll("h2"))
            .find(h2 => h2.textContent.trim().toLowerCase() === "quantity");

        if (!quantityH2) {
            console.error("Quantity H2 not found!");
        } else {
            const quantityContainer = quantityH2.nextElementSibling;
            if (!quantityContainer) {
                console.error("Quantity container not found!");
            } else {
                const minusButton = quantityContainer.querySelector('button:first-of-type');
                const plusButton = quantityContainer.querySelector('button:last-of-type');
                const display = quantityContainer.querySelector('span');
                const discount = quantityContainer.querySelector('span small');

                let quantity = 1;

                function updateDisplay() {
                    if (display.firstChild.nodeType === Node.TEXT_NODE) {
                        display.firstChild.textContent = `${quantity} Bag${quantity > 1 ? 's' : ''}`;
                    }

                    if (quantity === 2) discount.textContent = '5% off';
                    else if (quantity >= 3) discount.textContent = '10% off';
                    else discount.textContent = '';
                }


                minusButton.addEventListener('click', () => {
                    if (quantity > 1) { quantity--; updateDisplay(); }
                });

                plusButton.addEventListener('click', () => { quantity++; updateDisplay(); });

                updateDisplay();
            }
        }
    }




    // sterren rating

    const overallSection1 = Array.from(document.querySelectorAll("main > section"))
        .find(s => s.querySelector("h2")?.textContent.trim().includes("Overall Rating"));

    if (overallSection1) {
        const reviewSection = overallSection1.querySelector('section:first-of-type');
        const stars = reviewSection.querySelectorAll('div > span');

        let selectedRating = 0;

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                selectedRating = index + 1;

                stars.forEach((s, i) => {
                    if (i < selectedRating) {
                        s.style.backgroundColor = '#c49b5d';
                        s.style.color = '#fff';
                    } else {
                        s.style.backgroundColor = '';
                        s.style.color = '#c49b5d';
                    }
                });
            });
        });
    }







    const filterButtons = document.querySelectorAll('button[data-keyword]');
    const reviews = document.querySelectorAll('section section article');
    const searchInput = document.querySelector('input[type="search"]');
    const reviewCountText = [...document.querySelectorAll('section p')]
        .find(p => /of \d+ reviews/.test(p.textContent));

    let currentPage = 0;
    const perPage = 3;


    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const keyword = button.dataset.keyword.toLowerCase();

            reviews.forEach(review => {
                const tags = review.dataset.keywords || '';
                const text = review.textContent.toLowerCase();

                review.dataset.filtered =
                    keyword === 'all' || tags.includes(keyword) || text.includes(keyword)
                        ? ''
                        : 'true';
            });

            currentPage = 0;
            showPage();
        });
    });

    searchInput.addEventListener('input', () => {
        const value = searchInput.value.toLowerCase();

        reviews.forEach(review => {
            review.dataset.filtered = review.textContent.toLowerCase().includes(value)
                ? ''
                : 'true';
        });

        currentPage = 0;
        showPage();
    });


    function getFilteredReviews() {
        return [...reviews].filter(r => !r.dataset.filtered);
    }

    function showPage() {
        const filteredReviews = getFilteredReviews();


        reviews.forEach(r => r.hidden = true);


        const start = currentPage * perPage;
        const end = start + perPage;
        filteredReviews.slice(start, end).forEach(r => r.hidden = false);


        const maxPage = Math.ceil(filteredReviews.length / perPage) - 1;
        currentPage = Math.min(currentPage, maxPage);


        if (reviewCountText) {
            const showingFrom = filteredReviews.length === 0 ? 0 : start + 1;
            const showingTo = Math.min(end, filteredReviews.length);
            const total = filteredReviews.length;
            reviewCountText.textContent = `${showingFrom} - ${showingTo} of ${total} review${total !== 1 ? 's' : ''}`;
        }
    }


    const buttons = document.querySelectorAll('button');
    const prevButton = [...buttons].find(b => b.textContent.trim() === '<');
    const nextButton = [...buttons].find(b => b.textContent.trim() === '>');

    prevButton?.addEventListener('click', () => {
        currentPage = Math.max(0, currentPage - 1);
        showPage();
    });

    nextButton?.addEventListener('click', () => {
        const totalPages = Math.ceil(getFilteredReviews().length / perPage);
        currentPage = Math.min(currentPage + 1, totalPages - 1);
        showPage();
    });


    showPage();

});