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

const registerSchema = UserSchema.pick({
  name: true,
  email: true,
  password: true,
});

const AuthRegister: React.FC = () => {
  const { setAuthUser } = useAuthState();
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
    <div className="flex flex-col justify-center items-center h-full">
      <div className="card glass p-4 shadow rounded border-slate-500 border w-[512px] max-w-[90vw] mx-4 ">
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-2 px-4 pt-8 pb-2"
        >
          <div className="form-control w-full flex">
            <label className="input-group flex">
              <span>
                <BsFillPersonFill />
              </span>
              <input
                placeholder="Full Name"
                className="input input-bordered grow"
                {...register("name")}
              />
            </label>
            {errors.email && (
              <div className="badge badge-error gap-2 mt-2">
                {errors.email.message}
              </div>
            )}
          </div>
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
              Register
            </button>
            <p className="mt-2 text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-white btn btn-ghost">
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
