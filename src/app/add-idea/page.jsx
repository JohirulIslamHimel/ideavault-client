"use client";
import { useState } from "react";

export default function AddIdea() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const category = formData.get("category");
    const description = formData.get("description");

    const newIdea = { title, category, description, createdAt: new Date() };

    try {
      const response = await fetch("http://localhost:5000/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newIdea),
      });

      const data = await response.json();

      if (data.insertedId) {
        alert("Idea successfully saved to database!");
        e.target.reset();
      }
    } catch (error) {
      console.error(error);
      alert("Is the backend server down? Can't connect!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900/50 p-8 backdrop-blur-md shadow-2xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Add New Idea
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Share your startup concept with the vault.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Idea Title */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
              Idea Title
            </label>
            <input
              name="title"
              type="text"
              placeholder="e.g., AI-powered SQA Assistant"
              required
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
              Category
            </label>
            <input
              name="category"
              type="text"
              placeholder="e.g., SaaS / FinTech"
              required
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-neutral-300 uppercase tracking-wider">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Describe the core concept and features..."
              required
              rows={4}
              className="w-full rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm text-white placeholder-neutral-600 outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-blue-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Saving to Vault...
              </span>
            ) : (
              "Save Idea"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
