import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = (subPage: string) => {
    if (subPage !== 'about') {
      setIsAnimating(true);
      setTimeout(() => navigate(`/page/${subPage}`), 500);
    } else {
      navigate(`/page/${subPage}`)
    }
  }

  return (
    <div className="bg-gradient-to-br from-baby via-sky-300 to-grotto h-screen w-screen sm:flex">
      <div className={`py-2 sm:rounded-xl bg-grotto shadow-lg transform transition-all duration-500 m-auto flex flex-col justify-around items-center
        ${!isAnimating ? 'h-full w-full sm:h-2/3 sm:w-1/3' : 'h-full w-full sm:h-5/6 sm:w-2/3'}`} >
        {!isAnimating && (
          <>
            <button onClick={() => handleButtonClick('lowered')} className="transition transform duration-500 bg-navy text-baby w-3/4 h-1/6 rounded-xl px-4 py-2 hover:bg-baby hover:text-grotto hover:scale-110 hover:shadow-lg">
              Sänkta priser
            </button>
            <button onClick={() => handleButtonClick('raised')} className="transition transform duration-500 bg-navy text-baby w-3/4 h-1/6 rounded-xl px-4 py-2 hover:bg-baby hover:text-grotto hover:scale-110 hover:shadow-lg">
              Höjda priser
            </button>
            <button onClick={() => handleButtonClick('apk')} className="transition transform duration-500 bg-navy text-baby w-3/4 h-1/6 rounded-xl px-4 py-2 hover:bg-baby hover:text-grotto hover:scale-110 hover:shadow-lg">
              APK
            </button>
            <button onClick={() => handleButtonClick('about')} className="transition transform duration-500 bg-navy text-baby w-3/4 h-1/6 rounded-xl px-4 py-2 hover:bg-baby hover:text-grotto hover:scale-110 hover:shadow-lg">
              Om
            </button>
          </>
        )}
      </div >
    </div >
  )
}

export default HomeComponent;
