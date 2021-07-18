var btnoption = Array.from(document.querySelectorAll('.btn-option'));

var listgroup = document.querySelector('.list-group');

btnoption.forEach((btn) => {
    btn.onclick = () => {
        if (listgroup.style.display != 'flex') {
            listgroup.style.display = 'flex';
        }
        else {
            listgroup.style.display = 'none';
        }
    }
})

var itemremove = document.querySelector('#item-remove');
var itemclose = document.querySelector('#item-remove');

itemclose.onclick = () => {
    listgroup.style.display = 'none';
}

itemremove.onclick = () => {
    alert('Chưa hoàn thiện chức năng xóa ');
}

