import { cn } from "@/shared/lib/utils";
import PropTypes from 'prop-types';

export const EmptyState = ({ icon: Icon, title, description, className }) => (
  <div className={cn(
    "glass rounded-3xl p-12 text-center border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-4",
    className
  )}>
    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full">
      {Icon && <Icon className="w-12 h-12 text-slate-400 dark:text-slate-500" />}
    </div>
    <p className="text-slate-600 dark:text-slate-300 font-semibold text-golden-p">{title}</p>
    {description && <p className="text-sm text-slate-500">{description}</p>}
  </div>
);

EmptyState.propTypes = {
  icon: PropTypes.elementType,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
};
