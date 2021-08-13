var writeMsg = document.getElementById('write_msg');
var msgSendBtn = document.getElementById('msg_send_btn');
var nameRoom = document.querySelector('.container.container-mess');
var userCookie = document.cookie;
var authUser = userCookie.slice(userCookie.indexOf('=') + 1);
var msg_history = document.getElementById('msg_history');
var aMess = Array.from(document.getElementsByClassName('aMess'));
var mesgs = document.querySelector('.mesgs.pointer');
var inbox_people = document.querySelector('.inbox_people');


var searchbar = document.getElementById('search-bar');
var btnsearchbar = document.getElementById('btn-search-bar');
var UserNamE = Array.from(document.getElementsByClassName('user-name'));

searchbar.onkeypress = (e) => {
    if (e.keyCode == 13) {
        btnsearchbar.onclick();
    }
}


btnsearchbar.onclick = () => {
    if (searchbar.value) {
        UserNamE.forEach((e) => {
            if (searchbar.value.trim() != e.id) {
                e.style.display = 'none';
            }
            else {
                e.style.display = 'block';
            }
        })
    }
    else {
        UserNamE.forEach((e) => {
            e.style.display = 'block';
        })
    }
    searchbar.value = '';
}

//reponsive js 

var x = window.matchMedia('(max-width : 767.98px)');
var chat_people = Array.from(document.getElementsByClassName('chat_people'));

if (x.matches) {
    if (window.location.href != 'http://localhost:3000/messenger/' && window.location.href != 'http://localhost:3000/messenger') {
        inbox_people.style.display = 'none';
        mesgs.style.display = 'block';
    }
}

// receive data from server , if cookie is mine , dom will change 

socket.on('response-text', (writeMsg, auth) => {
    var timeSend = new Date(Date.now());
    var h = timeSend.getHours();
    var m = timeSend.getMinutes();
    var day = timeSend.getDate();
    var month = timeSend.getMonth();
    if (auth == authUser) {
        msg_history.insertAdjacentHTML('beforeend', `<div class="aMess"><div class="outgoing_msg">
                        <div class="sent_msg">
                            <p>${writeMsg}</p>
                            <span class="time_date"> ${h}:${m} | ${day}-${month}</span>
                        </div>
                    </div> </div>`);
    }
    else {
        msg_history.insertAdjacentHTML('beforeend', `<div class="aMess"><div class="incoming_msg">
                        <div class="incoming_msg_img"> <img src="../public/img/avatar-default.png" alt="sunil"> </div>
                        <div class="received_msg">
                            <div class="received_withd_msg">
                                <p>${writeMsg}</p>
                                <span class="time_date"> ${h}:${m} | ${day}-${month}</span>
                            </div>
                        </div>
                    </div> </div>`);
    }
    msg_history.scrollTop = msg_history.scrollHeight;
});

aMess.forEach((e) => {
    if (e.id == mesgs.id) {
        var textMess = e.lastElementChild.lastElementChild.lastElementChild.firstElementChild.textContent;
        e.innerHTML = '';
        e.innerHTML = `<div class="outgoing_msg">
                        <div class="sent_msg">
                            <p>${textMess}</p>
                            <span class="time_date"> 09:09 AM | 9-4</span>
                        </div>
                    </div>`
    }
});

// writeMsg.onfocus = () => {
//     socket.emit('focus-mess', (nameRoom.id));
//     socket.on('reponse-focus', () => {
//     msg_history.insertAdjacentHTML('beforeend', '<div id="wait" >Bên kia đang nhập . . .</div>');
// })
// }

writeMsg.onkeypress = (e) => {
    if (e.keyCode == 13) {
        msgSendBtn.click();
    }
}

msgSendBtn.onclick = (e) => {
    if (writeMsg.value) {
        if (window.location.href != 'http://localhost:3000/messenger/' && window.location.href != 'http://localhost:3000/messenger') {
            socket.emit('send-message', writeMsg.value.trim(), authUser, nameRoom.id);
            writeMsg.value = '';
        }
        else {
            alert('fix gòy , không có người nhận kh gửi đc đâu')
        }
    }
    else {
        e.preventDefault();
    }
}