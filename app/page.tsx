import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { Hero } from "./components/frontend/Hero";

import { Features } from "./components/frontend/Features";
import { TechStack } from "./components/frontend/Logos";
import { redirect } from "next/navigation";

export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  if (session?.id) {
    return redirect("/dashboard");
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md-24">
      <Hero />
      <TechStack />
      <Features />
    </div>
  );
}
