import {
    Star
} from '../mymodule/stars.js'
let h1 = document.getElementsByTagName('h1')[0];
let me = document.getElementById('me');
let username = sessionStorage.getItem('username');
if (username) {
    h1.innerHTML += username;
    me.innerHTML += username;
}
let selfinfo1 = JSON.parse(sessionStorage.getItem('selfinfo1')).data;
let selfinfo2 = JSON.parse(sessionStorage.getItem('selfinfo2')).data;
let selfinfo3 = JSON.parse(sessionStorage.getItem('selfinfo3')).data;
//自我介绍
let selfarea1 = document.querySelector('.dairy');
let registarea = document.querySelector('.registdate');
let random = document.querySelector('.random')
if (selfinfo1) {
    selfarea1.innerHTML = selfinfo1[0].SelfIntroduction
    registarea.innerHTML = selfinfo1[0].RegisterTime
    random.innerHTML = Math.round(Math.random() * 10E8)
}
//想看、看过
let wantoarea = document.querySelector('.wanto');
selfinfo2[0].WantToWatchURL.split(',').map(item => {
    wantoarea.innerHTML += `<img src="${item}" alt="">`
})
let havearea = document.querySelector('#havewatch');
selfinfo2[0].HaveWatchedURL.split(',').map(item => {
    havearea.innerHTML += `<img src="${item}" alt="">`
})
//影评
let commendarea = document.querySelector('.commendarea');
selfinfo3.map((item,index) => {
    commendarea.innerHTML += `
    <div class="commends">
                        <img src="${item.URL}" class="commendimg">
                        <a  href="#" class="commendtitle">${item.Context.split('，')[0]}</a>
                        <div class="commendbd">
                         <a href="#">${item.Name}</a>
                         评论：
                         <a class="movietitle">${item.MovieName}</a>
                         <span class="stars" id="stars${item.Id}"></span>
                        </div>
                        <div class="commendcontext">${item.Context}</div>
                    </div>`
    // let commends=document.querySelectorAll('.commends');
    // console.log(commends[index]);
    // commends[index].addEventListener('click',()=>{
    //     sessionStorage.setItem('movieid',item.Id)
    //     window.open('/movie-details/build01/detail.html')
    // })
    let mystar = new Star(`stars${item.Id}`, item.StarNum, 0.5);
    mystar.create();
})
selfinfo3.map((item,index)=>{
    let commends=document.querySelectorAll('.commends');
    console.log(commends[index]);
    commends[index].addEventListener('click',()=>{
        sessionStorage.setItem('movieid',item.Id)
        window.open('/movie-details/build01/detail.html')
    })
})

//动态更新背景
let wrapper = document.querySelector('.wrapper');
let content = document.querySelector('.content');
let article = document.querySelector('article');

article.style.height = 'auto'

let article_style = getComputedStyle(article, null)
content.style.height = article_style.height
wrapper.style.height = article_style.height
let wrapper_style = getComputedStyle(wrapper, null)
let content_style = getComputedStyle(content, null)
console.log(wrapper_style.height)
console.log(content_style.height)
console.log(article_style.height)