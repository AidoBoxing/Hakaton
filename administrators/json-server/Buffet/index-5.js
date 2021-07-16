const url = 'http://localhost:3333/';
let editBtn = document.querySelector('#btn');
let id;

function getProductById(){
    fetch(url + 'buffet/' + id)
    .then(response => response.json())
    .then(data => {
      showProducts(data);
      getId(data);
  })
}

function getId(data){
  id = `${data.id}`
  
  console.log(data)
}

function showProducts(data){
  let template = document.querySelector('#buffet-view').innerHTML;
  let compiledTemplate = Handlebars.compile(template);
  let finishTemplate = compiledTemplate(data);
  document.querySelector('#root').innerHTML = finishTemplate;
}

getProductById();

// let URL = 'http://localhost:3333/buffet'
let editProduct = () => {
  const url = `http://localhost:3333/buffet/${id}`;

  fetch(url)
  .then(response => response.json())
  .then(data => {
    document.querySelector("#edit-name").value = data.name;
    document.querySelector("#edit-price").value = data.price;
    document.querySelector("#edit-photo").value = data.photo;
  })
}


