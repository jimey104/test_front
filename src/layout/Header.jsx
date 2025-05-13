import "./Header.css"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';

function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부
    const user = useSelector(state => state.auth);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
            setIsAdmin(user?.role === "ADMIN");
        } else {
            setIsLoggedIn(false);
            setIsAdmin(false);
        }
    }, [user]);

    const handleLogout = () => {
        // Redux store 업데이트
        dispatch(logout());
        // 로컬 상태 업데이트
        setIsLoggedIn(false);
        setIsAdmin(false);
        // 페이지 이동
        navigate("/");
    };

    return (
        <div className="header">
            <h1 onClick={() => navigate("/")} className="logo">
                STUDYLOG
            </h1>
            <nav className="nav-menu">
                <span onClick={() => navigate("/study/search")}>스터디 찾기</span>
                <span onClick={() => navigate("/study/create")}>스터디 만들기</span>
                <span onClick={() => navigate("/board")}>게시판</span>
                <span onClick={() => navigate("/schedule")}>일정</span>
                <span onClick={() => navigate("/openai-test")}>AI 테스트</span>
            </nav>
            <div className="header-buttons">
                {isAdmin && (
                    <button onClick={() => navigate("/boards/manage")}>관리자</button>
                )}
                {isLoggedIn ? (
                    <>
                        <button onClick={() => navigate("/mypage")}>마이페이지</button>
                        <button onClick={handleLogout}>로그아웃</button>
                    </>
                ) : (
                    <button onClick={() => navigate("/login")}>로그인</button>
                )}
            </div>
        </div>
    );
}

export default Header;
