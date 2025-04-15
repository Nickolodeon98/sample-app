import styled from 'styled-components';
import QuestionAnswersButton from './QuestionAnswersButton';
import { QuestionContext, QuestionDispatchContext } from './context';
import { useContext, useReducer } from 'react';
import Answer from './Answer';

const CustomQuestionSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 10px 10px;
    margin-bottom: 5px;
    border-radius: 20px;
`;

const CustomQuestionWrapper = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const CustomQuestion = styled.div`
    margin-left: -25px;
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
`;

const QUESTIONS = [
    {
        questionId: 'a',
        question: '넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?',
        answer: '',
        collapsed: true,
    },
    { questionId: 'b', question: '넷플릭스란 무엇인가요?', answer: '', collapsed: true },
    { questionId: 'c', question: '넷플릭스 요금은 얼마인가요?', answer: '', collapsed: true },
    { questionId: 'd', question: '어디에서 시청할 수 있나요?', answer: '', collapsed: true },
    {
        questionId: 'e',
        question: '멤버십을 해지하려면 어떻게 하나요?',
        answer: '',
        collapsed: true,
    },
    {
        questionId: 'f',
        question: '아이들이 넷플릭스를 봐도 좋을까요?',
        answer: '',
        collapsed: true,
    },
];
const questionsReducer = (state, action) => {
    if (action.type === 'toggleCollapsed') {
        const questionId = action.payload.questionId;
        const changedQuestions = state.questions.map((q) => {
            if (q.questionId === questionId) {
                const newCollapsed = !q.collapsed;
                return { ...q, collapsed: newCollapsed };
            }
            return { ...q, collapsed: false };
        });
        
        return { questions: changedQuestions };
    }
    return state;
};

const Question = () => {
    const [state, dispatch] = useReducer(questionsReducer, { questions: QUESTIONS });

    return (
        <QuestionDispatchContext.Provider value={dispatch}>
            <QuestionContext.Provider value={state}>
                <QuestionSection />
            </QuestionContext.Provider>
        </QuestionDispatchContext.Provider>
    );
};

const QuestionSection = () => {
    const dispatch = useContext(QuestionDispatchContext);
    const { questions } = useContext(QuestionContext);
    console.log(questions);

    return questions.map((question) => (
        <CustomQuestionSection key={question.questionId}>
            <CustomQuestionWrapper>
                <CustomQuestion key={question.questionId}>{question.question}</CustomQuestion>
                <Answer
                    onClick={() => {
                        dispatch({
                            type: 'toggleCollapsed',
                            payload: { questionId: question.questionId },
                        });
                    }}
                />
            </CustomQuestionWrapper>
        </CustomQuestionSection>
    ));
};

export default Question;
