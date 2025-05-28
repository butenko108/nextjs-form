import AssignmentFormContainer from "features/assignment/AssignmentFormContainer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-lg mx-auto px-4">
        <div className="bg-white rounded-lg p-6 shadow">
          <h1 className="text-xl font-semibold mb-6">Assignment Submission</h1>
            <AssignmentFormContainer />
        </div>
      </div>
    </main>
  );
}
