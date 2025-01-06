import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-center">
        Welcome to your new app!
      </h1>
      <p className="text-lg text-center text-gray-600">
        Get started by signing in.
      </p>
      <Button asChild>
        <SignInButton />
      </Button>
    </main>
  );
}
