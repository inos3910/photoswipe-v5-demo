import imagesLoaded from 'imagesloaded'
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

class Gallery {
  constructor() {
    this.imagesloaded();
  }

  imagesloaded(){
    const gallery = document.querySelector('[data-pswp]');
    if(!gallery){
      return;
    }

    imagesLoaded(gallery, () => {
      gallery.classList.remove('is-loading');
      this.imagePopUp(gallery);
    });
  }

  // スライド画像のポップアップ（PhotoSwipe）
  imagePopUp(gallery){
    if(!gallery){
      return;
    }

    const galleries = gallery.querySelectorAll('a');

    galleries.forEach((el) => {
      const img = el.querySelector('img');
      el.setAttribute('data-pswp-width', img.naturalWidth);
      el.setAttribute('data-pswp-height', img.naturalHeight);
    });

    const lightbox = new PhotoSwipeLightbox({
      gallery              : gallery,
      children             : 'a',
      showHideAnimationType: 'zoom',
      pswpModule           : PhotoSwipe
    });

    lightbox.init();
  }
}

new Gallery();