import { z } from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(100),

    description: z.string().min(20).max(150),

    category: z.string().min(3).max(20),

    link: z.string().url().refine(async (url) => {
        try {
            const response = await fetch(url, {
                method: "HEAD",
            });

            const contentType =
                response.headers.get("content-type");

            return contentType?.startsWith("image/");
        } catch (error) {
            return false;
        }
    }),

    pitch: z.string().min(20),
});


export const startupAnalysisSchema = z.object({
    clarity: z.enum([
        "Good",
        "Moderate",
        "Needs improvement",
    ]),

    targetAudience: z.enum([
        "Clearly defined",
        "Moderately defined",
        "Needs improvement",
    ]),

    problemStatement: z.enum([
        "Good",
        "Moderate",
        "Needs improvement",
    ]),

    differentiation: z.enum([
        "Good",
        "Moderate",
        "Needs improvement",
    ]),

    suggestions: z
        .array(
            z.string().min(1).max(200)
        )
        .min(1)
        .max(5),
});