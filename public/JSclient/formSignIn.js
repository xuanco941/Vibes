
var idpassword = document.querySelector('#idpassword');
var idhidePassword = document.querySelector('#idhidePassword');

var showhide = false;
idhidePassword.onclick = function () {
    if (showhide == false) {
        idpassword.setAttribute('type', 'text');
        showhide = true;
        idhidePassword.innerHTML = 'Ẩn';

    }
    else {
        idpassword.setAttribute('type', 'password');
        showhide = false;
        idhidePassword.innerHTML = 'Hiển thị';

    }
}