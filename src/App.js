import "./App.css";
import ContactsOrigin from "./contacts.json";
import React, { useState } from "react"


function App() {  
  const baseState = ContactsOrigin.slice(-5)
  const [contacts, setContacts] = useState(baseState)

  let popularity;

  const addRandomContact = () => {
    // add filter not too fetch same contact twice    
    const availableContacts = ContactsOrigin.slice(5);
    const randomIndex = Math.floor(Math.random() * availableContacts.length);
    
    const copiedContacts = [... contacts]

    copiedContacts.push(availableContacts[randomIndex])
    console.log(copiedContacts)
    
    setContacts(copiedContacts)
  }

  const sortByName = () => {
    const copiedContacts = [... contacts]

    copiedContacts.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    else return 0
    })

    setContacts(copiedContacts)
  }

  const sortByPopularity = () => {
    const copiedContacts = [... contacts]
    copiedContacts.sort((a, b) => {
      return b.popularity - a.popularity
    })
    setContacts(copiedContacts)
  }

  const handleDelete = (e) => {
    const copiedContacts = [... contacts]
    console.log(e.target.className)

    let contactToDelete = copiedContacts.find(contact => contact.id === e.target.className);
    let indexToDelete = copiedContacts.indexOf(contactToDelete)

    copiedContacts.splice(indexToDelete, 1)

    console.log(copiedContacts)

    setContacts(copiedContacts)
  }

  return <div className="App">
  <h1>Iron Contacts</h1>
  <button onClick={addRandomContact} style={{width:"200px", height:"40px", fontSize:"20px", marginBottom:"10px"}}>Add random contact</button>
  <button onClick={sortByName} style={{width:"200px", height:"40px", fontSize:"20px", marginBottom:"10px"}}>Sort by name</button>
  <button onClick={sortByPopularity} style={{width:"200px", height:"40px", fontSize:"20px", marginBottom:"10px"}}>Sort by popularity</button>
  <table className="table-contacts">
    <thead className="tablehead">
      <tr>
        <td>Picture</td>
        <td>Name</td>
        <td>Popularity</td>
        <td>Won Oscar</td>
        <td>Won Emmy</td>
      </tr>
    </thead>
      <tbody>
        {contacts.map(contact => {
          popularity = contact.popularity.toFixed(2);
          return (
            <tr key={contact.id}>
              <td className="tabledata"><img src={contact.pictureUrl} alt={contact.name} /></td>
              <td className="tabledata tabledata-text">{contact.name}</td>
              <td className="tabledata tabledata-text">{popularity}</td>
              {contact.wonOscar && <td className="trophy">🏆</td>}
              {!contact.wonOscar && <td></td>}
              {contact.wonEmmy && <td className="trophy">🏆</td>}
              {!contact.wonEmmy && <td></td>}
              <td><button onClick={(e) => handleDelete(e)} className={contact.id}>Delete</button></td>
            </tr>
          )
        })}
      </tbody>
  </table>
  </div>;
}

export default App;