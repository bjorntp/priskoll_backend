import { useEffect, useState } from "react";
import { PriceHistory } from "../types/PriceHistory";
import { useLocation } from "react-router-dom";

const RaisedComponent = () => {
  const [data, setData] = useState<PriceHistory[]>([]);
  const location = useLocation();
  const [sort, setSort] = useState("placeholder");

  const getData = async () => {
    try {
      await fetch(`http://localhost:3001/api/get/raised?sort=${sort}`)
        .then(response => response.json())
        .then(json => setData(json));
      console.log(data)
    } catch (error) {
      console.error(error);
    }
    console.log(data)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sortParam = queryParams.get("sort") ?? "price";
    setSort(sortParam);
    console.log("Sort frontend: ", sortParam);
  }, [location]);

  useEffect(() => {
    if (sort !== "placeholder") {
      getData();
    }
  }, [sort]);

  return (
    <div className="bg-gradient-to-br from-baby via-sky-300 to-grotto h-screen w-screen flex ">
      <div className={`rounded-xl bg-grotto shadow-lg transform transition-all duration-1000 h-5/6 w-2/3 m-auto flex flex-col justify-around items-center`} >
        <ul className="overflow-auto w-full py-2 divide-y divide-navy">
          {data.length > 0 ? (
            data.map((object, index) => (
              <li key={index} className="">
                <a target="_blank" href={`https://www.systembolaget.se/produkt/${object.Product.categoryLevel1}/${object.Product.productNumber}`}>
                  <div className="p-2 px-6 grid grid-cols-4 justify-between text-baby">
                    <p>{object.Product.productNameBold}</p>
                    <p>{object.Product.productNameThin}</p>
                    <p>{object.Product.categoryLevel2}</p>
                    <p className="line-through text-red">{object.oldPrices[0].oldPrice}</p>
                    <p className="col-start-5">{object.Product.price}</p>
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

export default RaisedComponent;
