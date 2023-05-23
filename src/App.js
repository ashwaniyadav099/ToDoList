import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import React, { useState } from 'react';
import $ from "jquery";
import OutsideClickHandler from 'react-outside-click-handler';



function App() {
  const [inputval,setinputval]=useState("")
  const [datalist,setdatalist]=useState([])
  const[editbtn,seteditbtn]=useState(false)
  const [editidx,seteditindx]=useState('')
 const submitfun = (e)=>{
  e.preventDefault()
  if(inputval){
    datalist.push(inputval)
    setdatalist([...datalist])
    setinputval('')
   console.log(datalist)
  }else{
    alert('Please feild text first')
  }
 }

 const deletefun = (indx)=>{
  let deletcomf = window.confirm('Are you really want do Delete')

  if(deletcomf){
   const filteredarr = datalist.filter((element,idxno)=>{
    return idxno !== indx
  })
  setdatalist(filteredarr)
}
 }

 $(".input1").on('keyup', function (e) {
  if (e.key === 'Enter' || e.keyCode === 13) {
    submitfun()
  }
});

 const edit_fun = (index)=>{
  seteditbtn(true)
  setinputval(datalist[index])
  seteditindx(index)
 }
 
 const  editsubmit = ()=>{
        datalist[editidx] = inputval;
        setdatalist([...datalist]);
        setinputval('')
        seteditbtn(false)
 }


 return (
    <div className="App">
       <Box
      component="form"
      sx={{
        '& > :not(style)': {  mx: 'auto', width: '600px' },
      }}
      noValidate
      autoComplete="off"
    >
       <Stack spacing={2} direction="row" alignItems='center' justifyContent="center">
        <OutsideClickHandler onOutsideClick={() => {
          if(inputval){
            datalist.push(inputval)
            setdatalist([...datalist])
            setinputval('')
           console.log(datalist)
          }
      }}> 
       <TextField id="outlined-basic" label="Item" variant="outlined" onChange={(e)=>{setinputval(e.target.value)}}  value={inputval}/>
       </OutsideClickHandler>
       {editbtn? <Button variant="contained" onClick={()=>editsubmit} type='submit'>Edit</Button>:<Button variant="contained" type='submit' onClick={submitfun}>Add</Button>}
       </Stack>

      

       </Box >
       <Box 
       sx={{
        '& > :not(style)': {  mx: 'auto', width: '600px' },
      }}
      noValidate
      autoComplete="off"
    >
       <Typography
  id="basic-list-demo"
  level="body3"
  textTransform="uppercase"
  fontWeight="lg"
>
  Items List 
</Typography>
<List aria-labelledby="basic-list-demo">
  {
    datalist.map((elem,indx)=>{
    return <ListItem key={indx}>{elem} <Stack spacing={2} direction={'row'} className='mx-3'>
   <Button variant="outlined" color="error" onClick={ ()=> deletefun(indx)}>Delete</Button>
   <Button variant="contained" onClick={()=>edit_fun(indx)}>Edit</Button>

  </Stack></ListItem> 
    })
  } 
</List>
       </Box>
    </div>
  );
}

export default App;
