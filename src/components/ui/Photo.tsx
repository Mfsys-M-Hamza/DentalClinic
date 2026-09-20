import Image from "next/image";
import { cn, withBase } from "@/lib/utils";

interface PhotoProps {
  src: string;
  alt: string;
  /** Tailwind aspect ratio class, e.g. "aspect-[4/3]". Reserves space to prevent layout shift. */
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  /** Slow zoom on hover of the closest `.group` ancestor. */
  zoom?: boolean;
  className?: string;
  imgClassName?: string;
}

/** Responsive, lazy-loaded image inside a fixed-ratio frame. Swap `src` for real photography. */
export function Photo({
  src,
  alt,
  ratio = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority,
  zoom,
  className,
  imgClassName,
}: PhotoProps) {
  return (
    <div className={cn("relative overflow-hidden bg-brand-100", ratio, className)}>
      <Image
        src={withBase(src)}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={src.endsWith(".svg")}
        className={cn(
          "object-cover",
          zoom && "transition-transform duration-700 ease-out group-hover:scale-105",
          imgClassName,
        )}
      />
    </div>
  );
}
