import Link from 'next/link';
import Image from 'next/image';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import { Card, Cards } from 'fumadocs-ui/components/card';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-16">
        <Image
          src="/rasmus.png"
          alt="Rasmus"
          width={200}
          height={200}
          className="rounded-full mb-6 shadow-lg"
          priority
        />
        <h1 className="text-4xl font-bold mb-4">Platform / DevOps Engineer</h1>
        <p className="text-lg text-muted-foreground max-w-4xl mb-8">
          DevOps | Kubernetes | Helm | GitOps | Linux | Ansible | Python | Automation | CI CD Pipelines | Docker | Innovative Thinker | Rapid Learner
        </p>
        <div className="w-full max-w-4xl">
          <Cards>
            <Card
              href="/docs/goodstuff"
              title="⭐ Good Stuff"
              description="Essential tools, guides, and resources"
            />
            <Card
              href="/docs/linux"
              title="Linux"
              description="Linux administration and configuration"
            />
            <Card
              href="/docs/projects"
              title="Projects"
              description="Personal projects and experiments"
            />
            <Card
              href="/docs/bookmarks"
              title="Bookmarks"
              description="Curated collection of useful links"
            />
            <Card
              href="/docs/windows"
              title="Windows"
              description="Windows and PowerShell guides"
            />
            <Card
              href="https://github.com/RelativeSure/personal-starlight-site"
              title="GitHub"
              description="View site source code"
              external
            />
          </Cards>
        </div>
      </div>

      {/* About Rasmus Section */}
      <h2 className="text-3xl font-bold mb-8 text-center">About Rasmus</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* About Me Card */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">📖</span>
            <h3 className="text-xl font-semibold">About Me</h3>
          </div>
          <p className="mb-6 text-muted-foreground">
            Experienced DevOps Engineer with a strong focus on automating infrastructure and streamlining
            development workflows. Passionate about implementing efficient CI/CD pipelines and maintaining
            robust cloud infrastructure.
          </p>

          <div className="mb-6 p-4 bg-accent rounded-lg">
            <h4 className="font-semibold mb-3">Education</h4>
            <Tabs items={['Datatechnician', 'IT-Supporter']}>
              <Tab value="Datatechnician">
                <div className="py-2">
                  <p><strong>Degree:</strong> Datatechnician, Infrastructure Specialist</p>
                  <p><strong>Grade:</strong> 12 (A)</p>
                </div>
              </Tab>
              <Tab value="IT-Supporter">
                <div className="py-2">
                  <p><strong>Degree:</strong> IT-Supporter</p>
                  <p><strong>Grade:</strong> 12 (A)</p>
                </div>
              </Tab>
            </Tabs>
          </div>

          <div className="p-4 bg-accent rounded-lg">
            <h4 className="font-semibold mb-3">Experience</h4>
            <Tabs items={['Current', 'Previous']}>
              <Tab value="Current">
                <div className="py-2">
                  <p><strong>DanMagi</strong></p>
                  <p className="text-sm text-muted-foreground">DevOps / System Administrator (June 2025 - Present)</p>
                </div>
              </Tab>
              <Tab value="Previous">
                <div className="py-2 space-y-4">
                  <div>
                    <p><strong>Udviklings og Forenklingsstyrelsen</strong></p>
                    <p className="text-sm text-muted-foreground">Platform Engineer (Apr 2023 - May 2025)</p>
                  </div>
                  <hr className="border-border" />
                  <div>
                    <p><strong>Netcompany</strong></p>
                    <p className="text-sm text-muted-foreground">Operations Engineer (Dec 2021 - Feb 2023)</p>
                    <p className="text-sm text-muted-foreground">Operations Analyst (Jun 2020 - Dec 2021)</p>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>

        {/* Technologies Card */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🗄️</span>
            <h3 className="text-xl font-semibold">Technologies</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 p-2 bg-accent rounded">
            * An asterisk indicates areas where I am actively expanding my knowledge.
          </p>
          <div className="space-y-2">
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-primary list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Code
              </summary>
              <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- Bash</li>
                <li>- Python</li>
                <li>- Gradle</li>
                <li>- Javascript/Typescript*</li>
              </ul>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-primary list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Containers
              </summary>
              <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- Docker</li>
                <li>- On-Prem & Azure Kubernetes</li>
                <li>- Rancher</li>
              </ul>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-primary list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Databases
              </summary>
              <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- OracleDB</li>
                <li>- Redis</li>
                <li>- PostgreSQL</li>
                <li>- MySQL/MariaDB</li>
              </ul>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-primary list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Git
              </summary>
              <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- GitHub</li>
                <li>- GitLab</li>
                <li>- Azure DevOps*</li>
              </ul>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-primary list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Infrastructure as Code
              </summary>
              <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- Ansible*</li>
                <li>- Terraform</li>
                <li>- Packer</li>
                <li>- Puppet</li>
              </ul>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-primary list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Linux
              </summary>
              <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- RedHat</li>
                <li>- Debian</li>
                <li>- Kali</li>
                <li>- NixOS*</li>
              </ul>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-primary list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Networking
              </summary>
              <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- Cisco</li>
                <li>- Fortinet*</li>
              </ul>
            </details>
            <details className="group">
              <summary className="cursor-pointer font-medium hover:text-primary list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                Windows
              </summary>
              <ul className="ml-6 mt-2 space-y-1 text-sm text-muted-foreground">
                <li>- ActiveDirectory</li>
                <li>- Group Policy Management</li>
                <li>- RSAT</li>
              </ul>
            </details>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🚀</span>
            <h3 className="text-xl font-semibold">Achievements & Certificates</h3>
          </div>
          <ul className="space-y-4 text-sm">
            <li>
              <strong>Certificate for ambition in Education</strong>
              <p className="text-muted-foreground">Awarded with a diploma, medal, and scholarship.</p>
            </li>
            <li>
              <strong>SOC Core Skills with John Stand</strong>
              <p className="text-muted-foreground">April 2025</p>
            </li>
            <li>
              <strong>Introduction Badge from PentesterLab</strong>
              <p className="text-muted-foreground">April 2022</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
