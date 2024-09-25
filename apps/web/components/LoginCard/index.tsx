import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "@nextui-org/react";
import { defineHomeGreeting } from "utils/defineHomeGreeting";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import LoginUserSchema, { LoginUser } from "../Forms/schemas/LoginUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AuthCardType } from "app/page";
import { loginUser } from "services/AuthService";

interface ILoginCard {
  setAuthCard: React.Dispatch<React.SetStateAction<AuthCardType>>;
}

export default function LoginCard({ setAuthCard }: ILoginCard) {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginUser>({
    mode: "onBlur",
    resolver: zodResolver(LoginUserSchema),
  });

  const router = useRouter();

  const homeGreeting = defineHomeGreeting().toLowerCase();

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError(null);
    await loginUser({data: data})
      .then(() => router.push("/dashboard"))
      .catch((error) => {
        setLoginError(error.response.data.message);
      });
    setLoading(false);
  };
  return (
    <Card className="p-6 px-12 w-96">
      <CardHeader className="flex justify-center gap-2 flex-col">
        <h1 className="font-bold text-lg">Login</h1>
        <h1 className="font-normal text-lg">Olá, {homeGreeting}</h1>
        {loginError && <p className="text-red-500">{loginError}</p>}
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="email"
            label="Email"
            placeholder="Digite seu email"
            variant="underlined"
            isRequired
            errorMessage={errors.email?.message}
            isInvalid={!!errors.email?.message}
            {...register("email")}
          />
          <Input
            type={passwordVisible ? "text" : "password"}
            label="Senha"
            variant="underlined"
            endContent={
              <button
                aria-label="toggle password visibility"
                onClick={() => setPasswordVisible(!passwordVisible)}
                type="button"
              >
                {passwordVisible ? <EyeOff /> : <Eye />}
              </button>
            }
            placeholder="Digite sua senha"
            isInvalid={!!errors.password?.message}
            errorMessage={errors.password?.message}
            isRequired
            {...register("password")}
          />
          <Button
            isDisabled={loading}
            isLoading={loading}
            color="secondary"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </CardBody>
      <CardFooter className="text-center">
        <div className="flex flex-col gap-2 content-center w-full items-center pt-12">
          <p className="font-normal text-sm">Não tem uma conta?&nbsp;</p>
          <a
            className="font-semibold text-primary-700 cursor-pointer hover:text-primary-800"
            onClick={() => setAuthCard("register")}
          >
            Cadastre-se agora!
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
