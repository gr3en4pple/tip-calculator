const billInput = document.querySelector('.bill-input');
const pplInput = document.querySelector('.people-input');
const error = document.querySelector('.peoples-error')
const custom = document.querySelector('.custom-input');
const tips = document.querySelector('.tips-result');
const total = document.querySelector('.total-result');
const btns = document.getElementsByClassName('btns');
const resetBtn = document.querySelector('.reset-buttons')
var tipPercent = 0
const pplFocus = (event) => {
    const daddy = event.currentTarget.parentElement;
    daddy.style.border="1px solid var(--bold-blue)"
    error.classList.remove('shaking')
    error.style.opacity='0'
}

const billTyping = (event) => {
    const daddy = event.currentTarget.parentElement;
    daddy.style.border="1px solid var(--bold-blue)"
}
const Blur = event => {
    const input = event.currentTarget;
    const daddy = input.parentElement;
    if(!checkInput(input.value)) {
        if(input.classList.contains('people-input')) 
            errorMsg(input.value)

        daddy.style.borderColor='red'
    }
    else
        daddy.style.borderColor='transparent'

    showResult();
}
const errorMsg = (value) => {
    error.classList.add('shaking');
    error.style.opacity='1'
    if(value == 0)
        error.innerText = 'People must be more than 0'
    else if(isNaN(value))
        error.innerText = 'People must be a valid number'
}
const checkInput = value => {
    if(value == 0 || isNaN(value)) 
        return false;
    else return true;
}

const selectTip = event => {
    const button = event.currentTarget;
    Array.from(btns).forEach(element => {
        element.classList.remove('clicked')
    })
    custom.value = ''
    custom.style.border =''
    button.classList.add('clicked');
    tipPercent = button.innerText.slice(0,-1)
    showResult();
}

const showResult = () => {
    const bill = billInput.value;
    const people = pplInput.value;
    const customInput = custom.value
    let tipTotal;
    let tipPerPPL;
    let totalPerPPL;
    if(checkInput(people) && checkInput(bill) && checkCustom(customInput)) {
            tipTotal = (bill*tipPercent)/100
            tipPerPPL = Math.round((tipTotal/people)*100)/100;
            totalPerPPL= Math.round(((bill/people)+ tipPerPPL)*100)/100;
            tips.innerText = tipPerPPL;
            total.innerText = totalPerPPL;
    }
   
}

const reset = (event)=> {
    tips.innerText='0.00'
    total.innerText='0.00'
    billInput.value = ''
    pplInput.value = ''
    custom.value = ''
    tipPercent = 0;
    error.innerText = ''
    pplInput.parentElement.style.border =''
    billInput.parentElement.style.border =''
}

const checkCustom = (value) =>{
    if(isNaN(value) || value < 0 || value > 100)
        return false;
    return true;
}
pplInput.addEventListener('focus',pplFocus);
pplInput.addEventListener('blur',Blur);
billInput.addEventListener('focus',billTyping);
billInput.addEventListener('blur',Blur);
custom.addEventListener('focus',(event ) => {
    Array.from(btns).forEach(element => {
        element.classList.remove('clicked')
    })
    tipPercent = 0
    event.currentTarget.placeholder=''
  
});  

custom.addEventListener('blur',(event) => {
    let input =  event.currentTarget;
    if(!checkCustom(input.value))
        input.style.border='1px solid red'

    else {
        tipPercent=input.value
        input.style.border=''
    }   
    event.currentTarget.placeholder='Custom'
    showResult()

});  

Array.from(btns).forEach(element => {
    element.addEventListener('click',selectTip)
})
resetBtn.addEventListener('click',reset)
