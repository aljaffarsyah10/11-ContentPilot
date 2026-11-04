import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center bg-background text-foreground">
      <div className="max-w-md space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">ContentPilot</h1>
        <p className="text-muted-foreground text-sm">
          Social Media Content Planning SaaS. Project bootstrapped successfully.
        </p>
        <div className="pt-2">
          <Button variant="default">Phase 1 Ready</Button>
        </div>
      </div>
    </main>
  );
}
