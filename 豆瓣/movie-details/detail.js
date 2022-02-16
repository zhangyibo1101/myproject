import {
    Star
} from '../mymodule/stars.js'
import {Marks} from '../mymodule/marks.js'
//接受电影数据
let movie = JSON.parse(sessionStorage.getItem('movie')).data;
//电影图、电影名
let mv = document.getElementById('mv');
let h1 = document.getElementsByTagName('h1')[0];
mv.src = movie.URL;
h1.innerHTML = movie.Name;
//演员
let performers = document.querySelectorAll('.performer img');
movie.PeopleURL.split(',').map((item, index) => {
    performers[index].src = item
})
let performername = document.querySelectorAll('.performername');

movie.NameInfo.split(',').map((item, index) => {
    performername[index].innerHTML = item
})
let performerjob = document.querySelectorAll('.performerjob');
movie.CoverInfo.split(',').map((item, index) => {
    performerjob[index].innerHTML = item;
})
//剧照
let still = document.querySelectorAll('.still img');
movie.MovieURL.split(',').map((item, index) => {
    still[index].src = item;
})
//详细介绍
let messages = document.querySelectorAll('.message li');
Object.values(movie).slice(3, 11).map((item, index) => {
    messages[index].innerHTML += item;
})
let more = document.querySelector('.message a');
more.addEventListener('click', () => {
    for (let i = 0; i < 8; i++) {
        messages[i].classList.remove('hide')
    }
    more.style.display = 'none';
})
//剧情介绍
let introduce = document.getElementById('introduce');
introduce.innerHTML = movie.Synopsis;
//评分、评分
let h2 = document.querySelector('h2');
h2.innerHTML = movie.Score;
let com_p = document.getElementById('com_p');
com_p.innerHTML = movie.HaveWatched + '人评价'
//星级
const bigstar = new Star('bigstar', movie.Score, 0.682);
bigstar.create();
let marks = document.querySelectorAll('.commend span');
//矩形红条
let rectangle=document.querySelectorAll('.rectangle');
movie.Star.split(",").map((item,index)=>{
    marks[index].innerHTML=item;
    console.log(item.split('%')[0])
    rectangle[index].style.width=`${item.split('%')[0]*1.2}`+'px'
})

let commonfonts = document.getElementsByClassName('commonfont');
commonfonts[0].innerHTML = movie.Name + '的剧情介绍 · · · · · ·';
commonfonts[1].innerHTML = movie.Name + '的演职员 · · · · · ·';
commonfonts[2].innerHTML = movie.Name + '的剧照 · · · · · ·';
commonfonts[3].innerHTML = movie.Name + '的短评 · · · · · ·';
commonfonts[4].innerHTML = movie.Name + '的影评 · · · · · ·';
//接受讨论数据
let discuss = JSON.parse(sessionStorage.getItem('discuss')).data;
let disarea = document.querySelector('.discuss');
discuss.forEach(item => {
    disarea.innerHTML +=
        `<ul>
    <li><a href='#'>${item.context.split('&')[0]}</a></li>
    <li>${item.comment_num}回应</li>
    <li>来自<a href='#'>${item.name}</a></li>
    <li>${item.post_time}</li>
</ul>`
})

//接受短评数据
let shortarea = document.getElementsByClassName('short')[0];
let shorts = JSON.parse(sessionStorage.getItem('short')).data;
shorts.forEach(item => {
    shortarea.innerHTML +=
        `<ul>
    <li>
        <a href="#">${item.Name}</a>
        <div class="stars" id="short_star${item.id}"></div>
        <span class="clock">${item.CommentTime}</span>
        <a href="#" class="usea">有用</a>
        <span class="usenum">${item.Likes}</span>
    </li>
    <li>${item.Context}</li>
</ul>`
    let star2 = new Star(`short_star${item.id}`, item.StarNum, 0.5);
    star2.create();
})
//接受影评数据
let filecomments = JSON.parse(sessionStorage.getItem('filecomment')).data;
let filecommentarea = document.querySelector('.movie');
filecomments.forEach(item => {
    filecommentarea.innerHTML +=
        `<ul>
    <li>
        <img src="./tiger1.png" alt="">
        <a href="#">${item.name}</a>
        <div id="movie_star${item.id}" class="stars"></div>
        <span class="clock">${item.post_time}</span>
    <li><a href="#">${item.context.split('，')[0]}</a></li>
    <li>${item.context}</li>
    <li>
        <a href="#">up:${item.likes}</a>
        <a href="#">down:${item.star_num}</a>
        <a href="#">${item.comment_num}回应</a>
    </li>
</ul>`
    let star1 = new Star(`movie_star${item.id}`, item.star_num, 0.5);
    star1.create();
})
//讨论区
let basicURL='http://127.0.0.1:5500';
let btns = document.getElementsByTagName('button');
console.log(btns[1].innerHTML);
btns[2].addEventListener('click', () => {
    if (username) {
        window.location.replace(basicURL+'/discuss/discuss.html')
    } else {
        alert('请先登录豆瓣')
    }
})
btns[1].addEventListener('click',()=> {
    if (username) {
        sessionStorage.setItem('iscommend',true)
        window.location.replace(basicURL+'/discuss/discuss.html')
    } else {
        alert('请先登录豆瓣')
    }
})

//查看影人
let imgs = document.querySelectorAll('.performer img');
[...imgs].map((image,index)=>{
    image.addEventListener('click', () => {
        fetch(`http://42.192.155.29:8080/movie/${movieid}/${index+1}`, {
                method: 'GET'
            }).then(res => res.json())
            .then(res => {
                sessionStorage.setItem('performer', JSON.stringify(res))
                window.location.replace(basicURL+'/performer/build/performer.html')
            })
    })
})
//评分
const tomark1=new Marks('marks1',0.5,-1)
tomark1.start();
const tomark2=new Marks('marks2',0.5,-1)
tomark2.start();
Array.from(tomark1.stars).map(star=>star.addEventListener('click',()=>{
    springwindow.style.visibility='visible';
    smalltips.innerHTML='添加收藏：我看过这部电影';
    havewatch.checked='checked';
    tomark2.num=tomark1.num
    tomark2.changeoff();
    tomark1.stop();
}))
//短评
btns[0].addEventListener('click',()=>{
    springwindow.style.visibility='visible';
    smalltips.innerHTML='添加收藏：写短评';
    havewatch.checked='checked';
})
//想看、看过
let springwindow=document.querySelector('.springwindow');
let gact=document.querySelector('.gact')
let wanttowatch=document.getElementById('wanttowatch');
let havewatch=document.getElementById('havewatch');
let mytoken=sessionStorage.getItem('token');
let save=document.getElementById('save');
let movieid=movie.Id;
let smalltips=document.querySelector('.smalltips');
let shortcommend=document.getElementById('shortcommend');
save.addEventListener('click',()=>{
    if(mytoken){
        if(wanttowatch.checked){
            fetch('http://42.192.155.29:8080/movie/wtw/'+movieid,{
                method:'GET',
                headers:{
                    token:mytoken
                }
            }).then(res=>res.json())
            .then(res=>alert('添加想看'+res.info))
        }else if(havewatch.checked){
            fetch('http://42.192.155.29:8080/movie/hw/'+movieid,{
                method:'GET',
                headers:{
                    token:mytoken
                }
            }).then(res=>res.json())
            .then(res=>alert('添加看过'+res.info))
            if(shortcommend.value){
                let formdata=new FormData();
                formdata.append('context',shortcommend.value);
                formdata.append('starNum',(tomark2.num+1)*2);
                formdata.append('status','看过')
                fetch('http://42.192.155.29:8080/shortcomment/'+movieid,{
                    method:'POST',
                    headers:{
                        token:mytoken
                    },
                    body:formdata
                }).then(res=>res.json())
                .then(res=>alert('添加短评'+res.info))
            }
        }else{
            alert('请完成表单！')
        }
    }else(alert('请先登录豆瓣！'))
})
gact.addEventListener('click',()=>{
    springwindow.style.visibility='hidden';
})
let ui=document.querySelectorAll('.ui1 a');
ui[0].addEventListener('click',()=>{
    springwindow.style.visibility='visible';
    smalltips.innerHTML='添加收藏：我想看这部电影';
    wanttowatch.checked='checked';
})
ui[1].addEventListener('click',()=>{
    springwindow.style.visibility='visible';
    smalltips.innerHTML='添加收藏：我看过这部电影';
    havewatch.checked='checked';
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