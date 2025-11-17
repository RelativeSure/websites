import { Check, Copy, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Permissions {
  owner: { read: boolean; write: boolean; execute: boolean };
  group: { read: boolean; write: boolean; execute: boolean };
  others: { read: boolean; write: boolean; execute: boolean };
}

export default function ChmodPage() {
  const [permissions, setPermissions] = useState<Permissions>({
    owner: { read: true, write: true, execute: false },
    group: { read: true, write: false, execute: false },
    others: { read: true, write: false, execute: false },
  });
  const [numericValue, setNumericValue] = useState("644");
  const [symbolicValue, setSymbolicValue] = useState("rw-r--r--");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    updateFromCheckboxes();
  }, [updateFromCheckboxes]);

  const updateFromCheckboxes = () => {
    const ownerValue =
      (permissions.owner.read ? 4 : 0) + (permissions.owner.write ? 2 : 0) + (permissions.owner.execute ? 1 : 0);

    const groupValue =
      (permissions.group.read ? 4 : 0) + (permissions.group.write ? 2 : 0) + (permissions.group.execute ? 1 : 0);

    const othersValue =
      (permissions.others.read ? 4 : 0) + (permissions.others.write ? 2 : 0) + (permissions.others.execute ? 1 : 0);

    const numeric = `${ownerValue}${groupValue}${othersValue}`;
    setNumericValue(numeric);

    const symbolic = getSymbolic(permissions.owner) + getSymbolic(permissions.group) + getSymbolic(permissions.others);
    setSymbolicValue(symbolic);
  };

  const getSymbolic = (perms: { read: boolean; write: boolean; execute: boolean }): string => {
    return (perms.read ? "r" : "-") + (perms.write ? "w" : "-") + (perms.execute ? "x" : "-");
  };

  const updateFromNumeric = (value: string) => {
    setNumericValue(value);

    if (value.length !== 3 || !/^[0-7]{3}$/.test(value)) return;

    const [owner, group, others] = value.split("").map(Number);

    setPermissions({
      owner: {
        read: (owner & 4) !== 0,
        write: (owner & 2) !== 0,
        execute: (owner & 1) !== 0,
      },
      group: {
        read: (group & 4) !== 0,
        write: (group & 2) !== 0,
        execute: (group & 1) !== 0,
      },
      others: {
        read: (others & 4) !== 0,
        write: (others & 2) !== 0,
        execute: (others & 1) !== 0,
      },
    });
  };

  const togglePermission = (category: "owner" | "group" | "others", type: "read" | "write" | "execute") => {
    setPermissions((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: !prev[category][type],
      },
    }));
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const commonPermissions = [
    { name: "755", desc: "rwxr-xr-x", use: "Executable files, directories" },
    { name: "644", desc: "rw-r--r--", use: "Regular files" },
    { name: "600", desc: "rw-------", use: "Private files" },
    { name: "777", desc: "rwxrwxrwx", use: "Full access (insecure!)" },
    { name: "700", desc: "rwx------", use: "Private executable" },
    { name: "664", desc: "rw-rw-r--", use: "Shared files" },
    { name: "640", desc: "rw-r-----", use: "Config files" },
    { name: "444", desc: "r--r--r--", use: "Read-only files" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Unix Chmod Calculator</h1>
        <p className="text-muted-foreground">Calculate Unix file permissions (chmod values)</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Permission Values
          </CardTitle>
          <CardDescription>Current chmod value in different formats</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="numeric">Numeric (Octal)</Label>
              <div className="flex gap-2">
                <Input
                  id="numeric"
                  value={numericValue}
                  onChange={(e) => updateFromNumeric(e.target.value)}
                  className="font-mono text-2xl text-center font-bold"
                  maxLength={3}
                />
                <Button variant="ghost" size="icon" onClick={() => handleCopy(numericValue)}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Symbolic</Label>
              <div className="flex gap-2">
                <Input value={symbolicValue} readOnly className="font-mono text-xl text-center" />
                <Button variant="ghost" size="icon" onClick={() => handleCopy(symbolicValue)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Command</Label>
              <div className="flex gap-2">
                <Input value={`chmod ${numericValue} file`} readOnly className="font-mono text-sm" />
                <Button variant="ghost" size="icon" onClick={() => handleCopy(`chmod ${numericValue} file`)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Set Permissions</CardTitle>
          <CardDescription>Check boxes to set permissions for each group</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {(["owner", "group", "others"] as const).map((category) => (
              <div key={category} className="border-b pb-4 last:border-b-0">
                <h3 className="font-semibold text-lg mb-3 capitalize">
                  {category === "owner" ? "Owner (User)" : category === "group" ? "Group" : "Others (World)"}
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {(["read", "write", "execute"] as const).map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category}-${type}`}
                        checked={permissions[category][type]}
                        onCheckedChange={() => togglePermission(category, type)}
                      />
                      <label
                        htmlFor={`${category}-${type}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                      >
                        {type} ({type[0]})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Common Permissions</CardTitle>
          <CardDescription>Click to apply a common permission set</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {commonPermissions.map((perm) => (
              <button
                key={perm.name}
                onClick={() => updateFromNumeric(perm.name)}
                className="p-4 text-left border rounded-md hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold font-mono text-lg">{perm.name}</span>
                  <span className="font-mono text-sm text-muted-foreground">{perm.desc}</span>
                </div>
                <div className="text-xs text-muted-foreground">{perm.use}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permission Reference</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div>
            <strong>Numeric Values:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>4 = Read (r)</li>
              <li>2 = Write (w)</li>
              <li>1 = Execute (x)</li>
              <li>0 = No permission (-)</li>
            </ul>
          </div>
          <div>
            <strong>Permission Groups:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>
                <strong>Owner:</strong> The user who owns the file
              </li>
              <li>
                <strong>Group:</strong> Users in the file's group
              </li>
              <li>
                <strong>Others:</strong> All other users
              </li>
            </ul>
          </div>
          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
            <strong className="text-blue-800 dark:text-blue-300">Example:</strong> chmod 755 means: Owner can
            read/write/execute (7), Group can read/execute (5), Others can read/execute (5)
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
