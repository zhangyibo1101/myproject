//轮播图01
import {
    Slider
} from '../mymodule/slider.js'
import {
    Star
} from '../mymodule/stars.js'
let slidercontainer1 = document.querySelector('.slider1');
let plugin1_1 = document.querySelector('.plugin1_1')
let plugin1_2 = document.querySelector('.plugin1_2')
const myslider1 = new Slider(slidercontainer1, {
        width: '675px',
        height: '270px',
    }, 7, -700, 20000,
    [plugin1_1, null, plugin1_2])
let slidercontainer2 = document.querySelector('.slider2');
let plugin2 = document.querySelector('.plugin2')
const myslider2 = new Slider(slidercontainer2, {
        width: '675px',
        height: '426px',
    }, 5, -700, null,
    [null, plugin2, null])
let slidercontainer3 = document.querySelector('.slider3');
let plugin3 = document.querySelector('.plugin3')
const myslider3 = new Slider(slidercontainer3, {
        width: '675px',
        height: '426px',
    }, 5, -700, null,
    [null, plugin3, null])
let slidercontainer4 = document.querySelector('.slider4');
let plugin4_1 = document.querySelector('.plugin4_1')
let plugin4_2 = document.querySelector('.plugin4_2')
const myslider4 = new Slider(slidercontainer4, {
        width: '675px',
        height: '240px',
    }, 9, -675, 3000,
    [plugin4_1, null, plugin4_2])
window.onload = async function () {
    await fetch('http://42.192.155.29:8080/brief1', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(res => {
            res.data.map(item => {
                myslider1.originarea.innerHTML += `
          <li class='clone' id='slider1li'>
          <a href="#"><img src="${item.URL}" alt="" class='slider1img'></a>
          <div class="name"><a href="#">${item.Name}</a></div>
          <div class='slider1div'>
          <div id='mystar${item.Id}'></div>
          <span class='scorespan'>${item.Score}</span>
          </div>
          <a href="#" class="buy">选座购票</a>
      </li>`
                let stars = new Star(`mystar${item.Id}`, item.Score, 0.5);
                stars.create();
            })
            myslider1.clone(0, 5);
            return res;
        }).then(res=>{
            res.data.map((item,index)=>{
                let slider1li=document.querySelectorAll('#slider1li')
                slider1li[index].addEventListener('click',()=>{
                    sessionStorage.setItem('movieid',item.Id)
                    window.open(basicURL + '/movie-details/build01/detail.html')
                })
            })
        })
    await fetch('http://42.192.155.29:8080/brief2', {
            method: 'GET',
        }).then(res => res.json())
        .then(res => {
            res.data.map(item => {
                myslider2.originarea.innerHTML +=
                    `<a href="#" class="clone" id='slider2a'>
                        <img src="${item.URL}" alt="" class="slider2img">
                        <div class="slider2div">
                            <span class="slider2span1">${item.Name}</span>
                            <span class="slider2span2"></span>
                        </div>
                    </a>`
            })
            myslider2.clone(0, 5);
            myslider2.clone(25, 30);
            return res;
        }).then(res=>{
            res.data.map((item,index)=>{
                let slider1li=document.querySelectorAll('.slider2 #slider2a')
                slider1li[index].addEventListener('click',()=>{
                    sessionStorage.setItem('movieid',item.Id)
                    window.open(basicURL + '/movie-details/build01/detail.html')
                })
            })
        })
    await fetch('http://42.192.155.29:8080/brief3', {
            method: 'GET',
        }).then(res => res.json())
        .then(res => {
            res.data.map(item => {
                myslider3.originarea.innerHTML +=
                    `<a href="#" class="clone" id='slider2a'>
                        <img src="${item.URL}" alt="" class="slider2img">
                        <div class="slider2div">
                            <span class="slider2span1">${item.Name}</span>
                            <span class="slider2span2"></span>
                        </div>
                    </a>`
            })
            myslider3.clone(0, 5);
            myslider3.clone(25, 30);
            return res;
        }).then(res=>{
            res.data.map((item,index)=>{
                let slider1li=document.querySelectorAll('.slider3 #slider2a')
                slider1li[index].addEventListener('click',()=>{
                    sessionStorage.setItem('movieid',item.Id)
                    window.open(basicURL + '/movie-details/build01/detail.html')
                })
            })
        })

    await fetch('http://42.192.155.29:8080/recommend', {
            method: 'GET',
        }).then(res => res.json())
        .then(res => {
            res.data.map(item =>
                myslider4.originarea.innerHTML +=
                `<li class='clone' id='slider4li'>
                <img src="${item.Context}" alt="" class='slider4img'>
                <ul class="gallery-detail">
                <h3>${item.Title}</h3>
                <p>${item.URL}</p>
                </ul>
                </li>`)
            myslider4.clone(0, 1)
        })
    let galleryitem = document.querySelectorAll('#slider4li');
    [...galleryitem].map((item, index) => item.addEventListener('click', () => {
        fetch('http://42.192.155.29:8080/recommend/' + (index + 1), {
                method: 'GET'
            }).then(res => res.json())
            .then(res => {
                sessionStorage.setItem('galleryitem', JSON.stringify(res))
                window.open(basicURL + '/recommend/build/recommend.html')
            })
    }))
    //最受欢迎的影评
    let reviewarea = document.querySelector('.reviews-bd');
    fetch('http://42.192.155.29:8080/mostpopular', {
            method: 'GET',
        }).then(res => res.json())
        .then(res => {
            res.data.map(item => {
                reviewarea.innerHTML +=
                    `<div class="review">
            <img src="${item.URL}" alt="">
            <div class="review-bd">
            <div class="bigtitle">
            <a href="#">${item.Context.split('，')[0]}</a>
            </div>
        <div class="review-meta">
        <a href="#">${item.Name}</a>
        <span>评论</span>
        <a href="#">《${item.MovieName}》</a>
        <div id="stars${item.Id}"></div>
    </div>
    <div class="review-content">
    <div class="commentcontext">${item.Context}</div>
        <a href="#" class="allessay">(全文)</a>
    </div>
    </div>
    </div>`
                let stars = new Star(`stars${item.Id}`, item.StarNum, 0.5);
                stars.create();

            })
        })
}


//整页超链接特效
let alla = document.getElementsByTagName('a');
//  alert(alla.length)
for (let k = 0; k < alla.length; k++) {
    let a_style = getComputedStyle(alla[k], null);
    if ((a_style.color == 'rgb(51, 119, 170)' || a_style.color == 'rgb(34, 119, 170)')) {
        alla[k].addEventListener('mouseover', (e) => {
            e.target.style.backgroundColor = '#37a';
            e.target.style.color = '#ffffff';
        })
        alla[k].addEventListener('mouseout', (e) => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.color = '#37a';
        })
    }
}