import z from "zod"

export const AuthValidator = z.object({
    username: z.string().min(3, "Username must contain atleast 3 characters").max(21, "Username must be under 21 characters"),
    password: z.string().min(6, "Password must be atleast 6 charcters long").max(21, "Password must be under 21 characters")
})

export type AuthValidatorType = z.infer<typeof AuthValidator>