var btnoption = document.querySelector('#btn-option');

var listgroup = document.querySelector('#list-group');

btnoption.onclick = () => {
    if (listgroup.style.display != 'flex')
    {
        listgroup.style.display = 'flex';
    }
    else{
        listgroup.style.display = 'none';
    }
    
    console.log('111')
}