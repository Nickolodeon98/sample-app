import { useEffect, useRef, useState } from 'react';

const PADDINGS = 160;
const useSliding = (elementWidth, countElements) => {
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [distance, setDistance] = useState(0);
    const [totalInViewPort, setTotalInViewPort] = useState(0);
    const [viewed, setViewed] = useState(0);

    // console.log('countElements: ' + countElements);
    // console.log('elementWidth: ' + elementWidth);

    useEffect(() => {
        const changedContainerWidth = containerRef?.current?.clientWidth - PADDINGS;
        // console.log('containerRef width: ' + containerRef?.current?.clientWidth);

        setContainerWidth(changedContainerWidth);
        setTotalInViewPort(Math.floor(changedContainerWidth / elementWidth));
    }, [elementWidth]);

    const handlePrev = () => {
        // console.log('viewed: ' + viewed);
        setViewed(viewed - totalInViewPort);
        setDistance(distance + containerWidth * 0.7);
    };

    const handleNext = () => {
        setViewed(viewed + totalInViewPort);
        setDistance(distance - containerWidth * 0.7);
    };

    // const slideProps = 'style={{ transform: `translate3d(${distance}px, 0, 0}` }}';

    const hasPrev = distance < 0;
    const hasNext = viewed + totalInViewPort < countElements;

    return { handlePrev, handleNext, distance, containerRef, hasPrev, hasNext };
};

export default useSliding;
