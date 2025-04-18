"use client";

import { useState } from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";

interface DescriptionSpecsToggleProps {
  description: PortableTextBlock[];
  specs: Record<string, string>;
}

export default function DescriptionSpecsToggle({
  description,
  specs,
}: DescriptionSpecsToggleProps) {
  const [active, setActive] = useState<"description" | "specs">("description");

  const portableTextComponents: PortableTextComponents = {
    types: {},
    block: {
      h2: ({ children }) => (
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-medium text-gray-700 mt-3">{children}</h3>
      ),
      normal: ({ children }) => (
        <p className="text-base text-gray-700 leading-relaxed">{children}</p>
      ),
    },
  };

  return (
    <div className="mt-8 border-t border-gray-200 bg-white shadow-lg rounded-xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["description", "specs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab as "description" | "specs")}
            className={`px-6 py-3 font-medium ${
              active === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "description" ? "Description" : "Specifications"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8">
        {active === "description" ? (
          description && description.length > 0 ? (
            <div className="prose prose-lg max-w-none">
              <PortableText value={description} components={portableTextComponents} />
            </div>
          ) : (
            <p className="text-center text-gray-500 italic">
              No description available.
            </p>
          )
        ) : (
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            {Object.entries(specs).map(([label, value]) => (
              <div key={label} className="flex">
                <dt className="w-32 text-sm font-medium text-gray-500">
                  {label}
                </dt>
                <dd className="text-sm text-gray-900 font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
