import React from "react";
import Link from "next/link";

interface BreadCrumbsProps {
  breadCrumbs: { name: string }[];
}

const BreadCrumbs = ({ breadCrumbs }: BreadCrumbsProps) => {
  return (
    <nav aria-label="breadcrumb" className="mb-4">
      <ol className="inline-flex flex-wrap text-gray-600 space-x-1 md:space-x-3 items-center">
        {breadCrumbs.map((breadCrumb, index) => (
          <li key={index} className="inline-flex items-center">
            {breadCrumb.name}
            {index < breadCrumbs.length - 1 && <span className="mx-1">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;
