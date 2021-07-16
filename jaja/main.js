let saveBtn = document.querySelector('#save-btn');
let bankName = document.getElementById('bank__name');
let formInputItem = document.querySelector('#jaja');
let rule;
let dosCredoBank = document.querySelector('#dos-credo-bank');
let bakaiBank = document.querySelector('#bakai-bank');
function showRules(){
    console.log(bankName.selectedIndex); 
    if(bankName.selectedIndex === 1){
    bakaiBank.classList.add('d-block');
    dosCredoBank.classList.remove("d-block");
    } else if(bankName.selectedIndex === 2){
    bakaiBank.classList.remove("d-block");
    dosCredoBank.classList.add("d-block");
    }   else{
      dosCredoBank.classList.remove("d-block");
   bakaiBank.classList.remove("d-block");
    }
}
    

function collectData(){
  let formInputsPart = document.querySelectorAll('.form__inputs');
  let data = {};

  formInputsPart.forEach(el => {
    let inputs = el.querySelectorAll('.form__input');
    data[el.id] = {};
    inputs.forEach(elem => {
      data[el.id][elem.name] = elem.value;
    });
  });

  return data;
}


saveBtn.onclick = function(){
  let data  = collectData();
  const URL = '';

  let options = {
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(data)
  }

  fetch(URL, options)
  .then(response => {
    if(response.ok){
      return response.json();
    } else {
      alert('Ошибкa')
    }
  })
  .then(data => {
   if(data.status === 1){
    window.location = 'finish.html';
        // console.log(data);
      } else if(data.status === 0){
        alert('Произошла ошибкa');
      }
    })
}

