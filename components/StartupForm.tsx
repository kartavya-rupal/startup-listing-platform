"use client";

import React, {
    useActionState,
    useRef,
    useState,
} from "react";

import { Input } from "./ui/input";

import { Textarea } from "./ui/textarea";

import MDEditor from "@uiw/react-md-editor";

import { Button } from "./ui/button";

import {
    Loader2,
    Send,
    Sparkles,
} from "lucide-react";

import {
    formSchema,
    startupAnalysisSchema,
} from "@/lib/validation";

import { z } from "zod";

import { useToast } from "@/hooks/use-toast";

import {
    analyzeStartup,
    createIdea,
} from "@/lib/actions";

import { useRouter } from "next/navigation";


type StartupAnalysis = z.infer<
    typeof startupAnalysisSchema
>;


const StartupForm = () => {
    const [errors, setErrors] =
        useState<Record<string, string>>({});

    const [pitch, setPitch] =
        useState("");

    const [analysis, setAnalysis] =
        useState<StartupAnalysis | null>(null);

    const [analysisLoading, setAnalysisLoading] =
        useState(false);

    const formRef =
        useRef<HTMLFormElement>(null);

    const { toast } = useToast();

    const router = useRouter();


    /*
    |--------------------------------------------------------------------------
    | Existing form submission
    |--------------------------------------------------------------------------
    */

    const handleFormSubmit = async (
        prevState: any,
        formData: FormData
    ) => {
        try {
            const formValues = {
                title:
                    formData.get("title") as string,

                description:
                    formData.get(
                        "description"
                    ) as string,

                category:
                    formData.get(
                        "category"
                    ) as string,

                link:
                    formData.get(
                        "link"
                    ) as string,

                pitch,
            };

            await formSchema.parseAsync(
                formValues
            );

            const result =
                await createIdea(
                    prevState,
                    formData,
                    pitch
                );

            if (
                result.status ===
                "SUCCESS"
            ) {
                toast({
                    title: "Success",
                    description:
                        "Idea created successfully",
                });

                router.push(
                    `/startup/${result._id}`
                );
            }

            return result;
        } catch (error: any) {
            if (
                error instanceof z.ZodError
            ) {
                const fieldErrors =
                    error.flatten()
                        .fieldErrors;

                setErrors(
                    fieldErrors as unknown as Record<
                        string,
                        string
                    >
                );

                toast({
                    title: "Error",
                    description:
                        error.message,
                    variant:
                        "destructive",
                });

                return {
                    ...prevState,
                    error: error.message,
                };
            }

            toast({
                title: "Error",
                description:
                    "Invalid URL. Use URL containing .webp, .jpg, .png, etc...",
                variant:
                    "destructive",
            });

            return {
                ...prevState,
                error: error.message,
            };
        }
    };


    const [
        state,
        formAction,
        isPending,
    ] = useActionState(
        handleFormSubmit,
        {
            error: "",
            status: "INITIAL",
        }
    );


    /*
    |--------------------------------------------------------------------------
    | AI Startup Analysis
    |--------------------------------------------------------------------------
    */

    const handleAnalyzeWithAI =
        async () => {
            if (!formRef.current) {
                return;
            }

            const formData =
                new FormData(
                    formRef.current
                );

            const title =
                (
                    formData.get(
                        "title"
                    ) as string
                )?.trim() || "";

            const description =
                (
                    formData.get(
                        "description"
                    ) as string
                )?.trim() || "";

            const category =
                (
                    formData.get(
                        "category"
                    ) as string
                )?.trim() || "";


            if (!description) {
                toast({
                    title:
                        "Description required",
                    description:
                        "Write a startup description before using AI.",
                    variant:
                        "destructive",
                });

                return;
            }


            if (
                description.length < 20
            ) {
                toast({
                    title:
                        "Description too short",
                    description:
                        "Write at least 20 characters before analyzing.",
                    variant:
                        "destructive",
                });

                return;
            }


            try {
                setAnalysisLoading(
                    true
                );

                setAnalysis(null);


                const result =
                    await analyzeStartup({
                        title,
                        description,
                        category,
                    });


                setAnalysis(result);


                toast({
                    title:
                        "Analysis complete",
                    description:
                        "AI feedback is ready for review.",
                });
            } catch (error: any) {
                console.error(
                    "Startup AI analysis failed:",
                    error
                );

                toast({
                    title:
                        "AI analysis failed",
                    description:
                        error?.message ||
                        "Something went wrong while analyzing the startup.",
                    variant:
                        "destructive",
                });
            } finally {
                setAnalysisLoading(
                    false
                );
            }
        };


    /*
    |--------------------------------------------------------------------------
    | Analysis label styling
    |--------------------------------------------------------------------------
    */

    const getAnalysisClass =
        (value: string) => {
            if (
                value ===
                "Good" ||
                value ===
                "Clearly defined"
            ) {
                return "bg-green-100 text-green-700 border-green-200";
            }

            if (
                value ===
                "Moderate" ||
                value ===
                "Moderately defined"
            ) {
                return "bg-yellow-100 text-yellow-700 border-yellow-200";
            }

            return "bg-red-100 text-red-700 border-red-200";
        };


    return (
        <form
            ref={formRef}
            action={formAction}
            className="startup-form"
        >

            {/* ==========================================================
                TITLE
            ========================================================== */}

            <div>
                <label
                    htmlFor="title"
                    className="startup-form_label"
                >
                    Title
                </label>

                <Input
                    id="title"
                    name="title"
                    className="startup-form_input"
                    required
                    placeholder="Startup Title"
                />

                {errors.title && (
                    <p className="startup-form_error">
                        {errors.title}
                    </p>
                )}
            </div>


            {/* ==========================================================
                DESCRIPTION
            ========================================================== */}

            <div>
                <div className="flex items-center justify-between gap-4">
                    <label
                        htmlFor="description"
                        className="startup-form_label"
                    >
                        Description
                    </label>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={
                            handleAnalyzeWithAI
                        }
                        disabled={
                            analysisLoading ||
                            isPending
                        }
                        className="shrink-0 cursor-pointer"
                    >
                        {analysisLoading ? (
                            <>
                                <Loader2 className="size-4 mr-2 animate-spin" />

                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="size-4 mr-2" />

                                Analyze with AI
                            </>
                        )}
                    </Button>
                </div>


                <Textarea
                    id="description"
                    name="description"
                    className="startup-form_textarea"
                    required
                    placeholder="Startup Description"
                />


                {errors.description && (
                    <p className="startup-form_error">
                        {errors.description}
                    </p>
                )}


                {/* ======================================================
                    AI ANALYSIS RESULT
                ====================================================== */}

                {analysis && (
                    <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-5">

                        <div className="flex items-center gap-2">
                            <Sparkles className="size-5 text-primary" />

                            <div>
                                <h3 className="font-semibold">
                                    AI Startup Analysis
                                </h3>

                                <p className="text-sm text-muted-foreground">
                                    Review these insights and
                                    refine your startup description
                                    if needed.
                                </p>
                            </div>
                        </div>


                        {/* ===========================
                            EVALUATION
                        =========================== */}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            <div className="rounded-xl border bg-background p-4">
                                <p className="text-sm font-medium mb-2">
                                    Clarity
                                </p>

                                <span
                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getAnalysisClass(
                                        analysis.clarity
                                    )}`}
                                >
                                    {analysis.clarity}
                                </span>
                            </div>


                            <div className="rounded-xl border bg-background p-4">
                                <p className="text-sm font-medium mb-2">
                                    Target audience
                                </p>

                                <span
                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getAnalysisClass(
                                        analysis.targetAudience
                                    )}`}
                                >
                                    {
                                        analysis.targetAudience
                                    }
                                </span>
                            </div>


                            <div className="rounded-xl border bg-background p-4">
                                <p className="text-sm font-medium mb-2">
                                    Problem statement
                                </p>

                                <span
                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getAnalysisClass(
                                        analysis.problemStatement
                                    )}`}
                                >
                                    {
                                        analysis.problemStatement
                                    }
                                </span>
                            </div>


                            <div className="rounded-xl border bg-background p-4">
                                <p className="text-sm font-medium mb-2">
                                    Differentiation
                                </p>

                                <span
                                    className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${getAnalysisClass(
                                        analysis.differentiation
                                    )}`}
                                >
                                    {
                                        analysis.differentiation
                                    }
                                </span>
                            </div>

                        </div>


                        {/* ===========================
                            SUGGESTIONS
                        =========================== */}

                        <div className="rounded-xl border bg-background p-4">

                            <h4 className="font-semibold mb-3">
                                Suggestions
                            </h4>

                            <div className="space-y-3">

                                {analysis.suggestions.map(
                                    (
                                        suggestion,
                                        index
                                    ) => (
                                        <div
                                            key={index}
                                            className="flex gap-3"
                                        >
                                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                                                {index + 1}
                                            </span>

                                            <p className="text-sm leading-6 text-muted-foreground">
                                                {
                                                    suggestion
                                                }
                                            </p>
                                        </div>
                                    )
                                )}

                            </div>

                        </div>


                        <p className="text-xs text-muted-foreground border-t pt-4">
                            AI feedback is advisory. Review the
                            suggestions and make any changes you
                            consider appropriate before submitting
                            your startup.
                        </p>

                    </div>
                )}
            </div>


            {/* ==========================================================
                CATEGORY
            ========================================================== */}

            <div>
                <label
                    htmlFor="category"
                    className="startup-form_label"
                >
                    Category
                </label>

                <Input
                    id="category"
                    name="category"
                    className="startup-form_input"
                    required
                    placeholder="Startup Category (Tech, Health, Education...)"
                />

                {errors.category && (
                    <p className="startup-form_error">
                        {errors.category}
                    </p>
                )}
            </div>


            {/* ==========================================================
                IMAGE URL
            ========================================================== */}

            <div>
                <label
                    htmlFor="link"
                    className="startup-form_label"
                >
                    Image URL
                </label>

                <Input
                    id="link"
                    name="link"
                    className="startup-form_input"
                    required
                    placeholder="Startup Image URL"
                />

                {errors.link && (
                    <p className="startup-form_error">
                        {errors.link}
                    </p>
                )}
            </div>


            {/* ==========================================================
                PITCH
            ========================================================== */}

            <div data-color-mode="light">

                <label
                    htmlFor="pitch"
                    className="startup-form_label"
                >
                    Pitch
                </label>

                <MDEditor
                    value={pitch}
                    onChange={(value) =>
                        setPitch(value as string)
                    }
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{
                        borderRadius: 20,
                        overflow: "hidden",
                    }}
                    textareaProps={{
                        placeholder:
                            "Briefly describe your idea and what problem it solves",
                    }}
                    previewOptions={{
                        disallowedElements: [
                            "style",
                        ],
                    }}
                />

                {errors.pitch && (
                    <p className="startup-form_error">
                        {errors.pitch}
                    </p>
                )}

            </div>


            {/* ==========================================================
                SUBMIT
            ========================================================== */}

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={
                    isPending ||
                    analysisLoading
                }
            >
                {isPending ? (
                    <>
                        <Loader2 className="size-5 mr-2 animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        Submit
                        <Send className="size-6 ml-1" />
                    </>
                )}
            </Button>

        </form>
    );
};

export default StartupForm;