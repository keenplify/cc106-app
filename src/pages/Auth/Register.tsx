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
import { IoMdLock } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IonButton, IonInput } from "@ionic/react";

const registerSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
});

const AuthRegister: React.FC = () => {
  const { setAuthUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });
  const { push } = useHistory();

  const { mutate } = zodiosHooks.useCreateUser(undefined, {
    onSuccess: (user) => {
      setAuthUser(user);
      toast.success("Login success");
      push("/");
    },
  });

  const onSubmit = handleSubmit((values) => mutate(values));

  return (
    <div className="flex flex-col justify-center items-center h-full mt-auto mb-auto">
      <div className="card glass p-4 shadow rounded border-slate-500 border w-[512px] max-w-[90vw] mx-4 ">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 px-4 pt-8 pb-2"
        >
          <IonInput
            fill="solid"
            label="Full Name"
            labelPlacement="stacked"
            {...register("name")}
          />

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
              Register
            </IonButton>
            <p className="mt-2 text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="btn btn-ghost">
                Login Here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthRegister;
