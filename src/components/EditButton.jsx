"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditButton({ idea }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description");

    const updatedIdea = { title, category, description };

    try {
      const response = await fetch(`http://localhost:5000/ideas/${idea._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedIdea),
      });

      const data = await response.json();

      if (data.modifiedCount > 0 || data.matchedCount > 0) {
        alert("Idea updated successfully!");
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to update idea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-neutral-800 px-4 py-2 text-xs font-semibold text-white hover:bg-neutral-700 transition-all"
      >
        Edit Idea
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-4">
              Edit Your Idea
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
                  Idea Title
                </label>
                <input
                  name="title"
                  type="text"
                  defaultValue={idea.title}
                  required
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
                  Category
                </label>
                <input
                  name="category"
                  type="text"
                  defaultValue={idea.category}
                  required
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-white outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={idea.description}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2 text-sm text-white outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-500 disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 rounded-lg bg-neutral-800 py-2 text-sm font-semibold text-white hover:bg-neutral-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
