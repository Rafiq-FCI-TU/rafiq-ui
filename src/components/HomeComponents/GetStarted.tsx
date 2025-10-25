import { Link } from "react-router";

export default function GetStarted() {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-[#00A63E] text-white rounded-xl p-10 gap-10 shadow-2xl">
      <h3 className="text-2xl font-semibold">هل انت مستعد لبداية رحلة ممتعة مع طفلك؟</h3>
      <Link to="/register" className="bg-white text-[#00A63E] rounded-xl transition-colors hover:bg-green-800 hover:text-white px-10 py-2">ابدأ الآن</Link>
      <p className="text-lg">
        لديك حساب بالفعل؟ <Link to="/login" className="hover:text-white transition-colors text-black mr-2">تسجيل الدخول</Link>
      </p>
    </div>
  );
}
