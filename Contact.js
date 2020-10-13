class Contact {

    // Never use the constructor directly. Always need to use
    // the async factory method. Since we are most often creating
    // the object from a json object returned from server, we wrote
    // the constructor to expect object state to be given as such.

    constructor(obj_json) {
        this.id = obj_json.id;
        this.first = obj_json.first;
        this.last = obj_json.last;
        this.email = obj_json.email;
        this.phone = obj_json.phone;
        this.notes = obj_json.notes;
    }

    // update writes the current state of the object back to the
    // server. Should be called after one or more of the object fields are
    // changed. 

    async update() {
        let data_string = JSON.stringify({
            first: this.first,
            last: this.last,
            email: this.email,
            phone: this.phone,
            notes: this.notes
        });

        let response = await $.ajax("http://localhost:3000/contacts/"+this.id,
        {
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: data_string
        })

        // Update local structure with current state from server.
        // Shouldn't really need to do this if things actually worked but 
        // can't hurt.

        this.id = response.id;
        this.first = response.first;
        this.last = response.last;
        this.email = response.email;
        this.phone = response.phone;
        this.notes = response.notes;

        // Return object now updated.
        return this;
    }
}

// Retrieves array of all contact ids

Contact.findAll = async () => {
    let response = await $.ajax("http://localhost:3000/contacts/", {type: "GET", dataType: "json"});

    return response
}

// Retrieves Contact object given id

Contact.find = async (id) => {
    try {
        let response = await $.ajax("http://localhost:3000/contacts/"+id,
        {
            type: "GET",
            dataType: "json"
        });

        return new Contact(response);
    } catch {
        throw "No contact with id: " + id;
    }
};

// Creates new contact

Contact.create = async (first, last, email, phone, notes) => {
    let data_string = JSON.stringify({
        first: first,
        last: last,
        email: email,
        phone: phone,
        notes: notes
    });

    let response = await $.ajax("http://localhost:3000/contacts",
    {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: data_string
    });

    return new Contact(response);
}

