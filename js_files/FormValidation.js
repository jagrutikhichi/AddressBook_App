window.addEventListener('DOMContentLoaded', (event) => {
    validateName();
    validateAddress();
    validatePhoneNumber();
});

function validateName() {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function () {
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
    address.addEventListener('input', function () {
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
    number.addEventListener('input', function () {
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

const save = () => {
    try {
        let addressBookData = createAddressBook();
        createAndUpdateStorage(addressBookData);
    } catch (e) {
        console.log(e);
        return;
    }
}

const createAddressBook = () => {
    let addressBookData = new AddressBookData();

    try {
        addressBookData.name = getInputValueId('#name');
    } catch (e) {
        console.log(e)
        setTextValue('.text-error', e);
        throw e;
    }
    addressBookData.address = getInputValueId('#address');
    addressBookData.city    = getInputValueId('#city');
    addressBookData.state   = getInputValueId('#state');
    addressBookData.zipcode = getInputValueId('#zipcode');
    addressBookData.phonenumber = getInputValueId('#number');
    console.log(addressBookData);

    return addressBookData;
}

const getInputValueId = (id) => {
    let value = document.querySelector(id).value;
    return value;
}


const setTextValue = (id, message) => {
    const textError = document.querySelector(id);
    textError.textContent = message;
}

const createAndUpdateStorage = (data) => {
    let dataList = JSON.parse(localStorage.getItem("AddressBookList"));

    if(dataList != undefined) {
        dataList.push(data);
    }
    else {
        dataList = [data];
    }
    console.log(dataList);

    localStorage.setItem("AddressBookList", JSON.stringify(dataList));
    alert("data stored with name: "+data.name);
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