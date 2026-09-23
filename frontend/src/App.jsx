import {useState,useEffect} from "react";
import "./App.css";


function App() {

  const [customers,setCustomers] = useState([]);  //setCustomers if function we use to add customers later
  const [name,setName] = useState("");            //Input cant done for all fields at once we need to seperete fields
  const [phone,setPhone] = useState("");
  const [email,setEmail] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/customers",{
      method:"POST",                               //I want to send new data
      headers:{
        "content-Type":"application/json"          //Tells express that the data we are sending is JSON
      },
      body: JSON.stringify({                       //converted data JSON text that can be sent in HTTP request
        name:name,
        phone:phone,
        email:email
      })
    })
    .then(response=> response.json())
    .then(newCustomer => {
      
      setCustomers(prevCustomers=>[
        ...prevCustomers,
        newCustomer
      ]);
      setName("");
      setPhone("");
      setEmail("");
    });
  };

  useEffect(()=>{
    fetch("http://localhost:5000/customers")      //Go to this address and request the data
    .then(response => response.json())      // show me reponse from the server in browser  
    .then(data => setCustomers(data));

    
  },[]);  //[] use to "Run this effect when the component intially loads,and dont run it again because of later state changes"

  
  return(
    <div>
      <h1>Olivia Bridal & Beauty</h1>
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name"
        value={name}
        onChange={(event)=> setName(event.target.value)}
        />
      <input 
        type="text" 
        placeholder="Phone"
        value = {phone}
        onChange = {(event)=> setPhone(event.target.value)}
        />
      <input 
        type="email" 
        placeholder="Email"
        value = {email}
        onChange = {(event)=> setEmail(event.target.value)}
        />
      <button type="submit">Add Customer</button>
      
    </form>


    <div className="customer-container">
    {customers.map(customer=>(
      <div className="customer-card" key={customer._id}>
      <p>{customer.name}</p>
      <p>{customer.phone}</p>
      <p>{customer.email}</p>
      </div>
    ))}
    </div>
    </div>
  );
 
}

export default App;