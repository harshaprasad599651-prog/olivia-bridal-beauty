import {useState,useEffect} from "react";


function App() {

  const [customers,setCustomers] = useState([]);  //setCustomers if function we use to add customers later

  useEffect(()=>{
    fetch("http://localhost:5000/customers")      //Go to this address and request the data
    .then(response => response.json())      // show me reponse from the server in browser  
    .then(data => setCustomers(data));

    
  },[]);  //[] use to "Run this effect when the component intially loads,and dont run it again because of later state changes"

  
  return(
    <div>
      <h1>Olivia Bridal & Beauty</h1>
    {customers.map(customer=>(
      <><p key={customer._id}>{customer.name}</p>
      <p>{customer.phone}</p>
      <p>{customer.email}</p>
      </>
    ))}
    </div>
  );

}

export default App;