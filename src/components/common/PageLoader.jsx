import { Loader2 } from "lucide-react";

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-violet-600" />
    </div>
  );
}

export default PageLoader;
