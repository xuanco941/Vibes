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

var labelfile = document.querySelector('#label-file');

file.onchange = () => {
    var reader = new FileReader();
    var [afile] = file.files;
    reader.onload = (e) => {
        var tg = e.target.result;
        if (tg.indexOf('image') > -1) {
            labelfile.innerHTML = `<img class="filepreview" style="max-width: 100% ; max-height: 100%;" src="${tg}" alt="filepreview">`;
        }
        if (tg.indexOf('video') > -1) {
            labelfile.innerHTML = `<video class="filepreview" style="max-width: 100% ; max-height: 100%;" src="${tg}"></video>`
        }
        else {
            return false;
        }
    }
    reader.readAsDataURL(afile);
}


formUpload.onsubmit = (e) => {
    if ((modaltitle.textContent == '' && file.value == '') ?? modaltitle.textContent) {
        modal.style.display = 'none';
        return false;
    }

}

formUpload.onclick = (e) => {
    e.stopPropagation();
}

modal.onclick = () => {
    modal.style.display = 'none';
}

modal.onmousemove = () => {
    modal.style.cursor = 'pointer';
}

formUpload.onmousemove = (e) => {
    modal.style.cursor = 'default';
    e.stopPropagation();
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


