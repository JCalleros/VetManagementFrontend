import { TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import useForm from '../hooks/useForm';
import { useEffect } from 'react';

function LoginForm() {
    const navigate = useNavigate();
    const { logIn, isLoading, error, isAuthenticated } = useAuth();
    const [values, handleChange] = useForm({
      email: '',
      password: '',
    })


    const handleSubmit = async (event) => {
      event.preventDefault();
      const { email, password } = values;
      try {
        await logIn({email, password});
        console.log(`Login in LOGIN FROM COMPONENT isAuth: ${isAuthenticated}`);
      }catch(error){
        console.error(error);
      }
    }
    
    useEffect(()=>{
      if(isAuthenticated){
        navigate('/dashboard')
      }
    }, [isAuthenticated, navigate])

    
    return (
    <form onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        required
        fullWidth
        margin="normal"
        label="Email Address"
        name="email"
        type="email"
        value={values.email}
        autoComplete="email"
        onChange={handleChange}
      />
      <TextField
                variant="outlined"
                required
                fullWidth
                margin="normal"
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                autoComplete='Password'
              />
      {/* Other form fields */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        dissabled={isLoading}
        sx={{ mt: 2 }}
      >
        Login
      </Button>
      {error && <div>Error: {error.message}</div>}
    </form>
  );
}

export default LoginForm;
