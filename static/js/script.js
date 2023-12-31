// Business Logic for AddressBook ---------
function AddressBook() {
    Object.defineProperty(this, "contacts", {
      value: {},
      writable: true,
    });
  
    Object.defineProperty(this, "currentId", {
      value: 0,
      writable: true,
    });
  }
  
  AddressBook.prototype.addContact = function (contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
  };
  
  AddressBook.prototype.assignId = function () {
    this.currentId += 1;
    return this.currentId;
  };
  
  AddressBook.prototype.findContact = function (id) {
    if (this.contacts[id] !== undefined) {
      return this.contacts[id];
    }
    return false;
  };
  
  AddressBook.prototype.deleteContact = function (id) {
    if (this.contacts[id] === undefined) {
      return false;
    }
    delete this.contacts[id];
    return true;
  };
  
  // Adding an editContact method to AddressBook prototype
  AddressBook.prototype.editContact = function (id, updatedData) {
    if (this.contacts[id] !== undefined) {
      const contact = this.contacts[id];
      // Loop through the keys in updatedData and update the contact's properties
      for (const key in updatedData) {
        if (contact.hasOwnProperty(key)) {
          contact[key] = updatedData[key];
        }
      }
      return true; 
    }
    return false; 
  };
  
  function Contact(firstName, lastName, phoneNumber, email) {
    Object.defineProperty(this, "firstName", {
      value: firstName,
      writable: true
    })
  
    Object.defineProperty(this, "lastName", {
      value: lastName,
      writable: true
    })
  
    Object.defineProperty(this, "phoneNumber", {
      value: phoneNumber,
      writable: true
    })
  
    Object.defineProperty(this, 'email', {
      value: email,
      writable: true
    })

    Object.defineProperty(this, "fullName", {
      get: function() {
        return this.firstName + " " + this.lastName
      },
      set: function(value) {
        const parts = value.split(" ");
        this.firstName = parts[0]
        this.lastName = parts[1]
      },
      enumerable: true,
    });
  }
  
  Contact.prototype.fullName = function () {
    return this.firstName + " " + this.lastName
  }
  
  // Function to edit a contact
  function editContact(contactId) {
    const contact = addressBook.findContact(contactId);
    if (contact) {
      const updatedFirstName = prompt('Enter the new first name:', contact.firstName);
      const updatedLastName = prompt('Enter the new last name:', contact.lastName);
      const updatedPhoneNumber = prompt('Enter the new phone number:', contact.phoneNumber);
      const updatedEmail = prompt('Enter the new email address:', contact.email);
  
      const updatedData = {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        phoneNumber: updatedPhoneNumber,
        email: updatedEmail,
      };
  
      addressBook.editContact(contactId, updatedData);
      displayContacts(addressBook);
    } else {
      alert('Contact not found.');
    }
  }
  
  // Function to delete a contact
  function deleteContact(contactId) {
    const result = confirm('Are you sure you want to delete this contact?');
    if (result) {
      const deleted = addressBook.deleteContact(contactId);
      if (deleted) {
        displayContacts(addressBook);
      } else {
        alert('Contact not found.');
      }
    }
  }
  
  function displayContacts(addressBook) {
    const contactContainer = document.querySelector('#contacts');
    contactContainer.innerHTML = '';
  
    for (const contactId in addressBook.contacts) {
      const contact = addressBook.contacts[contactId];
      const { firstName, lastName, phoneNumber, email } = contact; 
  
      const contactElement = document.createElement('div');
      contactElement.innerHTML = `
        <h3>${firstName}</h3>
        <h3>${lastName}</h3>
        <p>Phone: ${phoneNumber}</p>
        <p>Email: ${email}</p> <!-- Use "email" here -->
        <button onclick='editContact(${contactId})'>Edit</button>
        <button onclick='deleteContact(${contactId})'>Delete</button>`;
      contactContainer.appendChild(contactElement);
    }
  }
  
  let addressBook = new AddressBook();
  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    var firstName = document.getElementById("firstNameInput").value;
    var lastName = document.getElementById("lastNameInput").value;
    var phoneNumber = document.getElementById("phoneInput").value;
    var email = document.getElementById("emailInput").value;
    let newContact = new Contact(firstName, lastName, phoneNumber, email)
    addressBook.addContact(newContact)
  
    // Clear the input fields after adding a new contact
    document.getElementById("firstNameInput").value = "";
    document.getElementById("lastNameInput").value = "";
    document.getElementById("phoneInput").value = "";
    document.getElementById("emailInput").value = "";
  
    displayContacts(addressBook);
  }
  
  document.querySelector('#form').addEventListener('submit', handleFormSubmit); 
  