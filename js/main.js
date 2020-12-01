'use strict';
import imageArr from "./gallery-items.js"

const refs = {
    gallery: document.querySelector(".js-gallery"),
    lightbox: document.querySelector(".js-lightbox"),
    lightboxImage: document.querySelector(".lightbox__image"),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
}

const createElementString = ({preview, original, description, index}) => {
  return `<li class="gallery__item">
  <a class="gallery__link" href="${original}">
  <img class="gallery__image" src="${preview}" data-source="${original}" data-index="${index}" alt="${description}">
  </a></li>`;
};

const fragment = imageArr.reduce((acc, image) => acc + createElementString(image), '');
refs.gallery.insertAdjacentHTML('beforeend', fragment);

function openBigImage(event){
    if (event.target.nodeName !== 'IMG') return;
    event.preventDefault();
    refs.lightbox.classList.add('is-open');

    refs.closeModalBtn.addEventListener('click', closeBigImage);
    refs.lightboxOverlay.addEventListener('click', closeBigImage);
    addEventListener('keydown', checkEscapeBtn);
    addEventListener('keydown', checkRightBtn);
    addEventListener('keydown', checkLeftBtn);

    const image = event.target;
    refs.lightboxImage.src = image.dataset.source;
    refs.lightboxImage.alt = image.alt;
    refs.lightboxImage.dataset.index = image.dataset.index;
}

function closeBigImage(){
    refs.lightbox.classList.remove('is-open');
    
    refs.closeModalBtn.removeEventListener('click', closeBigImage);
    refs.lightboxOverlay.removeEventListener('click', closeBigImage);
    removeEventListener('keydown', checkEscapeBtn);
    removeEventListener('keydown', checkRightBtn);
    removeEventListener('keydown', checkLeftBtn);

    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = '';
    refs.lightboxImage.dataset.index = '';
}

function checkEscapeBtn(event){
    if (event.code !== 'Escape') return;
    closeBigImage();
}

function setNewImage(){
    const newImageRef = refs.gallery.querySelector(`[data-index="${refs.lightboxImage.dataset.index}"]`)
    refs.lightboxImage.src = newImageRef.dataset.source;
    refs.lightboxImage.alt = newImageRef.alt;
}

function nextImage(){
    const image = refs.lightboxImage.dataset;
    if ((Number(image.index) + 1 === refs.gallery.childElementCount)) image.index = 0;
    else image.index = Number(image.index) + 1;
    setNewImage();
}

function prevImage(){
    const image = refs.lightboxImage.dataset;
    if (Number(image.index) - 1 === -1) image.index = refs.gallery.childElementCount - 1;
    else image.index = Number(image.index) - 1;
    setNewImage();
}

function checkRightBtn(event){
    if (event.code !== 'ArrowRight') return;
    nextImage();
}

function checkLeftBtn(event){
    if (event.code !== 'ArrowLeft') return;
    prevImage();
}

refs.gallery.addEventListener('click', openBigImage);