import { Heart, Zap, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router";

interface WelcomeBannerProps {
  username?: string;
}

export default function WelcomeBanner({ username }: WelcomeBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary-dark via-green-600 to-emerald-500 shadow-2xl text-white mb-8 p-8 flex flex-col md:flex-row justify-between items-center group hover:shadow-3xl transition-all duration-500">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10 group-hover:scale-125 transition-transform duration-1000">
        <Heart className="w-72 h-72" />
      </div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 opacity-10 group-hover:scale-110 transition-transform duration-1000">
        <Zap className="w-96 h-96" />
      </div>
      <div className="relative z-10 w-full">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <span className="text-2xl">👋</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Welcome back, {username || "Family"}!
            </h1>
            <p className="text-green-100 text-sm">Here's your child's latest progress</p>
          </div>
        </div>
        <p className="text-green-50 mb-6 max-w-lg text-base leading-relaxed">
          You're doing an amazing job supporting your child's journey. Progress is looking great across all skill areas!
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/sessions"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-all shadow-lg hover:shadow-xl active:scale-95 hover:-translate-y-0.5"
          >
            <Calendar className="w-4 h-4" />
            Join Next Session <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
