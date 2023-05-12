import { IonButton, IonFabButton, IonIcon } from "@ionic/react";
import { useCartStore } from "../stores/cart";
import { add, remove, close } from "ionicons/icons";

const Cart: React.FC = () => {
  const { items, addItem, removeItem } = useCartStore();

  const price = items.reduce(
    (a, b) => a + Number.parseFloat(b.product.price) * b.quantity,
    0
  );
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full grow">
      <h2 className="font-bold text-3xl">Cart</h2>
      <div className="overflow-y-auto w-full grow h-max flex flex-col gap-2 items-center">
        {items?.map((item, key) => (
          <div
            key={key}
            className="card glass shadow rounded border-slate-500 border w-[512px] max-w-[90vw] mx-4 overflow-x-hidden p-2"
          >
            <div className="flex gap-2">
              <div>
                <img
                  src={item.product.image}
                  className="object-cover w-[64px] aspect-square rounded"
                />
              </div>
              <div className="flex justify-center flex-col">
                <span className="font-bold">{item.product.name}</span>
                <div>
                  <span>x{item.quantity}</span>
                </div>
              </div>
              <div className="ml-auto items-center flex">
                <IonFabButton
                  size="small"
                  color="danger"
                  onClick={() => {
                    if (item.quantity == 1) {
                      console.log("removing");
                      removeItem(item.product);
                    } else {
                      addItem(item.product, -1);
                    }
                  }}
                >
                  {item.quantity == 0 ? (
                    <IonIcon icon={close} />
                  ) : (
                    <IonIcon icon={remove} />
                  )}
                </IonFabButton>
                <IonFabButton
                  size="small"
                  color="success"
                  onClick={() => addItem(item.product, 1)}
                >
                  <IonIcon icon={add} />
                </IonFabButton>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-t-lg w-full p-2 shadow">
        <div className="flex justify-between font-bold text-lg py-2">
          <div>Total Amount</div>
          <div>{price} PHP</div>
        </div>
        <IonButton className="w-full">Checkout</IonButton>
      </div>
    </div>
  );
};

export default Cart;
