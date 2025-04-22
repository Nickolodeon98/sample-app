import { useEffect, useRef, useState } from 'react';

const PADDINGS = 160;
const useSliding = (elementWidth, countElements) => {
    // 슬라이드 컨테이너 참조
    const containerRef = useRef(null);
    // 요소를 담는 컨테이너 너비
    const [containerWidth, setContainerWidth] = useState(0);
    // 이동 거리
    const [distance, setDistance] = useState(0);
    // 보이는 요소 수
    const [totalInViewPort, setTotalInViewPort] = useState(0);
    // 지금까지 본 요소 수
    const [viewed, setViewed] = useState(0);

    useEffect(() => {
        // 현재 컨테이너 너비
        const currentContainerWidth = containerRef?.current?.clientWidth - PADDINGS;
        console.log('containerRef width: ' + containerRef?.current?.clientWidth);

        setContainerWidth(currentContainerWidth);
        // 현재 컨테이너 너비 / 한 개 요소의 너비 = 한 번에 완전히 보여질 수 있는 요소 수
        setTotalInViewPort(Math.floor(currentContainerWidth / elementWidth));
    }, [elementWidth]);

    // 이전으로 이동
    const handlePrev = () => {
        // 지금까지 본 요소 수 - 한 번에 완전히 보여질 수 있는 요소 수
        setViewed(viewed - totalInViewPort);
        // 이동 거리 + 컨테이너 너비 * 0.7 = 이동 거리  
        setDistance(distance + containerWidth * 0.7);
    };

    // 다음으로 이동
    const handleNext = () => {
        // 지금까지 본 요소 수 + 한 번에 완전히 보여질 수 있는 요소 수
        setViewed(viewed + totalInViewPort);
        // 이동거리 = 이동 거리 - 컨테이너 너비 * 0.7
        setDistance(distance - containerWidth * 0.7);
    };


    const hasPrev = distance < 0;
    // 다음 요소가 있는지 여부 = 지금까지 본 요소 수 + 한 번에 완전히 보여질 수 있는 요소 수 < 총 요소 수
    const hasNext = viewed + totalInViewPort < countElements;

    return { handlePrev, handleNext, distance, containerRef, hasPrev, hasNext };
};

export default useSliding;
