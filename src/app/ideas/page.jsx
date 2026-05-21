import Link from "next/link";

export default async function AllIdeasPage() {
  let ideas = [];
  let isError = false;

  try {
    const response = await fetch("http://localhost:5000/ideas", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    ideas = await response.json();
  } catch (error) {
    console.error("Error loading ideas on server:", error);
    isError = true;
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-red-500 font-medium">
        Something went wrong while loading ideas from the server!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Startup Idea Vault
        </h1>
        <p className="mt-2 text-neutral-400">
          Explore and validate innovative concepts directly from the server.
        </p>
      </div>

      {ideas.length === 0 ? (
        <p className="text-center text-neutral-500">No ideas submitted yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ideas.map((idea) => (
            <div
              key={idea._id}
              className="flex flex-col justify-between rounded-xl border border-neutral-800 bg-neutral-900/40 p-6 backdrop-blur-sm transition-all hover:border-neutral-700"
            >
              <div>
                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  {idea.category || "General"}
                </span>

                <h3 className="mt-3 text-lg font-semibold text-white tracking-tight">
                  {idea.title}
                </h3>

                <p className="mt-2 text-sm text-neutral-400 line-clamp-4">
                  {idea.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/60 text-xs text-neutral-500">
                Submitted on:{" "}
                {idea.createdAt
                  ? new Date(idea.createdAt).toLocaleDateString()
                  : "N/A"}
                <Link
                  href={`/ideas/${idea._id}`}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
