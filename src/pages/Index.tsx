import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { RecipeCard } from "@/components/RecipeCard";
import { Skeleton } from "@/components/ui/skeleton";

const fetchRecipes = async () => {
  const { data, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(48);
  if (error) throw error;
  return data;
};

const Index = () => {
  const { data: recipes, isLoading } = useQuery({ queryKey: ["recipes"], queryFn: fetchRecipes });

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="border-b bg-secondary/40">
        <div className="container py-16 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Cook something you found here.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Recipe Circle is a small community sharing the meals they actually make at home.
          </p>
        </div>
      </section>

      <main className="container py-10">
        <h2 className="mb-6 text-2xl font-semibold">Latest recipes</h2>
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-lg" />
            ))}
          </div>
        ) : recipes?.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recipes.map((r) => (
              <RecipeCard key={r.id} recipe={r} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No recipes yet. Be the first to share one!</p>
        )}
      </main>
    </div>
  );
};

export default Index;
