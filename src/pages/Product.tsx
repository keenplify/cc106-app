import { useHistory, useRouteMatch } from "react-router";
import { zodiosHooks } from "../configs/zodios";
import { IonButton, IonFabButton, IonIcon, IonImg } from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import { useCartStore } from "../stores/cart";

const Product: React.FC = () => {
  const match = useRouteMatch<{ id: string }>("/product/:id");
  const { addItem } = useCartStore();
  const { data: product } = zodiosHooks.useGetProduct(
    {
      params: {
        id: match?.params.id ?? "",
      },
    },
    {
      enabled: !!match?.params.id,
    }
  );

  const history = useHistory();

  const handleAddToCart = () => {
    if (!product) return;

    addItem(product, 1);
    history.push("/cart");
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <div className="card glass shadow rounded border-slate-500 border w-[512px] max-w-[90vw] mx-4 overflow-x-hidden">
        <div className="flex justify-end w-full pt-4 px-4">
          <IonFabButton
            onClick={() => {
              history.push("/products");
            }}
          >
            <IonIcon icon={arrowBack} size="large" />
          </IonFabButton>
        </div>
        <div className="flex flex-col p-4">
          <IonImg src={product?.image} className="rounded-lg" />
          <div className="my-2 gap-2 flex flex-col text-white bg-slate-500/75 rounded p-2">
            <h1 className="font-bold text-2xl">{product?.name}</h1>
            <h2>{product?.price} PHP</h2>
            <p>{product?.description}</p>
          </div>
          <IonButton className="w-full" onClick={handleAddToCart}>
            Add to Cart
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default Product;
