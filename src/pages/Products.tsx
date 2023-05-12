import { useHistory } from "react-router";
import { zodiosHooks } from "../configs/zodios";

const Products: React.FC = () => {
  const { data: products } = zodiosHooks.useListProducts();
  const history = useHistory();

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <h2 className="font-bold text-3xl">Products</h2>
      <div className="card glass shadow rounded border-slate-500 border w-[512px] max-w-[90vw] mx-4 overflow-x-hidden">
        <div className="grid grid-cols-3 overflow-y-auto gap-4 px-4 py-4">
          {products?.map((v, key) => (
            <button
              key={key}
              className="flex flex-col items-center"
              onClick={() => {
                history.push(`/product/${v.id}`);
              }}
            >
              <img src={v.image} className="aspect-square w-24 h-24 rounded" />
              <p className="text-sm font-bold w-24 text-center overflow-ellipsis truncate">
                {v.name}
              </p>
              <small>P{v.price}</small>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
