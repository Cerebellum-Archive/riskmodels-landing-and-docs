import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
      <FileQuestion className="h-24 w-24 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold tracking-tight mb-2">Page not found</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <Button asChild size="lg">
        <Link href="/">
          Return Home
        </Link>
      </Button>
    </div>
  );
}