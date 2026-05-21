"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteButton({ id }) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this idea?")) return;

    setDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/ideas/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.deletedCount > 0) {
        alert("Idea successfully deleted!");

        router.refresh();
      }
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete idea.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-xs font-semibold text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
    >
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
