import{a as x,S as f,i as c}from"./assets/vendor-f67ecabd.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();async function m(a,r){const t=`https://pixabay.com/api/?key=40924085-809e05b3e969373237b06a228&q=${encodeURIComponent(a)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${r}`,{data:e}=await x.get(t);return e}let n=1,p="",l=!1,i=0,g=!1;const L=document.getElementById("images-container");let u=new f(".gallery a");const y=document.querySelector(".end-message");y.classList.add("none");document.getElementById("search-form").addEventListener("submit",async a=>{a.preventDefault();const r=a.target.elements.searchQuery.value.trim();if(!r){c.warning({message:"Please fill in the search field to find images.",position:"topRight"});return}p=r,n=1;try{l=!0;const s=await m(p,n);if(l=!1,g=!0,i=s.totalHits,i<=0){L.innerHTML="",c.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"});return}h(s.hits,!0),c.success({message:`Hooray! We found ${i} images.`,position:"topRight"})}catch(s){l=!1,console.error("Error during fetch operation:",s),c.error({message:"An error occurred while fetching images.",position:"topRight"})}a.target.elements.searchQuery.value=""});function h(a,r){const s=document.getElementById("images-container");r&&(s.innerHTML="",u=new f(".gallery a",{captionType:"data",captionDelay:250})),a.forEach(t=>{s.insertAdjacentHTML("beforeend",`<div class="image-item">
      <a href="${t.largeImageURL}"><img class="card" src="${t.webformatURL}" alt="${t.tags}" data-title="${t.tags}"/></a>
      <div class="text-container">
        <p class="text">
          <span class="text-decoration">Likes</span>
          <span class="text-decor">${t.likes}</span>
        </p>
        <p class="text">
          <span class="text-decoration">Views</span>
          <span class="text-decor">${t.views}</span>
        </p>
        <p class="text">
          <span class="text-decoration">Comments</span>
          <span class="text-decor">${t.comments}</span>
        </p>
        <p class="text">
          <span class="text-decoration">Downloads</span>
          <span class="text-decor">${t.downloads}</span>
        </p>
      </div>
    </div>`)}),u.refresh()}const b=new IntersectionObserver((a,r)=>{a[0].isIntersecting&&!l&&(i>n*40?(n++,m(p,n).then(s=>{h(s.hits,!1)})):i<=n*40&&i>0&&g&&y.classList.remove("none"))},{rootMargin:"50px"});b.observe(document.querySelector(".loading-observer"));
//# sourceMappingURL=commonHelpers.js.map
