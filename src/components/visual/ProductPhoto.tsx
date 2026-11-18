export function ProductPhoto({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <span className={`block overflow-hidden bg-[#f4efe8] ${className}`}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </span>
  );
}
