import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import Iconify from "./Iconify";
import FormDialog from "./Dialogs/FormDialog";
// component


// ----------------------------------------------------------------------

export default function UserMoreMenu({user}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleClickOpen = () => {
        dialogIsOpen(true);
    };

    const handleClose = () => {
        dialogIsOpen(false);
    };

  console.log(user)

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill"  width={20} height={20}  />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >




                  <MenuItem style={{padding:0}}>
                      {/*<ListItemIcon>*/}
                      {/*    <Iconify icon="ic:baseline-admin-panel-settings" width={24} height={24} />*/}
                      {/*</ListItemIcon>*/}
                      {/*<ListItemText onClick={()=> isOpen}  primary="Assign super admin" primaryTypographyProps={{ variant: 'body2' }} />*/}
                      <FormDialog  open={dialogIsOpen} user={user} index={1}/>

                  </MenuItem>

                  {/*<MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>*/}
                  <MenuItem style={{padding:0}}>
                      {/*<ListItemIcon>*/}
                      {/*    <Iconify icon="ic:outline-admin-panel-settings" width={24} height={24} />*/}
                      {/*</ListItemIcon>*/}
                      {/*<ListItemText onClick={()=>setDialogIsOpen(true)} primary="Assign admin" primaryTypographyProps={{ variant: 'body2' }} />*/}
                      <FormDialog  open={dialogIsOpen} user={user} index={2}/>
                  </MenuItem>



      </Menu>

    </>
  );
}
