import { useForm } from "react-hook-form";
import { zodiosHooks } from "../../configs/zodios";
import { UserSchema } from "../../models/user";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../stores/auth";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { IonButton, IonInput, IonItem, IonList } from "@ionic/react";

const loginSchema = UserSchema.pick({ email: true, password: true });

const AuthLogin: React.FC = () => {
  const { setAuthUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  const { push } = useHistory();

  const { data: users } = zodiosHooks.useListUsers();

  const onSubmit = handleSubmit((values) => {
    if (!users) return;

    const user = users.find(
      (v) =>
        v.email.toLowerCase() === values.email.toLowerCase() &&
        v.password === values.password
    );

    if (!user) {
      return toast.error("User not found");
    }

    setAuthUser(user);
    toast.success("Login success");
    push("/");
  });

  return (
    <div className="flex flex-col justify-center items-center h-full mt-auto mb-auto">
      <div>
        <img src="/olly.png" className="w-[50vw] max-w-[512px] my-4" />
      </div>
      <div className="card glass p-4 shadow rounded border-slate-500 border w-[512px] max-w-[90vw] mx-4 ">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 px-4 pt-8 pb-2"
        >
          <IonInput
            fill="solid"
            type="email"
            label="Email"
            labelPlacement="stacked"
            {...register("email")}
          />
          <IonInput
            fill="solid"
            type="password"
            label="Password"
            labelPlacement="stacked"
            {...register("password")}
          />
          <div className="int-group">
            <IonButton type="submit" className="w-full">
              Login
            </IonButton>
            <p className="mt-2 text-center">
              Don't have an account?{" "}
              <Link to="/auth/register" className="btn btn-ghost">
                Register Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthLogin;
