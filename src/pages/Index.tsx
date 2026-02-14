import { Link } from "react-router-dom";
import { Users, CalendarDays, FolderHeart, ArrowRight, Activity, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { label: "Upcoming Appointments", value: "2", icon: CalendarDays },
  { label: "Medical Records", value: "5", icon: FolderHeart },
  { label: "Active Prescriptions", value: "2", icon: Activity },
];

const quickActions = [
  { title: "Find a Provider", description: "Search our directory of healthcare professionals", href: "/providers", icon: Users },
  { title: "Book Appointment", description: "Schedule your next consultation", href: "/appointments", icon: CalendarDays },
  { title: "Health Hub", description: "Access your digital medical records", href: "/health-hub", icon: FolderHeart },
];

export default function Index() {
  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="rounded-2xl trust-gradient p-8 lg:p-10 text-primary-foreground">
        <div className="flex items-center gap-2 mb-3 opacity-90">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">Your Health, Simplified</span>
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Welcome to Vitals</h1>
        <p className="text-primary-foreground/80 max-w-lg">
          Your universal healthcare portal. Find providers, schedule appointments, and manage your medical records — all in one place.
        </p>
        <div className="flex gap-3 mt-6">
          <Button asChild variant="secondary" className="bg-primary-foreground text-trust-dark hover:bg-primary-foreground/90">
            <Link to="/providers">Find a Provider</Link>
          </Button>
          <Button asChild variant="ghost" className="text-primary-foreground border border-primary-foreground/30 hover:bg-primary-foreground/10">
            <Link to="/health-hub">View Records</Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card-elevated p-5 flex items-center gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-lg bg-trust-light">
              <stat.icon className="w-5 h-5 text-trust" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              to={action.href}
              className="card-elevated p-5 group flex flex-col gap-3"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-trust-light group-hover:bg-trust group-hover:text-primary-foreground transition-colors">
                <action.icon className="w-5 h-5 text-trust group-hover:text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{action.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
              </div>
              <div className="flex items-center text-sm font-medium text-trust mt-auto">
                Get started <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
        <div className="card-elevated divide-y divide-border">
          {[
            { text: "Prescription: Amoxicillin 500mg", time: "4 days ago", type: "prescription" },
            { text: "Lab Results: Complete Blood Count", time: "9 days ago", type: "test" },
            { text: "Visit: Annual Physical Examination", time: "3 weeks ago", type: "visit" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4">
              <Clock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{item.text}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
