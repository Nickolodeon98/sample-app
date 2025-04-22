import React from 'react';
import styled from 'styled-components';
import IconAnswer from '../images/IconAnswer';

const QuestionAnswersButton = ({ onClick, type }) => {
    return <Button onClick={onClick}>
        <PlusIcon className={`button--${type}`}>
            <IconAnswer />
        </PlusIcon>
    </Button>;
};

const PlusIcon = styled.span`
    width: 23px;
    height: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    &.button--visible {
        transform: rotate(45deg);
    }

    &.button--hidden {
        transform: rotate(0deg);
    }
`;

const Button = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

export default QuestionAnswersButton;
