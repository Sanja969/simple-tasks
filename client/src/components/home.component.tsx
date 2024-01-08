import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from '../redux/tasks-reducer';
import { Button } from '@mui/base';

export default function Home () {

  const tasks = useSelector((state: {tasksReducer: {tasks: Task[]}}) => state.tasksReducer.tasks.sort((a, b) => b.id - a.id));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();
  

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
      <h2 className='text-center'>Tasks</h2>
      <div className='flex justify-end py-10'>
        <Button className='bg-black text-white rounded px-6 py-3'>Create New</Button>
      </div>
      <Paper className=''>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className='bg-black'>
                <TableCell >
                  <h3 className='font-bold text-white'>Task Title</h3>
                </TableCell>
                <TableCell><p className='text-white'>Completion Status.</p></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {itemsToDisplay.map((task, index) => (
                <TableRow key={index} className='cursor-pointer'>
                  <TableCell >
                    <h3 className='font-bold'>{task.title}</h3>
                  </TableCell>
                  <TableCell>{task.completed ? 'completed' : 'not completed'}</TableCell>
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