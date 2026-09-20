"use client";

import { Container } from "@/components/ui/Layout";
import { Button } from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="mx-auto mt-3 max-w-md text-muted">
        We couldn&apos;t load this page. Please try again, or contact the clinic directly.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button href="/contact" variant="secondary">
          Contact us
        </Button>
      </div>
    </Container>
  );
}
