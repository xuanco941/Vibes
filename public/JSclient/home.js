
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

//usermatch

var seeUserLikeNews = Array.from(document.getElementsByClassName('seeUserLikeNews'));
var seeUserLikeSTT = Array.from(document.getElementsByClassName('seeUserLikeSTT'));
var btnCloseUserLike = document.getElementById('btnCloseUserLike');
var modalseeUserLike = document.getElementById('modal-seeUserLike');
var modalspaceUserLike = document.getElementById('modal-spaceUserLike');
var listUserLike = document.getElementById('listUserLike');

seeUserLikeNews.forEach((e) => {
    e.onclick = () => {
        var ID = e.id.slice(e.id.indexOf('-') + 1);
        modalseeUserLike.style.display = 'block';
        socket.emit('get-user-like-news', ID);
    }
})

seeUserLikeSTT.forEach((e) => {
    e.onclick = () => {
        var ID = e.id.slice(e.id.indexOf('-') + 1);
        modalseeUserLike.style.display = 'block';
        socket.emit('get-user-like-stt', ID);
    }
})

socket.on('user-like-news', (usermatch) => {
    usermatch.forEach((n) => {
        listUserLike.insertAdjacentHTML('beforeend', `<a href="/${n}" class="itemUserLike">${n}</a>`);
    })
});

socket.on('user-like-stt', (usermatch) => {
    usermatch.forEach((n) => {
        listUserLike.insertAdjacentHTML('beforeend', `<a href="/${n}" class="itemUserLike">${n}</a>`);
    })
});

modalseeUserLike.onclick = () => {
    modalseeUserLike.style.display = 'none';
    listUserLike.innerHTML = '';
}
modalspaceUserLike.onclick = (e) => {
    e.stopPropagation();
}

btnCloseUserLike.onclick = () => {
    modalseeUserLike.style.display = 'none';
    listUserLike.innerHTML = '';
}


window.onload = () => {
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


// infinity scroll

// var h = document.querySelector('html');
//     var Status = document.getElementsByClassName('Status');
//     var News = document.getElementsByClassName('News');
//     var spaceNews = document.getElementById('spaceNews');

//     window.onscroll = () => {
//         if ((h.scrollTop + h.clientHeight) == h.scrollHeight) {
//             console.log('Status dang co : ', Status.length);
//             console.log(' News dang co : ', News.length);
//             socket.emit('get-10-element', Status.length, News.length);
//         }
//     }

    // socket.on('next-status', (statusElement) => {
    //     statusElement.forEach((s) => {
    //         var arrComment = s.comment;
    //         spaceNews.insertAdjacentHTML('beforeend',

    //             `<div class="Status" id="${s._id}">
    //         <div class="headStatus">
    //             <a href="/${s.userpost}" class="link-user-news">
    //                 <div class="user-status" id="userstatus-${s._id}">${s.userpost}</div>
    //             </a>
    //             <button type="button" class="btn btn-option btn-option-Status" id="btnoptionstatus-${s._id}">. .
    //                 .
    //                 <ul class="list-group" id="listgroupstatus-${s._id}">
    //                     <li class="list-group-item item-remove" id="itemremovestatus-${s._id}">Xóa khỏi bản tin
    //                     </li>
    //                     <li class="list-group-item item-close" id="itemclosestatus-${s._id}">Đóng</li>
    //                 </ul>
    //             </button>
    //         </div>
    //         <div class="textcontent">
    //             <div class="contentStatus">
    //                 ${s.content}
    //             </div>
    //         </div>

    //         <div class="matchStatus">
    //             <i class="far fa-heart fa-heart-status heartmatchstatus"
    //                 id="heartstatus-${s._id}">${s.match}</i>
    //             <div class="seeUserLike seeUserLikeSTT" id="seeUserLikeSTT-${s._id}">Xem ai like</div>
    //         </div>
    //         <div class="commentHistory-status" id="commenthistorystatus-${s._id}">

    //            <!-- {{#each this.comment}}
    //             <div class="detailComment">
    //                 <div class="userComment"><a href="/{{this.usercomment}}">{{this.usercomment}}</a></div>:<div
    //                     class="textComment">{{this.text}}</div>
    //             </div>
    //             {{/each}} -->

    //         </div>
    //         <div class="typing" id="typing-${s._id}">Có người đang nhập bình luận . . .</div>
    //         <div class="comment-status">
    //             <textarea type="text" name="comment" id="inputCommentstatus-${s._id}" class="inputComment"
    //                 placeholder="Thêm bình luận"></textarea>
    //             <button type="button" class="submitCommentStatus" id="submitCommentstatus-${s._id}">Đăng</button>
    //         </div>
    //     </div>`

    //         );
    //         var commenthistorystatus = document.getElementById(`commenthistorystatus-${s._id}`);
    //         arrComment.forEach((aComment) => {
    //             commenthistorystatus.insertAdjacentHTML('beforeend', `<div class="detailComment">
    //                 <div class="userComment"><a href="/${aComment.usercomment}">${aComment.usercomment}</a></div>:<div
    //                     class="textComment">${aComment.text}</div>
    //             </div>`)
    //         })
    //     });

    // }
    // );


    // socket.on('next-news', (newsElement) => {
    //     newsElement.forEach((n) => {
    //         var arrComment = n.comment;
    //         spaceNews.insertAdjacentHTML('beforeend', `<div class="News" id="${n._id}">
    //         <div class="headNews">
    //             <a href="/${n.userpost}" class="link-user-news">
    //                 <div class="user-news">${n.userpost}</div>
    //             </a>
    //             <button type="button" class="btn btn-option btn-option-News" id="btnoption-${n._id}">. . .
    //                 <ul class="list-group list-group-News" id="listgroup-${n._id}">
    //                     <li class="list-group-item item-remove" id="itemremove-${n._id}">Xóa khỏi bản tin</li>
    //                     <li class="list-group-item item-close" id="itemclose-${n._id}">Đóng</li>
    //                 </ul>
    //             </button>
    //         </div>
    //         <div class="contentNews">
    //             <img src="/${n.pathImg}" id="${n.pathImg}" alt="img" srcset="" class="imgNews ImageNews">
    //             <video src="${n.pathVideo}" id="${n.pathVideo}" controls class="imgNews VideoNews"></video>
    //         </div>
    //         <div class="titleNews matchNews">
    //             <div class="match">
    //                 <i class="far fa-heart fa-heart-2 heartmatchnews" id="heartnews-${n._id}">${n.match}</i>
    //                 <div class="seeUserLike seeUserLikeNews" id="seeUserLikeNews-${n._id}">Xem ai like</div>
    //             </div>
    //             <div class="title">${n.title}</div>
    //         </div>
    //         <div class="commentHistory" id="commentHistory-${n._id}">
    //             <!-- {{#each this.comment}}
    //             <div class="detailComment">
    //                 <div class="userComment"><a href="/{{this.usercomment}}">{{this.usercomment}}</a></div>:<div
    //                     class="textComment">{{this.text}}</div>
    //             </div>
    //             {{/each}} -->
    //         </div>
    //         <div class="typing" id="typing-${n._id}">Có người đang nhập bình luận . . .</div>
    //         <div class="comment">
    //             <textarea type="text" name="comment" id="inputComment-${n._id}" class="inputComment"
    //                 placeholder="Thêm bình luận"></textarea>
    //             <button type="button" class="submitComment" id="submitComent-${n._id}">Đăng</button>
    //         </div>
    //     </div>`);
    //         var commentHistory = document.getElementById(`commentHistory-${n._id}`);
    //         arrComment.forEach((aComment) => {
    //             commentHistory.insertAdjacentHTML('beforeend', `<div class="detailComment">
    //                 <div class="userComment"><a href="/${aComment.usercomment}">${aComment.usercomment}</a></div>:<div
    //                     class="textComment">${aComment.text}</div>
    //             </div>`)
    //         })
    //     })
    // });
