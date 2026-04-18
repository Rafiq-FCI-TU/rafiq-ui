import { Link } from "react-router";
import { LockIcon } from "lucide-react";
export default function GetStarted() {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center bg-linear-to-b from-primary-dark to-green-700 text-white rounded-xl p-10 not-md:p-5 gap-10 shadow-2xl" >
      <h3 className="text-2xl font-semibold">
        Ready to Transform Your Child's Journey?
      </h3>
      <p className="text-lg">
        Join thousands of families experiencing meaningful progress with our
        comprehensive platform
      </p>
      <Link
        to="/register"
        className="bg-white text-primary-dark font-semibold rounded-xl transition-all duration-300 hover:scale-105  px-10 py-2"
      >
        You Can Start Free →
      </Link>

      <p className="flex gap-2 text-sm">
        <LockIcon className="w-5 h-5 text-yellow-300 " />
        Your data is encrypted and secure. We never share your information.
      </p>
    </div>
  );
}
