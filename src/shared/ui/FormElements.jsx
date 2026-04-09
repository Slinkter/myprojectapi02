import { cn } from "@/shared/lib/utils";
import PropTypes from 'prop-types';

export const Spinner = ({ className }) => (
  <div className={cn("w-8 h-8 border-4 border-slate-300 dark:border-slate-600 border-t-blue-600 rounded-full animate-spin", className)} />
);

Spinner.propTypes = { className: PropTypes.string };

export const Input = ({ hasError, className, ...props }) => (
  <input
    {...props}
    className={cn(
      "w-full min-h-[48px] px-golden-base py-golden-sm bg-white/90 dark:bg-slate-800/90 border-2 rounded-xl transition-all text-slate-800 dark:text-slate-100 placeholder:text-slate-500 font-medium outline-none text-golden-p",
      hasError 
        ? "border-red-500 focus:ring-red-500/20" 
        : "border-slate-300 dark:border-slate-600 focus:border-blue-600 dark:focus:border-blue-400",
      className
    )}
  />
);

Input.propTypes = { hasError: PropTypes.bool, className: PropTypes.string };

export const Button = ({ isLoading, children, className, ...props }) => (
  <button
    {...props}
    className={cn(
      "w-full sm:w-auto min-h-[48px] px-8 py-golden-sm bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      className
    )}
  >
    {isLoading ? (
      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
    ) : children}
  </button>
);

Button.propTypes = { isLoading: PropTypes.bool, children: PropTypes.node, className: PropTypes.string };
