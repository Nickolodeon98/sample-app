import styled from 'styled-components';
import { QuestionContext, QuestionDispatchContext } from '../context';
import { useContext, useReducer } from 'react';
import AnswerButton from './AnswerButton';
import React from 'react';

const QUESTIONS = [
    {
        questionId: 'a',
        question: '넷플릭스에서 어떤 콘텐츠를 시청할 수 있나요?',
        answer: '넷플릭스는 장편 영화, 다큐멘터리, 시리즈, 애니메이션, 각종 상을 수상한 넷플릭스 오리지널 등 수많은 콘텐츠를 확보하고 있습니다. 마음에 드는 콘텐츠를 원하는 시간에 원하는 만큼 시청하실 수 있습니다.\n\n넷플릭스 콘텐츠를 한번 살펴보세요.',
        collapsed: false,
    },
    {
        questionId: 'b',
        question: '넷플릭스란 무엇인가요?',
        answer: '넷플릭스는 각종 수상 경력에 빛나는 시리즈, 영화, 애니메이션, 다큐멘터리 등 다양한 콘텐츠를 인터넷 연결이 가능한 수천 종의 디바이스에서 시청할 수 있는 스트리밍 서비스입니다.\n\n저렴한 월 요금으로 원하는 시간에 원하는 만큼 즐길 수 있습니다. 무궁무진한 콘텐츠가 준비되어 있으며 매주 새로운 시리즈와 영화가 제공됩니다.',
        collapsed: false,
    },
    {
        questionId: 'c',
        question: '넷플릭스 요금은 얼마인가요?',
        answer: '스마트폰, 태블릿, 스마트 TV, 노트북, 스트리밍 디바이스 등 다양한 디바이스에서 월정액 요금 하나로 넷플릭스를 시청하세요. 멤버십 요금은 월 5,500원부터 17,000원까지 다양합니다. 추가 비용이나 약정이 없습니다.',
        collapsed: false,
    },
    {
        questionId: 'd',
        question: '어디에서 시청할 수 있나요?',
        answer: '언제 어디서나 시청할 수 있습니다. 넷플릭스 계정으로 로그인하면 PC에서 netflix.com을 통해 바로 시청할 수 있으며, 인터넷이 연결되어 있고 넷플릭스 앱을 지원하는 디바이스(스마트 TV, 스마트폰, 태블릿, 스트리밍 미디어 플레이어, 게임 콘솔 등)에서도 언제든지 시청할 수 있습니다.\n\niOS 또는 Android용 앱에서는 좋아하는 시리즈를 저장할 수도 있습니다. 저장 기능을 이용해 이동 중이나 인터넷에 연결할 수 없는 곳에서도 시청하세요. 넷플릭스는 어디서든 함께니까요.',
        collapsed: false,
    },
    {
        questionId: 'e',
        question: '멤버십을 해지하려면 어떻게 하나요?',
        answer: '넷플릭스는 부담 없이 간편합니다. 성가신 계약도, 약정도 없으니까요. 멤버십 해지도 온라인에서 클릭 두 번이면 완료할 수 있습니다. 해지 수수료도 없으니 원할 때 언제든 계정을 시작하거나 종료하세요.',
        collapsed: false,
    },
    {
        questionId: 'f',
        question: '아이들이 넷플릭스를 봐도 좋을까요?',
        answer: '멤버십에 넷플릭스 키즈 환경이 포함되어 있어 자녀가 자기만의 공간에서 가족용 시리즈와 영화를 즐기는 동안 부모가 이를 관리할 수 있습니다.\n\n키즈 프로필과 더불어 PIN 번호를 이용한 자녀 보호 기능도 있어, 자녀가 시청할 수 있는 콘텐츠의 관람등급을 제한하고 자녀의 시청을 원치 않는 특정 작품을 차단할 수도 있습니다.',
        collapsed: false,
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

const Answer = ({ answer, type }) => {
    return (
        <CustomAnswerSection className={`answer-section--${type}`}>
            <CustomAnswerWrapper>
                <CustomAnswer>{answer}</CustomAnswer>
            </CustomAnswerWrapper>
        </CustomAnswerSection>
    );
};

const QuestionSection = () => {
    const dispatch = useContext(QuestionDispatchContext);
    const { questions } = useContext(QuestionContext);

    return questions.map((question) => (
        <React.Fragment key={question.questionId}>
            <CustomQuestionSection>
                <CustomQuestionWrapper>
                    <CustomQuestion key={question.questionId}>{question.question}</CustomQuestion>
                    <AnswerButton
                        onClick={() => {
                            dispatch({
                                type: 'toggleCollapsed',
                                payload: { questionId: question.questionId },
                            });
                        }}
                        type={question.collapsed ? 'visible' : 'hidden'}
                    />
                </CustomQuestionWrapper>
            </CustomQuestionSection>
            <Answer answer={question.answer} type={question.collapsed ? 'visible' : 'hidden'} />
        </React.Fragment>
    ));
};

const CustomQuestionSection = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #272727;
    padding: 10px;
    border-radius: 20px;
    margin-bottom: 5px;
    width: 75%;
    justify-self: center;

    &:hover {
        background-color: #3a3a3a;
        cursor: pointer;
    }
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

const CustomAnswerSection = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #272727;
    border-radius: 20px;
    overflow: hidden;
    max-height: 0;
    transform-origin: top;
    transition: all 0.15s ease;
    width: 75%;
    margin: 0 10px 0 10px;

    &.answer-section--hidden {
    }

    &.answer-section--visible {
        margin-bottom: 5px;
        max-height: 1000px;
        transition: 250ms cubic-bezier(0.32, 0.94, 0.6, 1);
    }
`;

const CustomAnswerWrapper = styled.ul`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;

const CustomAnswer = styled.div`
    margin-left: -25px;
    font-size: 1.1rem;
    font-weight: 500;
    color: #fff;
    white-space: pre-line;
`;

export default Question;
