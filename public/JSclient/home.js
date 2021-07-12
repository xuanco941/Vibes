var btnoption = document.querySelector('#btn-option');

var listgroup = document.querySelector('#list-group');

btnoption.onclick = () => {
    if (listgroup.style.display != 'flex') {
        listgroup.style.display = 'flex';
    }
    else {
        listgroup.style.display = 'none';
    }

    console.log('111')
}

var itemremove = document.querySelector('#item-remove');
var itemclose = document.querySelector('#item-remove');

itemclose.onclick = () => {
    listgroup.style.display = 'none';
}

itemremove.onclick = () => {
    alert('Chưa hoàn thiện chức năng xóa ');
}