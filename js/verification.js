let myBtn = document.querySelector('#my-btn');
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

function showError(){
	if (counter == 0) {
		let showText = document.createElement('h5');
		let inputs = document.querySelector('.form__verification-numbers');
		showText.textContent = 'Неверный код';
		showText.classList.add('error', 'text-center');
		inputs.after(showText);
		inputs.classList.add('addError');
		counter = 1;
	}

}

myBtn.onclick = function() {
	let code = '';
	let msisdn = localStorage.getItem('msisdn');
	let formElements = document.querySelectorAll('#form-elements input');
	formElements.forEach((item) => {
		code += item.value;
	});

	const URL = ``;


	fetch(URL)
	.then(response => response.json())             
	.then(data => {
		if(data.status === 1){
			window.location = 'applicationForm.html';
		} else if(data.status === 0){
			showError();
		} else {
			alert('Oops ! Что-то произошло..');
		}
	})

}





