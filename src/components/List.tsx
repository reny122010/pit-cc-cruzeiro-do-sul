import React from 'react';

interface ComponentProps {
  children: React.ReactNode;
}

export function List({ children }: ComponentProps) {
  return <ul>{children}</ul>;
}

export function Item({ children }: ComponentProps) {
  return (
    <li className="flex justify-between items-center py-3 border-b border-gray-200">
      {children}
    </li>
  );
}
