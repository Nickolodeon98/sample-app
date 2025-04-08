import React, { createContext, useState } from 'react';
import useSizeElement from './useSizeElement';
import useSliding from './useSliding';
import cx from 'classnames';
import SliderContext from './context';

const SliderWrapper = ({ children }) => <div className="slider-wrapper">{children}</div>;
const SlideButton = ({ onClick, type }) => {
    <button className={`slide-button slide-button--${type}`} onClick={onClick}>
        <span>다음</span>
    </button>;
};
const Slider = ({ children, activeSlide }) => {
    const [currentSlide, setCurrentSlide] = useState(activeSlide);
    const { width, elementRef } = useSizeElement();

    const { handlePrev, handleNext, slideProps, containerRef, hasNext, hasPrev } = useSliding(
        width,
        React.Children.count(children),
    );

    const handleSelect = (movie) => {
        setCurrentSlide(movie);
    };

    const handleClose = () => {
        setCurrentSlide(null);
    };

    const contextValue = {
        onSelectSlide: handleSelect,
        onCloseSlide: handleClose,
        elementRef,
        currentSlide,
    };

    return (
        <SliderContext.Provider value={contextValue}>
            <SliderWrapper>
                <div className={cx('slider', { 'slider-open': currentSlide !== null })}>
                    <div ref={containerRef} className="slider_container" {...slideProps}>
                        {children}>
                    </div>
                </div>
                {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
                {hasNext && <SlideButton onClick={handleNext} type="next" />}
            </SliderWrapper>
        </SliderContext.Provider>
    );
};

export default Slider;
