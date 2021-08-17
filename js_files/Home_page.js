let addressBookList;

window.addEventListener('DOMContentLoaded', (event) => {
    if (site_properties.use_local_storage.match("true")) {
        addressBookList = getDataFromLocalStorage();
    } else
        getBookDataFromServer();
});

function processAddressBookDataResponse() {

    document.querySelector('.per-count').textContent = addressBookList.length;
    createInnerHtml();
    localStorage.removeItem("edit-person");
}

const getDataFromLocalStorage = () => {
    addressBookList = localStorage.getItem('AddressBookList') ?
        JSON.parse(localStorage.getItem('AddressBookList')) : [];
    processAddressBookDataResponse();
}

const getBookDataFromServer = () => {
    makeServiceCall("GET", site_properties.server_url, true)
        .then(response => {
            addressBookList = JSON.parse(response);
            processAddressBookDataResponse();
        })
        .catch(error => {
            console.log("Get Error Status : " + JSON.stringify(error));
            addressBookList = [];
            processAddressBookDataResponse();
        })
}


const createInnerHtml = () => {
    const headerHtml = "<tr><th>Full Name</th> <th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th></tr>"
    let innerHtml = `${headerHtml}`;
    for (let addressData of addressBookList) {
        innerHtml = `${innerHtml}
    
        <tr>
        <td>${addressData._name}</td>
        <td>${addressData._address}</td>
        <td>${addressData._city}</td>
        <td>${addressData._state}</td>
        <td>${addressData._zipcode}</td>
        <td>${addressData._phonenumber}</td>
        <td>
            <img id="${addressData.id}" src="../assets/icon/delete-black-18dp.svg" alt="Delete" onclick="remove(this)">
            <img id="${addressData.id}" src="../assets/icon/create-black-18dp.svg" alt="Edit" onclick="update(this)">
        </td>
    </tr>`;
        document.querySelector('#display').innerHTML = innerHtml;
    }
}


const remove = (data) => {

    let addBookData = addressBookList.find(personData => personData.id == data.id);
    if (!addBookData) {
        return;
    }
    const index = addressBookList.map(personData => personData.id).indexOf(addBookData.id);
    addressBookList.splice(index, 1);
    localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
    document.querySelector('.per-count').textContent = addressBookList.length;
    createInnerHtml();
}

const update = (data) => {
    console.log(data.id);
    let addBookData = addressBookList.find(personData => personData.id == data.id);
    if (!addBookData) {
        return;
    }
    localStorage.setItem('edit-person', JSON.stringify(addBookData));
    window.location.replace(site_properties.add_employee_page);
}