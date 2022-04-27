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


export default function FormDialog({isOpen,user,index}) {
    const [open, setOpen] = React.useState(isOpen);

     const role =()=> {
         if (index === 1)
             if(user.role === "User" || user.role === "Admin")
                 return "super admin"
             else return "admin"
         else
             if(user.role === "SuperAdmin" || user.role === "Admin")
                 return "user"
             else return "admin"
    }

    // const role = "asba"

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [inputRole, setInputRole] = useState("");

    function handleConfirm() {
        role() === inputRole && handleClose();
    }

    return (
        <div>
            <MenuItem >
                <ListItemIcon>
                    <Iconify icon="ic:outline-admin-panel-settings" width={24} height={24} />
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
