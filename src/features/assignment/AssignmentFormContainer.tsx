import AssignmentForm from "./AssignmentForm";

export default async function AssignmentFormContainer() {
  try {
    const res = await fetch(
      "https://tools.qa.ale.ai/api/tools/candidates/levels",
      {
        next: { revalidate: 0 },
      },
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch levels: ${res.status}`);
    }

    const data: Levels = await res.json();

    return <AssignmentForm levels={data.levels} />;
  } catch (error) {
    console.error("Error loading candidate levels:", error);
    return (
      <div className="p-4 bg-red-100 border border-red-300 rounded">
        <p className="text-red-700">
          Error loading candidate levels. Please try again later.
        </p>
      </div>
    );
  }
}
