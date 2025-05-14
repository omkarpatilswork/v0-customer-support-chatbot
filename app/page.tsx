import HelpAndSupport from "@/components/help-and-support"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Health Saathi</h1>
        <HelpAndSupport />
      </div>
    </main>
  )
}
