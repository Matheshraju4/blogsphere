import Image from "next/image";
import NextjsLogo from "@/public/logos/nextjs.svg";
import KindeLogo from "@/public/logos/kinde.svg";
// Replace with actual logo path
import ShadcnLogo from "@/public/logos/shadcn-ui-light.svg"; // Replace with actual logo path
import TailwindLogo from "@/public/logos/tailwind.svg"; // Replace with actual logo path

export function TechStack() {
  return (
    <div className="sm:py-10">
      <h2 className="text-center text-lg font-semibold leading-7">
        Our Tech Stack
      </h2>
      <p className="text-center text-sm text-muted-foreground mt-2">
        We use the latest technologies to ensure a robust, scalable, and
        efficient platform.
      </p>
      <div className="mt-10 grid max-w-lg mx-auto grid-cols-2 items-center justify-center gap-x-8 sm:max-w-xl sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-4 gap-5 p-4">
        <div className="flex flex-col items-center">
          <Image
            src={NextjsLogo}
            alt="Next.js Logo"
            className="max-h-12 w-full object-contain dark:invert"
          />
          <span className="mt-2 text-sm">Next.js</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={KindeLogo}
            alt="Kinde Logo"
            className="max-h-12 w-full object-contain dark:invert"
          />
          <span className="mt-2 text-sm">Kinde</span>
        </div>

        <div className="flex flex-col items-center">
          <Image
            src={ShadcnLogo}
            alt="Shadcn Logo"
            className="max-h-12 w-full object-contain dark:invert"
          />
          <span className="mt-2 text-sm">Shadcn</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={TailwindLogo}
            alt="Tailwind CSS Logo"
            className="max-h-12 w-full object-contain dark:invert"
          />
          <span className="mt-2 text-sm">Tailwind CSS</span>
        </div>
      </div>
    </div>
  );
}
