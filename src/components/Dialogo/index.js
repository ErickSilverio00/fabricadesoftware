import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const Dialogo = ({ open, onClose, titulo, mensagem, onConfirm, itemParaDeletar }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{titulo}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {mensagem}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          Não
        </Button>
        <Button onClick={() => {
            onConfirm(itemParaDeletar);
            }} autoFocus>
            Sim
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Dialogo;
