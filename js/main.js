'use strict';
import imageArr from "./gallery-items.js"

const refs = {
    gallery: document.querySelector(".js-gallery"),
    lightbox: document.querySelector(".js-lightbox"),
    lightboxImage: document.querySelector(".lightbox__image"),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
}

const createElementString = ({preview, original, description}) => {
  return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
  <img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}">
  </a></li>`;
};

const fragment = imageArr.map((img) => createElementString(img)).join('');
refs.gallery.insertAdjacentHTML('beforeend', fragment);

function openBigImage(event){
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    event.preventDefault();

    const image = event.target;
    refs.lightboxImage.src = image.dataset.source;
    refs.lightboxImage.alt = image.alt;
    refs.lightbox.classList.add('is-open');
}

function closeBigImage(){
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = '';
}

refs.gallery.addEventListener('click', openBigImage);
refs.closeModalBtn.addEventListener('click', closeBigImage);