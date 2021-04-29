import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { ScoreView } from '../../components'
import { API_ADDRESS } from '../../actions/globalVars';

const Result = () => {

    const socket = useSelector(state => state.myReducer.socket)
    const renderHTML = (rawHTML) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
    const { id } = useParams()
    const [results, setResults] = useState([])
    const [scores, setScores] = useState([])
    const [loading, setLoading] = useState()
    const [error, setError] = useState(null)
    const [showResults, setShowResults] = useState(true);
    const [showAnswers, setAnswersResults] = useState(false);

    useEffect(() => {
        async function getResults() {
          try {
            setLoading(true)
            let { data } = await axios.get(`${API_ADDRESS}/games/${id}/results`);
            setResults(data.data)
            setScores(data.scores)
            setLoading(false)
            const scoreSortFix = data.scores.sort((a,b) => b.points - a.points).map(p => ({name: p.username ? p.username : `Guest-${p.name}`, icon: p.icon, count: p.points}))
            setScores(scoreSortFix)
            setLoading(false)
          } catch (err) {
            setLoading(false)
            setError(err)
            console.warn(err);
          }
        }
        getResults();
      }, []);

      const answersList = results.map((result, i) => {
        return (
          <div key={i} className="answer-box">
            <div className="answer-question">{renderHTML(result.question)}</div>
            <ul>
              {result.all_answers.map((answer, j) => (
                <li
                  key={j}
                  className={
                      answer === result.correct_answer ? "answer-correct" : "answer-wrong"
                  }
                >
                  {renderHTML(answer)}
                  <ul className="answer-player-list">{result.player_answers.filter(c => c.answer === answer).map(d => <li>{d.username ? d.username : `Guest-${d.player}`}</li>)}</ul>
                </li>
              ))}
            </ul>
          </div>
        );
      });

      const handleResult = () => {
        setAnswersResults(false);
        setShowResults(true);
      }

      const handleAnswers = () => {
        setShowResults(false);
        setAnswersResults(true);
      }

      console.log(scores)
  return (
    <div id="results" className="container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{JSON.stringify(error)}</div>
      ) : (
        <>
          <div className="switch-buttons">
            <a className="switch-left" onClick={handleResult}>
              Results
            </a>
            <a className="switch-right" onClick={handleAnswers}>
              Answers
            </a>
          </div>
          <div className={showResults ? "scores" : "d-none"}>
            <h1>Results</h1>
            <ScoreView players={scores}/>
          </div>
          <div className={showAnswers ? "answers" : "d-none"}>
            <div className="answer-holder">{answersList}</div>
          </div>     

        </>
      )}
    </div>
  );
};

export default Result;