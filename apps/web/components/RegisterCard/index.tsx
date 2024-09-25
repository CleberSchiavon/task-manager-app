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
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthCardType } from "app/page";
import CreateUserSchema, {
  CreateUser,
} from "components/Forms/schemas/CreateUser";
import { registerUser } from "services/AuthService";

interface IRegisterCard {
  setAuthCard: React.Dispatch<React.SetStateAction<AuthCardType>>;
}

export default function RegisterCard({ setAuthCard }: IRegisterCard) {
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [registerError, setRegisterError] = React.useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUser>({
    mode: "onBlur",
    resolver: zodResolver(CreateUserSchema),
  });

  const homeGreeting = defineHomeGreeting().toLowerCase();

  const onSubmit = async (data) => {
    setLoading(true);
    setRegisterError(null);
    await registerUser({ data: data })
      .then(() => setAuthCard("login"))
      .catch((error) => {
        setRegisterError(error.response.data.message);
      });
    setLoading(false);
  };
  return (
    <Card className="p-6 px-12 w-96">
      <CardHeader className="flex justify-center gap-2 flex-col">
        <h1 className="font-bold text-lg">Cadastre-se</h1>
        <h1 className="font-normal text-lg">Olá, {homeGreeting}</h1>
        {registerError && <p className="text-red-500">{registerError}</p>}
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            type="text"
            label="Nome de Usuário"
            placeholder="Digite seu nome de usuário"
            variant="underlined"
            isRequired
            errorMessage={errors.username?.message}
            isInvalid={!!errors.username?.message}
            {...register("username")}
          />
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
          <Input
            type={passwordVisible ? "text" : "password"}
            label="Confirmar senha"
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
            placeholder="Confirme sua senha"
            isInvalid={!!errors.confirmPassword?.message}
            errorMessage={errors.confirmPassword?.message}
            isRequired
            {...register("confirmPassword")}
          />
          <Button
            isDisabled={loading}
            isLoading={loading}
            color="secondary"
            type="submit"
          >
            Cadastrar
          </Button>
        </form>
      </CardBody>
      <CardFooter className="text-center">
        <div className="flex flex-col gap-2 content-center w-full items-center pt-12">
          <p className="font-normal text-sm">Já tem uma conta?&nbsp;</p>
          <a
            className="font-semibold text-primary-700 cursor-pointer hover:text-primary-800"
            onClick={() => setAuthCard("login")}
          >
            Entre com a sua conta!
          </a>
        </div>
      </CardFooter>
    </Card>
  );
}
