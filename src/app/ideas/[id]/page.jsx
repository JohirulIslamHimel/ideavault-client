import Link from "next/link";
import EditButton from "@/components/EditButton";

export default async function IdeaDetailsPage({ params }) {
  const { id } = await params;
  let idea = null;
  let isError = false;

  try {
    const response = await fetch(`http://localhost:5000/ideas/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch idea details");
    }

    idea = await response.json();
  } catch (error) {
    console.error("Error loading single idea:", error);
    isError = true;
  }

  if (isError || !idea) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-red-500 font-medium">
        Idea not found or something went wrong!
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center p-4">
      <div className="w-full max-w-2xl rounded-xl border border-neutral-800 bg-neutral-900/30 p-8 backdrop-blur-md shadow-2xl">
        <div className="border-b border-neutral-800 pb-4 mb-6 flex justify-between items-start">
          <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
            {idea.category || "General"}
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight mt-3">
            {idea.title}
          </h1>
          <p className="text-xs text-neutral-500 mt-2">
            Submitted on:{" "}
            {idea.createdAt ? new Date(idea.createdAt).toLocaleString() : "N/A"}
          </p>
          <EditButton idea={idea} />
        </div>

        <div className="space-y-4 text-neutral-300">
          <h3 className="text-sm font-semibold text-neutral-400 uppercase tracking-wider">
            Concept Overview
          </h3>
          <p className="text-base leading-relaxed whitespace-pre-wrap">
            {idea.description}
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800/60">
          <Link
            href="/ideas"
            className="inline-flex items-center text-sm font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            &larr; Back to Vault
          </Link>
        </div>
      </div>
    </div>
  );
}
