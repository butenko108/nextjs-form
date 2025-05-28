import { z } from "zod";

const githubRepoUrlPattern = /^https:\/\/github\.com\/[^/]+\/[^/]+$/;

export const formSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
      invalid_type_error: "Name must be a string.",
    })
    .min(1, { message: "Name is required." }),

  email: z
    .string({
      required_error: "Email is required.",
    })
    .min(1, { message: "Email is required." })
    .email({ message: "Email must be a valid email address." }),

  assignment_description: z
    .string({
      required_error: "Assignment description is required.",
      invalid_type_error: "Assignment description must be a string.",
    })
    .min(10, {
      message: "Assignment description must be at least 10 characters.",
    }),

  github_repo_url: z
    .string({
      required_error: "GitHub repository URL is required.",
    })
    .min(1, { message: "GitHub repository URL is required." })
    .regex(
      githubRepoUrlPattern,
      "GitHub repository URL must be in the format https://github.com/username/repository",
    ),

  candidate_level: z
    .string()
    .min(1, "Candidate level is required.")
    .refine(
      (val) => ["Junior", "Middle", "Senior", "Principal"].includes(val),
      {
        message:
          "Candidate level must be one of Junior, Middle, Senior or Principal.",
      },
    ),
});

export type AssignmentFormSchema = z.infer<typeof formSchema>;
