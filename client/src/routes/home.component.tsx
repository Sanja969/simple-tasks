import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/base';
import { Task, deleteTask } from '../redux/tasks-reducer';
import { setData } from '../redux/form-reducer';
import { AppDispatch } from '../redux/store';

export default function Home () {

  const tasks = useSelector((state: {tasksReducer: {tasks: Task[]}}) => 
    state.tasksReducer.tasks.sort((a, b) => Number(b.id) - Number(a.id)));

  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  
  const handleEdit = (task: Task) => {
    dispatch(setData(task))
    navigate('/form')
  }

  const handleRemove = (id: string) => {
    dispatch(deleteTask(id))
  }

  const createNewTask = () => {
    dispatch(setData({
      id: '',
      title: '',
      description: '',
      completed: false,
      dueDate: undefined,
    }))
    navigate('/form')
  }

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const itemsToDisplay = tasks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);


  return (
    <div className='px-20'>
      <div className='flex justify-end py-10'>
        <Button className='bg-black text-white rounded px-6 py-3' onClick={() => createNewTask()}>Create New</Button>
      </div>
      <Paper className=''>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className='bg-black'>
                <TableCell >
                  <h3 className='font-bold text-white'>Task Title</h3>
                </TableCell>
                <TableCell><p className='text-white'>Completion Status</p></TableCell>
                <TableCell><p className='text-white'>Actions</p></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsToDisplay.map((task, index) => (
                <TableRow key={index} className='cursor-pointer'>
                  <TableCell >
                    <h3 className='font-bold'>{task.title}</h3>
                  </TableCell>
                  <TableCell>{task.completed ? 'completed' : 'not completed'}</TableCell>
                  <TableCell>
                    <div className='flex gap-6'>
                      <Button className='bg-green-300 px-3 py-2 rounded' onClick={() => handleEdit(task)} >
                        Edit
                      </Button>
                      <Button className='bg-red-300 px-3 py-2 rounded' onClick={() => handleRemove(task.id)} >
                        Remove
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={tasks.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10]}
        />
      </Paper>
    </div>
  )
}