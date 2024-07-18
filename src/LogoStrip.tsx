import { Link } from "@tanstack/react-router";
import { useFSUser } from "./api/Queries";

const LogoStrip = () => {
  const user = useFSUser();

  if (user.isPending) return "loading . . .";
  if (user.error) return "Error!";

  return (
    <div className="mx-auto max-w-xl flex justify-between align-center ">
      <Link className="self-center" to="/">
        <h3 className="text-slate text-center font-black italic">FÄRSHÄR</h3>
      </Link>
      <div className="flex align-center">
        <p className="align-center self-center">
          Hey <strong>{user.data.name}</strong>!
        </p>
        <div className="avatar mask mask-squircle h-14">
          <img src={user.data.portraitUrl} />
        </div>
      </div>
    </div>
  );
};

export default LogoStrip;
