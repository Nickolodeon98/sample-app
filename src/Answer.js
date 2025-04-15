import { useContext } from 'react';
import { QuestionContext } from './context';

const Answer = () => {
    const { onSelectQuestion } = useContext(QuestionContext);

    return (
        <div>
            <h1>Answer</h1>
        </div>
    );
};  

export default Answer;
