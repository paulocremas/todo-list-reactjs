import { Button, Paper, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function Form({ addTodo , checkLastId}) {
  const [text, setText] = useState(''); //Esse é o texto a ser inserido como tarefa
  const [error, setError] = useState(''); //Mensagem de erro
  const [isFocused, setIsFocused] = useState(false); //Seleção da textbox

  //Função que insere uma tarefa na lista - Envia info para './Home.jsx'
  const todoCreate = (text) => {
    if (text.trim() === '' || text.length < 2) { //Checa se o texto está vazio ou tem menos de 2 letras
      setError('Digite uma tarefa válida'); // Define a mensagem de erro
      return; // Retorna se o campo de texto estiver vazio
    }

    setError(''); // Limpa a mensagem de erro

    const todoObj = { text: text, id: checkLastId() }; //Define o objeto a ser inserido
    addTodo(todoObj); //Insere o objeto no todos da home
    document.getElementById("outlined-basic").value = null //Limpa a textbox após a inserção do objeto
    setText(''); // Limpa o estado do texto
    setIsFocused(false);
  };

  //Serve para inserir tarefaz apertando enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Evita que a página seja recarregada
      todoCreate(text); // Chama a função que adiciona o item
      setText('');
    }
  }

  //Entende se algo está sendo escrito na textbox para remover mensagem de erro
  const handleChange = (event) => {
    setText(event.target.value);
    setError(''); // Limpa a mensagem de erro
  };

  //Ativa a seleção da textbox  para remover mensagem de erro
  const handleFocus = () => {
    setIsFocused(true);
    setError(''); // Limpa a mensagem de erro
  };

  return (
    <Paper style={{ padding: "1em" }}>
        <div style={{ display:"flex" , justifyContent: "center" }}>
            <TextField 
              id="outlined-basic" 
              label="Digite sua tarefa" 
              variant="outlined" 
              fullWidth 
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              error={Boolean(error)} // Define o estado de erro do TextField
              helperText={error} // Define a mensagem de erro do TextField
              className={isFocused ? 'focused' : ''}
            />
            <Button variant="text" onClick={() => todoCreate(text)}>Add</Button>
        </div>
    </Paper>
  )
}
