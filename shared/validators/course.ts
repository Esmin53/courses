import { z } from "zod";

export const CourseValidator = z.object({
    title: z.string().min(9, "Title be longer than 9 characters").max(75, "Description must be under 75 characters"),
    description: z.string().min(20, "Description must be longer than 20 characters").max(300, "Description must be under 300 characters"),
    price: z.number(),
    media: z.string().optional(),
    tags: z.array(z.string()).min(1, "Please choose atleast one tag"),
    thumbnail: z.string().optional()
})

export type CourseValidatorType = z.infer<typeof CourseValidator>