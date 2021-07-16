let addBtn = document.querySelector("#add-btn");
const URL = "http://localhost:3333";
let root = document.querySelector("#root");
let deleteBtns = document.getElementsByClassName(".delete-btn");
let id;
let editBtn = document.querySelector("#edit-btn");

function showProduct(data){
    let template = document.querySelector('#block').innerHTML;
    let compiledTemplate = Handlebars.compile(template);
    let finishTemplate = compiledTemplate(data);
    document.querySelector('#root').innerHTML = finishTemplate;

    let deleteBtns = document.querySelectorAll('.delete-btn');
    let editBtns = document.querySelectorAll('.edit-btn');

    deleteBtns.forEach((item) => {
        item.onclick = function(){
            deleteProduct();
        }
    });
    editBtns.forEach((item) => {
        item.onclick = editProduct;
    });
}

function getProduct(){
    fetch(`${URL}/buffet`)
    .then(response => response.json())
    .then(data => {showProduct(data);console.log(data)});
}

getProduct();

let editProduct = () => {
    id = event.target.dataset.id;
    console.log(id);
    const url = `http://localhost:3333/buffet/${id}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#edit-name').value = data.name;
            document.querySelector('#edit-price ').value = data.price;
            document.querySelector('#edit-photo').value = data.photo;
            // console.log(data)
        })
}


let addProduct = () => {
    let name = document.querySelector("#md-name").value;
    let price = document.querySelector("#md-price").value;
    let photo = document.querySelector("#md-photo").value;
    
    let data = {name, price, photo};
    let options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    }

    fetch('http://localhost:3333/buffet', options)
    .then(response => response.json())
    .then(data => getProduct());
}

addBtn.onclick = addProduct;

let deleteProduct = () => {
    id = event.target.dataset.id;
    console.log(id)

    let options = {
        method: "DELETE"
    }

    fetch(`${URL}/buffet/${id}`, options)
        .then(response => response.json)
        .then(data => {
            console.log(data)
            getProduct();
        })
}




editBtn.onclick = function () {
    let editUrl = `${URL}/buffet/${id}`;
    let elements = document.querySelectorAll("#edit-form input");
    let data = {};

    elements.forEach((elem) => {
        data[elem.name] = elem.value;
    })
    let options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    fetch(editUrl, options)
        .then(data => data.json())
        .then(response => {
            // console.log(response);
            getProduct();
        });
}