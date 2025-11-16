interface BrandingSectionProps {
  imageSrc: string;
  imageAlt?: string;
}

export default function BrandingSection({ 
  imageSrc, 
  imageAlt = "Children" 
}: BrandingSectionProps) {
  return (
    <div className="hidden lg:flex lg:flex-1 bg-green-500 flex-col justify-center items-center px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">
          <span className='text-green-800'>Ra</span>fiq
        </h1>
        <div className="w-100 h-150 bg-white rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
