
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

