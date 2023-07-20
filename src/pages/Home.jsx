import React, { useCallback, useState } from 'react'
import Form from '../components/Form'
import TodoItem from '../components/TodoItem'
import AppBarLabel from '../components/TopBar'
import { Box, Button, Collapse, Container, List, Paper, Slide } from '@mui/material'
import { TransitionGroup } from 'react-transition-group';

export default function Home() {
    const [todos, setTodos] = useState([]); //Esta é a lista geral de tarefas
    const [undo, setUndo] = React.useState(false); //Essa é responsavel pela ativação do botão desfazer
    const [lastEditedTodoText, setLastEditedTodoText] = React.useState(null); //Salva o texto para desfazer edição
    const [lastEditedTodoId, setLastEditedTodoId] = React.useState(null); //Salva o id para desfazer edição
    const [lastDeletedTodo, setLastDeletedTodo] = React.useState(null); //Salva tarefa para desfazer exclusão
    const [timeoutId, setTimeOutId] = React.useState(null);
    const [lastDeletedTodoId, setLastDeletedTodoId] = React.useState(null); // Salva a ordenação da tarefa excluída

    //Essa função adiciona novas tarefas a lista
    const addTodo = useCallback((todo) => {
        setTodos((prevTodos) => [...prevTodos, todo]);
    }, []);

    //Essa função serve para extrair o ID da última tarefa afim de evitar duplicação
    const checkLastId = () => {
        let len = todos.length;
        if (len === 0) {
            return 0;
        } else {
            return todos[len -1].id + 1;
        };
    };

    //Essa função deleta uma tarefa a partir do ID e chama a função desfazer
    const deleteTodo = (id) => {
        let deletedTodo = todos.find((todo) => todo.id === id);
        let filtered = todos.filter((todo) => todo.id !== id);
        setTodos(filtered);
        setLastDeletedTodo(deletedTodo);
        setLastDeletedTodoId(deletedTodo.id); // Armazena o ID da tarefa excluída
        resetUndo();
        setUndo(true); // Ativa o botão desfazer
        undoCloser();
    };

    //Essa função edita uma tarefa a partir do ID e chama a função desfazer
    const editTodo = (id, newText) => {
        setLastDeletedTodo(null); //Anula o last delete para não desfazer o delete ao desfazer o update
        let todosArray = [...todos];
        let editedTodo = todosArray.find((todo) => todo.id === id);
        setLastEditedTodoText(editedTodo.text);
        setLastEditedTodoId(editedTodo.id);
        for (let i in todosArray) {
          if (todosArray[i].id === editedTodo.id) {
            todosArray[i].text = newText;
          }
        }
        setTodos(todosArray);
        resetUndo();
        setUndo(true); //Ativa o botão desfazer
        undoCloser();
      };

    //Essa função faz o botão de desfazer desaparecer
    const undoCloser = () => {
        let timeoutId = setTimeout(() => {
            setUndo(false);
            }, 3000);
        setTimeOutId(timeoutId); //Aqui é definido o timeoutId para que ele possa ser cancelado ao clicar no desfazer
    };

    //Essa função desfaz a última alteração
    const handleUndo = () => {
        resetUndo();
        //Checa se foi uma edição
        if (lastEditedTodoText) {
            let editedTodos = [...todos];
            let index = editedTodos.findIndex((todo) => todo.id === lastEditedTodoId);
            if (index !== -1) {
                editedTodos[index].text = lastEditedTodoText;
                setTodos(editedTodos);
                //Aqui as váriaveis que guardam informação das ultimas edições são resetadas
                setLastEditedTodoText(null); 
                setLastEditedTodoId(null);
            }
        }
    
        //Checa se foi uma exclusão
        if (lastDeletedTodo) {
            setTodos((prevTodos) => {
                // Encontra o índice onde a tarefa deve ser reinserida com base no ID
                const insertIndex = prevTodos.findIndex((item) => item.id > lastDeletedTodoId);
                // Caso o insertIndex seja -1, significa que a tarefa deve ser reinserida no final da lista
                if (insertIndex === -1) {
                    return [...prevTodos, lastDeletedTodo];
                }
                // Caso contrário, insere a tarefa na posição correta com base no insertIndex
                return [...prevTodos.slice(0, insertIndex), lastDeletedTodo, ...prevTodos.slice(insertIndex)];
            });
            setLastDeletedTodo(null);
            setLastDeletedTodoId(null); // Reseta o ID da tarefa excluída
        }
        //Aqui a váriavei que guarda informação das ultima exclusão é resetada
        setLastDeletedTodo(null);
        };

    //Esse trecho serve para resetar o timer do undo para que ele não feche quando se inicia outra ação
    const resetUndo = () => {
        clearTimeout(timeoutId);
        setUndo(false);
    };

    // Esse trecho reinsere as tarefas salvas no navegador ao reiniciar a aplicação
    React.useEffect(() => {
        let data = window.localStorage.getItem('savedArray');
        data = JSON.parse(data);
        for(let i in data){
            let todoObj = { text: data[i].text, id: data[i].id };
            addTodo(todoObj);
        };
    }, [addTodo]);
    
    //Esse trecho salva a lista de tarefas no navegador toda vez que ela é alterada
    React.useEffect(() => {
        if( todos !== null){
            console.log(todos);
            window.localStorage.setItem('savedArray', JSON.stringify(todos));
    }}, [todos]);

    return (
        <div>
          <Container maxWidth="xs" style={{ marginTop: "1em" }}>
            <AppBarLabel/> {/* Barra superior com o título do APP */}
            <Form addTodo ={addTodo} checkLastId ={checkLastId}/>  {/* Formulário de inserção de tarefas */}
            <Box sx={{ mt: 1 }}>
                <List sx={{ marginTop : "0.1em" }}>
                    <TransitionGroup>
                        {todos.map((todo) => ( //Filtra todas as tarefas e separa como todo
                        <Collapse key={todo.id} style={{ marginTop:"0.5em" }}>
                            <TodoItem editTodo={editTodo} todo={todo} deleteTodo={deleteTodo}/> {/* chama o componente editTodo */}
                        </Collapse>
                        ))}
                    </TransitionGroup>
                </List>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <Slide direction="up" in={undo} mountOnEnter unmountOnExit>
                    <Paper sx={{ position: 'fixed', bottom: 0 }}>
                        <Button sx={{ alignSelf: 'flex-end' }} onClick={() => handleUndo()}>Desfazer</Button>
                    </Paper>
                </Slide>
            </Box>
          </Container>
        </div>
      );
}
