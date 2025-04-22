import { useContext } from 'react';
import { QuestionContext } from '../context';
import QuestionAnswersButton from './QuestionAnswersButton';

const AnswerButton = ({ onClick, type }) => {
    const state = useContext(QuestionContext);

    return (
        <QuestionAnswersButton onClick={onClick} type={type}></QuestionAnswersButton>
    );
};

export default AnswerButton;
