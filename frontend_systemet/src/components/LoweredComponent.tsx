import { useEffect, useState } from "react";
import { PriceHistory } from "../types/PriceHistory";
import { useLocation } from "react-router-dom";
import reload from '../assets/reload.png'

const LoweredComponent = () => {
  const [data, setData] = useState<PriceHistory[]>([]);
  const location = useLocation();
  const [sort, setSort] = useState("alphabetical");
  const [expandIndex, setExpandIndex] = useState<number | null>(null);
  const [orderFilter, setOrderFilter] = useState(false);

  const getData = async () => {
    try {
      await fetch(`https://api.bjorntp.com/api/get/lowered?sort=${sort}`)
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

  const handleCheckBoxChange = () => {
    setOrderFilter(!orderFilter);
  }

  return (
    <div className="bg-gradient-to-br from-baby via-sky-300 to-grotto h-screen w-screen md:flex md:flex-col">
      <div className={`md:rounded-xl bg-grotto shadow-lg transform transition-all duration-1000 h-full w-full md:h-5/6 md:w-2/3 m-auto flex flex-col justify-around items-center`} >
        <div className="sticky top-0 z-10 w-full items-center px-6 py-2 bg-navy text-baby md:rounded-xl">
          <div className="grid grid-cols-6 grid-rows-3 md:grid-rows-2 items-center">
            <h2 className="text-xl text-center font-bold row-start-1 col-start-1 col-span-6">Prissänkningar</h2>
            <div className="py-1 row-start-2 col-start-1 col-span-6 md:col-span-3 flex flex-col md:flex-row items-center justify-center">
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
            <div className="row-start-3 md:row-start-2 col-start-1 md:col-start-1 text-center md:col-span-3 col-span-6 justify-center items-center">
              <label htmlFor="order" className="px-2">
                Inkludera beställningsvaror (varierande leveranstid)
              </label>
              <input
                id="order"
                type="checkbox"
                checked={orderFilter}
                onChange={handleCheckBoxChange}
                className="pl-2"
              />
            </div>
          </div>
        </div>
        <ul className="overflow-auto w-full py-2 divide-y divide-navy">
          {data.length > 0 ? (
            data.map((object, index) => (
              ((object.Product.isBsAssortment === false || orderFilter) ? (
                <li key={index} className="">
                  <div className="p-2 px-6 md:grid md:grid-cols-6 text-baby" onClick={() => {
                    if (expandIndex === index) {
                      setExpandIndex(null);
                    } else {
                      setExpandIndex(index);
                    }
                  }}>
                    <p>{object.Product.productNameBold}</p>
                    <p className="md:col-span-2">{object.Product.productNameThin}</p>
                    <p className="">{object.Product.categoryLevel2}</p>
                    <p className="md:text-end line-through text-red">{object.OldPrices[0].oldPrice}</p>
                    <p className="md:text-end md:col-start-6">{object.Product.price}</p>
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
              ) : (<></>)))
            ))
            : (
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
