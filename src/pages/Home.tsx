import { IonIcon } from "@ionic/react";
import { zodiosHooks } from "../configs/zodios";
import { logoFacebook, logoInstagram, logoTwitter } from "ionicons/icons";

const Home: React.FC = () => {
  const { data: products } = zodiosHooks.useListProducts();

  return (
    <div className="flex flex-col gap-8 justify-center items-center h-full">
      <div className="card glass p-4 shadow rounded border-slate-500  border w-[512px] max-w-[90vw] mx-4 overflow-x-hidden">
        <div className="flex overflow-x-scroll gap-4">
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

      <div className="card glass p-4 shadow bg-slate-800/80 hover:bg-slate-900/80 rounded border-slate-500 border w-[512px] max-w-[90vw] mx-4 overflow-x-hidden text-white flex flex-col gap-4">
        <h2 className="font-extrabold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-200">
          Explore the amazing world of tea
        </h2>
        <p>
          From the fields of five continents. Individually wrapped for
          freshness.
        </p>
      </div>

      <div className="card mt-auto glass p-4 shadow bg-slate-800/80 hover:bg-slate-900/80 rounded border-slate-500 border w-[512px] max-w-[90vw] mx-4 overflow-x-hidden text-white flex flex-col items-center">
        <h2 className="font-extrabold text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-200 text-center">
          Contact Us
        </h2>
        <p className="font-bold">@ollysamazingtea</p>
        <div className="flex gap-2">
          <a
            className="btn btn-ghost text-3xl"
            href="https://www.instagram.com"
          >
            <IonIcon icon={logoInstagram} />
          </a>
          <a className="btn btn-ghost text-3xl" href="https://www.facebook.com">
            <IonIcon icon={logoFacebook} />
          </a>
          <a className="btn btn-ghost text-3xl" href="https://www.twitter.com">
            <IonIcon icon={logoTwitter} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
