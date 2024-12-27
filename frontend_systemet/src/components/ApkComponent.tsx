import { useEffect, useState } from "react";

const ApkComponent = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      await fetch('http://localhost:3001/api/get/apk')
        .then(response => response.json())
        .then(json => setData(json));
    } catch (error) {
      console.error(error);
    }
    console.log(data)
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="bg-gradient-to-br from-baby via-sky-300 to-grotto h-screen w-screen flex ">
      <div className={`rounded-xl bg-grotto shadow-lg transform transition-all duration-1000 h-5/6 w-2/3 m-auto flex flex-col justify-around items-center`} >
        <ul className="overflow-auto w-full py-2 divide-y divide-navy">
          {data.length > 0 ? (
            data.map((drink, index) => (
              <li key={index} className="" >
                <div className="p-2 px-6 flex justify-between text-baby">
                  <p>{drink.productNameBold}</p>
                  <p>PRIS: {drink.price}</p>
                </div>
              </li>
            ))
          ) : (
            <p className="mx-auto animate-spin">Loading ..</p>
          )}
        </ul>
      </div>
    </div>
  )
}

export default ApkComponent;
//<p>APK: {drink.apk}</p>
