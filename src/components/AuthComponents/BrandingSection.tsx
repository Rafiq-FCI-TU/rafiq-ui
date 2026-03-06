interface BrandingSectionProps {
  imageSrc: string;
  imageAlt?: string;
  hideOverlayText?: boolean;
}

export default function BrandingSection({
  imageSrc,
  imageAlt = "Children",
  hideOverlayText = false
}: BrandingSectionProps) {
  return (
    <div className="hidden lg:flex lg:flex-1 relative overflow-hidden bg-[#188147] flex-col items-center justify-center p-12">
      <div className="flex flex-col items-center justify-center space-y-8 max-w-[400px]">
        {/* Logo */}
        <div className="flex items-center space-x-3 text-white">
          <div className="w-[42px] h-[42px] bg-white rounded-xl shadow-sm flex items-center justify-center overflow-hidden">
            <img src="/logo.png" alt="Rafiq Logo" className="w-[85%] h-[85%] object-contain" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Rafiq</h1>
        </div>

        {/* Hero Image */}
        <div className="relative w-full aspect-square rounded-[32px] overflow-hidden shadow-2xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          {!hideOverlayText && (
            <div className="absolute inset-x-0 bottom-0 py-6 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-center font-medium text-lg px-4">
                "Every step forward is a victory."
              </p>
            </div>
          )}
        </div>

        {/* Bottom Text */}
        <p className="text-white/90 text-center text-lg md:text-xl font-medium leading-relaxed px-4">
          Empowering children with Down syndrome through personalized care and joy.
        </p>
      </div>
    </div>
  );
}
