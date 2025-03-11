import React from "react";
import styled from "styled-components";
import logo from './netflix_logo.png';

const CustomHeader = styled.header`
    
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 50px;
    background: rgba(0,0,0,0.7);
    position: absolute;
    width:100%;
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 100vh;
    background: url('./black.jpg') center/cover no-repeat;
    color: white;
    position: relative;
    z-index: 1;
    padding: 20px;
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        z-index: -1;
    }
    
    .mainTitle {
        font-size: 3rem;
        font-weight: bold;
        max-width: 800px;
    }
    
    .subText {
        font-size: 1.5rem;
        margin-top: 10px;
    }
    
    .emailInputContainer {
        margin-top: 20px;
        display: flex;
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


function Clone() {
    return (<div>
        <CustomHeader>
            <img className="logoImage" src={logo} alt="Logo"></img>
            <div className="hearderControls">
                <select className="languageSelectBox" name="LanguageSelect">
                    <option value="ko-KR">한국어</option>
                    <option value="en-EN">English</option>
                </select>
                <button className="loginButton">로그인</button>
            </div>
        </CustomHeader>
        <CustomBody>
            <h1 className="mainTitle">영화, 시리즈 등을 무제한으로</h1>
            <p className="subText">5,500원으로 시작하세요. 멤버십은 언제든지 해지 가능합니다.</p>
            <div className="emailInputContainer">
                <input className="emailInput" type="email" placeholder="이메일 주소" />
                <button className="startButton">시작하기</button>
            </div>
        </CustomBody>
    </div>);
}

export default Clone;