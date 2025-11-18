export default function ArticleCard({ article }) {
  return (
    <article className="rounded-xl border border-emerald-100 bg-white/70 backdrop-blur p-4 hover:shadow-lg transition">
      {article.cover_image && (
        <div className="aspect-[16/9] w-full rounded-lg overflow-hidden bg-emerald-50">
          <img src={article.cover_image+"&auto=format&fit=crop&w=900&q=60"} alt={article.title} className="w-full h-full object-cover" />
        </div>
      )}
      <h3 className="mt-3 font-semibold text-emerald-800">{article.title}</h3>
      {article.summary && <p className="text-sm text-emerald-700/70">{article.summary}</p>}
      {article.tags?.length ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {article.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 text-xs rounded-full bg-emerald-100 text-emerald-700">#{t}</span>
          ))}
        </div>
      ) : null}
    </article>
  )
}
