import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const claims = [
  // Registered Claims
  { claim: "iss", fullName: "Issuer", description: "Identifies principal that issued the JWT", type: "string", category: "Registered Claims" },
  { claim: "sub", fullName: "Subject", description: "Identifies the subject of the JWT", type: "string", category: "Registered Claims" },
  { claim: "aud", fullName: "Audience", description: "Identifies the recipients that the JWT is intended for", type: "string | array", category: "Registered Claims" },
  { claim: "exp", fullName: "Expiration Time", description: "Identifies the expiration time (NumericDate)", type: "number", category: "Registered Claims" },
  { claim: "nbf", fullName: "Not Before", description: "Identifies the time before which the JWT must not be accepted (NumericDate)", type: "number", category: "Registered Claims" },
  { claim: "iat", fullName: "Issued At", description: "Identifies the time at which the JWT was issued (NumericDate)", type: "number", category: "Registered Claims" },
  { claim: "jti", fullName: "JWT ID", description: "Unique identifier for the JWT", type: "string", category: "Registered Claims" },

  // Public Claims (Common)
  { claim: "name", fullName: "Full Name", description: "Full name of the user", type: "string", category: "Public Claims" },
  { claim: "given_name", fullName: "Given Name", description: "Given name(s) or first name(s)", type: "string", category: "Public Claims" },
  { claim: "family_name", fullName: "Family Name", description: "Surname(s) or last name(s)", type: "string", category: "Public Claims" },
  { claim: "middle_name", fullName: "Middle Name", description: "Middle name(s)", type: "string", category: "Public Claims" },
  { claim: "nickname", fullName: "Nickname", description: "Casual name", type: "string", category: "Public Claims" },
  { claim: "preferred_username", fullName: "Preferred Username", description: "Shorthand name by which the user wishes to be referred", type: "string", category: "Public Claims" },
  { claim: "email", fullName: "Email Address", description: "Email address", type: "string", category: "Public Claims" },
  { claim: "email_verified", fullName: "Email Verified", description: "Whether the email address has been verified", type: "boolean", category: "Public Claims" },
  { claim: "phone_number", fullName: "Phone Number", description: "Phone number", type: "string", category: "Public Claims" },
  { claim: "phone_number_verified", fullName: "Phone Verified", description: "Whether the phone number has been verified", type: "boolean", category: "Public Claims" },
  { claim: "picture", fullName: "Profile Picture", description: "URL of the profile picture", type: "string", category: "Public Claims" },
  { claim: "website", fullName: "Website", description: "URL of the user's website", type: "string", category: "Public Claims" },
  { claim: "gender", fullName: "Gender", description: "Gender", type: "string", category: "Public Claims" },
  { claim: "birthdate", fullName: "Birthdate", description: "Birthday in YYYY-MM-DD format", type: "string", category: "Public Claims" },
  { claim: "zoneinfo", fullName: "Timezone", description: "Time zone (e.g., America/Los_Angeles)", type: "string", category: "Public Claims" },
  { claim: "locale", fullName: "Locale", description: "Locale (e.g., en-US)", type: "string", category: "Public Claims" },
  { claim: "updated_at", fullName: "Updated At", description: "Time the information was last updated (NumericDate)", type: "number", category: "Public Claims" },

  // Address Claim
  { claim: "address", fullName: "Address", description: "Postal address (structured object)", type: "object", category: "Public Claims" },
  { claim: "address.formatted", fullName: "Formatted Address", description: "Full mailing address", type: "string", category: "Address" },
  { claim: "address.street_address", fullName: "Street Address", description: "Street address component", type: "string", category: "Address" },
  { claim: "address.locality", fullName: "Locality", description: "City or locality", type: "string", category: "Address" },
  { claim: "address.region", fullName: "Region", description: "State, province, or region", type: "string", category: "Address" },
  { claim: "address.postal_code", fullName: "Postal Code", description: "Zip code or postal code", type: "string", category: "Address" },
  { claim: "address.country", fullName: "Country", description: "Country name", type: "string", category: "Address" },

  // Common Custom Claims
  { claim: "roles", fullName: "Roles", description: "User roles or permissions", type: "array", category: "Custom Claims" },
  { claim: "permissions", fullName: "Permissions", description: "User permissions", type: "array", category: "Custom Claims" },
  { claim: "scope", fullName: "Scope", description: "OAuth 2.0 scopes", type: "string | array", category: "Custom Claims" },
  { claim: "groups", fullName: "Groups", description: "User groups", type: "array", category: "Custom Claims" },
  { claim: "tenant_id", fullName: "Tenant ID", description: "Multi-tenant identifier", type: "string", category: "Custom Claims" },
  { claim: "organization_id", fullName: "Organization ID", description: "Organization identifier", type: "string", category: "Custom Claims" },
  { claim: "session_id", fullName: "Session ID", description: "Session identifier", type: "string", category: "Custom Claims" },
  { claim: "client_id", fullName: "Client ID", description: "OAuth 2.0 client identifier", type: "string", category: "Custom Claims" },
];

export default function JwtClaimsPage() {
  const [search, setSearch] = useState("");

  const filtered = claims.filter(
    (c) =>
      c.claim.toLowerCase().includes(search.toLowerCase()) ||
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  const categories = Array.from(new Set(claims.map((c) => c.category)));

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">JWT Claims Reference</h1>
        <p className="text-muted-foreground">
          Standard and common JWT (JSON Web Token) claims
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Search</CardTitle>
          <CardDescription>Find JWT claims by name or description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search claims..."
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {categories.map((category) => {
        const items = filtered.filter((c) => c.category === category);
        if (items.length === 0) return null;

        return (
          <Card key={category} className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2 text-left">Claim</th>
                      <th className="p-2 text-left">Full Name</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, idx) => (
                      <tr key={idx} className="border-b hover:bg-muted">
                        <td className="p-2 font-mono font-semibold text-primary">
                          {item.claim}
                        </td>
                        <td className="p-2 font-medium">{item.fullName}</td>
                        <td className="p-2 font-mono text-xs text-muted-foreground">
                          {item.type}
                        </td>
                        <td className="p-2 text-muted-foreground">{item.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {filtered.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center text-muted-foreground">
            No claims found matching "{search}"
          </CardContent>
        </Card>
      )}

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">NumericDate Format</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            NumericDate is a JSON numeric value representing the number of seconds from 1970-01-01T00:00:00Z UTC until the specified UTC date/time (Unix timestamp).
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
