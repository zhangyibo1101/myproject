import {
    Tag
} from '../mymodule/tags.js'

let s1 = '全部形式,电影,电视剧,综艺,动漫,纪录片,短片';
let s2 = '全部类型,剧情,喜剧,动作,爱情,科幻,动画,悬疑,惊悚,恐怖,犯罪,同性,音乐,歌舞,传记,历史,战争,西部,奇幻,冒险,灾难,武侠,情色'
let s3 = '全部地区,中国大陆,欧美,美国,中国香港,中国台湾,日本,韩国,英国,法国,德国,意大利,西班牙,印度,泰国,俄罗斯,伊朗,加拿大,澳大利亚,爱尔兰,瑞典,巴西,丹麦';
let s4 = '全部年代,2022,2021,2020,2019,2010年代,2000年代,90年代,80年代,70年代,60年代,更早';
let s5 = '全部特色,经典,青春,文艺,搞笑,励志,魔幻,感人';
let tagcontainer = document.querySelector('.tagcontainer');
let c1, c2, c3, c4, c5;
let categorys = [c1, c2, c3, c4, c5];
[s1, s2, s3, s4, s5].map((item, index) => {
    categorys[index] = new Tag(tagcontainer, item);
    categorys[index].create();
    categorys[index].operate();
})

let tags = document.querySelectorAll('.category span');

function updateUI() {
    [...tags].map(item => {
        item.addEventListener('click', () => {
            update();
        })
    })
}
updateUI();

let moviearea = document.querySelector('.moviearea');


function sendfetch(arr1, arr2) {
    let trueurl = '';
    if (arr1[0] * arr2[0] != 0) {
        trueurl = `http://42.192.155.29:8080/classify/` + arr1[1] + '/' + arr2[1]
    } else if (arr1[0] == 0 && arr2[0] != 0) {
        trueurl = `http://42.192.155.29:8080/classify1/` + arr2[1]
    } else if (arr1[0] != 0 && arr2[0] == 0) {
        trueurl = `http://42.192.155.29:8080/classify2/` + arr1[1]
    } else {
        trueurl = 'http://42.192.155.29:8080/classify';
    }
    return new Promise((resolve, reject) => {
        fetch(trueurl, {
                method: 'POST'
            }).then(res => res.json())
            .then(res => resolve(res))
            .catch(err => reject(err))
    })

}


async function update() {
    let res = await sendfetch(categorys[1].requestnum(), categorys[2].requestnum());
    if (res.data) {
        moviearea.innerHTML = '';
        res.data.map(
            item => {
                moviearea.innerHTML += ` <li>
            <img data-src="${item.URL}" alt="" class="movieimg"> 
            <span class="moviename">${item.Name}</span>
            <span class="moviemarks">${item.Score}</span>
            </li>`
            })
    } else {
        console.log(res.data)
        moviearea.innerHTML = '<p class="warn">抱歉，暂无此类电影~~</p>'
    }
    // 性能优化：图片懒加载
    let movieimg = document.querySelectorAll('.movieimg');
    const callback = entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let image = entry.target;
                let data_src = image.getAttribute('data-src');
                image.setAttribute('src', data_src);
                observer.unobserve(image);
            }
        })
    }
    const observer = new IntersectionObserver(callback);
    movieimg.forEach(item => {
        observer.observe(item)
    })
}
window.onload = function () {
    update();
}


let wrapper = document.querySelector('.wrapper');
let content = document.querySelector('.content');
let article = document.querySelector('article');

article.style.height = '1663px'
content.style.height = '1663px'
wrapper.style.height = '1663px'