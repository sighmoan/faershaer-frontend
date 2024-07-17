import { Link } from "@tanstack/react-router";

const LogoStrip = () => {
  return (
    <div className="mx-auto max-w-xl">
      <Link to="/">
        <h3 className="text-slate font-black italic">FÄRSHÄR</h3>
      </Link>
    </div>
  );
};

export default LogoStrip;
