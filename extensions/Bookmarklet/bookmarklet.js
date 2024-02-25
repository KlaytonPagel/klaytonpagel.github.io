(function (){
    let paragraphs = document.getElementsByClassName('main')
    for (let index = 0; index < paragraphs.length; index++){
        paragraphs[index].style.backgroundColor = "#424242";
        paragraphs[index].style.width = "100px";
        paragraphs[index].style.height = "100px";
        alert('changed')
    }
})();
