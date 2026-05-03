import z from 'zod';

export const RegisterSchema = z.object({
    name: z.string({ error: "El nombre es requerido" }),
    email: z.string({ error: "El correo es requerido" }),
    password: z.string({ error: "El correo es requerido" }).min(1, "El campo es requerido").min(8, "Numero de caracteres minimo 8"),
    roleId: z.string({ error: "El correo es requerido" })
})

export type RegisterType = z.infer<typeof RegisterSchema>;