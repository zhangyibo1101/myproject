let options = document.querySelectorAll('.login-hd li');
let form1 = document.querySelectorAll('.form1')[0];
let form2 = document.querySelectorAll('.form2')[0];
options[0].addEventListener('click', (e) => {
    if (!e.target.classList.contains('focus')) {
        e.target.classList.add('focus')
        options[1].classList.remove('focus')
        form1.style.display = 'block';
        form2.style.display = 'none';
    }
})
options[1].addEventListener('click', (e) => {
    if (!e.target.classList.contains('focus')) {
        e.target.classList.add('focus')
        options[0].classList.remove('focus')
        form1.style.display = 'none';
        form2.style.display = 'block';
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
let basicURL = 'http://127.0.0.1:5500';
let account=document.querySelector('.account');
let password=document.querySelector('.password');
button[1].addEventListener('click',()=>{
    let formdata=new FormData();
    formdata.append('username',account.value);
    formdata.append('password',password.value);
    fetch('http://42.192.155.29:8080/login',{
        method:'POST',
        headers:{
            token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuWwj-iwoiIsInBhc3N3b3JkIjoiMTIzNDU2IiwiZXhwIjoxNjQyMzI3MjE3LCJpc3MiOiJZdWFuWGluSGFvIiwibmJmIjoxNjQyMzE5OTU3fQ.-45KVzY3cl-DzyudPgFq0gk3oJUcX6Myu_YNVTFeAj0'
        },
        body:formdata
    }).then(res=>res.json())
    .then(res=>{
        alert(res.info);
        if(res.info=='成功')
        {
            sessionStorage.setItem('username',account.value);
            sessionStorage.setItem('token',res.data)
            location.replace(basicURL+'/main/main.html')
        }else{
            location.reload();
        }
    });
})