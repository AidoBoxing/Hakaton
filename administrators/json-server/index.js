const URL = 'http://localhost:3333/user';

let editBtn = document.querySelector("#editBtn");
let searchBtn = document.querySelector('#searchBtn');
let id;

let getUsers = () => {
    fetch(URL)
        .then(response => response.json())
        .then(data => showUsers(data))
}

let deleteUser = () => {
    id = event.target.dataset.id;

    let options = {
        method: "DELETE"
    }

    fetch(`${URL}/${id}`, options)
        .then(response => response.json)
        .then(data => {
            // console.log(data)
            getUsers();
        })
}

let getUSerById = (id) => {
    const url = `http://localhost:3333/user/${id}`;
    let userData;

    fetch(url)
        .then(response => response.json())
        .then(data => userData = data)

    return userData;
}

let editUser = () => {
    id = event.target.dataset.id;

    const url = `http://localhost:3333/user/${id}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.querySelector('#edit-name').value = data.name;
            document.querySelector('#edit-course').value = data.course;
            document.querySelector('#edit-phoneNumber').value = data.phoneNumber;
            document.querySelector('#edit-PIN').value = data.PIN;
            document.querySelector('#edit-login').value = data.login;
            document.querySelector('#edit-surname').value = data.surname;
            document.querySelector('#edit-patronymic').value = data.patronymic;
            document.querySelector('#edit-email').value = data.email;
            // console.log(data)
        })

};
editBtn.onclick = function () {
    // alert(123)
    let editUrl = `${URL}/${id}`;
    let elements = document.querySelectorAll("#edit-form input");
    let data = {};
    elements.forEach((elem) => {
        data[elem.name] = elem.value;
    })
    console.log(id)
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
            console.log(response);
            getUsers();
        })
}


let showUsers = (data) => {
    let bodyTable = document.querySelector('#body-table');
    let tr = '';

    data.forEach((item) => {
        tr += `
        <tr>
        <td>${item.id}</td>
        <td>${item.surname} ${item.name} ${item.patronymic}</td>
        <td>${item.course}</td>
        <td>${item.phoneNumber}</td>
        <td>${item.PIN}</td>
        <td>${item.login}</td>
        <td>${item.email}</td>
        <td>
        <button type="button" data-id="${item.id}" id="patchBtn" class="btn  modals" data-bs-toggle="modal" data-bs-target="#modals" data-bs-whatever="@fat"></button>
        <button data-id="${item.id}" class="btn  delete-btn"></button>
        
        
        </td>
        
        </tr>
        `
    })

    bodyTable.innerHTML = tr;

    let deleteBtns = document.querySelectorAll('.delete-btn');
    let editBtns = document.querySelectorAll('.modals')

    deleteBtns.forEach((item) => {
        item.onclick = deleteUser;
    });

    editBtns.forEach((item) => {
        item.onclick = editUser;
    });

}
getUsers();

let modalBtn = document.getElementById('btn');

modalBtn.onclick = function () {
    let surname = document.querySelector("#md-surname").value;
    let name = document.getElementById('md-name').value;
    let patronymic = document.querySelector("#md-patronymic").value;
    let course = document.getElementById('md-course').value;
    let phoneNumber = document.getElementById('md-phoneNumber').value;
    let PIN = document.getElementById('md-PIN').value;
    let login = document.querySelector("#md-login").value;
    let email = document.querySelector("#md-email").value;


    let obj = {
        surname,
        name,
        patronymic,
        course,
        phoneNumber,
        PIN,
        login,
        email
    };

    let options = {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(obj)
    }

    fetch(URL, options)
        .then(obj => {
            obj.json();
            // location.reload();
            getUsers();
        });
}