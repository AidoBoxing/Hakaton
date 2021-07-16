let cart = {};

getProducts();

function getProducts(){
  const url = "http://localhost:3333/buffet"

  fetch(url)
  .then(response => response.json())
  .then(data => showProducts(data))
}

function showProducts(data){
  let template = document.querySelector('#product-card').innerHTML;
  let compiledTemplate = Handlebars.compile(template);
  let finishTemplate = compiledTemplate(data);
  document.querySelector('#root').innerHTML = finishTemplate;
}

