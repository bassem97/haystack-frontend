import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Iconify from "../Iconify";
import {ListItemIcon, ListItemText, MenuItem} from "@mui/material";
import {useState} from "react";
import axios from "axios";


export default function FormDialog({isOpen,user,index}) {
    const [open, setOpen] = React.useState(isOpen);

     const role =()=> {
         if (index === 1)
             if(user.role === "User" || user.role === "Admin")
                 return "SuperAdmin"
             else return "Admin"
         else
             if(user.role === "SuperAdmin" || user.role === "Admin")
                 return "User"
             else return "Admin"
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [inputRole, setInputRole] = useState("");

    async function handleConfirm() {
        if (role() === inputRole) {
            await axios.post('http://localhost:8080/user/grantrole', {
                id: user._id,
                role : role()
            }).then(res => {
                console.log(res.data);
                handleClose();
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div>
            <MenuItem >
                <ListItemIcon>
                    {/*<Iconify icon="ic:outline-admin-panel-settings" width={24} height={24} />*/}
                    <Iconify icon={role() == "user"? "ic:outline-verified-user" : role() == "admin"?"material-symbols:admin-panel-settings-outline-rounded" : "material-symbols:admin-panel-settings-rounded" } width={24} height={24} />
                </ListItemIcon>
                <ListItemText onClick={handleClickOpen} primary={"Assign "+role()} primaryTypographyProps={{ variant: 'body2' }} />
            </MenuItem>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Do you want to assign "<strong>{role()}</strong>" role to <strong> {user.firstName} {user.lastName}</strong> ?
                        This action cannot be undone !!
                        please type "<strong>{role()}</strong>" to confirm !!

                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="role"
                        label="Role"
                        type="text"
                        fullWidth
                        onChange={(e) => setInputRole(e.target.value)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
