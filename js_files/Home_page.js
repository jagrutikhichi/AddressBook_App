let addressBookList;

window.addEventListener('DOMContentLoaded', (event) => {
    console.log("Called Event");
    addressBookList = getDataFromLocalStorage();
    document.querySelector('.per-count').textContent = addressBookList.length;
    createInnerHtml();
    localStorage.removeItem("edit-person");
});

const createInnerHtml = () => {
    const headerHtml ="<tr><th>Full Name</th> <th>Address</th><th>City</th><th>State</th><th>Zip Code</th><th>Phone Number</th><th>Actions</th></tr>"
    let innerHtml = `${headerHtml}`;
    for(let addressData of addressBookList) {
        innerHtml =`${innerHtml}
    
        <tr>
        <td>${addressData._name}</td>
        <td>${addressData._address}</td>
        <td>${addressData._city}</td>
        <td>${addressData._state}</td>
        <td>${addressData._zipcode}</td>
        <td>${addressData._phonenumber}</td>
        <td>
            <img id="${addressData._id}" src="../assets/icon/delete-black-18dp.svg" alt="Delete" onclick="remove(this)">
            <img id="${addressData._id}" src="../assets/icon/create-black-18dp.svg" alt="Edit" onclick="update(this)">
        </td>
    </tr>`;
    document.querySelector('#display').innerHTML=innerHtml;
    }    
}

const getDataFromLocalStorage= () => {
    return localStorage.getItem('AddressBookList')? 
           JSON.parse(localStorage.getItem('AddressBookList')) : [];
}

const remove = (data) => {

    let addBookData = addressBookList.find(personData => personData._id == data._id);
    if (!addBookData) {
        return;
    }
    const index = addressBookList.map(personData => personData._id).indexOf(addBookData._id);
    addressBookList.splice(index, 1);
    localStorage.setItem('AddressBookList', JSON.stringify(addressBookList));
    document.querySelector('.per-count').textContent = addressBookList.length;
    createInnerHtml();
}

const update = (data) => {
    let addBookData = addressBookListt.find(personData => personData._id == data._id);
    if (!addBookData) {
        return;
    }
    localStorage.setItem('edit-emp', JSON.stringify(addBookData));
    window.location.replace(site_properties.add_employee_page);
}