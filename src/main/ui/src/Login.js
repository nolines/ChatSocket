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
        <div className="message-input">
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
                style={{height: "30px", width: "30%"}}
            />
            <Button
                style={{margin:"5px", top:"20px"}}
                variant="contained" color="primary" onClick={handleSubmit}>
                Login
            </Button>
        </div>
    )
}

export default Login;