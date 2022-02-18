// 找回密码
let tofind = document.querySelector('.tofind');
let form3 = document.querySelector('.form3')
tofind.addEventListener('click', () => {
    form2.style.display = 'none';
    form3.style.display = 'block'
})
let mysure = document.querySelector('.mysure');
let myusername = document.querySelector('.myusername');
let myquestion = document.querySelector('.myquestion');
mysure.addEventListener('click', () => {
    let formdata = new FormData();
    formdata.append('username', myusername.value);
    fetch('http://42.192.155.29:8080/mibao/question', {
            method: 'POST',
            body: formdata
        }).then(res => res.json())
        .then(res => {
            myquestion.innerHTML = '请问：' + res.info;
        })
})
let mysure2 = document.querySelector('.mysure2');
let myanswer = document.querySelector('.myanswer');
let mynew = document.querySelector('.mynew');
mysure2.addEventListener('click', () => {
    let formdata = new FormData();
    formdata.append('username', myusername.value);
    formdata.append('answer', myanswer.value);
    formdata.append('new_password', mynew.value);
    fetch('http://42.192.155.29:8080/mibao', {
            method: 'POST',
            body: formdata
        }).then(res => res.json())
        .then(res => {
            if (res.info == "成功") alert(res.data);
            form2.style.display = 'block';
            form3.style.display = 'none';
        })
})

let options = document.querySelectorAll('.login-hd li');
let form1 = document.querySelectorAll('.form1')[0];
let form2 = document.querySelectorAll('.form2')[0];
options[0].addEventListener('click', (e) => {
    if (!e.target.classList.contains('focus')) {
        e.target.classList.add('focus')
        options[1].classList.remove('focus')
        form1.style.display = 'block';
        form2.style.display = 'none';
        form3.style.display = 'none'
    }
})
options[1].addEventListener('click', (e) => {
    if (!e.target.classList.contains('focus')) {
        e.target.classList.add('focus')
        options[0].classList.remove('focus')
        form1.style.display = 'none';
        form2.style.display = 'block';
        form3.style.display = 'none';
    }
})

//密保切换
let acquire = document.querySelector('.fetch');
let register = document.querySelector('.register');
let insure = document.querySelector('.insure');
acquire.addEventListener('click', () => {
    register.style.display = 'none';
    insure.style.display = 'block';
})
let other = document.querySelector('.other');
other.addEventListener('click', () => {
    if (register.style.display == 'none'); {
        register.style.display = 'block';
        insure.style.display = 'none';
    }
})
//注册请求
let button = document.getElementsByTagName('button');
let phone = document.querySelector('.phone input');
let code = document.querySelector('.code input');
let question = document.querySelector('.question');
let answer = document.querySelector('.answer');
button[0].addEventListener('click', () => {
    let formdata = new FormData();
    formdata.append('username', phone.value);
    formdata.append('password', code.value);
    formdata.append('question', question.value);
    formdata.append('answer', answer.value);
    fetch('http://42.192.155.29:8080/register', {
            method: 'POST',
            body: formdata

        }).then(res => res.json())
        .then(data => {
            alert(data.info);
            if (data.info != '成功') {
                location.reload();
                alert('请重新注册');
            } else {
                options[1].classList.add('focus')
                options[0].classList.remove('focus')
                form1.style.display = 'none';
                form2.style.display = 'block';
            }
        });
})
//密码登录
let basicURL = '';
let account = document.querySelector('.account');
let password = document.querySelector('.password');
button[1].addEventListener('click', () => {
    let formdata = new FormData();
    formdata.append('username', account.value);
    formdata.append('password', password.value);
    fetch('http://42.192.155.29:8080/login', {
            method: 'POST',
            headers: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuWwj-iwoiIsInBhc3N3b3JkIjoiMTIzNDU2IiwiZXhwIjoxNjQyMzI3MjE3LCJpc3MiOiJZdWFuWGluSGFvIiwibmJmIjoxNjQyMzE5OTU3fQ.-45KVzY3cl-DzyudPgFq0gk3oJUcX6Myu_YNVTFeAj0'
            },
            body: formdata
        }).then(res => res.json())
        .then(res => {
            alert(res.info);
            if (res.info == '成功') {
                sessionStorage.setItem('username', account.value);
                sessionStorage.setItem('token', res.data)
                location.replace('/main/main.html')
            } else {
                location.reload();
            }
        });
})