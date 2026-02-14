import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { providers } from "@/data/providers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "1:00 PM", "1:30 PM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
  "4:00 PM", "4:30 PM",
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return days;
}

// Simulate some slots being unavailable
function getAvailableSlots(day: number) {
  const seed = day * 7;
  return timeSlots.filter((_, i) => (seed + i) % 3 !== 0);
}

export default function Appointments() {
  const [searchParams] = useSearchParams();
  const preselectedProvider = searchParams.get("provider") || "";

  const [selectedProvider, setSelectedProvider] = useState(preselectedProvider);
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1)); // Feb 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const calendarDays = useMemo(() => getCalendarDays(year, month), [year, month]);
  const today = new Date();
  const isToday = (day: number) =>
    day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  const isPast = (day: number) => new Date(year, month, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const availableSlots = selectedDay ? getAvailableSlots(selectedDay) : [];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const handleBook = () => {
    const provider = providers.find((p) => p.id === selectedProvider);
    setBooked(true);
    toast.success(
      `Appointment booked with ${provider?.name || "your provider"} on ${monthNames[month]} ${selectedDay}, ${year} at ${selectedSlot}`
    );
  };

  if (booked) {
    const provider = providers.find((p) => p.id === selectedProvider);
    return (
      <div className="p-6 lg:p-10 max-w-2xl mx-auto text-center animate-fade-in">
        <div className="card-elevated p-10">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-success/10 mx-auto mb-4">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Appointment Confirmed</h1>
          <p className="text-muted-foreground">
            Your consultation with <span className="font-medium text-foreground">{provider?.name}</span> is
            scheduled for <span className="font-medium text-foreground">{monthNames[month]} {selectedDay}, {year}</span> at{" "}
            <span className="font-medium text-foreground">{selectedSlot}</span>.
          </p>
          <Button className="mt-6 trust-gradient text-primary-foreground" onClick={() => setBooked(false)}>
            Book Another Appointment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Schedule Appointment</h1>
        <p className="text-muted-foreground mt-1">Choose a provider, date, and time for your consultation</p>
      </div>

      {/* Provider Selection */}
      <div className="card-elevated p-5">
        <label className="text-sm font-medium text-foreground mb-2 block">Select Provider</label>
        <Select value={selectedProvider} onValueChange={(v) => { setSelectedProvider(v); setSelectedDay(null); setSelectedSlot(null); }}>
          <SelectTrigger className="max-w-sm">
            <SelectValue placeholder="Choose a healthcare provider" />
          </SelectTrigger>
          <SelectContent>
            {providers.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name} — {p.specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="card-elevated p-5">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h3 className="font-semibold text-foreground">
              {monthNames[month]} {year}
            </h3>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => (
              <button
                key={i}
                disabled={day === null || isPast(day!)}
                onClick={() => { setSelectedDay(day); setSelectedSlot(null); }}
                className={`aspect-square flex items-center justify-center rounded-lg text-sm transition-colors
                  ${day === null ? "invisible" : ""}
                  ${day !== null && isPast(day) ? "text-muted-foreground/40 cursor-not-allowed" : ""}
                  ${day !== null && !isPast(day) && day !== selectedDay ? "hover:bg-accent text-foreground cursor-pointer" : ""}
                  ${day === selectedDay ? "trust-gradient text-primary-foreground font-semibold" : ""}
                  ${isToday(day!) && day !== selectedDay ? "ring-1 ring-trust" : ""}
                `}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="card-elevated p-5">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            {selectedDay ? `Available Slots — ${monthNames[month]} ${selectedDay}` : "Select a date"}
          </h3>

          {selectedDay ? (
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-colors border
                    ${selectedSlot === slot
                      ? "trust-gradient text-primary-foreground border-transparent"
                      : "border-border text-foreground hover:bg-accent"
                    }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Please select a date on the calendar to view available time slots.</p>
          )}

          {selectedSlot && selectedProvider && (
            <Button className="w-full mt-4 trust-gradient text-primary-foreground" onClick={handleBook}>
              Confirm Appointment
            </Button>
          )}

          {selectedSlot && !selectedProvider && (
            <p className="text-sm text-destructive mt-4">Please select a provider first.</p>
          )}
        </div>
      </div>
    </div>
  );
}
