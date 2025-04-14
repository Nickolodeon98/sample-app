import React, { useState } from 'react';
import useSizeElement from './useSizeElement';
import useSliding from './useSliding';
import SliderContext from './context';
import styled from 'styled-components';
import IconArrowDown from './IconArrowDown';

const SlideButtonWrapper = styled.div`
    position: absolute;
    top: calc(50% - 55px);
    width: 55px;
    //background: rgba(0, 0, 0, 0.5);
    border: 0;
    outline: 0;
    padding: 0;
    margin: 40px 0;
    z-index: 4;

    span {
        width: 25px;
        color: #fff;
        display: block;
        margin: 0 auto;
    }

    &.slide-button--next {
        right: -50px;

        span {
            transform: rotateZ(-90deg);
        }
    }

    &.slide-button--prev {
        left: -50px;

        span {
            transform: rotateZ(90deg);
        }
    }
`;

const ContentsWrapper = styled.div`
    overflow: hidden;
    border-radius: 0.5rem;
    width: 100%;
    mask: linear-gradient(to left, transparent, black 10%);
    position: relative;
    display: flex;
    box-sizing: border-box;
    unicode-bidi: isolate;
    -webkit-text-size-adjust: 100%;
    justify-content: center;
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
        padding: 0.8rem 1rem;
    }

    .showBox {
        position: relative;
        padding: 0;
        background: rgb(35, 35, 35);
        border: none;
        border-radius: 1rem;
        transition: transform 0.2s ease-in-out;
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
        //background-image: url('https://file.koreafilm.or.kr/thm/02/00/01/46/tn_DPK004440.JPG');
        background-size: cover; /* div에 꽉 차도록 조정 */
        border: none;
        border-radius: 1rem;
        background-position: center; /* 이미지를 중앙 정렬 */
        background-repeat: no-repeat; /* 반복 방지 */
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

const SliderWrapper = ({ children }) => (
    <ContentsWrapper className="slider-wrapper">{children}</ContentsWrapper>
);
const SlideButton = ({ onClick, type }) => (
    <SlideButtonWrapper className={`slide-button--${type}`} onClick={onClick}>
        <span>
            <IconArrowDown />
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

    console.log('slideProps: ' + distance);

    const contextValue = {
        currentSlide,
        elementRef,
    };

    return (
        <SliderContext.Provider value={contextValue}>
            <SliderWrapper>
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
