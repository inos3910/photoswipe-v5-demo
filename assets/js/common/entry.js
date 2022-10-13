import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';

class Gallery {
  constructor() {
    this.imagePopUp();
  }

  //特定の画像の読み込み
  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  }

  // スライド画像のポップアップ（PhotoSwipe）
  imagePopUp(){
    const gallery = document.querySelector('#js-gallery');
    if(!gallery){
      return;
    }

    const galleries = gallery.querySelectorAll('a');
    galleries.forEach( async (el, index, array) => {
      // this.loadImage(el.href).then( img => {
      //   el.setAttribute('data-pswp-width', img.naturalWidth);
      //   el.setAttribute('data-pswp-height', img.naturalHeight);
      //   el.classList.remove('is-loading');
      // });

      const img = await this.loadImage(el.href);
      el.setAttribute('data-pswp-width', img.naturalWidth);
      el.setAttribute('data-pswp-height', img.naturalHeight);
      el.classList.remove('is-loading');
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