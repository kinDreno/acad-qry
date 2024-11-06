import { Skeleton } from "@nextui-org/skeleton";
import { Card } from "@nextui-org/card";
export default function App() {
  return (
    <div className="bg-slate-800">
      <Card className="w-[200px] border-2 rounded-md space-y-5 p-4" radius="lg">
        <Skeleton className="rounded-lg border-2">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3 border-2">
          <Skeleton className="w-3/5 border-2 rounded-lg">
            <div className="h-3 w-3/5 border-2 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 border-2 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg border-2 bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 border-2 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg border-2 bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}
