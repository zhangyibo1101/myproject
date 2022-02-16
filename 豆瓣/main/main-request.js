//电影详情
function newfetch2(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
        method: 'GET',
      }).then(res => res.json())
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

//排行榜
let movielist = document.getElementById('movielist');
movielist.addEventListener('click', () => {
  async function sendbyfetch3() {
    let res1 = await newfetch2('http://42.192.155.29:8080/rank1')
    sessionStorage.setItem('list1', JSON.stringify(res1))
    let res2 = await newfetch2('http://42.192.155.29:8080/rank2')
    sessionStorage.setItem('list2', JSON.stringify(res2))
    let res3 = await newfetch2('http://42.192.155.29:8080/rank3')
    sessionStorage.setItem('list3', JSON.stringify(res3))
    let res4 = await newfetch2('http://42.192.155.29:8080/rank4')
    sessionStorage.setItem('list4', JSON.stringify(res4))
    window.open(basicURL + '/list/build/list.html')
  }
  sendbyfetch3();
})
//搜索
let submit = document.querySelector('.submit');
submit.addEventListener('click', () => {
  let formdata = new FormData();
  formdata.append('context', document.querySelector('.search').value);
  sessionStorage.setItem('searchthing', document.querySelector('.search').value)
  fetch('http://42.192.155.29:8080/search', {
      method: 'POST',
      body: formdata
    }).then(res => res.json())
    .then(res => {
      sessionStorage.setItem('searchresult', JSON.stringify(res))
      window.open(basicURL + '/search/build/search.html')
    })

})
//分类
let classifyarea = document.getElementById('classifyarea');
classifyarea.addEventListener('click', () => {
  window.location.replace(basicURL + '/classify/build/classify.html')
})