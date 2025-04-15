import styled from 'styled-components';
import QuestionAnswersButton from './QuestionAnswersButton';
import { QuestionContext } from './context';
import { useContext } from 'react';

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

const QUESTIONS = ['넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?',
    '넷플릭스란 무엇인가요?',
    '넷플릭스 요금은 얼마인가요?',
    '어디에서 시청할 수 있나요?',
    '멤버십을 해지하려면 어떻게 하나요?',
    '아이들이 넷플릭스를 봐도 좋을까요?'
];

const onSelectQuestion = () => {
    console.log('clicked');
};

const Question = () => {

    return (
        <QuestionContext.Provider value={{questions: QUESTIONS}}>
            {QUESTIONS.map((question, index) => (
                <CustomQuestionSection>
                    <CustomQuestionWrapper>
                        <CustomQuestion key={index}>
                            {question}
                        </CustomQuestion>
                        <QuestionAnswersButton onClick={() => onSelectQuestion()} />
                    </CustomQuestionWrapper>
                </CustomQuestionSection>
            ))}
        </QuestionContext.Provider>
    );
};  

export default Question;
