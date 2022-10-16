import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
const Recorduser = (props) => (
 <tr>
    <td>{props.record.species}</td>
    <td>{props.record.age}</td>
    <td>{props.record.level}</td>
    <td>{props.record.breed}</td>
    <td>{props.record.contact}</td>

 </tr>
);
export default function UserRecordList() {
 const [value, setValue] = useState("");
 const [userrecords, usersetRecords] = useState([]);
 console.log(value)
 // This method fetches the records from the database.
 async function getRecord() {
    const response = await fetch(`http://localhost:5001/record/`.concat(value));

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    
    }

    const userrecords = await response.json();
    usersetRecords(userrecords);
  }
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5001/record/`.concat(value));
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const userrecords = await response.json();
     usersetRecords(userrecords);
   }
 
   getRecords();
 
   return;
 }, [userrecords.length]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5001/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = userrecords.filter((el) => el._id !== id);
   usersetRecords(newRecords);
 }
 const [before, after] = useState('');
 const handleChangee = event => {
    after(event.target.value);
    findit(event.target.value)
  //console.log('value is:', event.target.value);
};
 function findit(theinput) {

 }
 
 // This method will map out the records on the table
 function userrecordList() {
   return userrecords.map((record) => {
     return (
       <Recorduser
         record={record}
  
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div className="column">
    <TextField
          style={{ marginTop: 20}}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            getRecord();
            userrecordList();
          }}
        />
   
     <h3 style={{ marginTop: 10 }}>Record List</h3>
     <table className="table table-striped">
       <thead>
         <tr>
           <th>Species</th>
           <th>Age/Years had for</th>
           <th>Ownership</th>
           <th>Breed</th>
           <th>Contact</th>
         </tr>
       </thead>
       <tbody>{userrecordList()}</tbody>
     </table>
   </div>
 );
}