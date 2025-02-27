import BlueprintUploader from "@/components/BlueprintUploader";
import SafetyChecklist from "@/components/safety-checklist/SafetyChecklist";



export default function Analyze() {
    return (
        <main className="min-h-screen py-12">
                <div className="space-y-8">
                    <BlueprintUploader />
                </div>
        </main>
    );
}