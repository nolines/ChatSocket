import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const Login = ({onSubmit}) => {

    const [username, setUsername] = useState("");
    let handleUserNameChange = event => setUsername(event.target.value);

    let handleSubmit = () => {
        onSubmit(username);
    }

    return (
        <div>
            <TextField
                label="Type your username"
                placeholder="Username"
                onChange={handleUserNameChange}
                margin="normal"
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        handleSubmit();
                    }
                }}
                id="standard-basic"
            />
            <Button
                variant="contained" color="primary" onClick={handleSubmit} style={{}}>
                Login
            </Button>
        </div>
    )
}

export default Login;