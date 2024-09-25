import { z } from "zod"

const CreateUserSchema = z.object({
  username: z.string()
    .min(2, "Seu nome de usuário é obrigatório").max(20, "Seu nome de usuário deve ter no máximo 20 caracteres"),
  email: z.string().email("Digite um email válido"),
  password: z.string()
    .min(4, "Sua senha deve ter no mínimo 4 caracteres"),
  confirmPassword: z.string()
    .min(1, "Confirme sua senha")
})
.refine(({ password, confirmPassword}) => password === confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"]
})

export type CreateUser = z.infer<typeof CreateUserSchema>

export default CreateUserSchema