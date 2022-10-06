import { Typography } from '@mui/material';
import { Box ,Grid,Button,Container} from '@mui/material';
import Chip from "@mui/material/Chip";
import TimerIcon from '@mui/icons-material/Timer';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const[questions,setquestion]= useState ([
      {
          question:"Html Stands For _______________________",
          options: ["Hyper Text Makeup Language",
          "html",
          "Case Cading Style Sheet",
          "Hypertext markup language"
          ],
          correctAns: "Hypertext markup language",
      },
      {
          question:"Css Stands For _______________________",
          options: [
              "Casecading Style Sheet",
              "Java",
              "Ram",
              "Hypertext markup language"
          ],
          correctAns: "Casecading Style Sheet",
      },
      {
          question:"Js Stands For _______________________",
          options: [
              "Java Style",
              "Java Script",
              "Script",
              "Script Src"
          ],
          correctAns: "Java Script",
      },
      {
          question:"Dom Stands For _______________________",
          options: [
              "Document Object Model",
              "html",
              "Css",
              "Java"
          ],
          correctAns: "Document Object Model",
      },
      {
          question:"Ram Stands For _______________________",
          options: [
              "Read Only Memory",
              "Dom",
              "Random Acccess Memory",
              "For Pc"
          ],
          correctAns: "Random Acccess Memory",
      },
      {
          question:"Rom Stands For _______________________",
          options: [
              "Hyper Text Markup Language",
              "html",
              "HTml",
              "Read Only Memory"
          ],
          correctAns: "Read Only Memory",
      },
  
  ]);
  const [indexNumber,setindexNumber]=useState(0);
  const[score,setscore]=useState(0);
  const[result,setresult]=useState(false)
  let checkQuestion = (a,b)=>{
  if(a == b){
  setscore(score + 1)
 }
  if(indexNumber+1 == questions.length){
   setresult(true)
  }  
  else{
  setindexNumber(indexNumber + 1)
  }
  };
  const [startDisplay, setstartDisplay] = useState(false);
  let myMinutes = 2;
  let mySeconds = 59;
  const [seconds, setSeconds] = useState(mySeconds)
  const [minutes, setMinutes] = useState(myMinutes)
  let time;

   useEffect(()=>{
      time = setInterval(()=>{
        setSeconds(seconds-1);
        if (seconds == 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
        }
      },1000)
      return ()=>clearInterval(time)
   });
   useEffect (()=>{
    if(minutes === 0 && seconds === 0){
        stop();
        setresult(true);
    }
   })
   let start =()=>{
    setSeconds(59)
    setMinutes(2)
    setstartDisplay(true)

   }
   let stop =()=>{
    clearInterval(time)
   }
    return (
    <div className="App">
    { startDisplay ? (result ? (<div><h1 className='result'>Your Score is {Math.floor((score/questions.length)*100)+"%"}</h1></div>) : 
    <Box>
      <Box sx={{padding:1 ,fontWeight:"Bold",marginBottom:"40px"}}>
      <Typography variant='h4' sx={{marginRight:"-200px",fontFamily:"Forte",}}>
      Question # {indexNumber + 1}/{questions.length}
      <span className='timer'> <TimerIcon sx={{ fontSize: "22px" }} /><span>{minutes}:{seconds<10? "0"+ seconds : seconds}</span></span>
      </Typography>
      </Box>
      <Box sx={{ padding: 1,marginBottom:"10px"}}>
     <Typography variant="h5" sx={{ fontFamily: "Forte"}}  >
      {questions[indexNumber].question}
      </Typography>
     </Box>
     <Box>
     <Grid container>
      {questions[indexNumber].options.map((x , i)=> (
      <Grid key={i} item md={6} sx={{margin:"20px 0px"}} >
        <Chip className='chip' sx={{backgroundColor:" rgb(243, 183, 73)",fontSize:"16px",fontFamily:"Forte"}} onClick={()=>
          checkQuestion(x , questions[indexNumber].correctAns)
        }
        label={x}
        />
      </Grid>
      ))}
     </Grid>
     </Box>
     </Box>)   
       :(<Container >
             <Box>
              <h1 className='quiz'>
                Quiz
              </h1>
              </Box>
              <Typography variant="h6" sx={{
                fontFamily: "Forte" }}>
                Note : You have {myMinutes} minutes to attempt the quiz
              </Typography>
              <Box component="form" >
                <button className='btn' variant="contained"  onClick={start} type="submit">START</button>
              </Box>
            </Container>)
            }
    </div>
  );
}
export default App;
