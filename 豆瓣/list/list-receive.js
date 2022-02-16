let username = sessionStorage.getItem('username');
let login = document.querySelector('.header_right1 a');
let myself = document.querySelector('.myself');
let quit = document.getElementById('quit');
let mine = document.getElementById('mine');
let token = sessionStorage.getItem('token');
let basicURL = 'http://127.0.0.1:5500';
if (username) {
    login.innerHTML = username + '你好！';
    login.href = '#';
    login.addEventListener('click', (e) => {
        myself.style.display = 'block';
        e.cancelBubble = true;
    })
    document.addEventListener('click', () => {
        myself.style.display = 'none';
    })
    quit.addEventListener('click', () => {
        sessionStorage.removeItem('username');
        window.location.reload();
    })
    mine.addEventListener('click', () => {
        function newfetch(url) {
            return new Promise((resolve, reject) => {
                fetch(url, {
                        method: 'GET',
                        headers: {
                            token: token,
                        }
                    }).then(res => res.json())
                    .then(res => resolve(res))
                    .catch(err => reject(err))
            })
        }
        async function sendbyfetch() {
            let num = 1;
            for (; num <= 4; num++) {
                let res = await newfetch('http://42.192.155.29:8080/user/user' + num);
                sessionStorage.setItem('selfinfo' + num, JSON.stringify(res));
            }
            window.location.replace(basicURL+'/self/build/self.html')
        }
        sendbyfetch();
    })

}