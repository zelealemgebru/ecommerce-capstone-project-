import { useState } from 'react';
import { Container, TextField, Button, Paper, Typography } from '@mui/material'
import { registerUser, loginUser } from '../api-calls';
import { useNavigation } from 'react-router-dom';
export function LoginSignUp(props){
    const [response, setResponse] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
const navigate = useNavigation()
const {form, setIsLoggedIn} = props
async function handleSubmit(evt) {
    evt.preventDefault()
    const reqexstr = new RegExp('^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$.')

    if (!username || !password) {
      setResponse("Missing Username or Password")
    } else if (password.length < 8) {
      setResponse("password to short")
    // } else if (form === 'signup' && !reqexstr.test(email)) {
    //   setResponse("invalid email")
    } else {
     try {
        console.log("pass")
        const bodyData = form === 'signup' ? await registerUser(username, password, email, name) : await loginUser(username, password)
       console.log(bodyData)
        setName("")
        setUsername("")
        setPassword("")
        setEmail("")
        setResponse("")
        if(bodyData.token){
            localStorage.setItem("token", bodyData.token)
            setIsLoggedIn(true)
        } else {
            navigate('/login')
        }
      } catch (error) {
        console.log(error)
        setResponse(error.toString())
      }
    }
  }
    return (      <Container maxWidth="sm">
    <Paper elevation={3} style={{padding: 'var(--padding)'}}>
      <Typography variant='h4' gutterBottom>Material UI styled form</Typography>
  <form>
    <TextField label='username'  variant="outlined" required fullWidth margin="normal" value={username} onChange={(evt) => {
      setUsername(evt.target.value)
    }} />
    <TextField label='password' type="password"  error={response.includes('password')} helperText={response.includes('password')? response: null}  margin="normal" required fullWidth variant="outlined" value={password} onChange={(evt) => {
      setPassword(evt.target.value)
    }} />
   {form === 'signup' && <><TextField label='name' variant="outlined" fullWidth value={name}  margin="normal" onChange={(evt) => {
      setName(evt.target.value)
    }} />
    <TextField label='email' type="email" variant="outlined" 
     error={response.includes('email')} helperText={response.includes('email')? response: null}
    fullWidth margin="normal" value={email} onChange={(evt) => {
      setEmail(evt.target.value)
    }} /></>} 

    <Button type="button" variant="contained" fullWidth color="primary" disabled={!(username && password)} onClick={handleSubmit}>{form === 'signup'? "Sign Up" : "Login"}</Button>
  </form>
  </Paper>
  </Container>)
}