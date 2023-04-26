import { IonIcon } from "@ionic/react";
import { zodiosHooks } from "../configs/zodios";
import { logoFacebook, logoInstagram, logoTwitter } from "ionicons/icons";

const Products: React.FC = () => {
  const { data: products } = zodiosHooks.useListProducts();

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <div className="card glass py-4 shadow rounded border-slate-500 border w-[512px] max-w-[90vw] max-h-[80vh] mx-4 overflow-x-hidden">
        <div className="grid grid-cols-3 overflow-x-scroll gap-4 px-4">
          {products?.map((v, key) => (
            <div key={key} className="flex flex-col items-center">
              <img src={v.image} className="aspect-square w-24 h-24 rounded" />
              <p className="text-sm font-bold w-24 text-center overflow-ellipsis truncate">
                {v.name}
              </p>
              <small>P{v.price}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;