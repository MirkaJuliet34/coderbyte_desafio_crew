/* Fornecemos alguns códigos de modelo React simples. Seu objetivo é criar um formulário simples na parte superior 
que permita ao usuário inserir nome, sobrenome e número de telefone e deve haver um botão de envio. Uma vez pressionado 
o botão enviar, as informações deverão ser exibidas em uma lista abaixo (classificada automaticamente pelo sobrenome) 
junto com todas as informações anteriores que foram inseridas. Desta forma, o aplicativo pode funcionar como uma simples 
lista telefônica. Quando seu aplicativo for carregado, os campos de entrada (não a lista da lista telefônica) já deverão 
estar pré-preenchidos com os seguintes valores: */

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';

const style = {
  table: {
    borderCollapse: 'collapse'
  },
  tableCell: {
    border: '1px solid gray',
    margin: 0,
    padding: '5px 10px',
    width: 'max-content',
    minWidth: '150px'
  },
  form: {
    container: {
      padding: '20px',
      border: '1px solid #F0F8FF',
      borderRadius: '15px',
      width: 'max-content',
      marginBottom: '40px'
    },
    inputs: {
      marginBottom: '5px'
    },
    submitBtn: {
      marginTop: '10px',
      padding: '10px 15px',
      border:'none',
      backgroundColor: 'lightseagreen',
      fontSize: '14px',
      borderRadius: '5px'
    }
  }
}

function PhoneBookForm({ addEntryToPhoneBook }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const Firstname = e.target.Firstname.value;
    const lastName = e.target.userLastname.value;
    const phone = e.targrt.userPhone.value;
    addEntryToPhoneBook({ Firstname, lastName, phone });
    e.target.reset();
};

  return (
    <form onSubmit={handleSubmit} style={style.form.container}>
      <label>First name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userFirstname'
        name='userFirstname' 
        type='text'
        defaultValue='Codificador'
      />
      <br/>
      <label>Last name:</label>
      <br />
      <input 
        style={style.form.inputs}
        className='userLastname'
        name='userLastname' 
        type='text' 
        defaultValue='Byte'
      />
      <br />
      <label>Phone:</label>
      <br />
      <input
        style={style.form.inputs}
        className='userPhone' 
        name='userPhone' 
        type='text'
        defaultValue='8885559999'
      />
      <br/>
      <input 
        style={style.form.submitBtn} 
        className='submitButton'
        type='submit' 
        value='Add User' 
      />
    </form>
  )
}

function InformationTable({ entries }) {

  const sortedEntries = entries.sort((a, b) => a.lastName.localeCompare(b.lastName));
  
  return (
    <table style={style.table} className='informationTable'>
      <thead> 
        <tr>
          <th style={style.tableCell}>First name</th>
          <th style={style.tableCell}>Last name</th>
          <th style={style.tableCell}>Phone</th>
        </tr>
      </thead> 
      <tbody>
        {sortedEntries.map((entry, index) => (
          <tr key={index}>
            <td style={style.tableCell}>{entry.firstname}</td>
            <td style={style.tableCell}>{entry.lastname}</td>
            <td style={style.tableCell}>{entry.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Application() {
  
  const [phoneBook, setPhoneBook] = useState([]);

  const addEntryToPhoneBook = (entry) => {
   setPhoneBook([...phoneBook, entry]);
};

return (
    <section>
      <PhoneBookForm addEntryToPhoneBook={addEntryToPhoneBook} />
      <InformationTable entries={phoneBook} />
    </section>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Application />);
root.render(<Application />);