(function (){
    // Set variables for all elements you want to change
    const divs = document.getElementsByTagName('div');
    const ps = document.getElementsByTagName('p');
    const spans = document.getElementsByTagName('span');
    const as = document.getElementsByTagName('a');
    const iframe = document.getElementsByTagName('iframe');
    const x_tab_inner = document.getElementsByClassName('x-tab-inner');
    const x_tab_inner_default = document.getElementsByClassName('x-tab-inner-default');

    // Store all elements in an array
    const elements = [divs, ps, spans, as, x_tab_inner, x_tab_inner_default, iframe];

    // Loops through them changing values
    for (let item = 0; item < elements.length; item++) {
        let element = elements[item];
        for (let index = 0; index < element.length; index++) {
            element[index].style.backgroundColor ='#424242';
            element[index].style.color = '#d0d0d0';
        }
    }
    alert('changed');
})();