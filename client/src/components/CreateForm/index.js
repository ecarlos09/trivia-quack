import React, { useState } from 'react';

const CreateForm = ({ createRoom }) => {

  const [ amount , setAmount ] = useState("3");
  const [ category , setCategory ] = useState("9");
  const [ difficulty , setDifficulty ] = useState("easy");
  const [ type, setType ] = useState("boolean");
  
  const selectAmount = (e) => {
    setAmount(e.target.value);
  }

  const selectCategory = (e) => {
    setCategory(e.target.value)
  }

  const selectDifficulty = (e) => {
    setDifficulty(e.target.value)
  }

  const selectType = (e) => {
    setType(e.target.value)
  }

  const [showOption1, setShowOption1] = useState(true);
  const [showOption2, setShowOption2] = useState(false);
  const [showOption3, setShowOption3] = useState(false);
  const [showOption4, setShowOption4] = useState(false);

  const switchOption2 = () => {
    setShowOption1(false);
    setShowOption2(true);
  }

  const switchOption3 = () => {
    setShowOption2(false);
    setShowOption3(true);
  }

  const switchOption4 = () => {
    setShowOption3(false);
    setShowOption4(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault(e);
    createRoom(amount, category, difficulty, type);
  }

  return (
    <form className="create-form text-center" onSubmit={handleSubmit}>
      <div id="option-1" className={ showOption1 ? "" : "d-none"}>
          <label htmlFor="category">Select a Category for your quiz:</label>
          <select name="category" aria-label="menuitem" id="category" value={category} onChange={selectCategory}>
            <option value="9">General Knowledge</option>
            <option value="21">Sports</option>
            <option value="26">Celebrities</option>
          </select>
          <a className="next-button" onClick={switchOption2}>Next</a>
      </div>
      <div id="option-2" className={ showOption2 ? "" : "d-none"}>
        <label htmlFor="amount">Number of questions (3-25): </label>
        <input type="number" id="amount" name="amount" min="3" max="25" value={amount} onChange={selectAmount}/>
        <a className="next-button" onClick={switchOption3}>Next</a>
      </div>
      <div id="option-3" className={ showOption3 ? "" : "d-none"}>
        <label htmlFor="difficulty">Enter the difficulty:</label>
        <select name="difficulty" id="difficulty" value={difficulty} onChange={selectDifficulty}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <a className="next-button" onClick={switchOption4}>Next</a>
      </div>
      <div id="option-4" className={ showOption4 ? "" : "d-none"}>
        <label htmlFor="type">Choose Question Type:</label>
        <select name="type" id="type" value={type} onChange={selectType}>
          <option value="boolean">True/False</option>
          <option value="multiple">Multiple Choice</option>
        </select>
      </div>
      <input type="submit" value="Submit" className={ showOption4 ? "" : "d-none"}/>
    </form>
  );
}

export default CreateForm;