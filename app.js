// PreLoader
var overlay = document.getElementById("overlay");
window.addEventListener('load', ()=>{overlay.style.display = 'none'})
const posts = document.querySelector('.posts')
const searchBtn = document.querySelector('.search-btn')
const searchInput = document.querySelector('.search-input')
const loadPosts = (search) => {
  fetch('db.json').then(res=>res.json()).then(res=>{
    const keyword = searchInput.value?searchInput.value:false;
    const regex = new RegExp(` ${keyword} `, "ig") || undefined;
    const data = search?res.filter(item=>{return regex.test(item.description)||regex.test(item.title)}).sort((a,b)=>0.5-Math.random()).slice(0,100):res.sort((a,b)=>0.5-Math.random()).slice(0,100)
    if(data.length>0){
      data.forEach(post => {
        const postChild = document.createElement('div')
        const title = document.createElement('h2')
        const desc = document.createElement('p')
        const flex = document.createElement('div')
        const blog = document.createElement('a')
        const readMore = document.createElement('a')
  
        postChild.className='post'
        title.className='title'
        desc.className='desc'
        flex.className='flex'
        blog.className='blog'
        readMore.className='read-more'
  
        title.innerText=post.title
        desc.innerText=post.description
        blog.innerText=`Source: ${post.blog}`
        readMore.innerText='Read more'
        
        blog.setAttribute('href',post.source)
        readMore.setAttribute('href',post.url)
        
        blog.setAttribute('target','_blank')
        readMore.setAttribute('target','_blank')
        
        postChild.appendChild(title)
        postChild.appendChild(desc)
        postChild.appendChild(flex)
        flex.appendChild(blog)
        flex.appendChild(readMore)
        postChild.appendChild(flex)
        posts.appendChild(postChild)
      });
    }else{
      posts.innerHTML='<div class="err">Not found! try another keyword</div>'
    }
    }).catch(err=> document.innerHTML=err)
}

loadPosts()
searchBtn.onclick=()=>{
  posts.innerHTML=''
  loadPosts(searchInput.value)
}