var camera = document.querySelector('#control-camera');
var camera2 = document.querySelector('#control-camera-2');
var camera3 = document.querySelector('#control-camera-3');

var modal = document.querySelector('#modal');
var btnclose = document.querySelector('#btn-close');
var btnclose2 = document.querySelector('#btn-close-2');


camera.onclick = () => {
    history.pushState(null, '', '/upload');
    modal.style.display = 'block';
};
camera2.onclick = () => {
    history.pushState(null, '', '/upload');
    modal.style.display = 'block';
};
camera3.onclick = () => {
    history.pushState(null, '', '/upload');
    modal.style.display = 'block';
};

btnclose.onclick = () => {
    modal.style.display = 'none';

}

btnclose2.onclick = () => {
    modal.style.display = 'none';

}

var signout = Array.from(document.querySelectorAll('.signout'));
signout.forEach(function (button) {
    button.addEventListener('click', function () {
        document.cookie = "userCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        window.location = '/';
    })
})
