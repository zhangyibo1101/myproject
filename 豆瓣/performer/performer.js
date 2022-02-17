let per = JSON.parse(sessionStorage.getItem('performer')).data;
let h1 = document.querySelector('h1');
h1.innerHTML = per.Name;
let img = document.querySelector('.headline img');
img.src = per.URL;
let info = document.querySelectorAll('#info li');
per.Info.split(',').forEach((item, index) => {
    info[index].innerHTML += `<span>${item}</span>`;
})
let bd = document.querySelector('.bd');
let introduce=document.querySelector('.introduce');
bd.innerHTML += per.Synopsis;
let more = document.querySelector('.bd span');
more.addEventListener('click', () => {
    bd.style.overflow='visible';
    more.style.display='none';
    introduce.style.height='auto';
    bd.style.height='auto';
})
// 最近上映的5部作品
let year=document.querySelectorAll('.year');
per.YearInfo.split(',').map((item,index)=> {
    year[index].innerHTML=item
})
let img1=document.querySelectorAll('.opus img')
per.URLInfo1.split(',').map((item,index)=> {
    img1[index].src=item
})
let title1=document.querySelectorAll('.opus .title')
per.NameInfo1.split(',').map((item,index)=> {
    title1[index].innerHTML=item
})
//最受好评的五部作品
let img2=document.querySelectorAll('.best img')
per.URLInfo2.split(',').map((item,index)=> {
    img2[index].src=item
})
let title2=document.querySelectorAll('.best .title')
per.NameInfo2.split(',').map((item,index)=> {
    title2[index].innerHTML=item
})
// 合作零次的影人
let img3=document.querySelectorAll('.people img')
per.URLInfo3.split(',').map((item,index)=> {
    img3[index].src=item
})
let title3=document.querySelectorAll('.people .title')
per.NameInfo3.split(',').map((item,index)=> {
    title3[index].innerHTML=item
})
//获奖情况
let award=document.querySelector('.award');
per.Award.split('\n').map(item=>{
    award.innerHTML+=`<li>${item}</li>`
})
//点击电影查看详情
let opusli=document.querySelectorAll('.opus li');
[...opusli].map(item=>{
    item.addEventListener('click',()=>{
        window.location.replace(basicURL+'/movie-details/build01/detail.html')
    })
})


//动态更新背景
let wrapper=document.querySelector('.wrapper');
let content=document.querySelector('.content');
let article=document.querySelector('article');

article.style.height='auto'

let article_style=getComputedStyle(article,null)
content.style.height=article_style.height
wrapper.style.height=article_style.height
let wrapper_style=getComputedStyle(wrapper,null)
let content_style=getComputedStyle(content,null)
console.log(wrapper_style.height)
console.log(content_style.height)
console.log(article_style.height)
