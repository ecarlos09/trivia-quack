import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ScoreView } from '../../components'

const Result = () => {

    const socket = useSelector(state => state.myReducer.socket)
    const qType = useSelector(state => state.myReducer.questions[0])
    //  const socket = useSelector(state => state.myReducer.socket)
    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    const { id } = useParams()
    const [results, setResults] = useState([])
    const [scores, setScores] = useState([])
    const [points, setPoints] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState(null)
    const [showResults, setShowResults] = useState(true);
    const [showAnswers, setAnswersResults] = useState(false);

    useEffect(() => {
        async function getResults() {
          try {
            setLoading(true)
            let { data } = await axios.get(`http://localhost:3000/games/${id}/results`);
            setResults(data.data)
            setScores(data.scores)
            console.log(data.scores)
            console.log(data.data)
            setLoading(false)
            console.log('This is the data:',data)
            console.log('questions from reducer: ',qType)
          } catch (err) {
            setLoading(false)
            setError(err)
            console.warn(err);
          }
        }
        getResults();
      }, []);

      const scoreSort = scores.sort((a,b) => b.score - a.score)
      const scoreList = scores.map((score, i) => <li key={i}>{score.name}: {score.count}</li>)

      const answersList = results.map((result, i) => {
        return (
          <div key={i}>
            <div>{renderHTML(result.question)}</div>
            <ul>
              {result.all_answers.map((answer, j) => (
                <li
                  style={{
                    background:
                      answer === result.correct_answer ? "green" : "red",
                  }}
                >
                  {renderHTML(answer)}
                  <ul>{result.player_answers.filter(c => c.answer === answer).map(d => <li>{d.player}</li>)}</ul>
                </li>
              ))}
            </ul>
          </div>
        );
      });
      
      const pointsCalc = () => {
         // noOfQs * difficult (factor) * game type * correct answers
         // length(data.data) *  *  * data.scores.count
        const noOfQs = results.length
        const difficulty = qType.difficulty
        let diffFactor
        const gameType = qType.type
        let typeFactor
        const correctAns = scores.count

        if (gameType === "boolean") {
          return typeFactor = 1
        } else if (gameType === "multiple") {
          return typeFactor = 2
        }
        
        if (difficulty === "easy") {
          return diffFactor = 1
        } else if (difficulty === "medium") {
          return diffFactor = 2
        } else if (difficulty === "hard") {
          return diffFactor = 3
        }
        // console.log(noOfQs)
        // console.log(difficulty)
        // console.log(gameType)
        // console.log(correctAns)
        // console.log(diffFactor)
        // console.log(typeFactor)
       
        let playerPoints = noOfQs * typeFactor * diffFactor * correctAns
        
        return playerPoints
      }
      pointsCalc()
      setPoints(playerPoints)
      

      const handleResult = () => {
        setAnswersResults(false);
        setShowResults(true);
      }

      const handleAnswers = () => {
        setShowResults(false);
        setAnswersResults(true);
      }

  return (
    <div id="results" className="container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <>
          <div class="switch-buttons">
            <a onClick={handleResult}>
              Results
            </a>
            <a onClick={handleAnswers}>
              Answers
            </a>
          </div>
          <div className={showResults ? "scores" : "d-none"}>
            <h1>Results</h1>
            <ul>{scoreList.sort((a,b) => b.score - a.score)}</ul>
            <ScoreView players={scoreSort}/>
          </div>
          <div className={showAnswers ? "answers" : "d-none"}>
            <div>{answersList}</div>

            <div>
              <p>{points}</p>
            </div>
          </div>     

        </>
      )}
    </div>
  );
};

export default Result;