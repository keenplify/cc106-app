import { IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react";
import { chevronUpOutline, logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useAuthStore } from "../../stores/auth";
import { toast } from "react-toastify";

export function Fabs() {
  const history = useHistory();

  console.log(history);

  const { setAuthUser } = useAuthStore();

  const handleLogout = () => {
    setAuthUser(undefined);
    history.push("/auth/login");
    toast.success("Logged out successfully");
  };

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={chevronUpOutline}></IonIcon>
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton>
            <IonIcon icon={logOutOutline} onClick={handleLogout}></IonIcon>
          </IonFabButton>
        </IonFabList>
      </IonFab>
    </>
  );
}
