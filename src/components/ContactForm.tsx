import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, User, Building2, MessageSquare, Send, CheckCircle2, Calendar } from "lucide-react";
import { track } from "@/lib/analytics";
import { Fingerprint } from "@/components/brand/Fingerprint";

const schema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().trim().email("Enter a valid email").max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  topic: z.enum(["consultation", "partnership", "integration", "press", "other"]),
  preferredDate: z.string().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more (min 10 chars)").max(1000),
});

type FormValues = z.infer<typeof schema>;

const TOPICS: { value: FormValues["topic"]; label: string }[] = [
  { value: "consultation", label: "Book Consultation" },
  { value: "partnership", label: "Partnership" },
  { value: "integration", label: "Integration" },
  { value: "press", label: "Press" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register, handleSubmit, watch, reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { topic: "consultation" },
  });

  const topic = watch("topic");

  const onSubmit = async (data: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    track({ name: "contact_submit", topic: data.topic });
    toast.success("Transmission received", { description: "A Human Studio Lab specialist will reach out within 24 hours." });
    setSubmitted(true);
    reset({ topic: "consultation" } as FormValues);
  };

  return (
    <section id="contact" className="relative py-24 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Left intro */}
          <div className="lg:col-span-2">
            <div className="font-mono text-xs tracking-[0.25em] uppercase text-cyan">// Initiate Contact</div>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-black leading-tight">
              Book a <span className="text-gradient">consultation</span> with the Lab.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Partner with Human Studio Lab to deploy an existing intelligent application — or co-build the next one.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: CheckCircle2, t: "Encrypted submission · zero spam" },
                { icon: CheckCircle2, t: "Response within 24 hours" },
                { icon: CheckCircle2, t: "NDAs available on request" },
              ].map((it) => (
                <div key={it.t} className="flex items-center gap-3 text-sm text-foreground/90">
                  <it.icon className="h-4 w-4 text-cyan" /> {it.t}
                </div>
              ))}
            </div>

            <div className="mt-8 panel p-5 relative overflow-hidden">
              <span className="absolute inset-0 scanline opacity-30 pointer-events-none" />
              <div className="flex items-center gap-3">
                <Fingerprint className="h-10 w-10" />
                <div>
                  <div className="font-display font-bold">Human Studio Lab</div>
                  <div className="font-mono text-[10px] tracking-widest text-muted-foreground">SECURE.CHANNEL · ACTIVE</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 panel p-6 md:p-8 relative overflow-hidden">
            <span className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
            <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

            {submitted ? (
              <div className="relative text-center py-10">
                <div className="mx-auto h-16 w-16 rounded-full border border-cyan/60 bg-cyan/10 flex items-center justify-center shadow-[0_0_40px_oklch(0.85_0.16_220/0.4)]">
                  <CheckCircle2 className="h-8 w-8 text-cyan" />
                </div>
                <h3 className="mt-4 font-display text-2xl font-bold">Transmission received</h3>
                <p className="mt-2 text-sm text-muted-foreground">A specialist will contact you within 24 hours.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-4 py-2 text-xs font-mono uppercase tracking-widest hover:bg-card/80"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5" noValidate>
                <div className="flex items-center justify-between font-mono text-[10px] text-muted-foreground">
                  <span>FORM.ID://hsl.contact</span>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" /> READY</span>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Name" icon={User} error={errors.name?.message}>
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      className="hsl-input"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email" icon={Mail} error={errors.email?.message}>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@company.com"
                      className="hsl-input"
                      autoComplete="email"
                    />
                  </Field>
                </div>

                <Field label="Company (optional)" icon={Building2} error={errors.company?.message}>
                  <input
                    {...register("company")}
                    placeholder="Organization"
                    className="hsl-input"
                    autoComplete="organization"
                  />
                </Field>

                <div>
                  <Label>Topic</Label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {TOPICS.map((t) => {
                      const active = topic === t.value;
                      return (
                        <label
                          key={t.value}
                          className={`cursor-pointer rounded-md border px-3 py-1.5 text-xs font-mono uppercase tracking-widest transition-all ${
                            active
                              ? "border-primary bg-primary/15 text-foreground shadow-[0_0_18px_oklch(0.68_0.22_255/0.5)]"
                              : "border-border bg-background/40 text-muted-foreground hover:border-primary/50"
                          }`}
                        >
                          <input
                            type="radio"
                            value={t.value}
                            {...register("topic")}
                            className="sr-only"
                          />
                          {t.label}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {topic === "consultation" && (
                  <Field label="Preferred date (optional)" icon={Calendar} error={errors.preferredDate?.message}>
                    <input
                      {...register("preferredDate")}
                      type="date"
                      className="hsl-input"
                    />
                  </Field>
                )}

                <Field label="Message" icon={MessageSquare} error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us about your project, integration, or vision…"
                    className="hsl-input resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-primary to-accent px-6 py-3 text-sm font-mono uppercase tracking-widest text-primary-foreground shadow-[0_0_40px_oklch(0.68_0.22_255/0.5)] hover:shadow-[0_0_60px_oklch(0.72_0.2_305/0.7)] transition-all disabled:opacity-60"
                >
                  {isSubmitting ? "Transmitting…" : (
                    <>
                      Initiate Transmission
                      <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{children}</span>;
}

function Field({
  label, icon: Icon, error, children,
}: { label: string; icon: React.ComponentType<{ className?: string }>; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <div className="mt-2 relative">
        <Icon className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground pointer-events-none" />
        <div className="[&_.hsl-input]:w-full [&_.hsl-input]:rounded-md [&_.hsl-input]:border [&_.hsl-input]:border-border [&_.hsl-input]:bg-background/60 [&_.hsl-input]:pl-9 [&_.hsl-input]:pr-3 [&_.hsl-input]:py-3 [&_.hsl-input]:text-sm [&_.hsl-input]:font-mono [&_.hsl-input]:outline-none [&_.hsl-input]:transition-all focus-within:[&_.hsl-input]:border-primary focus-within:[&_.hsl-input]:shadow-[0_0_24px_oklch(0.68_0.22_255/0.3)]">
          {children}
        </div>
      </div>
      {error && <span className="mt-1 block font-mono text-[10px] text-destructive">▸ {error}</span>}
    </label>
  );
}
