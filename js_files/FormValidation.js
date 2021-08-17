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
            checkName(name.value);
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
            checkAddress(address.value);
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
            checkPhonenumber(number.value);
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
        setAddressBookObject();
        if (site_properties.use_local_storage.match("true")) {
            createAndUpdateStorage();
            alert("Data Stored With Name " + addressBookObject._name);
            resetForm();
            window.location.replace(site_properties.home_page)
        } else
            createOrUpdatePersonInJsonServer();
    } catch (e) {
        console.log(e);
        return;
    }
}

const setAddressBookObject = () => {
    if (!isUpdate && site_properties.use_local_storage.match("true")) {
        addressBookObject.id = createNewPersonId();
    }
    addressBookObject._name = getInputValueId('#name');
    addressBookObject._address = getInputValueId('#address');
    addressBookObject._city = getInputValueId('#city');
    addressBookObject._state = getInputValueId('#state');
    addressBookObject._zipcode = getInputValueId('#zipcode');
    addressBookObject._phonenumber = getInputValueId('#number');
    return addressBookObject;
}

function createOrUpdatePersonInJsonServer() {
    let url = site_properties.server_url;
    let methodCall = "POST";
    let message = "Data Store with name ";
    if (isUpdate) {
        methodCall = "PUT";
        url = url + addressBookObject.id.toString();
        message = "Data Updated with name ";
    }
    makeServiceCall(methodCall, url, true, addressBookObject)
        .then(response => {
            alert(message + addressBookObject._name)
            resetForm();
            window.location.replace(site_properties.home_page);
        })
        .catch(error => {
            console.log("inside error")
            throw error
        });
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

const createAndUpdateStorage = () => {
    let dataList = JSON.parse(localStorage.getItem("AddressBookList"));

    if (dataList) {
        let existingPerData = dataList.find(personData => personData.id == addressBookObject.id);
        if (!existingPerData) {
            data._id = createNewPersonId();
            dataList.push(addressBookObject);
        } else {
            const index = dataList.map(personData => personData.id).indexOf(addressBookObject.id);
            dataList.splice(index, 1, addressBookObject);
            console.log(dataList)
        }
    } else {
        //data._id = createNewPersonId();
        dataList = [addressBookObject]
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