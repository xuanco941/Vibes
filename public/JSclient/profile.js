var divavatar = document.querySelector('#divavatar');
var modalprofile = document.querySelector('#modal-profile');
var editAvatar = document.querySelector('#editAvatar');
var userName = document.querySelector('#userName');
var submitprofile = document.querySelector('#submitprofile');
var inputprofile = Array.from(document.getElementsByClassName('inputprofile'));
var rightAvatar = document.querySelector('#rightAvatar');
var leftAvatar = document.querySelector('#leftAvatar');
var imgavt = document.querySelector('#imgavt');
var inputavatar = document.querySelector('#inputavatar');
var formUpAvatar = document.querySelector('#formUpAvatar');
var labelinputavatar = document.getElementById('labelinputavatar');
var setimg = document.getElementById('setimg');

var itemfullname = document.getElementById('itemfullname');
var itembirthday = document.getElementById('itembirthday');
var itemcity = document.getElementById('itemcity');
var itemlink = document.getElementById('itemlink');
var itemusername = document.getElementById('itemusername');

var link = document.querySelector('#link');
var birthday = document.querySelector('#birthday');
var FullName = document.getElementById('FullName');
var userName = document.getElementById('userName');
var city = document.getElementById('city');


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

if (userName.value != submitprofile.name) {
    if (!birthday.value) {
        itembirthday.style.display = 'none';
    }
    if (!link.value) {
        itemlink.style.display = 'none';
    }
    if (!FullName.value) {
        itemfullname.style.display = 'none';
    }
    if (!userName.value) {
        itemusername.style.display = 'none';
    }
    if (!city.value) {
        itemcity.style.display = 'none';
    }
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