var idpassword = document.querySelector('#password');
var repeatpassword = document.querySelector('#repeatpassword');
var idhidePassword1 = document.querySelector('#idhidePassword1');
var idhidePassword2 = document.querySelector('#idhidePassword2');

var showhide = false;
var showhide2 = false;


idhidePassword1.addEventListener('click',
    function show() {
        if (showhide == false) {
            idpassword.setAttribute('type', 'text');
            showhide = true;
            idhidePassword1.innerHTML = 'Ẩn';

        }
        else {
            idpassword.setAttribute('type', 'password');
            showhide = false;
            idhidePassword1.innerHTML = 'Hiển thị';
        }
    }
)


idhidePassword2.onclick = function show() {
    if (showhide2 == false) {
        repeatpassword.setAttribute('type', 'text');
        showhide2 = true;
        idhidePassword2.innerHTML = 'Ẩn';
    }
    else {
        repeatpassword.setAttribute('type', 'password');
        showhide2 = false;
        idhidePassword2.innerHTML = 'Hiển thị';
    }
}

var messageerror = document.querySelector('#messageerror');
repeatpassword.onchange = () => {
    if (idpassword.value == repeatpassword.value) {
        messageerror.textContent = '';
    }
}

idpassword.onchange = () => {
    if (idpassword.value == repeatpassword.value) {
        messageerror.textContent = '';
    }
}

var formSubmit = document.querySelector('#formSubmit');
var name_ = document.querySelector('#name');
var username = document.querySelector('#username');

var routeName = ['home' , 'signup' , 'signin' , 'upload' , 'login' , 'messenger' , 'search' , 'admin' ];

username.onmouseup = () =>{
    routeName.forEach((routeName) => {
        if (username.value == routeName)
        {
            messageerror.textContent = 'Tên tài khoản này không được sử dụng';
            
        }
        else {
            messageerror.textContent = '';
        }
    })
}


formSubmit.addEventListener('submit', (e) => {

    if (name_.value == '') {
        messageerror.textContent = 'Chưa nhập tên đầy đủ';
        e.preventDefault();
        e.stopPropagation();
        return;
    }
    if (username.value == '') {
        messageerror.textContent = 'Chưa nhập tên tài khoản';
        e.preventDefault();
        e.stopPropagation();
        return;
    }
    
    if (idpassword.value == '') {
        messageerror.textContent = 'Chưa nhập mật khẩu';
        e.preventDefault();
        e.stopPropagation();
        return;
    }
    if (repeatpassword.value == '') {
        messageerror.textContent = 'Chưa nhập lại mật khẩu';
        e.preventDefault();
        e.stopPropagation();
        return;
    }


    if (idpassword.value != repeatpassword.value) {
        messageerror.textContent = 'Mật khẩu nhập lại không trùng';
        e.preventDefault();
        e.stopPropagation();
        return;
    }

    else {
        messageerror.textContent = 'Tạo tài khoản thành công, đang chuyển hướng đăng nhập';
        messageerror.style.color = 'green';
        return true;
    }

})