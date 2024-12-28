import { useEffect, useState } from "react";
import { PriceHistory } from "../types/PriceHistory";

const LoweredComponent = () => {
  const [data, setData] = useState<PriceHistory[]>([]);

  const getData = async () => {
    try {
      await fetch('http://localhost:3001/api/get/lowered')
        .then(response => response.json())
        .then(json => setData(json));
      console.log(data)
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
            data.map((object, index) => (
              <li key={index} className="">
                <a target="_blank" href={`https://www.systembolaget.se/produkt/${object.Product.categoryLevel1}/${object.Product.productNumber}`}>
                  <div className="p-2 px-6 flex justify-between text-baby">
                    <p>{object.Product.productNameBold}</p>
                    <p>{object.Product.productNameThin}</p>
                    <p>{object.Product.categoryLevel1}</p>
                    <p>{object.Product.categoryLevel2}</p>
                    <div className="flex"><p className="line-through text-red-800">{object.oldPrices[0].oldPrice}</p> {object.Product.price}</div>
                  </div>
                </a>
              </li>
            ))
          ) : (
            <p className="mx-auto animate-spin">Loading ..</p>
          )}
        </ul>
      </div>
    </div >
  )
}

export default LoweredComponent;
