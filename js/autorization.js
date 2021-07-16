let btn = document.querySelector('#btn');
let counter = 0;

function testJump(x){
    var ml = ~~x.getAttribute('maxlength');
    if(ml && x.value.length >= ml){
        do{
            x = x.nextSibling;
        }
        while(x && !(/number/.test(x.type)));
        if(x && /number/.test(x.type)){
            x.focus();
        }
    }
}

function showError(txt = 'Неправильно набран номер, пожалуйста, проверьте правильность набора номера и повторите попытку') {
	let err = document.querySelector('.error');
	if(err) err.remove();
    let showText = document.createElement('h5');
    let inputs = document.querySelector('.form-input');
    showText.textContent = txt;
    showText.classList.add('error', 'text-center');
    inputs.after(showText);
    inputs.classList.add('addError');
}

function collectData(){
  let formElements = document.querySelectorAll(".form__verification-numbers input");
  let login = document.getElementById('input-number');
  let data = {};
  data[login.name] = login.value;
  let pin = '';
  formElements.forEach((elem) => {
    pin += elem.value;
})
  data["pin"] = pin;
  console.log(data);

  return data;
  
}


btn.onclick = function () {
    // let msisdn = localStorage.getItem('msisdn');
    let password  = collectData();
    return;

    let obj = {login,password}



    if (!inputNumber || !data) {
        showError('Заполните поле!');
        return;
    }

    const URL = 'http://localhost:3333/user';

    let options = {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify(obj)
  }

  fetch(URL, options)
  .then(response => {
    if (response.ok) {
        return response.json();
        console.log(data);
    } else {
        alert('Oops ! Что-то произошло..');
    }
})
  .then(data => {
    if (data.result === 1) {
            // localStorage.setItem('msisdn', inputNumber, "pin", formElements);
            console.log(data);
        } else if (data.result === 0) {
            showError();
        }

    })
}




// {
//     'phone': '996505123456',
//     'pin': '996505123456';
// }


