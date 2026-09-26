import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: route not found:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40">
      <div className="text-center">
        <h1 className="mb-2 text-5xl font-bold">404</h1>
        <p className="mb-6 text-lg text-muted-foreground">This page went out for groceries.</p>
        <Link to="/" className="text-primary underline underline-offset-4 hover:opacity-80">
          Back to Recipe Circle
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
