import { Link } from "react-router-dom";
import { Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type Recipe = Database["public"]["Tables"]["recipes"]["Row"];

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-md">
        <div className="aspect-[4/3] w-full bg-secondary">
          {recipe.image_url ? (
            <img
              src={recipe.image_url}
              alt={recipe.title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-4xl">🍲</div>
          )}
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="line-clamp-1 text-lg">{recipe.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {recipe.description || "A tasty recipe from the community."}
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            {recipe.minutes ? (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {recipe.minutes} min
              </span>
            ) : null}
            {recipe.servings ? (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> {recipe.servings} servings
              </span>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
