import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let currentPage = 1;
let currentQuery = '';
let isLoading = false;
let totalHits = 0;
let isSearchPerformed = false;

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
    const images = await fetchImages(currentQuery, currentPage);
    isSearchPerformed = true;
    totalHits = images.totalHits;
    if (images.hits.length > 0) {
      displayImages(images.hits, true);
      iziToast.success({
        message: `Hooray! We found ${totalHits} images.`,
        position: 'topRight',
      });
    } else {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
      });
    }
    event.target.elements.searchQuery.value = '';
  });

async function fetchImages(query, page) {
  isLoading = true;
  const apiKey = '40924085-809e05b3e969373237b06a228';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  try {
    const response = await axios.get(url);
    isLoading = false;
    return response.data;
  } catch (error) {
    isLoading = false;
    console.error('Error fetching images:', error);
    throw error;
  }
}

function displayImages(images, clear) {
  const container = document.getElementById('images-container');
  if (clear) {
    container.innerHTML = '';
    gallery = new SimpleLightbox('.gallery a', {
      captionType: 'data',
      captionDelay: 250,
    });
  }
  container.innerHTML += images
    .map(
      image =>
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
    )
    .join('');
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
  { rootMargin: '200px' }
);

observer.observe(document.querySelector('.loading-observer'));
