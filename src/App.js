import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';


function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      // display alert
    } else if (input && isEditing) {
      // deal with alert
    } else {
      // show alert
      const newItem = {
        id: new Date().getTime().toString(),
        title: input
      };
      setList([...list, newItem]);
      setInput('')
    }

  }
  const handleChange = (e) => {
    setInput(e.target.value)
  }
  const handleRemove = (index) => {
    setList(list.filter((inputValue) => inputValue.index !== index))
  };

  return (
    <section className='section-center'>

      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text"
            className='grocery'
            value={input}
            placeholder='e.g. eggs'
            onChange={handleChange}
          />
          <button type='submit' className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} />
          <button onClick={() => {
            setList([]);
            setInput('')
          }}
            className='clear-btn'>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
