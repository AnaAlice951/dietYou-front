import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { LuSalad } from 'react-icons/lu';



const MenuBar: React.FC = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav
      className={`bg-[#2C5944] fixed flex justify-center px-1 font-[sans-serif] ${
        isMobile
          ? 'bottom-0 w-screen h-[80px] absolute'
          : 'top-0 left-0 h-full w-[150px] absolute'
      }`}
    >
      <div className="relative"></div>
      <div
        className={`overflow-auto h-full flex justify-center items-center gap-5 ${
          isMobile ? 'flex-row' : 'flex-col'
        }`}
      >
        <div className={`bg-[#D7F2BA] rounded-full ${location.pathname === '/home' ? 'bg-[#D7F2BA]'
              : 'bg-[#D7F2BA] bg-opacity-10'}`}>
          <a
            href="/home"
            className={` text-[15px] w-[140px] h-10 flex items-center justify-center rounded transition-all gap-2 ${
              location.pathname === '/home' ? 'text-[#592F2F]' : 'text-white'
            }`}
          >
            <LuSalad className="w-10 h-10" />
            {!isMobile && <span className="">Refeições</span>}
          </a>
        </div>
        <div
          className={`rounded-full text-[#000000] ${
            location.pathname === '/receitas'
              ? 'bg-[#D7F2BA]'
              : 'bg-[#D7F2BA] bg-opacity-10'
          }`}
        >
          <a
            href="/receitas"
            className={` text-[15px] w-[140px] h-10 flex items-center justify-center rounded transition-all gap-3 ${
              location.pathname === '/receitas' ? 'text-[#592F2F]' : 'text-white'
            }`}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.23102 30.234C13.977 28.881 18.355 28.787 21.862 31.675M9.23102 27.256C13.977 25.903 18.355 25.808 21.862 28.696M9.23102 24.357C13.977 23.004 18.355 22.909 21.862 25.797M9.23102 21.243C13.977 19.89 18.355 19.795 21.862 22.683M9.23102 18.206C13.977 16.854 18.355 16.759 21.862 19.647"
                stroke={`${
                  location.pathname === '/receitas' ? '#592F2F' : '#FFFF'
                }`}
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.5 9.647L5.617 38.272C12.506 35.362 18.684 35.73 24.019 39.986C29.676 36.719 35.594 34.976 42.383 38.311L42.5 9.958C36.773 7.714 30.537 6.591 24.02 11.243C18.854 7.395 12.035 7.268 5.5 9.647Z"
                stroke={`${
                  location.pathname === '/receitas' ? '#592F2F' : '#FFFF'
                }`}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.23102 15.372C13.977 14.019 18.355 13.924 21.862 16.812M26.487 24.01C26.41 26.74 28.114 28.646 30.724 30.132L36.204 29.475C39.645 27.005 39.614 24.634 39.507 22.265L26.487 24.01ZM27.925 16.346L26.448 20.416C28.183 20.518 30.014 19.755 31.559 21.564L32.609 18.78C30.177 18.984 29.137 17.384 27.925 16.346Z"
                stroke={`${
                  location.pathname === '/receitas' ? '#592F2F' : '#FFFF'
                }`}
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            {!isMobile && <span className="">Receitas</span>}
          </a>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
