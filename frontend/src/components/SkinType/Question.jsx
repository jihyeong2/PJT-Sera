import React ,{useEffect, useState}from 'react';
import styles from './Question.module.css';

const Question = ({question, questionIdx, onChangeQuestion, surveyScores}) => {
  const handleChange = (event) => {
    const contentIdx = Number(event.target.dataset.idx);
    onChangeQuestion(questionIdx, contentIdx);
  };
  useEffect(()=>{
    if(surveyScores[questionIdx]!==-1){
        const target = document.querySelector(`#${CSS.escape(questionIdx*4 + surveyScores[questionIdx] - 1)}`);
        target.checked=true;
    }
  });
  return(
    <div className={styles.container}>
      <div className={styles.title}>
        {questionIdx+1}. {question.title}
      </div>
      <div className={styles.checkbox}>
        <div className={styles.checks}>
          <input type="radio" id={questionIdx*4} name={questionIdx} data-idx="0" onClick={handleChange}/> 
          <label htmlFor={questionIdx*4}>{question.contents[0]}</label> 
        </div>
        <div className={styles.checks}>
          <input type="radio" id={questionIdx*4+1} name={questionIdx} data-idx="1" onClick={handleChange}/> 
          <label htmlFor={questionIdx*4+1}>{question.contents[1]}</label>
        </div>
        <div className={styles.checks}>
          <input type="radio" id={questionIdx*4+2} name={questionIdx} data-idx="2" onClick={handleChange}/> 
          <label htmlFor={questionIdx*4+2}>{question.contents[2]}</label>
        </div>
        <div className={styles.checks}>
          <input type="radio" id={questionIdx*4+3} name={questionIdx} data-idx="3" onClick={handleChange}/> 
          <label htmlFor={questionIdx*4+3}>{question.contents[3]}</label>
        </div>
      </div>
    </div>
  );
};

export default Question;