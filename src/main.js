import { fetchImages } from './js/gallary-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
let currentQuery = '';
let isLoading = false;
let totalHits = 0;
let isSearchPerformed = false;

const container = document.getElementById('images-container');

let gallery = new SimpleLightbox('.gallery a');

const endOfListMsg = document.querySelector('.end-message');
endOfListMsg.classList.add('none');
document
  .getElementById('search-form')
  .addEventListener('submit', async event => {
    event.preventDefault();
    const query = event.target.elements.searchQuery.value.trim();
    if (!query) {
      iziToast.warning({
        message: 'Please fill in the search field to find images.',
        position: 'topRight',
      });
      return;
    }
    currentQuery = query;
    currentPage = 1;

    try {
      isLoading = true;
      const images = await fetchImages(currentQuery, currentPage);
      isLoading = false;
      isSearchPerformed = true;
      totalHits = images.totalHits;

      if (totalHits <= 0) {
        container.innerHTML = '';
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again.',
          position: 'topRight',
        });
        return;
      }

      // if (images.hits.length > 0) {
      displayImages(images.hits, true);
      iziToast.success({
        message: `Hooray! We found ${totalHits} images.`,
        position: 'topRight',
      });
      // } else {
      //   const container = document.getElementById('images-container');
      //   container.innerHTML = '';
      //   gallery = new SimpleLightbox('.gallery a', {
      //     captionType: 'data',
      //     captionDelay: 250,
      //   });
      //   iziToast.error({
      //     message:
      //       'Sorry, there are no images matching your search query. Please try again.',
      //     position: 'topRight',
      //   });
      // }
    } catch (error) {
      isLoading = false;
      console.error('Error during fetch operation:', error);
      iziToast.error({
        message: 'An error occurred while fetching images.',
        position: 'topRight',
      });
    }

    event.target.elements.searchQuery.value = '';
  });

function displayImages(images, clear) {
  const container = document.getElementById('images-container');
  if (clear) {
    container.innerHTML = '';
    gallery = new SimpleLightbox('.gallery a', {
      captionType: 'data',
      captionDelay: 250,
    });
  }
  images.forEach(image => {
    container.insertAdjacentHTML(
      'beforeend',
      `<div class="image-item">
      <a href="${image.largeImageURL}"><img class="card" src="${image.webformatURL}" alt="${image.tags}" data-title="${image.tags}"/></a>
      <div class="text-container">
        <p class="text">
          <span class="text-decoration">Likes</span>
          <span class="text-decor">${image.likes}</span>
        </p>
        <p class="text">
          <span class="text-decoration">Views</span>
          <span class="text-decor">${image.views}</span>
        </p>
        <p class="text">
          <span class="text-decoration">Comments</span>
          <span class="text-decor">${image.comments}</span>
        </p>
        <p class="text">
          <span class="text-decoration">Downloads</span>
          <span class="text-decor">${image.downloads}</span>
        </p>
      </div>
    </div>`
    );
  });

  gallery.refresh();
}

// ---------skroll

const observer = new IntersectionObserver(
  (entries, observer) => {
    if (entries[0].isIntersecting && !isLoading) {
      if (totalHits > currentPage * 40) {
        currentPage++;
        fetchImages(currentQuery, currentPage).then(data => {
          displayImages(data.hits, false);
        });
      } else if (
        totalHits <= currentPage * 40 &&
        totalHits > 0 &&
        isSearchPerformed
      ) {
        endOfListMsg.classList.remove('none');
      }
    }
  },
  { rootMargin: '50px' }
);

observer.observe(document.querySelector('.loading-observer'));
