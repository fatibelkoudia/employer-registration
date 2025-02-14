import React, {useState ,useEffect } from 'react'; 

function UserForm() {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [birthDate,setBirthDate]=useState('');
const [city, setCity] = useState('');
const [postalCode,setPostalCode]=useState('');


const [isDisabled, setIsDisabled] = useState(true);

useEffect(() => {
    if (firstName && lastName && email && birthDate && city && postalCode) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [firstName, lastName, email, birthDate, city, postalCode]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ firstName, lastName, email, birthDate, city, postalCode });
  };
    return (
        <form>
            <label>
                first name:
                <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label> 
                last name:
                <input type="text" name="lastName"  value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
            </label>
            <label>
                Email:
                <input type="text" name="email"  value={email} onChange={(e)=> setEmail(e.target.value)}/>
            </label>
            <label>
               birth date:
                <input type="date" name="birthDate"   value={birthDate} onChange={(e)=> setBirthDate(e.target.value)}/>
            </label>
            <label>
            Adress:
                <input type="text" name="city"  value={city} onChange={(e)=> setCity(e.target.value)} />
                <input type="number" name="postalCode"   value={postalCode} onChange={(e)=> setPostalCode(e.target.value)}/>
            </label>
            <button disabled={isDisabled} type="submit" onClick={handleSubmit}>Submit</button>
        </form>
         )
}

export default UserForm;
