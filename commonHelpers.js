import{S as f,i as p,a as x}from"./assets/vendor-f67ecabd.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const a of e)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&t(l)}).observe(document,{childList:!0,subtree:!0});function r(e){const a={};return e.integrity&&(a.integrity=e.integrity),e.referrerpolicy&&(a.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?a.credentials="include":e.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function t(e){if(e.ep)return;e.ep=!0;const a=r(e);fetch(e.href,a)}})();let n=1,d="",c=!1,i=0,m=!1,u=new f(".gallery a");const g=document.querySelector(".end-message");g.classList.add("none");document.getElementById("search-form").addEventListener("submit",async o=>{o.preventDefault();const s=o.target.elements.searchQuery.value.trim();if(!s){p.warning({message:"Please fill in the search field to find images.",position:"topRight"});return}d=s,n=1;const r=await y(d,n);m=!0,i=r.totalHits,r.hits.length>0?(h(r.hits,!0),p.success({message:`Hooray! We found ${i} images.`,position:"topRight"})):p.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"}),o.target.elements.searchQuery.value=""});async function y(o,s){c=!0;const t=`https://pixabay.com/api/?key=40924085-809e05b3e969373237b06a228&q=${encodeURIComponent(o)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${s}`;try{const e=await x.get(t);return c=!1,e.data}catch(e){throw c=!1,console.error("Error fetching images:",e),e}}function h(o,s){const r=document.getElementById("images-container");s&&(r.innerHTML="",u=new f(".gallery a",{captionType:"data",captionDelay:250})),r.innerHTML+=o.map(t=>`<div class="image-item">
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
    
    </div>`).join(""),u.refresh()}const L=new IntersectionObserver((o,s)=>{o[0].isIntersecting&&!c&&(i>n*40?(n++,y(d,n).then(r=>{h(r.hits,!1)})):i<=n*40&&i>0&&m&&g.classList.remove("none"))},{rootMargin:"200px"});L.observe(document.querySelector(".loading-observer"));
//# sourceMappingURL=commonHelpers.js.map
