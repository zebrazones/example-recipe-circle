import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Clock, Users, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { Skeleton } from "@/components/ui/skeleton";

const RecipeDetail = () => {
  const { id } = useParams<{ id: string }>();

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select("*, profiles(username, display_name)")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container max-w-3xl py-10">
        <Link to="/" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to recipes
        </Link>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-24 w-full" />
          </div>
        ) : !recipe ? (
          <p className="text-muted-foreground">This recipe could not be found.</p>
        ) : (
          <article className="space-y-6">
            {recipe.image_url && (
              <img src={recipe.image_url} alt={recipe.title} className="aspect-video w-full rounded-lg object-cover" />
            )}
            <header>
              <h1 className="text-3xl font-bold">{recipe.title}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                by {(recipe as any).profiles?.display_name ?? "a member"}
              </p>
              <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                {recipe.minutes ? (
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {recipe.minutes} min
                  </span>
                ) : null}
                {recipe.servings ? (
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {recipe.servings} servings
                  </span>
                ) : null}
              </div>
            </header>

            {recipe.description && <p className="text-lg">{recipe.description}</p>}

            <section>
              <h2 className="mb-2 text-xl font-semibold">Ingredients</h2>
              <p className="whitespace-pre-line text-muted-foreground">{recipe.ingredients}</p>
            </section>
            <section>
              <h2 className="mb-2 text-xl font-semibold">Steps</h2>
              <p className="whitespace-pre-line text-muted-foreground">{recipe.steps}</p>
            </section>
          </article>
        )}
      </main>
    </div>
  );
};

export default RecipeDetail;
