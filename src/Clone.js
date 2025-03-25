import React, {useEffect, useState} from "react";
import styled from "styled-components";
import logo from './netflix_logo.png';
import popcornIcon from './popcorn.jpg'
import {createContext, useContext} from "react";
import {useQuery} from "react-query";
import async from "async";

const CustomBodyWrapper = styled.div`
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
`;

const CustomHeader = styled.header`

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 30px;
    padding-bottom: 30px;
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 10;

    .logoImage {
        width: 150px;
    }

    .headerControls {
        display: flex;
        gap: 15px;
        align-items: center;
    }

    .languageSelectBox, .loginButton {
        padding: 8px 12px;
        border-radius: 4px;
        border: none;
        font-size: 14px;
    }

    .loginButton {
        background-color: #e50914;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
`;

const CustomBody = styled.div`
    -webkit-align-items: center;
    -webkit-box-align: center;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    width: 70%;
`;

const CustomIntro = styled.div`
    height: 100vh;
    background: url('./black.jpg') center/cover no-repeat;
    color: white;
    position: relative;
    z-index: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
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
        border-radius: 4px;
        border: none;
    }

    .startButton {
        padding: 12px 20px;
        font-size: 16px;
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
    width: 100%;
    box-sizing: border-box;
    unicode-bidi: isolate;
    -webkit-text-size-adjust: 100%;
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
    padding: 12px 20px;
    color: white;
    border-radius: 20px;
    margin-top: 10px;

    .textContent {
        flex-direction: column;
        align-items: flex-start;
    }

    .mainText {
        font-size: 1.3rem;
        font-weight: bold;
    }

    .subText {
        font-size: 1rem;
        opacity: 0.8;
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
    display: block;
    width: 100%;
    box-sizing: border-box;
    unicode-bidi: isolate;
    -webkit-text-size-adjust: 100%;

    .hotContents {
        color: white;
    }
`;

const CustomShowList = styled.div`
    border-radius: 0.5rem;
    width: 100%;
    mask: linear-gradient(to left, transparent, black 10%);

    .showList {
        position: relative;
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
        overflow-y: visible;
        overflow-x: scroll;
        scrollbar-width: none;
        -webkit-scroll-snap-type: x mandatory;
        scroll-snap-type: x mandatory;
        scroll-margin-inline-start: 2.5em;
    }

    .showList > li {
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

    .showBox > span > span {
        line-height: 1;
        display: inline-block;
        height: 1em;
        position: relative;
        font-weight: 900;
        color: rgba(0, 0, 0, 0.8);
        -webkit-text-stroke: 0.125rem rgb(255, 255, 255);
        text-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.5)
    }

    .showBox > div {
        width: 12.5rem;
        height: 25rem;
    }
`;

const LanguageContext = createContext(null);

function Clone() {
    const [language, setLanguage] = useState(null);

    return (
        <CustomBodyWrapper>
            <LanguageContext.Provider value={{language, setLanguage}}>
                <Header/>
            </LanguageContext.Provider>);
            <CustomBody>
                <Email/>
                <CustomBannerWrapper>
                    {/*<PopcornIcon src={popcornIcon} alt="Popcorn Icon"/>*/}
                    <CustomBanner>
                        <div className="textContent">
                            <p className="mainText">5,500원이면 만나볼 수 있는 넷플릭스</p>
                            <p className="subText">가장 경제적인 광고형 멤버십을 이용해 보세요.</p>
                        </div>
                        <button className="detailButton">자세히 알아보기</button>
                    </CustomBanner>
                </CustomBannerWrapper>
                <ShowList/>
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
            <p className="subSubText">시청할 준비가 되셨나요? 멤버십을 등록하거나 재시작하려면 이메일 주소를 입력하세요.</p>
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

const OPTIONS = [{selection: '한국어'}, {selection: 'English'}];
const Header = () => {
    const {language, setLanguage} = useContext(LanguageContext);
    useEffect(() => {
        if (language === null) {
            setLanguage({selection: '한국어'});
        }
    }, [language]);
    return (
        <CustomHeader>
            <img className="logoImage" src={logo} alt="Logo"></img>
            <div className="headerControls">
                <select className="languageSelectBox" name="LanguageSelect" onChange={e => {
                    setLanguage({selection: e.currentTarget.value});
                }}>
                    {OPTIONS.map(({selection}) => <Option label={selection} selected={language?.selection === selection} />)}
                </select>
            </div>
        </CustomHeader>)
}

const ShowList = () => {
    return (<CustomShowListWrapper>
        <h1 className="hotContents">
            지금 뜨는 콘텐츠
        </h1>
        <CustomShowList>
            <ul className="showList">
                <li>
                    <button className="showBox">
                        <div></div>
                        <span>
                            <span aria-hidden="true" data-content="1">1</span>
                        </span>
                    </button>
                </li>
                <li>
                    <button className="showBox">
                        <div></div>
                        <span>
                            <span aria-hidden="true" data-content="2">2</span>
                        </span>
                    </button>
                </li>
                <li>
                    <button className="showBox">
                        <div></div>
                        <span>
                            <span aria-hidden="true" data-content="3">3</span>
                        </span>
                    </button>
                </li>
                <li>
                    <button className="showBox">
                        <div></div>
                        <span>
                            <span aria-hidden="true" data-content="4">4</span>
                        </span>
                    </button>
                </li>
            </ul>
        </CustomShowList>
    </CustomShowListWrapper>);
}

const Option = ({label, selected}) => {
    return (<option value={label} selected={selected}>{label}</option>);
}

const Button = ({label, onClick}) => {
    return (
        <button className="loginButton" onClick={onClick}>{label}</button>
    );
}

const useList = () => {
    const movieParam = {
        //key:
    }
    return useQuery({
        queryKey: ['movie'],
        queryFn: () => getMoviesById()
    })
}

const getMoviesById = async (param) => {
    const url = `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json`;
    url.search = new URLSearchParams({param}).toString();
    const response = await fetch(
        url
    )
}

export default Clone;