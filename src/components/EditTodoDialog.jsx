import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';

export default function EditTodoDialog({ open , dialogHandler , todo , editTodo}) {
  const [editedText , setEditedText] = React.useState(todo.text)
  const [error, setError] = React.useState(''); //Mensagem de erro
  const [isFocused, setIsFocused] = React.useState(false); //Seleção da textbox
  
  //Envia o pedido de edição ao Home
  const handleConfirm = () => {
    if (editedText.trim() === '' || editedText.length < 2) { //Checa se o texto está vazio ou tem menos de 2 letras
      setError('Digite uma tarefa válida'); // Define a mensagem de erro
      return; // Retorna se o campo de texto estiver vazio
    }
    editTodo(todo.id, editedText);
    dialogHandler();
  };

  //Permite selecionar o OK usando enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleConfirm();
      event.preventDefault(); // Evita que a página seja recarregada
    }
  };

  //Entende se algo está sendo escrito na textbox para remover mensagem de erro
  const handleChange = (event) => {
    setEditedText(event.target.value);
    setError(''); // Limpa a mensagem de erro
  };

  //Ativa a seleção da textbox  para remover mensagem de erro
  const handleFocus = () => {
    setIsFocused(true);
    setError(''); // Limpa a mensagem de erro
  };

  // Define o estado "error" como uma string vazia toda vez que o "open" muda
  React.useEffect(() => {
    setError('');
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={dialogHandler}
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {"Edite sua tarefa"}
      </DialogTitle>
      <DialogContent>
        <TextField defaultValue={todo.text} 
        fullWidth
        onChange={handleChange}
        onFocus={handleFocus}
        className={isFocused ? 'focused' : ''}
        inputProps={{ maxLength: 27 }}// Define o limite máximo de caracteres
        error={Boolean(error)} // Define o estado de erro do TextField
        onKeyDown={handleKeyDown}/> {/* Permite selecionar o OK usando enter */}
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogHandler}> Cancelar </Button> {/* Cancela a alteração */}
        <Button onClick={handleConfirm}> Ok </Button> {/* Salva a alteração */}
      </DialogActions>
    </Dialog>
  );
}
