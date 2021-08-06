
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

var ImageNews = Array.from(document.getElementsByClassName('ImageNews'));
var VideoNews = Array.from(document.getElementsByClassName('VideoNews'));
ImageNews.forEach((i) => {
    if (i.id == 'none') {
        i.style.display = 'none';
    }
});
VideoNews.forEach((i) => {
    if (i.id == 'none') {
        i.style.display = 'none';
    }
})

window.onload = () => {

    //match news
    var heartmatchnews = Array.from(document.getElementsByClassName('heartmatchnews'));
    socket.on('usermain', (usermatch) => {
        heartmatchnews.forEach((elm) => {
            elm.onclick = () => {
                var ID = elm.id.slice(elm.id.indexOf('-') + 1);
                var count = parseInt(elm.textContent);
                if (Number.isNaN(count)) {
                    count = 0;
                }
                if (!elm.style.color) {
                    elm.style.color = 'purple';
                }
                count++;
                socket.emit('matchnews', ID, count, usermatch);
            }
        });
    })
    socket.on('count-match-news', (ID, count) => {
        document.getElementById(`heartnews-${ID}`).textContent = count;
    });

    //match stt
    var heartmatchstatus = Array.from(document.getElementsByClassName('heartmatchstatus'));
    socket.on('usermain', (usermatch) => {
        heartmatchstatus.forEach((elm) => {
            elm.onclick = () => {
                var ID = elm.id.slice(elm.id.indexOf('-') + 1);
                var count = parseInt(elm.textContent);
                if (Number.isNaN(count)) {
                    count = 0;
                }
                if (!elm.style.color) {
                    elm.style.color = 'purple';
                }
                count++;
                socket.emit('matchstatus', ID, count, usermatch);
            }
        });
    })
    socket.on('count-match-status', (ID, count) => {
        document.getElementById(`heartstatus-${ID}`).textContent = count;
    })

    //part 1
    var listOnline = document.querySelector('#listOnline');
    socket.emit('get-value-cookie', userCookie.slice(userCookie.indexOf('=') + 1));

    socket.on('get-all-user-online', (usersOnline) => {
        listOnline.innerHTML = '';
        usersOnline.forEach((userOnline) => {
            listOnline.insertAdjacentHTML('afterbegin', `<div class="itemOnline"><div class="tickOnline"></div> &nbsp<a href="/${userOnline}">${userOnline}</a></div>`);
        })
    });

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

    //typing comment stt and pic
    var inputtyping = Array.from(document.querySelectorAll('.inputComment'));
    inputtyping.forEach((elm) => {

        elm.onfocus = () => {
            var Statusid = elm.id.slice(elm.id.indexOf('-') + 1);
            socket.emit('type', Statusid);
        }

        elm.onblur = () => {
            var Statusid = elm.id.slice(elm.id.indexOf('-') + 1);
            socket.emit('stop-type', Statusid)
        }
    })
    socket.on('type-focus', (Statusid) => {

        var typing = document.querySelector(`#typing-${Statusid}`);
        typing.style.display = 'block';
    })
    socket.on('type-blur', (Statusid) => {
        var typing = document.querySelector(`#typing-${Statusid}`);
        typing.style.display = 'none';
    })


    //button comment stt
    var submitCommentstatus = Array.from(document.querySelectorAll('.submitCommentStatus'));
    socket.on('usermain', (usermain) => {
        submitCommentstatus.forEach((btn) => {
            btn.onclick = () => {
                var Statusid = btn.id.slice(btn.id.indexOf('-') + 1);
                var Status = document.getElementById(`${Statusid}`);
                var inputCommentstatus = document.querySelector(`#inputCommentstatus-${Statusid}`);

                // Comment
                if (inputCommentstatus.value) {
                    var aComment = { usercomment: `${usermain}`, text: `${inputCommentstatus.value.trim()}`, commentAt: new Date(Date.now()) };
                    console.log(aComment);
                    // send comment to server
                    socket.emit('Comment', Statusid, aComment);
                    inputCommentstatus.value = '';
                }
            }
        })
    })
    // server response
    socket.on('aComment', (Statusid, aComment) => {
        // add element in comment history client
        console.log(aComment);
        var commenthistorystatus = document.querySelector(`#commenthistorystatus-${Statusid}`);
        commenthistorystatus.insertAdjacentHTML('beforeend',
            `<div class="detailComment"><div class="userComment"><a href="/${aComment.usercomment}">${aComment.usercomment}</a></div>:<div class="textComment">${aComment.text}</div></div>`);
    })

    //button comment news
    var submitComment = Array.from(document.querySelectorAll('.submitComment'));
    socket.on('usermain', (usermain) => {
        submitComment.forEach((btn) => {
            btn.onclick = () => {
                var Newsid = btn.id.slice(btn.id.indexOf('-') + 1);
                var News = document.getElementById(`${Newsid}`);
                var inputComment = document.querySelector(`#inputComment-${Newsid}`);

                // Comment
                if (inputComment.value) {
                    var aComment = { usercomment: `${usermain}`, text: `${inputComment.value.trim()}`, commentAt: new Date(Date.now()) };
                    // send comment to server
                    socket.emit('CommentNews', Newsid, aComment);
                    inputComment.value = '';
                }
            }
        })
    })
    // server response
    socket.on('aCommentNews', (Newsid, aComment) => {
        // add element in comment history client
        var commentHistory = document.querySelector(`#commentHistory-${Newsid}`);
        commentHistory.insertAdjacentHTML('beforeend',
            `<div class="detailComment"><div class="userComment"><a href="/${aComment.usercomment}">${aComment.usercomment}</a></div>:<div class="textComment">${aComment.text}</div></div>`);
    })


}





