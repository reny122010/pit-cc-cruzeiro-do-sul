import React, { useId } from 'react';
import { Link } from 'react-router-dom';

export interface Option {
  name: string;
  description?: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
}

interface LinkListProps {
  options: Option[];
}

export default function LinkList({ options }: LinkListProps) {
  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
      {options.map((item) => (
        <div
          key={useId()}
          className="group relative flex items-center gap-x-6 rounded-lg p-4 hover:bg-gray-50"
        >
          {item?.icon && (
            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
              <item.icon
                className="h-6 w-6 text-gray-600 group-hover:text-brand"
                aria-hidden="true"
              />
            </div>
          )}
          <div>
            <Link to={item.href} className="font-semibold text-gray-900">
              {item.name}
              <span className="absolute inset-0" />
            </Link>
            {item.description && (
              <p className="mt-1 text-gray-600">{item.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
