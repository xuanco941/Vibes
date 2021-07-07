var idpassword = document.querySelector('#password');
var repeatpassword = document.querySelector('#repeatpassword');
var idhidePassword1 = document.querySelector('#idhidePassword1');
var idhidePassword2 = document.querySelector('#idhidePassword2');

var showhide = false ;
var showhide2 = false;


idhidePassword1.addEventListener('click' ,
function show (){
    if(showhide == false)
    {
        idpassword.setAttribute('type' , 'text');
        showhide = true;
        idhidePassword1.innerHTML = 'Ẩn';

    }
    else
    {
        idpassword.setAttribute('type' , 'password');
        showhide = false;
        idhidePassword1.innerHTML = 'Hiển thị';
    }
}
)


idhidePassword2.onclick = function show (){
    if(showhide2 == false)
    {
        repeatpassword.setAttribute('type' , 'text');
        showhide2 = true;
        idhidePassword2.innerHTML = 'Ẩn';
    }
    else
    {
        repeatpassword.setAttribute('type' , 'password');
        showhide2 = false;
        idhidePassword2.innerHTML = 'Hiển thị';
    }
}
