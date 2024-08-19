import { useSearchParams } from "react-router-dom";
import Button from "./Button";

const ShowMore = () => {
  const [params, setParams] = useSearchParams();

  // urldeki limit parametresini alma (param. yoksa 5)
  const limit = Number(params.get("limit")) || 5;

  const increaseLimit = () => {
    // yeni limiti belirleme
    const newLimit = limit + 5;

    // parametreleri güncelleme
    params.set("limit", String(newLimit));

    // url'i güncelleme
    setParams(params);
  };

  return (
    <div className="w-2full flex-center gap-5 my-10">
      {limit < 30 && <Button title="More" handleClick={increaseLimit} />}
    </div>
  );
};

export default ShowMore;
