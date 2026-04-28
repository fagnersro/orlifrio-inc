// 'use client';

import {
  RiAddCircleFill,
  RiCheckboxCircleFill,
  RiGitMergeFill,
  RiGitPullRequestFill,
} from '@remixicon/react';

import { cx } from '@/lib/utils';

import { BarChart } from '@/components/ui/BarChart';
import { Card } from '@/components/ui/Card';
import { CategoryBar } from '@/components/ui/CategoryBar';
import { Divider } from '@/components/Divider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';

const data = [
  {
    name: 'Open PRs',
    value: 4,
    icon: RiGitPullRequestFill,
    iconColor: 'text-indigo-500 dark:text-indigo-500',
  },
  {
    name: 'Merged PRs',
    value: 8,
    icon: RiGitMergeFill,
    iconColor: 'text-emerald-500 dark:text-emerald-500',
  },
  {
    name: 'Open Issues',
    value: 8,
    icon: RiAddCircleFill,
    iconColor: 'text-indigo-500 dark:text-indigo-500',
  },
  {
    name: 'Closed Issues',
    value: 92,
    icon: RiCheckboxCircleFill,
    iconColor: 'text-emerald-500 dark:text-emerald-500',
  },
];

const topContributors = [
  {
    username: 'Mbauchet',
    contributions: 7,
  },
  {
    username: 'Pizuronin',
    contributions: 4,
  },
  {
    username: 'Codetrendy',
    contributions: 3,
  },
  {
    username: 'Devsparkle',
    contributions: 3,
  },
  {
    username: 'Techphantom',
    contributions: 2,
  },
];

export default function Example2() {
  return (
    <>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
          December 27, 2023 – January 3, 2024
        </h3>
        <div>
          <Select>
            <SelectTrigger className="mt-4 sm:mt-0 sm:w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Last week</SelectItem>
              <SelectItem value="2">Last month</SelectItem>
              <SelectItem value="3">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Divider />
      <Card className="overflow-hidden p-0">
        <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 dark:border-gray-900 dark:bg-[#090E1A]">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Overview
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
          <div>
            <CategoryBar
              values={[4, 8]}
              colors={['indigo', 'emerald']}
              showLabels={false}
            />
            <p className="mt-2 text-sm text-gray-900 dark:text-gray-50">
              <span className="font-semibold">4</span> Active Pull Requests
            </p>
          </div>
          <div>
            <CategoryBar
              values={[8, 92]}
              colors={['indigo', 'emerald']}
              showLabels={false}
            />
            <p className="mt-2 text-sm text-gray-900 dark:text-gray-50">
              <span className="font-semibold">8</span> Active Issues
            </p>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-px border-t border-gray-200 bg-gray-200 dark:border-gray-900 dark:bg-gray-900 md:grid-cols-4">
          {data.map((item) => (
            <li
              key={item.name}
              className="flex flex-col items-center justify-center bg-white p-3 dark:bg-[#090E1A]"
            >
              <div className="flex items-center space-x-1">
                <item.icon
                  className={cx(item.iconColor, 'size-5')}
                  aria-hidden={true}
                />
                <span className="font-semibold text-gray-900 dark:text-gray-50">
                  {item.value}
                </span>
              </div>
              <span className="text-sm text-gray-900 dark:text-gray-50">
                {item.name}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
}
