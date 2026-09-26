import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NewRecipe = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [form, setForm] = useState({
    title: "",
    description: "",
    ingredients: "",
    steps: "",
    minutes: "",
    servings: "",
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setBusy(true);
    try {
      // user_id is set to the current user; RLS also enforces this server-side.
      const { data, error } = await supabase
        .from("recipes")
        .insert({
          user_id: user.id,
          title: form.title,
          description: form.description || null,
          ingredients: form.ingredients,
          steps: form.steps,
          minutes: form.minutes ? Number(form.minutes) : null,
          servings: form.servings ? Number(form.servings) : null,
        })
        .select()
        .single();
      if (error) throw error;
      toast.success("Recipe shared!");
      navigate(`/recipe/${data.id}`);
    } catch (err: any) {
      toast.error(err.message ?? "Could not save recipe");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container max-w-2xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Share a recipe</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" value={form.title} onChange={set("title")} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Short description</Label>
                <Input id="description" value={form.description} onChange={set("description")} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minutes">Minutes</Label>
                  <Input id="minutes" type="number" min={0} value={form.minutes} onChange={set("minutes")} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="servings">Servings</Label>
                  <Input id="servings" type="number" min={0} value={form.servings} onChange={set("servings")} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients</Label>
                <Textarea id="ingredients" rows={5} value={form.ingredients} onChange={set("ingredients")} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="steps">Steps</Label>
                <Textarea id="steps" rows={6} value={form.steps} onChange={set("steps")} required />
              </div>
              <Button type="submit" disabled={busy}>
                Publish recipe
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NewRecipe;
