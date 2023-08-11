import React, { useState } from 'react';
import axios from 'axios';

function EditItem({ itemId, initialData, onUpdate }) {
  const [editedData, setEditedData] = useState({ ...initialData });

  const handleEdit = async () => {
    await axios.put(`http://localhost:8080/api/edit/${itemId}`, editedData);
    onUpdate();

  setEditedData({


    name:"",
    email:"",
    mobile:"",
    password:""
  })


  };

  const handleChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <div>
      <input
        type="text"
        value={editedData.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <input
        type="text"
        value={editedData.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <input
        type="text"
        value={editedData.mobile}
        onChange={(e) => handleChange('mobile', e.target.value)}
      />
      <input
        type="password"
        value={editedData.password}
        onChange={(e) => handleChange('password', e.target.value)}
      />
      <button onClick={handleEdit}>Save</button>
    </div>
  );
}

export default EditItem;