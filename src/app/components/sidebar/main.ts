let listElements = document.querySelectorAll('.list__button--click');
console.log('entro1');
listElements.forEach(listElement => {
    console.log('entro2');
    listElement.addEventListener('click', ()=>{
        console.log('entro3');
        listElement.classList.toggle('arrow');

        //let height = 0;
        //let menu = listElement.nextElementSibling;
        //if(menu.clientHeight == "0"){
        //    height=menu.scrollHeight;
       /// }

       
        //menu.style.height = `${height}px`;

    })
});