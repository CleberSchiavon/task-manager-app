"use client";
import LoginCard from "../components/LoginCard/";
import Image from "next/image";
import BackgroundImage from "../assets/images/login-background.jpg";
import { useState } from "react";
import RegisterCard from "components/RegisterCard";

export type AuthCardType = "login" | "register";

export default function Page() {
  const [authCard, setAuthCard] = useState<AuthCardType>("login");
  return (
    <section className="h-screen flex items-center justify-center">
      <Image
        alt="Imagem de background com várias folhas ao fundo, verde predominante"
        src={BackgroundImage}
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
      <div className="flex flex-col gap-4">
        {authCard === "login" ? (
          <LoginCard setAuthCard={setAuthCard} />
        ) : (
          <RegisterCard setAuthCard={setAuthCard} />
        )}
      </div>
    </section>
  );
}
