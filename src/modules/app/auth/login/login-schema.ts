import z from "zod";

const emailRegex = /^\w+([.]\w+)*@\w+([.]\w+)*[.][a-zA-Z]{2,5}$/;

export const LoginSchema = z.object({
    email: z
        .string({ error: "El correo es requerido" })
        .min(1, "El correo es requerido")
        .regex(emailRegex, { message: "El correo no es válido" }),

    password: z
        .string({ error: "La contraseña es requerida" })
        .min(1, "La contraseña es requerida")
})

export type LoginType = z.infer<typeof LoginSchema>