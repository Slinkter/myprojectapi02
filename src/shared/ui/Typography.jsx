import { cn } from "@/shared/lib/utils";
import PropTypes from 'prop-types';

export const Label = ({ children, className }) => (
  <p className={cn("text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-0.5", className)}>
    {children}
  </p>
);

export const PrimaryText = ({ children, className }) => (
  <p className={cn("text-slate-900 dark:text-white font-bold break-words leading-relaxed text-golden-p", className)}>
    {children}
  </p>
);

export const SecondaryText = ({ children, className }) => (
  <p className={cn("text-sm text-slate-600 dark:text-slate-300 italic mt-0.5 leading-tight break-words", className)}>
    {children}
  </p>
);

Label.propTypes = { children: PropTypes.node, className: PropTypes.string };
PrimaryText.propTypes = { children: PropTypes.node, className: PropTypes.string };
SecondaryText.propTypes = { children: PropTypes.node, className: PropTypes.string };
