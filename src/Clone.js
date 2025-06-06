import React, { createContext, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import logo from './images/netflix_logo.png';
import background from './images/background.jpg';
import { useQueries, useQuery } from 'react-query';
import Slider from './slider/Slider';
import Item from './slider/Item';
import Question from './questions/Question';

const Reason = () => {
    return (
        <WholeReasonDivisionWrapper>
            <ReasonBoxesWrapper>
                <ReasonBox>
                    <div className="box">
                        <h3 className="boxTitle">TV로 즐기세요</h3>
                        <div className="boxContent">
                            <p className="boxText">
                                스마트 TV, PlayStation, Xbox, Chromecast, Apple TV, 블루레이
                                플레이어 등 다양한 디바이스에서 시청하세요.
                            </p>
                        </div>
                    </div>
                </ReasonBox>
            </ReasonBoxesWrapper>
            <ReasonBoxesWrapper>
                <ReasonBox>
                    <div className="box">
                        <h3 className="boxTitle">
                            즐겨 보는 콘텐츠를 저장해 오프라인으로 시청하세요
                        </h3>
                        <div className="boxContent">
                            <p className="boxText">간편하게 저장하고 빈틈없이 즐겨보세요.</p>
                        </div>
                    </div>
                </ReasonBox>
            </ReasonBoxesWrapper>
            <ReasonBoxesWrapper>
                <ReasonBox>
                    <div className="box">
                        <h3 className="boxTitle">다양한 디바이스로 시청하세요</h3>
                        <div className="boxContent">
                            <p className="boxText">
                                각종 영화와 시리즈를 스마트폰, 태블릿, 노트북, TV에서 무제한으로
                                스트리밍하세요.
                            </p>
                        </div>
                    </div>
                </ReasonBox>
            </ReasonBoxesWrapper>
            <ReasonBoxesWrapper>
                <ReasonBox>
                    <div className="box">
                        <h3 className="boxTitle">어린이 전용 프로필을 만들어 보세요</h3>
                        <div className="boxContent">
                            <p className="boxText">
                                자기만의 공간에서 좋아하는 캐릭터와 즐기는 신나는 모험. 자녀에게 이
                                특별한 경험을 선물하세요. 넷플릭스 회원이라면 무료입니다.
                            </p>
                        </div>
                    </div>
                </ReasonBox>
            </ReasonBoxesWrapper>
        </WholeReasonDivisionWrapper>
    );
};

const LanguageContext = createContext(null);

function Clone() {
    const [language, setLanguage] = useState(null);

    return (
        <CustomBodyWrapper>
            <LanguageContext.Provider value={{ language, setLanguage }}>
                <Header />
                <BackgroundSection />
            </LanguageContext.Provider>
            <CustomBody>
                <BodyTop>
                    <Email />
                </BodyTop>
                <BodyBottom>
                    <CustomBannerWrapper>
                        <CustomBanner>
                            <div className="textContent">
                                <p className="mainText">5,500원이면 만나볼 수 있는 넷플릭스</p>
                                <p className="subText">
                                    가장 경제적인 광고형 멤버십을 이용해 보세요.
                                </p>
                            </div>
                            <button className="detailButton">자세히 알아보기</button>
                        </CustomBanner>
                    </CustomBannerWrapper>
                    <h1 className="hotContents">지금 뜨는 콘텐츠</h1>
                    <CustomShowListWrapper>
                        <SampleSlider />
                    </CustomShowListWrapper>
                    <h1 className="hotContents">가입해야 하는 또 다른 이유</h1>
                    <Reason />
                    <h1 className="hotContents">자주 묻는 질문</h1>
                    <Question />
                </BodyBottom>
            </CustomBody>
        </CustomBodyWrapper>
    );
}

const Email = () => {
    const [email, setEmail] = useState('');

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <CustomIntro>
            <h1 className="mainTitle">영화, 시리즈 등을 무제한으로</h1>
            <p className="subText">5,500원으로 시작하세요. 멤버십은 언제든지 해지 가능합니다.</p>
            <p className="subSubText">
                시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.
            </p>
            <div className="emailInputContainer">
                <input
                    className="emailInput"
                    type="email"
                    placeholder="이메일 주소"
                    value={email}
                    onChange={handleChange}
                />
                <button className="startButton">시작</button>
            </div>
        </CustomIntro>
    );
};

const OPTIONS = [{ selection: '한국어' }, { selection: 'English' }];
const Header = () => {
    const { language, setLanguage } = useContext(LanguageContext);
    useEffect(() => {
        if (language === null) {
            setLanguage({ selection: '한국어' });
        }
    }, [language]);
    return (
        <CustomHeader>
            <img className="logoImage" src={logo} alt="Logo"></img>
            <div className="headerControls">
                <select
                    className="languageSelectBox"
                    name="LanguageSelect"
                    onChange={(e) => {
                        setLanguage({ selection: e.currentTarget.value });
                    }}
                >
                    {OPTIONS.map(({ selection }) => (
                        <Option label={selection} selected={language?.selection === selection} />
                    ))}
                </select>
                <Button label={'로그인'}></Button>
            </div>
        </CustomHeader>
    );
};

//const Posters = (movieNm) => usePostersList(movieNm);

const MOVIES = [null, null, null, null, null];

const SampleSlider = () => {
    const { data, error, isLoading } = useList();
    const postersData = usePostersList(data);

    return (
        <Slider activeSlide={null}>
            {!data
                ? MOVIES.map((movie, index) => {
                      return <Poster key={index} posterUrl={null} index={index} />;
                  })
                : data.movieListResult.movieList.map((movie, index) => {
                      //console.log(postersData[index]?.data?.Data);
                      const posterUrl =
                          postersData[index]?.data?.Data?.[0]?.Result?.[0]?.posters?.split(
                              '|',
                          )[0] || '';
                      return <Poster key={index} posterUrl={posterUrl} index={index} />;
                  })}
        </Slider>
    );
};

const Poster = ({ posterUrl, index }) => {
    return (
        <div className="show_list">
            <Item posterUrl={posterUrl} index={index} />
        </div>
    );
};

const Option = ({ label, selected }) => {
    return (
        <option value={label} defaultValue={selected}>
            {label}
        </option>
    );
};

const Button = ({ label }) => {
    return <button className="loginButton">{label}</button>;
};

const useList = () => {
    const movieParam = {
        key: '92d8f3a182dde9ac583f9167de4dc9d4',
    };
    return useQuery({
        queryKey: ['movie'],
        queryFn: () => getMovies(movieParam),
        enabled: true,
        // refetchInterval: 10000,
        // refetchIntervalInBackground: false,
    });
};

const usePostersList = (movieData) => {
    return useQueries(
        (movieData?.movieListResult.movieList ?? MOVIES).map((movie) => {
            const moviePosterParam = {
                ServiceKey: '20OWTU78NK14W9DA623N',
                collection: 'kmdb_new2',
                detail: 'Y',
                query: movie?.movieNm,
            };
            return {
                queryKey: [movie?.movieNm],
                queryFn: () => getMoviePosters(moviePosterParam),
                enabled: movieData !== null,
            };
        }),
    );
};

const getMovies = async (param) => {
    const url = new URL(
        'http://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json',
    );
    url.search = new URLSearchParams(param).toString();
    const response = await fetch(url);

    return response.json();
};

const getMoviePosters = async (param) => {
    const url = new URL(
        'http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp',
    );
    url.search = new URLSearchParams(param).toString();
    const response = await fetch(url);
    // console.log(response.json());

    return response.json();
};

const NextButton = () => {
    return (
        <CustomPageButton>
            <CustomPageButtonWrapper aria-hidden="true">
                <button className="pageButton" aria-label="다음"></button>
            </CustomPageButtonWrapper>
        </CustomPageButton>
    );
};

const CustomBodyWrapper = styled.div`
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    min-height: 100vh;
    width: 100%;
    position: relative;
`;

const CustomHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
    //background: rgba(0, 0, 0, 0.7);
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;

    .logoImage {
        width: 150px;
        padding-left: 55px;
    }

    .headerControls {
        display: flex;
        gap: 15px;
        align-items: center;
        padding-right: 55px;
    }

    .languageSelectBox,
    .loginButton {
        padding: 8px 20px;
        border-radius: 24px;
        font-size: 14px;
    }

    .languageSelectBox {
        background-color: black;
        color: white;
        border: 1px solid grey;
    }

    .loginButton {
        background-color: white;
        color: black;
        font-weight: bold;
        cursor: pointer;
        border: none;
    }
`;

const CustomBody = styled.div`
    -webkit-align-items: center;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    width: 100%;
    position: absolute;
    background: transparent;
    max-height: 80vh;

    .hotContents {
        color: white;
        text-align: left;
        margin-left: 0;
        width: 75%;
    }
`;

const CustomIntro = styled.div`
    height: 85vh;
    background: url('./black.jpg') center/cover no-repeat;
    color: white;
    position: relative;
    z-index: 3;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &::before {
        // content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0f0f0f;
        z-index: -1;
        justify-content: center;
        display: flex;
    }

    .mainTitle {
        font-size: 3rem;
        font-weight: bold;
    }

    .subText {
        font-size: 1.5rem;
        margin-top: 10px;
    }

    .subSubText {
        font-size: 1.2rem;
        margin-top: 10px;
    }

    .emailInputContainer {
        margin-top: 20px;
        gap: 10px;
    }

    .emailInput {
        padding: 12px;
        font-size: 16px;
        width: 300px;
        border-radius: 20px;
        border: none;
    }

    .startButton {
        padding: 12px 20px;
        background-color: #e50914;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
`;

const CustomBannerWrapper = styled.div`
    position: relative;
    display: block;
    box-sizing: border-box;
    unicode-bidi: isolate;
    -webkit-text-size-adjust: 100%;
    width: 75%;
`;

const PopcornIcon = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    margin-right: -10px;
    z-index: 2;
`;

const CustomBanner = styled.div`
    text-align: left;
    transition: all 0.5s cubic-bezier(0.33, 0, 0, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(90deg, #22002a, #3b0b50);
    padding: 12px 40px 15px;
    color: white;
    border-radius: 20px;
    margin-top: 10px;
    height: 75px;
    border: 1px solid #22002a;

    &:hover {
        filter: brightness(1.5);
        transform: scale(1.03);
    }

    .textContent {
        flex-direction: column;
        align-items: flex-start;
    }

    .mainText {
        font-size: 1.2rem;
        font-weight: bold;
        margin: 10px;
    }

    .subText {
        font-size: 1rem;
        opacity: 0.8;
        margin: 10px;
    }

    .detailButton {
        margin-left: auto;
        padding: 8px 12px;
        background: #666;
        color: white;
        font-size: 0.9rem;
        border: none;
        border-radius: 10px;
        cursor: pointer;
    }
`;

const CustomShowListWrapper = styled.div`
    position: relative;
    display: flex;
    width: 75%;
    box-sizing: border-box;
    unicode-bidi: isolate;
    -webkit-text-size-adjust: 100%;
`;

const CustomPageButton = styled.div`
    position: absolute;
    height: 100%;
    border: none;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    z-index: 3;
    padding-left: 0.75rem;
    transition: transform 400ms ease-in-out;
    right: -2rem;
    left: auto;
    -webkit-transition: opacity 400ms ease-in-out;
`;

const CustomPageButtonWrapper = styled.div`
    .pageButton {
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
    }
`;

const WholeReasonDivisionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    width: 75%;
`;

const ReasonBoxesWrapper = styled.div`
    margin-left: 0.75rem;
    margin-top: initial;
    text-decoration-color: white;
    width: 75%;
`;

const ReasonBox = styled.div`
    border-radius: 1rem;
    position: relative;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    -ms-flex: 1;
    flex: 1;
    transition: all 0.5s cubic-bezier(0.33, 0, 0, 1);
    background-color: #272727;
    border: 2px solid rgba(255, 255, 255, 0.04);
    backdrop-filter: blur(12px);

    .box {
        grid-template-columns: 1fr;
        -ms-flex-direction: column;
        flex-direction: column;
        min-height: 190px;
        //max-height: 250px;
        margin: 10px 10px 10px 10px;
    }

    .boxTitle {
        font-size: 1.125rem;
        font-weight: 500;
        color: white;
    }

    .boxContent {
        margin-bottom: 0.75rem;
    }

    .boxText {
        font-size: 1rem;
        font-weight: 400;
        color: lightgray;
    }
`;

const BodyTop = styled.div`
    width: 100%;
    top: 100px;
    background: linear-gradient(to bottom, #28191b, black);
    z-index: 1;
`;

const BodyBottom = styled.div`
    width: 100%;
    background: linear-gradient(to top, #28191b, black);
    display: flex;
    flex-direction: column;
    position: relative;
    z-index: 1;
    justify-content: center;
    align-items: center;
`;

const BackgroundSection = styled.div`
    background: radial-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background});
    height: 670px;
    width: 1800px;
    margin-top: 90px;
    z-index: 2;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    box-shadow: inset 0px -10px 15px rgba(0, 0, 0, 0.3);
`;

export default Clone;
