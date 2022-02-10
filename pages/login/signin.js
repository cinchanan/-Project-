import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from 'next/link';
import Box from '@mui/material/Box';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
import { useRouter } from 'next/router'
const theme = createTheme();

export default function SignIn() {
  const router = useRouter()
  //useForm
  // const { register, handleSubmit } = useForm({ shouldUseNativeValidation: true });
  // const onSubmit = async data => { console.log(data); };

   const handleSubmit = (event) => {
     event.preventDefault()
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    //router.push('/content/create/listcontent')
    if(data.get('email') =="test@admin.com" && data.get('password') =="123"){
      alert("Login Success")
      router.push('/content/create/listcontent')
          
    }else{
      alert("Incorrect password");
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
      
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        
           <AdminPanelSettingsIcon />
          </Avatar>
          
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit}>
          {/* <form onSubmit={handleSubmit(onSubmit)}> */}
          {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
            <TextField
              margin="normal"
             required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
          />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              
            >
              Sign In
            </Button>
            </form>
          {/* </Box> */}
        </Box>
          
      </Container>
    </ThemeProvider>
  );
}