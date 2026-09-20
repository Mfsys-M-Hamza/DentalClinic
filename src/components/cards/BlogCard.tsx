import Link from "next/link";
import { Clock } from "lucide-react";
import { formatPostDate, type BlogPost } from "@/data/blog";
import { Photo } from "@/components/ui/Photo";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-brand-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift">
      <Photo
        src={post.image}
        alt={`Illustration for the article “${post.title}”`}
        ratio="aspect-[3/2]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        zoom
      />
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold tracking-wider text-brand uppercase">{post.category}</p>
        <h3 className="mt-2 font-serif text-xl leading-snug font-semibold">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-offset-4">
            {post.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.excerpt}</p>
        <p className="mt-4 flex items-center gap-3 text-xs text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden="true" />
            {post.readTime}
          </span>
        </p>
      </div>
    </article>
  );
}
