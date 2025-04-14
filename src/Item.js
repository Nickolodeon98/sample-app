import SliderContext from './context';
import React, { useContext } from 'react';

const Item = ({ posterUrl, index }) => {
    const { elementRef } = useContext(SliderContext);

    return (
        <button className="showBox">
            <div
                className="movieBox"
                ref={elementRef}
                style={{
                    backgroundImage: posterUrl ? `url(${posterUrl})` : 'none',
                }}
            ></div>
            <span>
                <span className="movieOrder" aria-hidden="true" data-content={index + 1}>
                    {index + 1}
                </span>
                <span className="movieTitle" aria-hidden="true" data-content={index + 1}></span>
            </span>
        </button>
    );
};

export default Item;
