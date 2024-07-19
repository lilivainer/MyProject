/* script.js */

// מוודא שכל התוכן נטען לפני הרצת הסקריפט
document.addEventListener('DOMContentLoaded', () => {
  const contactList = document.getElementById('contactList');
  const contactModal = document.getElementById('contactModal');
  const addContactBtn = document.getElementById('addContactBtn');
  const clearContactsBtn = document.getElementById('clearContactsBtn');
  const closeModalBtn = document.querySelector('.close');
  const contactForm = document.getElementById('contactForm');
  const modalTitle = document.getElementById('modalTitle');
  const contactIdInput = document.getElementById('contactId');

  let contacts = [
    { id: 1, name: 'Lili Vainer', email: 'lili@gmail.com', phone: '123-456-7890' },
    { id: 2, name: 'Lidor Tubul', email: 'lidor@gmail.com', phone: '098-765-4321' },
    { id: 3, name: 'Miki Buganim', email: 'miki@gmail.com', phone: '555-123-4567' }
  ];

  // פונקציה להצגת אנשי קשר
  function renderContacts() {
    contactList.innerHTML = '';
    contacts.forEach(contact => {
      const li = document.createElement('li');
      li.innerHTML = `
        <h3>${contact.name}</h3>
        <p>Email: ${contact.email}</p>
        <p>Phone: ${contact.phone}</p>
        <button onclick="editContact(${contact.id})">Edit</button>
      `;
      contactList.appendChild(li);
    });
  }

  // פונקציה לפתיחת החלון המוקפץ
  function openModal() {
    contactModal.style.display = 'block';
  }

  // פונקציה לסגירת החלון המוקפץ
  function closeModal() {
    contactModal.style.display = 'none';
    contactForm.reset();
    contactIdInput.value = '';
  }

  // פונקציה לעריכת איש קשר
  window.editContact = function (id) {
    const contact = contacts.find(contact => contact.id === id);
    if (contact) {
      contactIdInput.value = contact.id;
      document.getElementById('name').value = contact.name;
      document.getElementById('email').value = contact.email;
      document.getElementById('phone').value = contact.phone;
      modalTitle.textContent = 'Edit Contact';
      openModal();
    }
  };

  // פונקציה לטיפול בהגשת הטופס
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const id = contactIdInput.value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (id) {
      // עדכון איש קשר קיים
      const contact = contacts.find(contact => contact.id === parseInt(id));
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    } else {
      // הוספת איש קשר חדש
      const newContact = {
        id: contacts.length ? contacts[contacts.length - 1].id + 1 : 1,
        name,
        email,
        phone
      };
      contacts.push(newContact);
    }
    
    renderContacts();
    closeModal();
  });

  // פונקציה למחיקת כל אנשי הקשר
  clearContactsBtn.addEventListener('click', () => {
    contacts = [];
    renderContacts();
  });

  // מאזינים לאירועים לפתיחה וסגירה של החלון המוקפץ
  addContactBtn.addEventListener('click', () => {
    modalTitle.textContent = 'Add Contact';
    openModal();
  });
  closeModalBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
      closeModal();
    }
  });

  // הצגה ראשונית של אנשי הקשר
  renderContacts();
});
