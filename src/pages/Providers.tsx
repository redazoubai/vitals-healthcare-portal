import { useState } from "react";
import { Search, Star, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { providers, specialties, type Provider } from "@/data/providers";
import { useNavigate } from "react-router-dom";

export default function Providers() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const navigate = useNavigate();

  const filtered = providers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "all" || p.category === filter || p.specialty === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Provider Directory</h1>
        <p className="text-muted-foreground mt-1">Find and book appointments with healthcare professionals</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "gp", "specialist"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? "trust-gradient text-primary-foreground" : ""}
            >
              {f === "all" ? "All" : f === "gp" ? "General Practitioners" : "Specialists"}
            </Button>
          ))}
        </div>
      </div>

      {/* Provider List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} onBook={() => navigate(`/appointments?provider=${provider.id}`)} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No providers found matching your search.</p>
        </div>
      )}
    </div>
  );
}

function ProviderCard({ provider, onBook }: { provider: Provider; onBook: () => void }) {
  return (
    <div className="card-elevated p-5 flex gap-4">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-trust-light text-trust font-semibold text-sm flex-shrink-0">
        {provider.avatar}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-foreground">{provider.name}</h3>
            <p className="text-sm text-muted-foreground">{provider.specialty}</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="w-3.5 h-3.5 fill-warning text-warning" />
            <span className="font-medium text-foreground">{provider.rating}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="secondary" className="text-xs">{provider.experience}</Badge>
          <span className="text-xs text-success font-medium">{provider.availability}</span>
        </div>
        <Button size="sm" className="mt-3 trust-gradient text-primary-foreground" onClick={onBook}>
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
