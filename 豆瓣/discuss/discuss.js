import {Marks} from '../mymodule/marks.js'
let movie = JSON.parse(sessionStorage.getItem('movie')).data;
let img = document.querySelector('.card img');
img.src = movie.URL;
let moviename=document.querySelector('.card div');
moviename.innerHTML=movie.Name
// 提交
let submit = document.querySelector('.submit');
let texts = document.querySelectorAll('textarea');
let mytoken = sessionStorage.getItem('token');
let num=sessionStorage.getItem('num');
let basicURL='';
// 评分功能
const tomarks=new Marks('marks',0.5,-1)
tomarks.start();
//影评、讨论双功能
let png=document.querySelector('header img');
if(sessionStorage.getItem('iscommend')){
    png.src='./commend.png'
    submit.addEventListener('click', () => {
        let formdata = new FormData();
        formdata.append('context', texts[0].value+'，'+texts[1].value)
        formdata.append('star_num',(tomarks.num+1)*2)//待实现
        fetch('http://42.192.155.29:8080/filmcomment/'+num, {
            method: 'POST',
            headers: {
                token: mytoken
            },
            body: formdata,
        }).then(res => res.json()).then(res => {
            alert(res.info);
            window.location.replace(basicURL+'/movie-details/build01/detail.html')
        })
    })
}else {
    submit.addEventListener('click', () => {
        let formdata = new FormData();
        formdata.append('context', texts[0].value + "，" + texts[1].value)
        fetch('http://42.192.155.29:8080/topic/'+num, {
            method: 'POST',
            headers: {
                token: mytoken
            },
            body: formdata,
        }).then(res => res.json()).then(res => {
            alert(res.info);
            window.location.replace(basicURL+'/movie-details/build01/detail.html')
        })
    })
}