import { cx } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cx(
        "rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: CardProps) {
  return (
    <div className={cx("mb-4 flex items-center justify-between", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: CardProps) {
  return (
    <p className={cx("text-sm font-medium text-gray-500 dark:text-gray-400", className)} {...props}>
      {children}
    </p>
  );
}

export function CardValue({ className, children, ...props }: CardProps) {
  return (
    <p className={cx("mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-50", className)} {...props}>
      {children}
    </p>
  );
}
