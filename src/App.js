import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';


import { Card, CardActions, CardContent, Button, Typography, Grid, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles({
  btn: {
    padding: '0 16px 8px 16px',
    //display: 'relative',
    justifyContent: 'space-between',
    position: 'absolute'
  },
  grid: {
    backgroundColor: "black",
    paddingBottom: '15%'
  },
  root: {
    background: 'linear-gradient(#bab5f6, #4d3664)',
    alignItems: 'center',
    width: '500px',
    height: '250px',
    backgroundSize: '100%',
    //borderRadius: '50%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  parent: {
    display: "flex",
    justifyContent: "center",
    alignItems: 'center'
  }
});

function App() {

  const classes = useStyles();

  const [triviaQuestions, setTriviaQuestions] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);


  useEffect(() => {
    //going to use axios to get data from api once the document is rendered
    axios.get('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean')
      .then((response) => {
        console.log(response.data.results, "reponse.data.results");
        setTriviaQuestions(response.data.results);
      })

  }, [])

  const handleRetry = (val) => {
    if (val === 'retry') {
      setScore(0);
      setShowScore(false);
      setCurrentQuestion(0);
    }
  }

  const handleAnswerClick = (val) => {

    if (val === triviaQuestions[currentQuestion].correct_answer) {
      console.log("correct");
      setScore(score + 1);
    } else {
      console.log("Not correct");
    }



    //update current question after onclick
    const nextQuestion = currentQuestion + 1;

    if (nextQuestion < triviaQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }

  return (
    <Grid
      className={classes.grid}
      container
      justify='center'
      alignItems='center'
      direction='column'
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        {showScore ? <>

          <Card className={classes.root}>
            <CardContent>
              <Typography className={classes.pos} variant="h5" component="h2">
                You scored {score} out of {triviaQuestions.length} !!!
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={() => handleRetry("retry")} size="small">Retry</Button>
            </CardActions>
          </Card>
        </> :
          <>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {triviaQuestions[currentQuestion].category}
                </Typography>
                <Typography className={classes.pos} variant="h5" component="h2">
                  {triviaQuestions[currentQuestion].question}
                </Typography>
              </CardContent>
              <Grid item>
                <div className={classes.btn}>
                  <CardActions>
                    <ButtonGroup disableElevation className={classes.btn} variant="contained" color="primary">
                      <Button onClick={() => handleAnswerClick("True")} value="True" size="small">True</Button>
                      <Button onClick={() => handleAnswerClick("False")} value="False" size="small">False</Button>
                    </ButtonGroup>
                  </CardActions>
                </div>
              </Grid>
            </Card>
          </>

        }
      </Grid>
    </Grid>
  );
}

export default App;
