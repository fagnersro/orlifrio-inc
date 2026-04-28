import Link from 'next/link';

import { Card } from '@/components/ui/Card';
import { Divider } from '@/components/Divider';
import { stores } from './data';

function ContentPlaceholder() {
  return (
    <div className="relative h-full overflow-hidden rounded bg-gray-50 dark:bg-gray-800">
      <svg
        className="absolute inset-0 h-full w-full stroke-gray-200 dark:stroke-gray-700"
        fill="none"
      >
        <defs>
          <pattern
            id="pattern-2"
            x="0"
            y="0"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
          </pattern>
        </defs>
        <rect
          stroke="none"
          fill="url(#pattern-2)"
          width="100%"
          height="100%"
        ></rect>
      </svg>
    </div>
  );
}

export default function LojasPage() {
  return (
    <section aria-label="Lojas" className="px-4 py-6 sm:px-6">
      <>
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Most recent stores
          </h3>
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-900 dark:bg-gray-800 dark:text-gray-50">
            {stores.length}
          </span>
        </div>
        <Divider className="my-4" />
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((item) => (
            <Card
              key={item.slug}
              className="relative flex flex-col justify-between p-2"
            >
              <div className="relative h-28">
                <ContentPlaceholder />
                {/* <span className="absolute inset-x-0 bottom-0 left-4 flex size-12 translate-y-1/2 items-center justify-center rounded-md border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-800 dark:bg-[#090E1A]">
                  <item.icon
                    className="size-5 text-blue-500 dark:text-blue-500"
                    aria-hidden={true}
                  />
                </span> */}
              </div>
              <div className="flex flex-1 flex-col px-2 pb-2 pt-8">
                <div className="flex-1">
                  <dt className="truncate text-sm font-medium text-gray-900 dark:text-gray-50">
                    <Link
                      href={`/stores/${item.slug}`}
                      className="focus:outline-none"
                    >
                      {/* Extend link to entire card */}
                      <span className="absolute inset-0" aria-hidden={true} />
                      {item.name}
                    </Link>
                  </dt>
                  <dd className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </dd>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {item.lastEdited}
                  </span>
                  <span
                    className="inline-flex size-7 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    aria-hidden={true}
                  >
                    {item.authorInitials}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </dl>
      </>
    </section>
  );
}
