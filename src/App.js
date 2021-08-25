import React, { useState, useEffect } from 'react';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
  let list = localStorage.getItem('list');
  if(list) return JSON.parse(list)
  else return []
}

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      // display alert
       showAlert(true,'please enter value','danger')
      
    } else if (input && isEditing) {
      // deal with edit
      showAlert(true,'value changed','success')
      setList(list.map(item => {
        if(item.id === editID) {
          return {...item,title:input}
        }
        return item
      })
      )
      setInput('')
      setIsEditing(false)
      setEditID(null)
    } else {
      // show alert
      showAlert(true,'item added to the cart','success')
      const newItem = {
        id: new Date().getTime().toString(),
        title: input
      };
      setList([...list, newItem]);
      setInput('')
      console.log(list);
    }
  
  }
  const showAlert = (show='false', msg='', type='') => {
    setAlert({show,msg,type}) // ES6 
  }
  const handleRemove = (index) => {
    showAlert(true,'item removed', 'danger')
    setList(list.filter((item) => item.id !== index))
  };
  const handleEdit = (id) => {
    const specificItem = list.find( item => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setInput(specificItem.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className='section-center'>

      <form className='grocery-form' onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input type="text"
            className='grocery'
            value={input}
            placeholder='e.g. eggs'
            onChange={(e) => {
              setInput(e.target.value)
            }}
          />
          <button type='submit' className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} 
          handleRemove={handleRemove}
          handleEdit={handleEdit} 
          setInput={setInput}/>
          <button onClick={() => {
            setList([])
            showAlert(true,'empty list','danger')
          }}
            className='clear-btn'>clear items</button>
        </div>
      )}
    </section>
  );
}

export default App;
