import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center gap-y-2">
      <h1 className="text-5xl font-bold text-center">
        Вітаємо у адмін панелі магазину!
      </h1>
      <p className="text-lg text-center text-gray-600">
        Для початку роботи увійдіть у свій акаунт
      </p>
      <div className="mt-16">
        <Button asChild>
          <SignInButton>Увійти</SignInButton>
        </Button>
      </div>
    </main>
  );
}
