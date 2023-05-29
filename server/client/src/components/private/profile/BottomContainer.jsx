import React from 'react';
import {Link} from 'react-router-dom';

const BottomContainer = ({userProgress}) => {

    let vocabularyProgress;
    let programmingProgress;

    for(let i=0; i<userProgress.length; i++){
        let optionName = userProgress[i].optionName;
        if(optionName === 'vocabulary')
            vocabularyProgress = userProgress[i];
        else if(optionName === 'programming')
            programmingProgress = userProgress[i];
    }
    vocabularyProgress.link = "/vocabulary";
    programmingProgress.link = "/programming";

    return(
        <>
            <div className="inner-container">
                {/* Vocabulary */}
                <div className="option-div">
                    <div className="option-name">
                        <Link to={vocabularyProgress.link}><h2>{vocabularyProgress.optionName}</h2></Link>
                    </div>
                    <div className="option-stats">
                        <h3>Words Added : <span>{vocabularyProgress.addedWords}</span></h3>
                        <h3>Words Deleted : <span>{vocabularyProgress.deletedWords}</span></h3>
                        <h3>Current Word Count : <span>{vocabularyProgress.addedWords - vocabularyProgress.deletedWords}</span></h3>
                        <h3>Last Commit : <span>{vocabularyProgress.lastCommit}</span></h3>
                    </div>
                </div>

                {/* Programming */}
                <div className="option-div">
                    <div className="option-name">
                        <Link to={programmingProgress.link}><h2>{programmingProgress.optionName}</h2></Link>
                    </div>
                    <div className="option-stats">
                        <h3>Solved Questions : <span>{programmingProgress.questionSolved}</span></h3>
                        <h3>Total Doubts : <span>{programmingProgress.totalDoubts}</span></h3>
                        <h3>Solved Doubts : <span>{programmingProgress.solvedDoubts}</span></h3>
                        <h3>Unsolved Doubts : <span>{programmingProgress.totalDoubts - programmingProgress.solvedDoubts}</span></h3>
                        <h3>Last Commit : <span>{programmingProgress.lastCommit}</span></h3>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BottomContainer;