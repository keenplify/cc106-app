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
    <div className="flex flex-col justify-center items-center h-full">
      <div>
        <img src="/olly.png" className="w-[50vw] my-4" />
      </div>
      <div className="card glass p-4 shadow rounded border-slate-500 border w-[512px] max-w-[90vw] mx-4 ">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 px-4 pt-8 pb-2"
        >
          <div className="form-control w-full flex">
            <label className="input-group flex">
              <span>
                <MdAlternateEmail />
              </span>
              <input
                type="email"
                placeholder="info@site.com"
                className="input input-bordered grow"
                {...register("email")}
              />
            </label>
            {errors.email && (
              <div className="badge badge-error gap-2 mt-2">
                {errors.email.message}
              </div>
            )}
          </div>
          <div className="form-control">
            <label className="input-group flex">
              <span>
                <IoMdLock />
              </span>
              <input
                type="password"
                className="input input-bordered grow"
                placeholder="Password"
                {...register("password")}
              />
            </label>
            {errors.password && (
              <div className="badge badge-error gap-2 mt-2">
                {errors.password.message}
              </div>
            )}
          </div>
          <div className="int-group">
            <button name="submit" className="btn btn-primary w-full">
              Login
            </button>
            <p className="mt-2 text-center">
              Don't have an account?{" "}
              <Link to="/auth/register" className="text-white btn btn-ghost">
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
