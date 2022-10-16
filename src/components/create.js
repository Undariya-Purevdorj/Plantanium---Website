import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Create() {
 const [form, setForm] = useState({
   species: "",
   age: "",
   breed: "",
   userid: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 
   await fetch("http://localhost:5001/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ species: "", age: "", userid: "" }); //  NOTE TO SELF: WHY is this NOT breaking the code???
   navigate("/");
 }

 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="species">Species</label>
         <input
           type="text"
           className="form-control"
           id="species"
           value={form.species}
           onChange={(e) => updateForm({ species: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="age">Age/Years had for</label>
         <input
           type="text"
           pattern="^[0-9]*$"
           className="form-control"
           id="age"
           value={form.age}
           onChange={(e) => updateForm({ age: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="breed">Breed</label>
         <input
           type="text"
           className="form-control"
           id="breed"
           value={form.breed}
           onChange={(e) => updateForm({ breed: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="Contact">Contact</label>
         <input
           type="text"
           className="form-control"
           id="Contact"
           value={form.contact}
           onChange={(e) => updateForm({ contact: e.target.value })}
         />
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionIntern"
             value="Current Owner"
             checked={form.level === "Current Owner"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionIntern" className="form-check-label">Current Owner</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="positionJunior"
             value="Former owner"
             checked={form.level === "Former owner"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="positionJunior" className="form-check-label">Former Owner</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Add Creature"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 )
 
 ;
 
}