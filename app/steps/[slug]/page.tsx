import { Copy, ExternalLink, Terminal } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllSteps, getStepDetail } from "@/lib/registry-server";

export async function generateStaticParams() {
	const steps = getAllSteps();
	return steps.map((step) => ({
		slug: step.name,
	}));
}

export default async function StepDetailPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const stepData = getStepDetail(slug);

	if (!stepData) {
		notFound();
	}

	const installCommand = `npx shadcn@latest add https://workflow-registry.vercel.app/r/${stepData.name}`;

	return (
		<div className="min-h-screen bg-background">
			<div className="container mx-auto py-8">
				<div className="mb-8">
					<div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
						<Link href="/steps" className="hover:text-foreground">
							Steps
						</Link>
						<span>/</span>
						<span>{stepData.name}</span>
					</div>
					<div className="flex items-start justify-between gap-4">
						<div>
							<h1 className="font-bold text-4xl text-foreground mb-2">
								{stepData.title}
							</h1>
							<p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
								{stepData.description}
							</p>
						</div>
						<Badge variant="secondary" className="font-mono">
							{stepData.category}
						</Badge>
					</div>
				</div>

				<div className="grid gap-8 lg:grid-cols-3">
					<div className="lg:col-span-2">
						<Tabs defaultValue="code" className="w-full">
							<TabsList>
								<TabsTrigger value="code">Code</TabsTrigger>
								<TabsTrigger value="usage">Usage</TabsTrigger>
								<TabsTrigger value="setup">Setup</TabsTrigger>
							</TabsList>

							<TabsContent value="code" className="mt-6">
								<div className="rounded-lg border border-border bg-card overflow-hidden">
									<div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
										<span className="font-mono text-sm text-muted-foreground">
											{stepData.files[0]?.path}
										</span>
										<Button variant="ghost" size="sm">
											<Copy className="h-4 w-4" />
										</Button>
									</div>
									<pre className="overflow-x-auto p-4 text-sm">
										<code className="text-foreground">{stepData.code}</code>
									</pre>
								</div>
							</TabsContent>

							<TabsContent value="usage" className="mt-6">
								<div className="rounded-lg border border-border bg-card overflow-hidden">
									<div className="flex items-center justify-between border-b border-border bg-muted px-4 py-2">
										<span className="font-mono text-sm text-muted-foreground">
											workflows/example.ts
										</span>
										<Button variant="ghost" size="sm">
											<Copy className="h-4 w-4" />
										</Button>
									</div>
									<pre className="overflow-x-auto p-4 text-sm">
										<code className="text-foreground">{stepData.usage}</code>
									</pre>
								</div>
							</TabsContent>

							<TabsContent value="setup" className="mt-6 space-y-6">
								<div>
									<h3 className="font-semibold text-xl text-foreground mb-3">
										Installation
									</h3>
									<div className="rounded-lg border border-border bg-card p-4">
										<div className="flex items-center justify-between mb-2">
											<code className="font-mono text-sm text-foreground break-all">
												{installCommand}
											</code>
											<Button variant="ghost" size="sm">
												<Copy className="h-4 w-4" />
											</Button>
										</div>
									</div>
								</div>

								{stepData.dependencies.length > 0 && (
									<div>
										<h3 className="font-semibold text-xl text-foreground mb-3">
											Dependencies
										</h3>
										<div className="rounded-lg border border-border bg-card p-4">
											<ul className="space-y-2">
												{stepData.dependencies.map((dep) => (
													<li key={dep} className="flex items-center gap-2">
														<Terminal className="h-4 w-4 text-primary" />
														<code className="font-mono text-sm text-foreground">
															{dep}
														</code>
													</li>
												))}
											</ul>
										</div>
									</div>
								)}

								{stepData.envVars.length > 0 && (
									<div>
										<h3 className="font-semibold text-xl text-foreground mb-3">
											Environment Variables
										</h3>
										<div className="rounded-lg border border-border bg-card divide-y divide-border">
											{stepData.envVars.map((envVar) => (
												<div key={envVar.name} className="p-4">
													<code className="font-mono text-sm text-primary">
														{envVar.name}
													</code>
													<p className="text-sm text-muted-foreground mt-1">
														{envVar.description}
													</p>
												</div>
											))}
										</div>
									</div>
								)}
							</TabsContent>
						</Tabs>
					</div>

					<div className="space-y-6">
						<div className="rounded-lg border border-border bg-card p-6">
							<h3 className="font-semibold text-lg text-foreground mb-4">
								Quick Install
							</h3>
							<div className="space-y-4">
								<div className="rounded-md bg-secondary p-3 font-mono text-sm text-secondary-foreground break-all overflow-x-auto">
									<span className="text-muted-foreground">$</span>{" "}
									{installCommand}
								</div>
								<Button className="w-full">
									<Copy className="mr-2 h-4 w-4" />
									Copy Install Command
								</Button>
								<Button variant="outline" className="w-full" asChild>
									<Link href="/docs/installation">
										View Installation Guide
										<ExternalLink className="ml-2 h-4 w-4" />
									</Link>
								</Button>
							</div>
						</div>

						<div className="rounded-lg border border-border bg-card p-6">
							<h3 className="font-semibold text-lg text-foreground mb-4">
								Details
							</h3>
							<dl className="space-y-3 text-sm">
								<div>
									<dt className="text-muted-foreground">Category</dt>
									<dd className="text-foreground font-medium mt-1 capitalize">
										{stepData.category}
									</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Author</dt>
									<dd className="text-foreground font-medium mt-1">
										Workflow Elements
									</dd>
								</div>
								<div>
									<dt className="text-muted-foreground">Dependencies</dt>
									<dd className="text-foreground font-medium mt-1">
										{stepData.dependencies.length || "None"}
									</dd>
								</div>
							</dl>
						</div>

						<div className="rounded-lg border border-border bg-card p-6">
							<h3 className="font-semibold text-lg text-foreground mb-3">
								Related Steps
							</h3>
							<ul className="space-y-2 text-sm">
								<li>
									<Link
										href="/steps/send-discord-webhook"
										className="text-primary hover:underline"
									>
										Send Discord Webhook
									</Link>
								</li>
								<li>
									<Link
										href="/steps/send-email"
										className="text-primary hover:underline"
									>
										Send Email
									</Link>
								</li>
								<li>
									<Link
										href="/steps/send-teams-message"
										className="text-primary hover:underline"
									>
										Send Teams Message
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
