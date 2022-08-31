import { useState, useEffect, useRef } from 'react';
//import SeachResults from './components/SeachResults';
import './App.css';
//import Censys from 'censys.io';
import {Buffer} from 'buffer';

const username = 'e1e37320-a89e-469b-9096-4c10d5060d18';
const password = 'RVFdFp4kXmhWguuHiGlprfKgarUPtFoB';
const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

function App() {

  const [ data, setResult] = useState([]);
  const inputRef = useRef(null);

  useEffect(()=> {
    if(inputRef) inputRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;

    if (!value) {
      setResult([]);
      return;
    }
    
    const baseURl = `https://search.censys.io/api/v2/hosts/search?q=${value}&per_page=100&virtual_hosts=EXCLUDE`;

    fetch(baseURl, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
      .then((response) => response.json())
      .then(( data ) => 
        setResult(data.result.hits.reduce((prev, hit) => 
        prev.concat(hit.services.map(service => 
          [hit.ip, service.port])),[])));            
      //console.log('handleInputChange', e.target.value);
      console.log('VALUE QUERY:', value);
     
  };
  console.log('DATA:', data);
  
    
  return (
    <div className='container'>
      <form>
        <label htmlFor="search">Hosts Search</label>
        <input name="search" id="search" onChange={handleInputChange} ref={inputRef}/>
      </form>
        <div>
          <p> <span>IP: {data}1 </span> - PORT: {data}1 </p>
        </div>
    </div>
  );
}

export default App;
