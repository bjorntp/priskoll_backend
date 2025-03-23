import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import reload from '../assets/reload.png'
import bib from '../assets/bib.svg'

const ApkComponent = () => {
  const [data, setData] = useState<Product[]>([]);
  const apiLink = import.meta.env.VITE_API_LINK;

  const getData = async () => {
    try {
      await fetch(`${apiLink}get/apk`)
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
                    {drink.bottleText === "Box" ? (
                      <div className="flex items-center">
                        <p>{drink.productNameBold}</p>
                        <img className="h-12 w-12 pl-2" src={bib} alt="Påse i låda" />
                      </div>
                    ) : (
                      <p>{drink.productNameBold}</p>
                    )}
                    <div className="flex items-center">
                      <p>{drink.apk}</p>
                    </div>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <div className="h-full w-full m-auto">
              <img className='text-navy w-32 h-32 m-auto animate-spin' src={reload} alt="Loading" />
              <p>hej</p>
            </div>
          )}
        </ul>
      </div>
    </div >
  )
}

export default ApkComponent;
