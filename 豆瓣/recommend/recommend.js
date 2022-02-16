let myplayer = JSON.parse(sessionStorage.getItem('galleryitem')).data[0];
let video = document.querySelector('video');
video.src = myplayer.VideoSRC.split(',')[0];
let timelate = document.querySelectorAll('.timelate');
let imgs = document.querySelectorAll('.playerlist img');
let prepare = document.querySelectorAll('.playerlist a');
let triangles = document.querySelectorAll('.triangle');
for (let i = 0; i < 3; i++) {
    timelate[i].innerHTML = myplayer.Length.split(',')[i];
    imgs[i].src = myplayer.URLInfo.split(',')[i];
    prepare[i].addEventListener('focus', () => {
        video.src = myplayer.VideoSRC.split(',')[i]
        prepare[i].style.border = '5px solid #00AFD0';
        triangles[i].style.visibility = 'visible'
        let arr1 = [...prepare],
            arr2 = [...triangles];
        arr1.splice(i, 1)
        arr2.splice(i, 1)
        arr1[0].style.border = '1px solid'
        arr1[1].style.border = '1px solid'
        arr2[0].style.visibility='hidden'
        arr2[1].style.visibility='hidden'
    })
}