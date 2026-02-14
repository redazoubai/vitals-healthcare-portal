import { useState } from "react";
import { FileText, FlaskConical, Stethoscope, Printer, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { medicalRecords, type MedicalRecord } from "@/data/records";

const typeConfig = {
  prescription: { label: "Prescription", icon: FileText, color: "bg-trust-light text-trust" },
  test_result: { label: "Test Result", icon: FlaskConical, color: "bg-success/10 text-success" },
  session_note: { label: "Session Note", icon: Stethoscope, color: "bg-warning/10 text-warning" },
};

function handlePrint(record: MedicalRecord) {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const config = typeConfig[record.type];
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${record.title} — Vitals Health Hub</title>
      <style>
        body { font-family: 'Segoe UI', system-ui, sans-serif; max-width: 700px; margin: 40px auto; padding: 0 20px; color: #1e293b; }
        .header { border-bottom: 2px solid #3b82f6; padding-bottom: 16px; margin-bottom: 24px; }
        .header h1 { font-size: 20px; margin: 0 0 4px; }
        .header p { font-size: 13px; color: #64748b; margin: 0; }
        .badge { display: inline-block; padding: 2px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; background: #eff6ff; color: #2563eb; margin-bottom: 16px; }
        .meta { font-size: 13px; color: #64748b; margin-bottom: 20px; }
        .content { white-space: pre-wrap; font-size: 14px; line-height: 1.7; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; }
        .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
        @media print { body { margin: 20px; } }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Vitals — Health Hub</h1>
        <p>Digital Medical Record</p>
      </div>
      <div class="badge">${config.label}</div>
      <h2 style="margin: 0 0 8px; font-size: 18px;">${record.title}</h2>
      <div class="meta">
        <p>Provider: ${record.doctor}</p>
        <p>Date: ${new Date(record.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>
      <div class="content">${record.details}</div>
      <div class="footer">
        <p>Generated from Vitals Health Hub on ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        <p>This document is for personal records only.</p>
      </div>
    </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
}

export default function HealthHub() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = medicalRecords.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.doctor.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter === "all" || r.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Health Hub</h1>
        <p className="text-muted-foreground mt-1">Your digital medical records — prescriptions, test results, and session notes</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search records..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "prescription", "test_result", "session_note"].map((t) => (
            <Button
              key={t}
              variant={typeFilter === t ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(t)}
              className={typeFilter === t ? "trust-gradient text-primary-foreground" : ""}
            >
              {t === "all" ? "All Records" : typeConfig[t as keyof typeof typeConfig].label + "s"}
            </Button>
          ))}
        </div>
      </div>

      {/* Records */}
      <div className="space-y-3">
        {filtered.map((record) => {
          const config = typeConfig[record.type];
          const isExpanded = expandedId === record.id;

          return (
            <div key={record.id} className="card-elevated overflow-hidden">
              <button
                onClick={() => setExpandedId(isExpanded ? null : record.id)}
                className="w-full p-5 flex items-start gap-4 text-left"
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${config.color} flex-shrink-0`}>
                  <config.icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{record.title}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{record.doctor} · {new Date(record.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Badge variant="secondary" className="text-xs">{config.label}</Badge>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{record.summary}</p>
                </div>
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 animate-fade-in">
                  <div className="bg-muted rounded-lg p-4 mb-4">
                    <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">
                      {record.details}
                    </pre>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => { e.stopPropagation(); handlePrint(record); }}
                    className="gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print to PDF
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No records found matching your search.</p>
        </div>
      )}
    </div>
  );
}
