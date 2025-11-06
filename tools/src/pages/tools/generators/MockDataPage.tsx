import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Check, RefreshCw } from "lucide-react";

const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];
const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "example.com", "test.com", "mail.com"];
const streets = ["Main St", "Oak Ave", "Maple Dr", "Pine Rd", "Cedar Ln", "Elm St", "Park Ave", "Washington Blvd", "Lake Dr", "Hill St"];
const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
const states = ["NY", "CA", "IL", "TX", "AZ", "PA", "FL", "OH", "MI", "GA"];
const companies = ["Tech Corp", "Data Systems", "Cloud Solutions", "Digital Services", "Innovation Labs", "Software Inc", "Web Dynamics", "Cyber Group", "Info Systems", "Smart Tech"];

const random = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export default function MockDataPage() {
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generateUser = () => {
    const firstName = random(firstNames);
    const lastName = random(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${random(domains)}`;

    return {
      id: randomInt(1000, 9999),
      firstName,
      lastName,
      fullName: `${firstName} ${lastName}`,
      email,
      username: `${firstName.toLowerCase()}${randomInt(100, 999)}`,
      phone: `+1-${randomInt(200, 999)}-${randomInt(200, 999)}-${randomInt(1000, 9999)}`,
      age: randomInt(18, 80),
      address: {
        street: `${randomInt(100, 9999)} ${random(streets)}`,
        city: random(cities),
        state: random(states),
        zip: String(randomInt(10000, 99999)),
      },
      company: random(companies),
      jobTitle: random(["Developer", "Manager", "Designer", "Analyst", "Engineer", "Consultant"]),
      salary: randomInt(40000, 150000),
      isActive: Math.random() > 0.3,
      createdAt: new Date(Date.now() - randomInt(0, 365 * 24 * 60 * 60 * 1000)).toISOString(),
    };
  };

  const generateUsers = () => {
    const users = Array.from({ length: count }, generateUser);
    setOutput(JSON.stringify(users, null, 2));
  };

  const generateCSV = () => {
    const users = Array.from({ length: count }, generateUser);
    const headers = ["ID", "First Name", "Last Name", "Email", "Phone", "City", "State", "Company"];
    const rows = users.map(u => [
      u.id,
      u.firstName,
      u.lastName,
      u.email,
      u.phone,
      u.address.city,
      u.address.state,
      u.company
    ]);

    const csv = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");

    setOutput(csv);
  };

  const generateEmails = () => {
    const emails = Array.from({ length: count }, () => {
      const firstName = random(firstNames);
      const lastName = random(lastNames);
      return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${random(domains)}`;
    });
    setOutput(emails.join("\n"));
  };

  const generateAddresses = () => {
    const addresses = Array.from({ length: count }, () => {
      return `${randomInt(100, 9999)} ${random(streets)}, ${random(cities)}, ${random(states)} ${randomInt(10000, 99999)}`;
    });
    setOutput(addresses.join("\n"));
  };

  const generatePhones = () => {
    const phones = Array.from({ length: count }, () => {
      return `+1-${randomInt(200, 999)}-${randomInt(200, 999)}-${randomInt(1000, 9999)}`;
    });
    setOutput(phones.join("\n"));
  };

  const generateCreditCards = () => {
    const cards = Array.from({ length: count }, () => {
      const prefix = random(["4", "5", "3", "6"]); // Visa, MC, Amex, Discover
      const nums = Array.from({ length: 15 }, () => randomInt(0, 9)).join("");
      const expMonth = String(randomInt(1, 12)).padStart(2, "0");
      const expYear = String(randomInt(24, 30));
      const cvv = String(randomInt(100, 999));

      return {
        number: prefix + nums,
        exp: `${expMonth}/${expYear}`,
        cvv,
      };
    });
    setOutput(JSON.stringify(cards, null, 2));
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Mock Data Generator</h1>
        <p className="text-muted-foreground">
          Generate realistic fake data for testing and development
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Generator Options</CardTitle>
          <CardDescription>Select data type and quantity</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="count">Number of Records: {count}</Label>
            <input
              id="count"
              type="range"
              min="1"
              max="100"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>100</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <Button onClick={generateUsers} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Users (JSON)
            </Button>
            <Button onClick={generateCSV} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Users (CSV)
            </Button>
            <Button onClick={generateEmails} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Emails
            </Button>
            <Button onClick={generateAddresses} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Addresses
            </Button>
            <Button onClick={generatePhones} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Phone Numbers
            </Button>
            <Button onClick={generateCreditCards} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Credit Cards
            </Button>
          </div>
        </CardContent>
      </Card>

      {output && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Generated Data</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea
              value={output}
              readOnly
              className="font-mono min-h-[400px] text-xs"
            />
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Note</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>
            All generated data is completely fictional and randomly generated.
            Credit card numbers are for testing only and will not work for actual transactions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
