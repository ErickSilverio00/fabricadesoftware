import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBar = ({ tipoMensagem, mensagem, open, onClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={onClose} sx={{ zIndex: 999999999}}>
      <Alert onClose={onClose} severity={tipoMensagem} sx={{ width: '100%' }}>
        {mensagem}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;