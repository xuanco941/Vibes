// var btnoption = Array.from(document.querySelectorAll('.btn-option'));

// var listgroup = document.querySelector('.list-group');

// btnoption.forEach((btn) => {
//     btn.onclick = () => {
//         if (listgroup.style.display != 'flex') {
//             listgroup.style.display = 'flex';
//         }
//         else {
//             listgroup.style.display = 'none';
//         }
//     }
// })


var inputStatus = document.querySelector('#inputStatus');
var PostStatus = document.querySelector('#PostStatus');
var submitStatus = document.querySelector('#submitStatus');

inputStatus.onkeyup = () => {
    if (inputStatus.value != '')
    {
        submitStatus.disabled = false;
    }
    else{
        submitStatus.disabled = true;
    }

}

PostStatus.onsubmit = (e) => {
    if(!inputStatus.value)
    {
        return false;
    }    
}

