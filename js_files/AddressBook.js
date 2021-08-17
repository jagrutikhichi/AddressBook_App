class AddressBookData {

    id;

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }
    set name(name) {
        console.log(name);
        let pattern = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if (pattern.test(name))
            this._name = name;
        else
            throw 'Incorrect Name';
    }

    get address() {
        return this._address;
    }
    set address(address) {
        console.log(address)
        let pattern = RegExp('^[a-zA-Z\s]+(\.)? [a-z A-Z]{3,}$');
        if (pattern.test(address))
            this._address = address;
        else
            throw 'Incorrect Address';
    }

    get city() {
        return this._city;
    }
    set city(city) {
        this._city = city;
    }

    get state() {
        return this._state;
    }
    set state(state) {
        this._state = state;
    }

    get zipcode() {
        return this._zipcode;
    }
    set zipcode(zipcode) {
        this._zipcode = zipcode;
    }

    get phonenumber() {
        return this._phonenumber = this.phonenumber;
    }
    set phonenumber(phonenumber) {
        console.log(phonenumber)
        let numberpattern = RegExp('[+][0-9]{1,}\\s[1-9]{1}[0-9]{9}$');
        if (numberpattern.test(phonenumber))
            this._phonenumber = phonenumber;
        else
            throw 'Incorrect Phone Number';
    }

    toString() {
        return "id=" + this.id + "name=" + this.name + " address=" + this.address + " city=" + this.city + " state=" + this.state +
            " zipcode=" + this.zipcode + " phonenumber=" + this.phonenumber;
    }

}