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
        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-medium text-gray-700 mt-5 mb-3">{children}</h3>
      ),
      normal: ({ children }) => (
        <p className="text-base text-gray-700 leading-relaxed mb-4">{children}</p>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }) => (
        <em className="italic">{children}</em>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-5 mb-4 space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-5 mb-4 space-y-2">{children}</ol>
      ),
    },
  };

  return (
    <div className="mt-8 border border-gray-200 bg-white shadow-md rounded-xl overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["description", "specs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab as "description" | "specs")}
            className={`flex-1 px-4 py-4 font-medium text-center transition-colors duration-200 md:px-6 ${
              active === tab
                ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            }`}
            aria-selected={active === tab}
          >
            {tab === "description" ? "Description" : "Specifications"}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 lg:p-8">
        {active === "description" ? (
          description && description.length > 0 ? (
            <div className="prose prose-lg max-w-none">
              <PortableText value={description} components={portableTextComponents} />
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <p className="text-center text-gray-500 italic">
                No description available.
              </p>
            </div>
          )
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                    Property
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/3">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.entries(specs).map(([label, value], index) => (
                  <tr key={label} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {label}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {value}
                    </td>
                  </tr>
                ))}
                {Object.keys(specs).length === 0 && (
                  <tr>
                    <td colSpan={2} className="px-4 py-8 text-center text-gray-500 italic">
                      No specifications available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}