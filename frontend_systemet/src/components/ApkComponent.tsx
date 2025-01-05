import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import reload from '../assets/reload.png'

const ApkComponent = () => {
  const [data, setData] = useState<Product[]>([]);

  const getData = async () => {
    try {
      await fetch('http://192.168.10.116:3001/api/get/apk')
        .then(response => response.json())
        .then(json => setData(json));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData();
  }, [])

  return (
    <div className="bg-gradient-to-br from-baby via-sky-300 to-grotto h-screen w-screen flex">
      <div className={`sm:rounded-xl bg-grotto shadow-lg transform transition-all duration-1000 h-full w-full sm:h-5/6 sm:w-2/3 m-auto flex flex-col justify-around items-center`} >
        <ul className="overflow-auto w-full py-2 divide-y divide-navy">
          {data.length > 0 ? (
            data.map((drink, index) => (
              <li key={index} className="">
                <a target="_blank" href={`https://www.systembolaget.se/produkt/${drink.categoryLevel1}/${drink.productNumber}`}>
                  <div className="p-2 px-6 flex justify-between text-baby">
                    <p>{drink.productNameBold}</p>
                    <p>{drink.apk}</p>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <div className="h-full w-full m-auto">
              <img className='text-navy w-32 h-32 m-auto animate-spin' src={reload} alt="Loading" />
            </div>
          )}
        </ul>
      </div>
    </div >
  )
}

export default ApkComponent;
//<p>APK: {drink.apk}</p>
