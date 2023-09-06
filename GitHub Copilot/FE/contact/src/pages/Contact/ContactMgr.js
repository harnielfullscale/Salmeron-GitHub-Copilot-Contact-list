// Create Contact Manager for CRUD operations
// Create a new file named ContactMgr.js in the src/pages/Contact folder and add the following code:
import axios from '../../utils/Axios';

const ContactMgr = {
  // Get all contacts
  getAllContacts: async () => {
    try {
      const response = await axios.get('/api/contacts/');
      return response.data;
    } catch (error) {
      return error;
    }
  },

  // Get contact by id
  getContactById: async (id) => {
    try {
      const response = await axios.get(`/contacts/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  // Create new contact
  createContact: async (contact) => {
    try {
      const response = await axios.post('/api/contacts/', contact);
      return response.data;
    } catch (error) {
      return error;
    }
  },

  // Update contact
  updateContact: async (id, contact) => {
    try {
      const response = await axios.put(`/contacts/${id}`, contact);
      return response.data;
    } catch (error) {
      return error;
    }
  },
};

export default ContactMgr;
