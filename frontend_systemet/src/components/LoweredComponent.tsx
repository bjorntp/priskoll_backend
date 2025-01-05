import { useEffect, useState } from "react";
import { PriceHistory } from "../types/PriceHistory";
import { useLocation } from "react-router-dom";
import reload from '../assets/reload.png'

const LoweredComponent = () => {
  const [data, setData] = useState<PriceHistory[]>([]);
  const location = useLocation();
  const [sort, setSort] = useState("alphabetical");
  const [expandIndex, setExpandIndex] = useState<number | null>(null);

  const getData = async () => {
    try {
      await fetch(`http://192.168.10.116:3001/api/get/lowered?sort=${sort}`)
        .then(response => response.json())
        .then(json => setData(json));
    } catch (error) {
      console.error(error);
    }
  }

  const sortingOptions = [
    { label: "Alfabetiskt", value: "alphabetical" },
    { label: "Kategori", value: "category" },
    { label: "Lägsta pris", value: "priceabs" },
    { label: "Största procentuella minskning", value: "percentage" },
  ];

  const handleSortChange = (newSort: string) => {
    setSort(newSort)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sortParam = queryParams.get("sort") ?? "price";
    setSort(sortParam);
  }, [location]);

  useEffect(() => {
    if (sort !== "placeholder") {
      getData();
    }
  }, [sort]);

  return (
    <div className="bg-gradient-to-br from-baby via-sky-300 to-grotto h-screen w-screen sm:flex sm:flex-col">
      <div className={`sm:rounded-xl bg-grotto shadow-lg transform transition-all duration-1000 h-full w-full sm:h-5/6 sm:w-2/3 m-auto flex flex-col justify-around items-center`} >
        <div className="sticky top-0 z-10 w-full flex flex-col sm:flex-row justify-between items-center px-6 py-2 bg-navy text-baby sm:rounded-xl">
          <h2 className="text-xl font-bold">Prissänkningar</h2>
          <div className="flex flex-col sm:flex-row items-center pb-3 sm:pb-0">
            <label htmlFor="sort" className="invisible sm:visible mr-2">
              Sortering
            </label>
            <select
              id="sort"
              className="px-4 py-2 border rounded-md bg-white text-grotto"
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {sortingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <ul className="overflow-auto w-full py-2 divide-y divide-navy">
          {data.length > 0 ? (
            data.map((object, index) => (
              <li key={index} className="">
                <div className="p-2 px-6 sm:grid sm:grid-cols-6 text-baby" onClick={() => {
                  if (expandIndex === index) {
                    setExpandIndex(null);
                  } else {
                    setExpandIndex(index);
                  }
                }}>
                  <p>{object.Product.productNameBold}</p>
                  <p className="sm:col-span-2">{object.Product.productNameThin}</p>
                  <p className="">{object.Product.categoryLevel2}</p>
                  <p className="sm:text-end line-through text-red">{object.OldPrices[0].oldPrice}</p>
                  <p className="sm:text-end sm:col-start-6">{object.Product.price}</p>
                </div>
                {expandIndex === index &&
                  <div className="bg-baby text-grotto p-4">
                    <p><strong>Typ:</strong> {object.Product.categoryLevel2}</p>
                    <p><strong>Styrka:</strong> {object.Product.alcoholPercentage}</p>
                    <p><strong>Volym:</strong> {object.Product.volume} ml</p>
                    <p>
                      <strong>Ursprung: </strong>
                      {object.Product.country}
                      {object.Product.originLevel1 ? `, ${object.Product.originLevel1}` : ""}
                      {object.Product.originLevel2 ? `, ${object.Product.originLevel2}` : ""}
                    </p>
                    <p><strong>Producent: </strong>{object.Product.producerName}</p>
                    {object.Product.grapes?.length > 0 && (
                      <p>
                        <strong>Druvor:</strong> {object.Product.grapes.join(", ")}
                      </p>
                    )}
                    <p><a target="_blank" href={`https://www.systembolaget.se/produkt/${object.Product.categoryLevel1}/${object.Product.productNumber}`}>Sida hos Systembolaget</a></p>
                  </div>
                }
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

export default LoweredComponent;
