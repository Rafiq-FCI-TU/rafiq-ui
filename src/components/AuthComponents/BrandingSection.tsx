interface BrandingSectionProps {
  imageSrc: string;
  imageAlt?: string;
}

export default function BrandingSection({
  imageSrc,
  imageAlt = "Children"
}: BrandingSectionProps) {
  return (
    <div className="hidden lg:flex lg:flex-1 relative overflow-hidden">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
      />
      <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-gray-900/20" />
      <div className="relative z-10 w-full flex flex-col justify-end p-12 lg:p-16 text-left">
        <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">
          <span className='text-green-500'>Raq</span>fiq
        </h1>
        <p className="text-xl text-gray-300 max-w-md font-light leading-relaxed">
          Your journey to a better future starts here. Join our community today and make a difference.
        </p>
      </div>
    </div>
  );
}
