import { memo } from "react";
import PropTypes from "prop-types";
import { Card } from "@/shared/ui/Card";
import { EmptyState } from "@/shared/ui/EmptyState";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const PostListComponent = memo(({ userPosts }) => {
  if (!userPosts || userPosts.length === 0) {
    return <EmptyState icon={DocumentTextIcon} title="Este usuario aún no tiene publicaciones." />;
  }

  return (
    <section className="space-y-golden-md">
      <div className="flex items-center gap-3 px-2 mb-golden-base">
        <span className="w-1.5 h-8 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></span>
        <h3 className="text-golden-h3 font-black text-slate-900 dark:text-white tracking-tight">Publicaciones</h3>
      </div>
      
      <div className="grid gap-golden-base sm:grid-cols-2">
        {userPosts.map((post) => (
          <Card key={post.id} className="p-golden-base flex flex-col h-full group hover:-translate-y-1 transition-all">
            <h4 className="text-golden-p font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {post.title}
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-3 flex-1">
              {post.body}
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
               <span className="text-xs font-bold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:underline">
                Leer más →
              </span>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
});

PostListComponent.displayName = "PostList";

PostListComponent.propTypes = {
  userPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PostListComponent;
