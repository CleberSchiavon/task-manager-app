import { z } from "zod"

const LoginUserSchema = z.object({
  email: z.string().email("Digite um email válido"),
  password: z.string()
    .min(4, "Sua senha deve ter no mínimo 4 caracteres").max(20, "Sua senha deve ter no máximo 20 caracteres"),
})


export type LoginUser = z.infer<typeof LoginUserSchema>
export default LoginUserSchema