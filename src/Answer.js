import { useContext } from 'react';
import { QuestionContext } from './context';
import QuestionAnswersButton from './QuestionAnswersButton';

const Answer = ({ onClick }) => {
    const state = useContext(QuestionContext);

    return <QuestionAnswersButton onClick={onClick}></QuestionAnswersButton>;
};

export default Answer;
