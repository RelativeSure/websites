import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightLeft } from "lucide-react";

const morseCode: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '.': '.-.-.-', ',': '--..--', '?': '..--..',
  "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.', ')': '-.--.-',
  '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.',
  '-': '-....-', '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.',
  ' ': '/'
};

const reverseMorse = Object.fromEntries(
  Object.entries(morseCode).map(([k, v]) => [v, k])
);

export default function MorseCodePage() {
  const [textInput, setTextInput] = useState("");
  const [morseInput, setMorseInput] = useState("");
  const [error, setError] = useState("");

  const textToMorse = () => {
    try {
      setError("");
      const morse = textInput
        .toUpperCase()
        .split("")
        .map(char => morseCode[char] || char)
        .join(" ");
      setMorseInput(morse);
    } catch (err) {
      setError("Failed to convert to Morse code");
    }
  };

  const morseToText = () => {
    try {
      setError("");
      const text = morseInput
        .split(" ")
        .map(code => reverseMorse[code] || "?")
        .join("");
      setTextInput(text);
    } catch (err) {
      setError("Failed to convert from Morse code");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Morse Code Translator</h1>
        <p className="text-muted-foreground">
          Convert text to Morse code and back
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Text</CardTitle>
            <CardDescription>Plain text input</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Enter text here..."
              className="font-mono min-h-[200px]"
            />
            <Button onClick={textToMorse} className="w-full">
              Convert to Morse →
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Morse Code</CardTitle>
            <CardDescription>Morse code (dots and dashes)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={morseInput}
              onChange={(e) => setMorseInput(e.target.value)}
              placeholder="Enter Morse code here..."
              className="font-mono min-h-[200px]"
            />
            <Button onClick={morseToText} className="w-full">
              ← Convert to Text
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Morse Code Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 text-sm font-mono">
            {Object.entries(morseCode).slice(0, 26).map(([char, code]) => (
              <div key={char} className="p-2 bg-muted rounded text-center">
                <div className="font-bold">{char}</div>
                <div className="text-xs text-muted-foreground">{code}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
