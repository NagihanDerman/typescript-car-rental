import { CarType } from "../types";

const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "9e13f939c6mshec3979ba5839793p1cd636jsnf537eb604fd2",
    "x-rapidapi-host": "cars-by-api-ninjas.p.rapidapi.com",
  },
};

type FilterType = {
  make?: string;
  model?: string;
  limit?: string;
  fuel_type?: string;
  year?: string;
};

export const fetchCars = async (paramsObj: FilterType): Promise<CarType[]> => {
  // parametreler gelmediği durumda  varsayılan değerleri belirle
  const {
    limit = "5",
    make = "bmw",
    model = "",
    fuel_type = "",
    year = "",
  } = paramsObj;

  console.log(make);

  const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?make=${make}&model=${model}&fuel_type=${fuel_type}&year=${year}&limit=${limit}`;

  const res = await fetch(url, options);

  return await res.json();
};
