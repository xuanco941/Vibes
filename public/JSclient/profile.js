var divavatar = document.querySelector('#divavatar');
var modalprofile = document.querySelector('#modal-profile');
var editAvatar = document.querySelector('#editAvatar');
var userName = document.querySelector('#userName');
var submitprofile = document.querySelector('#submitprofile');
var inputprofile = Array.from(document.getElementsByClassName('inputprofile'));
var link = document.querySelector('#link');
var birthday = document.querySelector('#birthday');
var rightAvatar = document.querySelector('#rightAvatar');
var leftAvatar = document.querySelector('#leftAvatar');
var imgavt = document.querySelector('#imgavt');
var inputavatar = document.querySelector('#inputavatar');
var formUpAvatar = document.querySelector('#formUpAvatar');
var labelinputavatar = document.getElementById('labelinputavatar');
var setimg = document.getElementById('setimg');


inputavatar.onchange = () => {
    var [file] = inputavatar.files;
    var reader = new FileReader();
    reader.onload = (e) => {
        console.log(e.target)
        setimg.src = e.target.result;
    }
    reader.readAsDataURL(file);
}


formUpAvatar.onsubmit = (e) => {
    if (!inputavatar.value) {
        return false;
    }
}

var src = imgavt.src;
var divHTML = divavatar.innerHTML;
if (userName.value != submitprofile.name) {
    divavatar.innerHTML = `<a href="${src}" class="detailimgavt">${divHTML}</a>`;
}
divavatar.onclick = () => {
    if (userName.value == submitprofile.name) {
        history.pushState(null, '', '/update/avatar');
        modalprofile.style.display = 'block';
    }
}
editAvatar.onclick = (e) => {
    e.stopPropagation();
}
modalprofile.onmousemove = () => {
    modalprofile.style.cursor = 'pointer';
}
editAvatar.onmousemove = (e) => {
    editAvatar.style.cursor = 'default';
    e.stopPropagation();

}

modalprofile.onclick = () => {
    modalprofile.style.display = 'none';
    history.pushState(null, '', `/${submitprofile.name}`)
}


if (!birthday.value) {
    birthday.value = '2004-09-09'
}
if (userName.value != submitprofile.name) {
    rightAvatar.style.display = 'block';
    submitprofile.style.display = 'none';
    inputprofile.forEach((elm) => {
        elm.setAttribute('disabled', 'true');
        elm.style.border = 'none';
        elm.style.color = 'black';
    });
    var itemlink = document.querySelector('#itemlink');
    var aLink = link.value;
    if (aLink.indexOf('www.') == -1 || aLink.indexOf('http') == -1)
        itemlink.innerHTML = `Đường dẫn gì đó : <a href="www.${aLink}" target="_blank">${aLink}</a>`;
    else
        itemlink.innerHTML = `Đường dẫn gì đó : <a href="${aLink}" target="_blank">${aLink}</a>`;

}
else {
    leftAvatar.textContent = 'Bài đăng của bạn';
}