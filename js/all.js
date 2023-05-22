const viewport = () => {
    if (window.innerWidth >= 1296){
        return 'pc';
    } else if (window.innerWidth < 1296 && window.innerWidth > 425){
        return 'unsupported';
    } else {
        return 'mobile';
    }
}

$(document).ready(() => {

    device = viewport();
    window.addEventListener('resize', () => {
        device = viewport();
    })
})

$('a:not(.header a, .footer-nav a)').click((e) => {
    e.preventDefault();
})

$('.footer-about-to-top').click(() => {
    $('html,body').animate({
        scrollTop: 0
    }, 750);
});

const burgerMenu = document.querySelector('.burger-btn');
const burgerNav = document.querySelector('.mobile-burger-nav');

burgerMenu.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'SPAN'){
        return;
    }
    [...burgerMenu.children].forEach((btn) => {
        btn.classList.toggle('active');
    })
    burgerNav.classList.toggle('active');
    
})


const body = document.querySelector('body');
const detailSortBlock = document.querySelector('.detail-sort-block');
const featureFilter = document.querySelector('.feature-sort-filter');
const featureFilterAry = [...featureFilter.children];
const timeSortBlock = document.querySelector('.time-sortlist')

const domSelectedOption = document.querySelector('.sorted-options');
const detailIcon = document.querySelector('.detail-sort-btn span:last-child');
let detailFilter = [];
let numSelectedOption = 0;

const timeSortBtnContent = document.querySelector('.time-sort-block span:first-child');

body.addEventListener('click', (e) => {
    let res = [...$(e.target).parents()].filter((item) => {
        if (item.classList.contains('detail-sort-list-block') ||
            item.classList.contains('time-sort-block')){
                return item;
        }
    })

    if (!res[0]){
        detailSortBlock.classList.remove('active');
        timeSortBlock.classList.remove('active');
    }

    if (e.target.nodeName !== 'BUTTON'){
        return;
    }

    if (e.target.dataset.type === 'detail-sort'){
        detailSortBlock.classList.toggle('active');
    }

    if (e.target.parentNode.dataset.type === "feature-sort"){
        featureFilterAry.forEach((btn) => {
            btn.classList.remove('active');
            e.target.classList.add('active');
        })
    }

    if (e.target.dataset.type === 'time-sort'){
        timeSortBlock.classList.toggle('active');
    }

})

detailSortBlock.addEventListener('click', (e) => {
    detailFilter = [];

    if (e.target.nodeName === 'LI'){

        e.target.firstElementChild.classList.toggle('active');

        let optionType = e.target.dataset.option;
        if (e.target.dataset.id === '0'){
            let ul = [...document.querySelector(`.${optionType}-sortlist`).children];
            ul.forEach((li) => {
                if (e.target.firstElementChild.classList.contains('active')){
                    li.firstElementChild.classList.add('active');
                } else {
                    li.firstElementChild.classList.remove('active');
                }
            })
        }

        let authorFilter = document.querySelectorAll('.author-sortlist span.active');
        if (authorFilter.length < 5){
            document.querySelector('.author-sortlist > li:first-child span').classList.remove('active');
        }
        let typeFilter = document.querySelectorAll('.type-sortlist span.active');
        if (typeFilter.length < 7){
            document.querySelector('.type-sortlist > li:first-child span').classList.remove('active');
        }

        let selectedFilter = document.querySelectorAll('.detail-sort-block span.active');
        selectedFilter.forEach((item) => {
            detailFilter.push(item.previousSibling.textContent.trim());
        })

        domSelectedOption.classList.remove('active');
        detailIcon.classList.add('active');
        numSelectedOption = detailFilter.length;
        domSelectedOption.textContent = numSelectedOption;
        if (numSelectedOption !== 12 && numSelectedOption !== 0){
            domSelectedOption.classList.add('active');
            detailIcon.classList.remove('active');
        }
    }
})

timeSortBlock.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'LI'){
        return;
    }

    timeSortBtnContent.textContent = e.target.textContent;
    timeSortBlock.classList.remove('active');
})

const pageBar = document.querySelector('.page-bar');

pageBar.addEventListener('click', (e) => {
    if (e.target.nodeName !== 'BUTTON'){
        return;
    }

    let nowPageDOM = [...pageBar.children].filter((btn) => {
        return btn.classList.contains('active');
    })

    nowPage = nowPageDOM[0].dataset.page;
    [...pageBar.children].forEach((btn) => {
        btn.classList.remove('active');
    })

    if (e.target.dataset.page === 'next'){
        if (nowPage === '5'){
            pageBar.children[0].classList.add("active");
            return;
        }
        pageBar.children[nowPage].classList.add("active");
    } else {
        e.target.classList.add('active');
    }
})

if (window.location.href.includes('pricing')){
    const questionCard = document.querySelectorAll('.question-card');

    questionCard.forEach((card) => {
        card.addEventListener('click', (e) => {
            if (e.target.nodeName !== 'SPAN'){
                return;
            }

            let id = e.target.parentNode.dataset.id;
            let icons = [...questionCard[id].children[0].children];
            icons.forEach((icon) => {
                icon.classList.toggle('active');
            })
            let answer = questionCard[id].children[1].children[1];
            answer.classList.toggle('active');
        })
    })
}