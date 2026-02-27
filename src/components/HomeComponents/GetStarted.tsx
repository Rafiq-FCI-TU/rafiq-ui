import { Link } from "react-router";

export default function GetStarted() {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-[#00A63E] text-white rounded-xl p-10 gap-10 shadow-2xl">
      <h3 className="text-2xl font-semibold">
        Are you ready to start an enjoyable journey with your child?
      </h3>
      <Link
        to="/register"
        className="bg-white text-[#00A63E] rounded-xl transition-colors hover:bg-green-800 hover:text-white px-10 py-2"
      >
        Start Now
      </Link>
      <p className="text-lg">
        Already have an account?{" "}
        <Link
          to="/login"
          className="hover:text-black hover:no-underline transition-colors text-green-50 underline mr-2"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
