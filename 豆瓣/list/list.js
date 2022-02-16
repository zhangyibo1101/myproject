import {
    Star
} from '../mymodule/stars.js'
let movielist = JSON.parse(sessionStorage.getItem('list1')).data;
let bd = document.querySelector('.bd');
movielist.map(item => {
    bd.innerHTML += `
    <ul class="movie">
                    <img src="${item.URL}" alt="">
                    <a href="#" class="title">${item.Name}</a>
                    <div class="context">${item.Starring}</div>
                    <div class="bottom">
                        <div class="stars" id="${item.Name}"></div>
                        <span class="marks">${item.Score}</span>
                        <span class="peonum">(${item.HaveWatched}人评论)</span>
                    </div>
                    
                </ul>
    `
    let stars = new Star(`${item.Name}`, item.Score, 0.5);
    stars.create();
})
//分类排行榜
let classlist = '剧情 喜剧 动作 爱情 科幻 动画,悬疑 惊悚 恐怖 纪录片 短片 情色,同性 音乐 歌舞 家庭 儿童 传记,历史 战争 犯罪 西部 奇幻 冒险,灾难 武侠 古装 运动 黑色电影';
let classlistarea = document.querySelector('.classlistarea')
classlist.split(',').map(father => {
    father.split(' ').map(son => {
        classlistarea.innerHTML += `
        <a href='#'>${son}</a>
        `
    })
    classlistarea.innerHTML += `</br>`
})
//一周榜单 
let weeklistarea = document.querySelector('.weeklist');
let weeklist = JSON.parse(sessionStorage.getItem('list2')).data;
weeklist.map(item => {
    weeklistarea.innerHTML += `
    <li>
                    <div class="no">${item.Id}</div>
                    <a href="#" class="listname">${item.Name}</a>
                </li>
    `
})
// 北美排行榜
let northlistarea = document.querySelector('.northlist');
let northlist=JSON.parse(sessionStorage.getItem('list4')).data;
northlist.map(item=>{
    northlistarea.innerHTML+=`<li>
    <div class="no">${item.Id}</div>
    <a href="#" class="listname">${item.Name}</a>
    <div class="boxoffice">${item.BoxOffice}</div>
</li>`
})
//top榜
let toplistarea = document.querySelector('.toplist');
let toplist = JSON.parse(sessionStorage.getItem('list3')).data;
toplist.map(item => {
    toplistarea.innerHTML += `
    <li>
        <img src="${item.URL}" alt="">
        <div class="name"><a href="#">${item.Name}</a></div>
    </li>
    `
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