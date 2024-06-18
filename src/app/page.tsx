import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Home from '@/components/customComponents/Home/Home'

export default function HomePage() {
  return (
    <div className="w-full h-20 ">
      {/* <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardHeader>
            <div className="flex gap-3 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <CardTitle>title</CardTitle>
                <CardDescription>description</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>recipe desc</p>
          </CardContent>
          <CardFooter className="gap-3 justify-between">
            <Button variant={"secondary"}>View recipe</Button>
            <Badge variant={"default"}>Vegan</Badge>
          </CardFooter>
        </Card>


        <Card>
          <CardHeader>
            <div className="flex gap-3 items-center">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div className="flex flex-col w-full gap-2">
                <Skeleton className="flex-grow h-6 w-3/5" />
                <Skeleton className="flex-grow h-6 w-full" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 flex-grow" />
          </CardContent>
          <CardFooter className="gap-3 justify-between">
            <Skeleton className="w-24 h-10" />
            <Skeleton className="w-16 h-10" />
          </CardFooter>
        </Card>
      </div> */}
      <Home />
    </div>
  );
}
