var camera = document.querySelector('#control-camera');
var camera2 = document.querySelector('#control-camera-2');
var camera3 = document.querySelector('#control-camera-3');

var modal = document.querySelector('#modal');
var btnclose = document.querySelector('#btn-close');
var btnclose2 = document.querySelector('#btn-close-2');

var btnupload = document.querySelector('#btn-upload');
var formUpload = document.querySelector('#formUpload');
var modaltitle = document.querySelector('#modal-title');
var file = document.querySelector('#file');


formUpload.onsubmit = (e) => {
    if (modaltitle.textContent == '' && file.value == '' )
    {
        modal.style.display = 'none';
        return false;
    }
}

formUpload.onclick = (e) => {
    e.stopPropagation();
}

modal.onclick = (e) => {
    modal.style.display = 'none';
}

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


