import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="w-full min-h-screen flex flex-col items-center justify-center gap-y-8">
      <h1 className="text-5xl font-bold text-center">
        Вітаємо у на адмін панелі ArtMarket!
      </h1>
      <p className="text-lg text-center text-gray-600">
        Будь ласка, увійдіть в систему для продовження роботи з панеллю
      </p>
      <Button asChild>
        <SignInButton>
          Увійти
        </SignInButton>
      </Button>
    </main>
  );
}
