import { memo } from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import PropTypes from 'prop-types';
import { useTranslation } from "@/hooks/useTranslation";

/**
 * Ítem individual de la lista de publicaciones.
 * Optimizado con memo para evitar re-renders.
 */
const PostItem = memo(({ post }) => (
  <article 
    className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
  >
    <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors capitalize">
      {post.title}
    </h4>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed transition-colors">
      {post.body}
    </p>
  </article>
));

PostItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
};

PostItem.displayName = "PostItem";

/**
 * Lista de Posts optimizada.
 * @component
 */
function PostList({ posts }) {
  const { t } = useTranslation();
  if (!posts || posts.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="flex items-center gap-3 mb-8">
        <DocumentTextIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white transition-colors">
          {t('posts_title')}
        </h3>
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-full text-sm font-bold transition-colors">
          {posts.length}
        </span>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
    })
  ).isRequired,
};

export default memo(PostList);
