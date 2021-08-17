let isUpdate = false;
let addressBookObject = {};

window.addEventListener('DOMContentLoaded', (event) => {
    validateName();
    validateAddress();
    validatePhoneNumber();
    checkForUpdate();
});

function validateName() {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            console.log(e);
            textError.textContent = e;
        }
    });
}

function validateAddress() {
    const address = document.querySelector('#address');
    const textError = document.querySelector('.address-error');
    address.addEventListener('input', function() {
        if (address.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).address = address.value;
            textError.textContent = "";
        } catch (e) {
            console.log(e);
            textError.textContent = e;
        }
    });
}

function validatePhoneNumber() {
    const number = document.querySelector('#number');
    const numbererror = document.querySelector('.number-error');
    number.addEventListener('input', function() {
        if (number.value.length == 0) {
            numbererror.textContent = "";
            return;
        }
        try {
            (new AddressBookData()).phonenumber = number.value;
            numbererror.textContent = "";
        } catch (e) {
            console.log(e);
            numbererror.textContent = e;
        }
    });
}

const save = (event) => {
    event.preventDefault();
    event.stopPropagation();
    try {
        let personData = setAddressBookObject();
        createAndUpdateStorage(personData);
        resetForm();
        window.location.replace(site_properties.home_page)
    } catch (e) {
        console.log(e);
        return;
    }
}

const setAddressBookObject = () => {
    let addressBookData = new AddressBookData();
    try {
        alert(getInputValueId('#name'))
        addressBookData.name = getInputValueId('#name');
    } catch (e) {
        console.log(e)
        setTextValue('.text-error', e);
        throw e;
    }
    addressBookData.address = getInputValueId('#address');
    addressBookData.city = getInputValueId('#city');
    addressBookData.state = getInputValueId('#state');
    addressBookData.zipcode = getInputValueId('#zipcode');
    addressBookData.phonenumber = getInputValueId('#number');
    addressBookData.id = addressBookObject._id;
    return addressBookData;
}

const getInputValueId = (id) => {
    let value = document.querySelector(id).value;
    return value;
}


const setTextValue = (id, value) => {
    const textError = document.querySelector(id);
    textError.textContent = value;
}

const createNewPersonId = () => {
    let perId = localStorage.getItem('PerId');
    perId = !perId ? 1 : (parseInt(perId) + 1).toString();
    localStorage.setItem('PerId', perId);
    return perId;
}

const createAndUpdateStorage = (data) => {
    let dataList = JSON.parse(localStorage.getItem("AddressBookList"));

    if (dataList) {
        let existingPerData = dataList.find(personData => personData._id == data.id);
        if (!existingPerData) {
            data._id = createNewPersonId();
            dataList.push(data);
        } else {
            const index = dataList.map(personData => personData._id).indexOf(data.id);
            dataList.splice(index, 1, data);
            console.log(dataList)
        }
    } else {
        data._id = createNewPersonId();
        dataList = [data]
    }
    console.log(dataList);

    localStorage.setItem("AddressBookList", JSON.stringify(dataList));
    alert("data stored with name: " + data.name);
}

const resetForm = () => {
    setValue('#name', '');
    setValue('#address', ' ');
    setTextValue(".text-error", ' ');
    setTextValue(".address-error", ' ');
    setTextValue(".number-error", ' ');
    setValue('#city', ' ');
    setValue('#state', ' ');
    setValue('#zipcode', ' ');
    setValue('#number', ' ');
}

const setValue = (id, value) => {
    const element = document.querySelector(id);
    element.value = value;
}

const checkForUpdate = () => {
    const jsonData = localStorage.getItem('edit-person');
    isUpdate = jsonData ? true : false;
    if (!isUpdate) return;
    addressBookObject = JSON.parse(jsonData);
    setForm();
}

const setForm = () => {
    setValue('#name', addressBookObject._name);
    setValue('#address', addressBookObject._address);
    setValue('#city', addressBookObject._city);
    setValue('#state', addressBookObject._state);
    setValue('#zipcode', addressBookObject._zipcode);
    setValue('#number', addressBookObject._phonenumber);

}