import { Container } from "@/components/ui/Layout";

/** Shown instantly while a route segment streams in. Mirrors the page structure to avoid layout shift. */
export default function Loading() {
  return (
    <Container className="py-20" aria-busy="true">
      <p className="sr-only" role="status">
        Loading page…
      </p>
      <div className="skeleton mb-4 h-4 w-32" />
      <div className="skeleton mb-3 h-10 w-full max-w-xl" />
      <div className="skeleton mb-10 h-10 w-2/3 max-w-md" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton h-56" />
        ))}
      </div>
    </Container>
  );
}
