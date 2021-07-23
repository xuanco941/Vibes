
var inputStatus = document.querySelector('#inputStatus');
var PostStatus = document.querySelector('#PostStatus');
var submitStatus = document.querySelector('#submitStatus');

inputStatus.onkeyup = () => {
    if (inputStatus.value != '') {
        submitStatus.disabled = false;
    }
    else {
        submitStatus.disabled = true;
    }

}

PostStatus.onsubmit = (e) => {
    if (!inputStatus.value) {
        return false;
    }
}


var socket = io('http://localhost:3000/');

window.onload = () => {

    //part 1
    var listOnline = document.querySelector('#listOnline');

    var userCookie = document.cookie;
    socket.emit('get-value-cookie', userCookie.slice(userCookie.indexOf('=') + 1));

    socket.on('get-all-user-online', (usersOnline) => {
        listOnline.innerHTML = '';
        usersOnline.forEach((userOnline) => {
            listOnline.insertAdjacentHTML('afterbegin', `<div class="itemOnline"><div class="tickOnline"></div> &nbsp<a href="/${userOnline}">${userOnline}</a></div>`);
        })
    });
    var signout = Array.from(document.querySelectorAll('.signout'));
    signout.forEach(function (button) {
        button.addEventListener('click', function () {
            socket.emit('signout', userCookie.slice(userCookie.indexOf('=') + 1));
            document.cookie = "userCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
            window.location = '/';

        })
    })

    //part 2
    //btn option news
    var btnoptions = Array.from(document.querySelectorAll('.btn-option-News'));
    btnoptions.forEach((btn) => {
        btn.onclick = () => {

            //lay ra id cua cac element trong 1 stt sau khi click button option 
            var Newsid = btn.id.slice(btn.id.indexOf('-') + 1);
            var News = document.getElementById(`${Newsid}`);
            var listgroup = document.querySelector(`#listgroup-${Newsid}`);
            var itemremove = document.querySelector(`#itemremove-${Newsid}`);

            //click settings in stt
            listgroup.style.display != 'flex' ? listgroup.style.display = 'flex' : listgroup.style.display = 'none';

            //an khoi ban tin
            if (itemremove) {
                itemremove.onclick = (e) => {
                    e.stopPropagation();
                    News.style.display = 'none';
                }
            }
        }
    });


    // btn option stt
    var btnoptionstatus = Array.from(document.querySelectorAll('.btn-option-Status'));
    btnoptionstatus.forEach((btn) => {

        btn.onclick = () => {
            var Statusid = btn.id.slice(btn.id.indexOf('-') + 1);
            var Status = document.getElementById(`${Statusid}`);
            var listgroupstatus = document.querySelector(`#listgroupstatus-${Statusid}`);
            var itemremovestatus = document.querySelector(`#itemremovestatus-${Statusid}`);
            //click settings in stt
            listgroupstatus.style.display != 'flex' ? listgroupstatus.style.display = 'flex' : listgroupstatus.style.display = 'none';
            //an khoi ban tin
            if (itemremovestatus) {
                itemremovestatus.onclick = (e) => {
                    e.stopPropagation();
                    Status.style.display = 'none';
                }
            }
        }
    });

    //button comment stt
    var submitCommentstatus = Array.from(document.querySelectorAll('.submitCommentStatus'));
    socket.on('usermain', (usermain) => {
        submitCommentstatus.forEach((btn) => {
            var arrComment = [];
            btn.onclick = () => {
                var Statusid = btn.id.slice(btn.id.indexOf('-') + 1);
                var Status = document.getElementById(`${Statusid}`);
                var inputCommentstatus = document.querySelector(`#inputCommentstatus-${Statusid}`);
                var commenthistorystatus = document.querySelector(`#commenthistorystatus-${Statusid}`);

                // Comment
                if (inputCommentstatus.value.trim()) {
                    var aComment = { usercomment: `${usermain}`, text: `${inputCommentstatus.value.trim()}` };
                    arrComment.push(aComment);
                    console.log(arrComment);
                    // add element in comment history client
                    commenthistorystatus.insertAdjacentHTML('beforeend',
                        `<div class="detailComment"><div class="userComment"><a href="/${usermain}">${usermain}</a></div>:<div class="textComment">${inputCommentstatus.value.trim()}</div></div>`);
                    inputCommentstatus.value = '';
                    // send comment to server
                    socket.emit('Comment', Statusid, arrComment);
                }
                // server response
            }
        })
    })

}


