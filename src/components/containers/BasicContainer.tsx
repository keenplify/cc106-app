import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { ReactNode } from "react";
import { useAuthStore } from "../../stores/auth";
import { menuOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
interface Props {
  children?: ReactNode;
}

export function BasicContainer({ children }: Props) {
  const { authUser, setAuthUser } = useAuthStore();
  const history = useHistory();

  const handleLogout = () => {
    setAuthUser(undefined);
    history.push("/auth/login");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <IonMenu contentId="main-content" type="overlay" className="z-[9999]">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Olly's Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding z-[9999]">
          <div className="flex flex-col">
            <IonList>
              <IonMenuToggle>
                <IonItem onClick={() => history.push("/home")}>
                  <IonLabel>Home</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem onClick={() => history.push("/products")}>
                  <IonLabel>Products</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem onClick={() => history.push("/blogs")}>
                  <IonLabel>Blogs</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem onClick={handleLogout}>
                  <IonLabel>Logout</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </div>
        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonContent fullscreen>
          <div className="w-full h-full flex flex-col bg-[url('/bg.jpg')] bg-no-repeat bg-cover p-4">
            {authUser && (
              <div className="p-4 w-full flex">
                <img src="/olly.png" className="w-[72px]" />
                <div className="ml-auto flex justify-between text-white items-center">
                  <IonMenuToggle>
                    <IonIcon
                      icon={menuOutline}
                      className="text-4xl text-black"
                    />
                  </IonMenuToggle>
                </div>
              </div>
            )}
            {children}
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
