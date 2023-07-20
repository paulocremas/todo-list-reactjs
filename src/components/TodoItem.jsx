import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { Paper } from '@mui/material';
import EditTodoDialog from './EditTodoDialog';
import EditIcon from '@mui/icons-material/Edit';


export default function TodoItem({ todo , deleteTodo , editTodo}) {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [isChecked, setIsChecked] = React.useState(false);

    const dialogHandler = () => {
        setOpenDialog(!openDialog);
    };

    const handleTextClick = () => {
        setIsChecked(!isChecked);
    };
    

  return (
    <>
        <EditTodoDialog editTodo={editTodo} open={openDialog} dialogHandler={dialogHandler} todo={todo} errorOff={''}/>
        <Paper style ={{ padding: "0.5em 0em" }}>
            <ListItem >
                <ListItemButton role={undefined} dense onClick={handleTextClick}>
                    <ListItemIcon>
                        <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            checked={isChecked}
                        />
                    </ListItemIcon>
                    <ListItemText 
                    primary={todo.text} 
                    className={isChecked ? 'checked-text' : ''} 
                    primaryTypographyProps={{
                        style: {
                          maxHeight: '60px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis', // Adicione a propriedade para as reticências
                          whiteSpace: 'nowrap', // Impede que o texto seja quebrado em várias linhas
                        }
                      }}/>
                </ListItemButton>
                <IconButton onClick={() => setOpenDialog(true)}>
                    <EditIcon edge="end" aria-label="edit"/>
                </IconButton>
                <IconButton onClick={() => deleteTodo(todo.id)}>
                    <BackspaceIcon edge="end" aria-label="delete" />
                </IconButton>
            </ListItem>
        </Paper>
    </>
  );
}
