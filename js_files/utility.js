const checkName = (name) => {
    let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$')
    if (!nameRegex.test(name))
        throw "Name Is Incorrect!"
}

const checkAddress = (address) => {
    let addRegex = RegExp('^[a-zA-Z\s]+(\.)? [a-z A-Z]{3,}$')
    if (!addRegex.test(address))
        throw "Address Is Incorrect!"
}

const checkPhonenumber = (number) => {
    let numberRegex = RegExp('^[+][0-9]{1,}\\s[1-9]{1}[0-9]{9}$')
    if (!numberRegex.test(number))
        throw "PhoneNumber Is Incorrect!"
}