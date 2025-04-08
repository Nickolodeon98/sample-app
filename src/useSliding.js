import { useEffect, useRef, useState } from 'react';

const PADDINGS = 110;
const useSliding = (elementWidth, countElements) => {
    const containerRef = useRef(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [distance, setDistance] = useState(0);
    const [totalInViewPort, setTotalInViewPort] = useState(0);
    const [viewed, setViewed] = useState(0);

    useEffect(() => {
        const containerWidth = containerRef.current.clientWidth - PADDINGS;

        setContainerWidth(containerWidth);
        setTotalInViewPort(Math.floor(containerWidth / elementWidth));
    }, [containerRef.current]);

    const handlePrev = () => {
        setViewed(viewed - totalInViewPort);
        setDistance(distance + containerWidth);
    };

    const handleNext = () => {
        setViewed(viewed + totalInViewPort);
        setDistance(distance - containerWidth);
    };

    const slideProps = {
        style: { transform: `translate3d(${distance}px, 0, 0}` },
    };

    const hasPrev = distance < 0;
    const hasNext = viewed + totalInViewPort < countElements;

    return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
};

export default useSliding;
