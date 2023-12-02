import axios from 'axios';

export async function fetchImages(query, page) {
  const apiKey = '40924085-809e05b3e969373237b06a228';
  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  const { data } = await axios.get(url);
  return data;
}
