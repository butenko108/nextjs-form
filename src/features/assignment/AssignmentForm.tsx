"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import FormTextarea from "./FormTextarea";
import { type AssignmentFormSchema, formSchema } from "./schemas";

export default function AssignmentForm({ levels }: Levels) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<AssignmentFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      assignment_description: "",
      github_repo_url: "",
      candidate_level: "",
    },
  });

  const onSubmit: SubmitHandler<AssignmentFormSchema> = async (data) => {
    setSubmitError(null);

    try {
      const response = await fetch(
        "https://tools.qa.ale.ai/api/tools/candidates/assignments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorData: ApiErrorResponse = await response.json();

        if (errorData.errors && errorData.errors.length > 0) {
          setSubmitError(errorData.errors.join(", "));
        } else {
          setSubmitError(errorData.message || "Submission failed");
        }
        return;
      }

      const params = new URLSearchParams({
        name: data.name,
        email: data.email,
        candidate_level: data.candidate_level,
      });

      router.push(`/thank-you?${params.toString()}`);
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Network error. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {submitError && (
        <div className="p-3 bg-red-100 border border-red-300 rounded">
          <p className="text-red-700 text-sm">{submitError}</p>
        </div>
      )}

      <FormInput
        id="name"
        label="Name"
        required
        error={errors.name?.message}
        {...register("name")}
      />

      <FormInput
        id="email"
        label="Email"
        type="email"
        required
        error={errors.email?.message}
        {...register("email")}
      />

      <FormTextarea
        id="assignment_description"
        label="Assignment Description"
        required
        error={errors.assignment_description?.message}
        {...register("assignment_description")}
      />

      <FormInput
        id="github_repo_url"
        label="GitHub Repository URL"
        type="url"
        placeholder="https://github.com/username/repository"
        required
        error={errors.github_repo_url?.message}
        {...register("github_repo_url")}
      />

      <FormSelect
        id="candidate_level"
        label="Candidate Level"
        required
        error={errors.candidate_level?.message}
        options={levels.map((level) => ({ value: level, label: level }))}
        placeholder="Select a level"
        {...register("candidate_level")}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded disabled:bg-blue-400"
      >
        {isSubmitting ? "Submitting..." : "Submit Assignment"}
      </button>
    </form>
  );
}
