import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';

const Signup = () => {
  const [formData, setFormData] = useState(
    { name: '', email: '', password: '' }
  );
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/api/v1/sign-up');
      
      
      
      navigate('/sign-in');
      console.log(response.data);
      
    }catch(error){
      console.log({error: `error signing up ${error.message}`});
    }
  }

  return (
    <form onSubmit= {handleSubmit}>
      <h1> Sign up </h1>
      <input
        type = "text" 
        name = "name" 
        placeholder = "Enter your full name" 
        onChange = {handleChange}
        required
      />
      <input 
        type = "email" 
        name = "email" 
        placeholder = "Enter your email" 
        onChange = {handleChange}
        required
      />
      <input 
        type = "password" 
        name = "password" 
        placeholder = "Create password" 
        onChange = {handleChange}
        required
      />

      <button type = "submit"> Sign up</button>

    </form>
  );
};

export default Signup;