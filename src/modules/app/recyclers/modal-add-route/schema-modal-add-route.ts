import z from "zod";

export const schemaModalAddRoute = z.object({
    routeName: z
        .string({ error: "El campo es obligatorio   " })
        .min(1, "El campo es obligatorio "),
    zone: z
        .string({ error: "El campo es obligatorio   " })
        .min(1, "El campo es obligatorio "),
    day: z
        .date({ error: "El campo es obligatorio " }),
    hour: z
        .string({ error: "El campo es obligatorio   " })
        .min(1, "El campo es obligatorio "),
});

export type ModalAddRouteType = z.infer<typeof schemaModalAddRoute>;