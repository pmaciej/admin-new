import React, {useState} from 'react';
import './App.css';
import {Link} from 'react-router-dom';
//import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useHistory} from 'react-router-dom';


function Users({items, sortItems, deleteUser}) {
  
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(items.id);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const history = useHistory();


  return (
    <React.Fragment>
      <Button size="large" color="primary" onClick={() => history.push('/create')}>Create User</Button>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell><Button color="secondary" onClick={sortItems}>Username</Button></TableCell>
            <TableCell>City</TableCell>
            <TableCell>Email</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {items.map((items) => (
            <TableRow key={items.id}>
              <TableCell>{items.id}</TableCell>
              <TableCell>{items.name}</TableCell>
              <TableCell>{items.username}</TableCell>
              <TableCell>{items.address.city}</TableCell>
              <TableCell>{items.email}</TableCell>
              <TableCell>
                <Link to={`/${items.id}`}>Edit</Link>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    handleClickOpen();
                    setModal(items.id);
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`User Delete`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to delete user with id {modal}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteUser(modal);
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {!items.length && <h1>No users to show</h1>}
    </React.Fragment>
  );
}

export default Users;
