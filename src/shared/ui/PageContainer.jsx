import { cn } from "@/shared/lib/utils";
import PropTypes from 'prop-types';

export const PageContainer = ({ children, className }) => (
  <div className={cn("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
    {children}
  </div>
);

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
