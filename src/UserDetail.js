import React, {useState} from 'react';
import './App.css';
import './UserDetail.css';
import {useParams, useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import emailRegex from './emailRegex';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function UserDetail({items}) {
  const history = useHistory();

  const params = useParams();


  const userData = items.find((x) => x.id == params.id);
  const {
    address: {city},
    name,
    username,
    email,
  } = userData || {address: {}};
 

  const [newName, setNewName] = useState(name);
  const [newUsername, setNewUsername] = useState(username);
  const [newCity, setNewCity] = useState(city);
  const [newEmail, setNewEmail] = useState(email);

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const edit = () => {
    userData.name = newName;
    userData.username = newUsername;
    userData.address.city = newCity;
    userData.email = newEmail;
    history.push('/');

    fetch(
      `https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${userData.id}`,
      {
        method: 'PUT',
        body: JSON.stringify(userData),
      }
    );
  };

  const handleChange = (event) => {
    // setNameError(!event.target.value)
    !event.target.value ? setNameError(true) : setNameError(false);
    setNewName(event.target.value);
  };
  const handleChange2 = (event) => {
    setNewUsername(event.target.value);
  };
  const handleChange3 = (event) => {
    setNewCity(event.target.value);
  };
  const handleChange4 = (event) => {
    !emailRegex.test(event.target.value)
      ? setEmailError(true)
      : setEmailError(false);
    setNewEmail(event.target.value);
  };

  const classes = useStyles();

  if (!userData) {
    return <h1>User Not Found</h1>;
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid
        spacing={4}
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <TextField
            error={nameError}
            helperText={nameError ? 'Full name required.' : ''}
            variant="outlined"
            id="component-outlined"
            value={newName}
            onChange={handleChange}
            label="Name"
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            id="component-outlined"
            value={newUsername}
            onChange={handleChange2}
            label="Username"
          />
        </Grid>
        <Grid item>
          <TextField
            variant="outlined"
            id="component-outlined"
            value={newCity}
            onChange={handleChange3}
            label="City"
          />
        </Grid>
        <Grid item>
          <TextField
            error={emailError}
            helperText={emailError ? 'Invalid email' : ''}
            variant="outlined"
            id="component-outlined"
            value={newEmail}
            onChange={handleChange4}
            label="Email"
          />
        </Grid>
        <Button onClick={edit} disabled={nameError || emailError}>
          Submit
        </Button>
        <Button 
          color="secondary"
          onClick={() => history.push('/')}
        >
          Cancel
        </Button>
      </Grid>
    </form>
  );
}

export default UserDetail;
