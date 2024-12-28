import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleButtonClick = (subPage: string) => {
    setIsAnimating(true);
    setTimeout(() => navigate(`/page/${subPage}`), 500);
  }

  return (
    <div className="bg-gradient-to-br from-baby via-sky-300 to-grotto h-screen w-screen flex ">
      <div className={`rounded-xl bg-grotto shadow-lg transform transition-all duration-500 m-auto flex flex-col justify-around items-center
        ${!isAnimating ? 'h-1/2 w-1/3' : 'h-5/6 w-2/3'}`} >
        {!isAnimating && (
          <>
            <button onClick={() => handleButtonClick('lowered')} className="transition transform duration-500 bg-navy text-baby w-3/4 h-1/6 rounded-xl px-4 py-2 hover:bg-baby hover:text-grotto hover:scale-110 hover:shadow-lg">
              Sänkta priser
            </button>
            <button className="transition transform duration-500 bg-navy text-baby w-3/4 h-1/6 rounded-xl px-4 py-2 hover:bg-baby hover:text-grotto hover:scale-110 hover:shadow-lg">
              Höjda priser
            </button>
            <button onClick={() => handleButtonClick('apk')} className="transition transform duration-500 bg-navy text-baby w-3/4 h-1/6 rounded-xl px-4 py-2 hover:bg-baby hover:text-grotto hover:scale-110 hover:shadow-lg">
              APK
            </button>
          </>
        )}
      </div >
    </div >
  )
}

export default HomeComponent;
