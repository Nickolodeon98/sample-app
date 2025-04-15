import React, { useState } from 'react';
import useSizeElement from './useSizeElement';
import useSliding from './useSliding';
import { SliderContext } from './context';
import styled from 'styled-components';
import IconArrowDown from './IconArrowDown';

const SlideButtonWrapper = styled.div`
    position: absolute;
    top: calc(50% - 55px - 1.5rem);
    width: 55px;
    //background: rgba(0, 0, 0, 0.5);
    border: 0;
    outline: 0;
    padding: 0;
    margin: 40px 0;
    z-index: 4;

    .buttonWrapper {
        height: 5rem;
        width: 1.5rem;
        border-radius: 16rem;
        border: none;
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        padding: 0;
        margin: 0;
        color: rgb(255, 255, 255);
        background-color: rgba(128, 128, 128, 0.4);
        -webkit-transition: opacity 400ms ease-in-out;
        transition: opacity 400ms ease-in-out;
        cursor: pointer;
    }

    .buttonWrapper:hover {
        background-color: rgba(82, 80, 80, 0.2);
    }

    .slideButton {
        width: 25px;
        color: #fff;
        display: block;
        margin: 0 auto;
    }

    &.slide-button--next {
        right: -57px;
    }

    &.slide-button--prev {
        left: -35px;

        .slideButton {
            transform: rotateZ(180deg);
        }
    }
`;

const ContentsWrapper = styled.div`
    overflow: hidden;
    border-radius: 0.5rem;
    width: 100%;
    position: relative;
    display: flex;
    box-sizing: border-box;
    unicode-bidi: isolate;
    -webkit-text-size-adjust: 100%;
    justify-content: center;
    mask: linear-gradient(to right, transparent, black 10%);


    &.slider-wrapper--next {
        mask: linear-gradient(to left, transparent, black 10%);
    }
`;

const SliderContainerWrapper = styled.div`
    transform: ${(props) =>
        props.distance ? `translate3d(${props.distance}px, 0, 0)` : `translate3d(0px, 0, 0)`};
    transition: transform 0.3s ease-in-out;
    will-change: transform;
    position: relative;
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow-y: visible;
    overflow-x: visible;
    //scrollbar-width: none;
    -webkit-scroll-snap-type: x mandatory;
    scroll-snap-type: x mandatory;
    scroll-margin-inline-start: 2.5em;
    width: 100%;


    .show_list {
        padding: 1.5rem 1rem;
    }

    .showBox {
        position: relative;
        padding: 0;
        background: rgb(35, 35, 35);
        border: none;
        border-radius: 1rem;
        transition: transform 0.3s ease;
        transform-origin: center;
    }

    .showBox:hover {
        transform: scale(1.1);
        z-index: 1;
    }

    .showBox > span {
        font-size: 3rem;
        top: 0.1rem;
        left: -0.925rem;
        position: absolute;
        z-index: 2;

    }

    .showBox > .movieBox {
        width: 12.5rem;
        height: 25rem;
        background-size: cover;
        border: none;
        border-radius: 1rem;
        background-position: center;
        background-repeat: no-repeat;
        cursor: pointer;
    }

    .showBox > span > .movieOrder {
        line-height: 1;
        display: inline-block;
        height: 1em;
        position: relative;
        font-weight: 900;
        color: rgba(0, 0, 0, 0.8);
        -webkit-text-stroke: 0.125rem rgb(255, 255, 255);
        text-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.5);
    }
`;

const SliderWrapper = ({ children, type }) => (
    <ContentsWrapper className={`slider-wrapper--${type}`}>
        {children}
    </ContentsWrapper>
);
const SlideButton = ({ onClick, type }) => (
    <SlideButtonWrapper className={`slide-button--${type}`} onClick={onClick}>
        <span className='buttonWrapper'>
            <span className='slideButton'>
                <IconArrowDown />
            </span>
        </span>
    </SlideButtonWrapper>
);
const Slider = ({ children, activeSlide }) => {
    const [currentSlide, setCurrentSlide] = useState(activeSlide);
    const { width, elementRef } = useSizeElement();

    // console.log('width: ' + width);
    const { handlePrev, handleNext, distance, containerRef, hasNext, hasPrev } = useSliding(
        width,
        React.Children.count(children),
    );

    // console.log('slideProps: ' + distance);

    const contextValue = {
        currentSlide,
        elementRef,
    };

    return (
        <SliderContext.Provider value={contextValue}>
            <SliderWrapper type={hasPrev && "prev" || hasNext && "next"}>
                <SliderContainerWrapper ref={containerRef} distance={distance}>
                    {children}
                </SliderContainerWrapper>
            </SliderWrapper>
            {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
            {hasNext && <SlideButton onClick={handleNext} type="next" />}
        </SliderContext.Provider>
    );
};

export default Slider;
