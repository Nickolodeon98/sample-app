import React from 'react';
import styled from 'styled-components';
import IconAnswer from './IconAnswer';

const PlusIcon = styled.span`
    width: 23px;
    height: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const QuestionAnswersButton = ({onClick}) => {
    return <Button onClick={onClick}>
        <PlusIcon>
            <IconAnswer />
        </PlusIcon>
    </Button>;
};

export default QuestionAnswersButton;
