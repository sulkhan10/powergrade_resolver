"use client";

import { useState, useEffect } from "react";

const EDITABLE_SECTIONS = [
  { key: "hero", title: "Hero Section", description: "Main hero content" },
  { key: "about", title: "About Section", description: "About page content" },
  { key: "footer", title: "Footer", description: "Footer information" },
];

export default function ContentPage() {
  const [selectedSection, setSelectedSection] = useState("hero");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchContent(selectedSection);
  }, [selectedSection]);

  const fetchContent = async (section: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/content/${section}`);
      const result = await response.json();

      if (result.success && result.data) {
        // Parse JSON content if it's a string
        const contentData =
          typeof result.data.content_data === "string"
            ? result.data.content_data
            : JSON.stringify(result.data.content_data, null, 2);
        setContent(contentData);
      } else {
        setContent("");
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(`/api/content/${selectedSection}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content_data: content }),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Content saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setMessage(result.error || "Failed to save content");
      }
    } catch (error) {
      setMessage("Error saving content");
      console.error(error);
    }

    setSaving(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-accent mb-2">Site Content</h1>
        <p className="text-accent/60">Edit page sections and content</p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Section Selector */}
        <div className="bg-card border border-accent/10 rounded-lg p-6 h-fit">
          <h3 className="font-semibold text-accent mb-4">Sections</h3>
          <div className="space-y-2">
            {EDITABLE_SECTIONS.map((section) => (
              <button
                key={section.key}
                onClick={() => setSelectedSection(section.key)}
                className={`w-full text-left px-4 py-2 rounded transition ${
                  selectedSection === section.key
                    ? "bg-accent text-background"
                    : "text-accent hover:bg-accent/10"
                }`}
              >
                {section.title}
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className="col-span-3">
          <div className="bg-card border border-accent/10 rounded-lg p-8">
            {message && (
              <div
                className={`mb-6 px-4 py-3 rounded text-sm ${
                  message.includes("success")
                    ? "bg-green-500/10 border border-green-500/20 text-green-500"
                    : "bg-red-500/10 border border-red-500/20 text-red-500"
                }`}
              >
                {message}
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-accent mb-2">
                {EDITABLE_SECTIONS.find((s) => s.key === selectedSection)
                  ?.title}
              </h2>
              <p className="text-accent/60 text-sm">
                {EDITABLE_SECTIONS.find((s) => s.key === selectedSection)
                  ?.description}
              </p>
            </div>

            {loading ? (
              <p className="text-accent/60">Loading...</p>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-accent mb-2">
                    Content (JSON format)
                  </label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={15}
                    className="w-full px-4 py-2 rounded border border-accent/20 bg-background text-accent focus:outline-none focus:border-accent/50 font-mono text-sm"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-accent text-background rounded font-semibold hover:opacity-90 disabled:opacity-50 transition"
                  >
                    {saving ? "Saving..." : "Save Content"}
                  </button>
                </div>
              </div>
            )}

            <div className="mt-8 p-4 bg-accent/5 rounded text-sm text-accent/70">
              <p className="font-semibold mb-2">Tips:</p>
              <ul className="space-y-1">
                <li>• Store content as JSON for structured data</li>
                <li>• Use valid JSON syntax</li>
                <li>• Content updates are saved to the database</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
