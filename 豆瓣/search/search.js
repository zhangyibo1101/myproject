import {
    Star
  } from '../mymodule/stars.js'
let res=document.querySelector('.res');
let result=JSON.parse(sessionStorage.getItem('searchresult')).movie;
console.log(result);
let h1=document.querySelector('h1');
h1.innerHTML+=' '+sessionStorage.getItem('searchthing')
result.map(item=>{
    res.innerHTML+=`
    <ul class="harvest">
                    <img src="${item.URL}" alt="">
                    <div class="detail">
                        <a href="">${item.Name}</a>
                        <div class="marks">
                            <div id="star${item.Name}"></div>
                            <span class="glod">${item.Score}</span>
                            <span class="peo">(${item.HaveWatched}人评论)</span>
                        </div>
                        <div class="abstract">${item.Country}/${item.Type}/${item.Length}</div>
                        <div class="abstract">${item.Starring}</div>

                    </div>
                </ul>`
                let star=new Star(`star${item.Name}`,item.Score,0.5);
                star.create();
})

//动态更新背景
let wrapper=document.querySelector('.wrapper');
let content=document.querySelector('.content');
let article=document.querySelector('article');
let aside=document.querySelector('aside');
aside.style.height='0'
article.style.height='auto'

let article_style=getComputedStyle(article,null)
content.style.height=article_style.height
wrapper.style.height=article_style.height
let wrapper_style=getComputedStyle(wrapper,null)
let content_style=getComputedStyle(content,null)
console.log(wrapper_style.height)
console.log(content_style.height)
console.log(article_style.height)