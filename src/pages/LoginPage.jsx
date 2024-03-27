import React from 'react';
import { Container, Box, Button, TextField, Grid, Typography, Link, Card, CardContent, Divider } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import useCollection from '../hooks/useCollection';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Define a custom theme for your page
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Use a color that matches your logo
    },
    secondary: {
      main: '#f50057', // Use a color that contrasts well with the primary color
    },
    // Define a custom gradient for your background
    gradient: {
      main: 'linear-gradient(to right, #1976d2, #f50057)',
    },
  },
  typography: {
    fontFamily: 'Roboto', // Use a font that is easy to read and matches your brand identity
  },
});

function LoginPage() {
  // Get the current collection item from the CMS
  const { collectionItem, loading } = useCollection('loginPage');

  // Get the navigate function from react router
  const navigate = useNavigate();

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    //login(e.target);
    navigate('/dashboard');
  };

  if (loading) {
    return <div>Loading</div>
  }
  
  return (
    // Wrap your page with the ThemeProvider component and pass the theme object
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' }, // Change the direction of the flex items from row to column on smaller screens
          alignItems: 'center',
          justifyContent: 'center',
          // Use the custom gradient for your background
          background: theme.palette.gradient.main,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" color="white" gutterBottom>
                {collectionItem.loginPageHeadline}
              </Typography>
              <Typography variant="h5" color="white" paragraph>
                {collectionItem.loginPageSubhead}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              {/* Wrap your form with the Card component and set the sx prop to style it */}
              <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                <CardContent sx={{ p: 4 }}>
                  {/* Use the Logo component to display your brand logo */}
                  <LockOutlinedIcon sx={{ mb: 4 }} />
                  <form
                    onSubmit={handleSubmit}
                  >
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                    />
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      margin="normal"
                      label="Password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      {collectionItem.loginPageCTA}
                    </Button>
                    {/* Use the Divider component to separate the social login buttons */}
                    <Divider sx={{ my: 2 }}>OR</Divider>
                    {/* Use the Button component to create social login buttons */}
                    <Button
                      variant="outlined"
                      color="primary"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Sign in with Google
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Sign in with Facebook
                    </Button>
                    {/* Use the Typography component to display a text link for the user to register or reset their password */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ mt: 2 }}
                    >
                      Don't have an account?{' '}
                      <Link component={RouterLink} to="/register" onClick={() => navigate('/register')}>
                        Register here
                      </Link>
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ mt: 2 }}
                    >
                      Forgot password?{' '}
                      <Link component={RouterLink} to="/reset" onClick={() => navigate('/reset')}>
                        Reset here
                      </Link>
                    </Typography>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default LoginPage;
