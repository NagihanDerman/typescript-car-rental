import { useEffect, useRef, useState } from "react";
import Filter from "../components/Filter";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { fetchCars } from "../utils/fetchCars";
import { CarType } from "../types";
import Warning from "../components/Warning";
import Card from "../components/Card";
import ShowMore from "../components/ShowMore";
import { useSearchParams } from "react-router-dom";
import { fuels, years } from "../utils/constants";

const Home = () => {
  // bu statei tanımlarken generic yardımı ile sadece CarType[] veya null değere sahip olabilir
  const [cars, setCars] = useState<CarType[] | null>(null);

  // bu state sadece boolean değerler alabilir
  const [isError, setIsError] = useState<boolean>(false);

  // katalog divinin referansıni alma
  const catalogRef = useRef<HTMLDivElement>(null);

  // url deki paramlare erişme
  const [params] = useSearchParams();

  useEffect(() => {
    // urldeki bütün arama parametrelerinden bir nesne oluşturma
    const paramsObj = Object.fromEntries(params.entries());

    // verileri çeken fonksiyona parametreleri gönderme
    fetchCars(paramsObj)
      .then((data) => setCars(data))
      .catch(() => setIsError(true));
  }, [params]);

  return (
    <div className="mb-40">
      <Hero catalogRef={catalogRef} />

      <div ref={catalogRef} className="mt-12 padding-x padding-y max-width">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Car Catalog</h1>

          <p>Discover cars you might like</p>

          <div className="home__filters">
            <SearchBar />

            <div className="home__filter-container">
              <Filter options={fuels} name="fuel_type" />
              <Filter options={years} name="year" />
            </div>
          </div>
        </div>

        {/*
             * Araba Listesi
             1) Veri nullsa > API'dan cevap gelmemiştir
             2) isError true ise > API'dan hata gelmiştir
             3) Veri boş dizi ise > Aranılan kriterlere uygun veri yoktur
             4) Veri dolu dizi ise > API'dan arabalar gelmiştir
             */}
        {!cars ? (
          <Warning>Loading...</Warning>
        ) : isError ? (
          <Warning>Sorry, an error occurred</Warning>
        ) : cars.length < 1 ? (
          <Warning>No vehicles found matching the search criteria</Warning>
        ) : (
          cars.length > 1 && (
            <section>
              <div className="home__cars-wrapper">
                {cars?.map((car, i) => (
                  <Card car={car} key={i} />
                ))}
              </div>

              <ShowMore />
            </section>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
