import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TextDiff() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Text Diff Checker</h1>
        <p className="text-muted-foreground">
          Compare two text blocks and see the differences
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Original Text</CardTitle>
            <CardDescription>Enter the first text</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter original text..."
              value={text1}
              onChange={(e) => setText1(e.target.value)}
              className="font-mono min-h-[400px]"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Modified Text</CardTitle>
            <CardDescription>Enter the second text</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter modified text..."
              value={text2}
              onChange={(e) => setText2(e.target.value)}
              className="font-mono min-h-[400px]"
            />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Differences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-center py-8">
            Diff comparison coming soon. Currently showing side-by-side view.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
