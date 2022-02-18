import {
    Star
} from '../mymodule/stars.js'
let h1 = document.getElementsByTagName('h1')[0];
let me = document.getElementById('me');
let username = sessionStorage.getItem('username');
let mytoken = sessionStorage.getItem('token');
if (mytoken) {
    h1.innerHTML += username;
    me.innerHTML += username;
}

function newfetch(url) {
    return new Promise((resolve, reject) => {
        fetch(url, {
                method: 'GET',
                headers: {
                    token: mytoken,
                }
            }).then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}
async function sendbyfetch() {
    //自我介绍
    let res1 = await newfetch('http://42.192.155.29:8080/user/user1');
    let selfarea1 = document.querySelector('.dairy');
    let registarea = document.querySelector('.registdate');
    let random = document.querySelector('.random')
    selfarea1.innerHTML = res1.data[0].SelfIntroduction
    registarea.innerHTML = res1.data[0].RegisterTime
    random.innerHTML = Math.round(Math.random() * 10E8)
    //想看、看过
    let res2 = await newfetch('http://42.192.155.29:8080/user/user2');
    let wantoarea = document.querySelector('.wanto');
    [...new Set(res2.data[0].WantToWatchURL.slice(1).split(','))].map(item => {
        wantoarea.innerHTML += `<img src="${item}" alt="">`
    })
    let havearea = document.querySelector('#havewatch');
    [...new Set(res2.data[0].HaveWatchedURL.slice(1).split(','))].map(item => {
        havearea.innerHTML += `<img src="${item}" alt="">`
    })
    //影评
    let res3 = await newfetch('http://42.192.155.29:8080/user/user3');
    let commendarea = document.querySelector('.commendarea');
    if (res3.data) {
        if (commendarea.classList.contains('commendstyle')) commendarea.classList.remove('commendstyle')
        res3.data.map(item => {
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
                            <a href="#" style="color:red;" class="delete">删除</a>
                        </div>`
            let mystar = new Star(`stars${item.Id}`, item.StarNum, 0.5);
            mystar.create();
        })

        res3.data.map((item, index) => {
            let commends = document.querySelectorAll('.commendimg');
            commends[index].addEventListener('click', () => {
                sessionStorage.setItem('movieid', item.MovieId)
                window.open('/movie-details/build01/detail.html')
            })

            // 删除
            let mydelete = document.querySelectorAll('.delete');
            mydelete[index].addEventListener('click', () => {
                console.log(item.Id);
                fetch('http://42.192.155.29:8080/filmcomment/' + item.Id, {
                        method: "DELETE",
                        headers: {
                            token: mytoken
                        }
                    }).then(res => res.json())
                    .then(res => {
                        alert('删除' + res.info);
                        window.location.reload();
                    })
            })
        })
    } else {
        commendarea.classList.add('commendstyle')
        commendarea.innerHTML = "您还没有评价哦~~"
    }
    // 写留言
    let mymessage = document.querySelector('.mymessage');
    let submitmess = document.querySelector('.submitmess');
    submitmess.addEventListener('click', () => {
        let formdata = new FormData();
        formdata.append('new_introduction', mymessage.value)
        fetch('http://42.192.155.29:8080/user/introduction', {
                method: 'POST',
                headers: {
                    token: mytoken
                },
                body: formdata
            }).then(res => res.json())
            .then(res => window.location.reload())
    })
    //动态更新背景
    let wrapper = document.querySelector('.wrapper');
    let content = document.querySelector('.content');
    let article = document.querySelector('article');

    article.style.height = 'auto'

    let article_style = getComputedStyle(article, null)
    content.style.height = article_style.height
    wrapper.style.height = article_style.height

}
window.onload = function () {
    sendbyfetch();
}