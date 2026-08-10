import Link from "next/link";
import { CheckCircle2, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const standards = [
  {
    std: "Std. 5th",
    format: "60 objective questions in 90 minutes, covering the full-year syllabus.",
    syllabus: [
      "Number sense & arithmetic operations",
      "Fractions, decimals & measurement",
      "Basic geometry & shapes",
      "Patterns & logical reasoning",
    ],
  },
  {
    std: "Std. 8th",
    format: "80 objective questions in 120 minutes, covering Std. 8th syllabus plus reasoning.",
    syllabus: [
      "Algebra & linear equations",
      "Geometry, mensuration & constructions",
      "Ratio, proportion & percentage",
      "Data handling & logical reasoning",
    ],
  },
];

const dates = [
  { label: "Registration opens", value: "1 June" },
  { label: "Registration closes", value: "31 July" },
  { label: "Exam day", value: "Second Sunday of September" },
  { label: "Result declaration", value: "Within 6 weeks of the exam" },
];

export function GpExamInfo() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      <div className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {standards.map((s) => (
            <Card key={s.std} className="ring-emerald-ink/10">
              <CardHeader>
                <CardTitle className="text-lg">{s.std}</CardTitle>
                <p className="text-sm text-muted-foreground">{s.format}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {s.syllabus.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-amber-spark" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="ring-emerald-ink/10">
          <CardHeader>
            <CardTitle className="text-lg">Scoring &amp; eligibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>
              Open to students currently enrolled in Std. 5th or Std. 8th at
              any recognised school. Each correct answer scores +1; there is
              no negative marking.
            </p>
            <p>
              Students scoring in the top percentile receive a merit
              certificate and are invited to EARC&rsquo;s felicitation
              function.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="ring-emerald-ink/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="size-4.5 text-amber-spark" />
              Important dates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-3 font-mono text-sm">
              {dates.map((d) => (
                <div key={d.label} className="flex items-baseline justify-between gap-3 border-b border-emerald-ink/10 pb-2 last:border-0 last:pb-0">
                  <dt className="text-muted-foreground">{d.label}</dt>
                  <dd className="text-right font-semibold text-emerald-deep">
                    {d.value}
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>

        <Card className="bg-emerald-deep ring-emerald-deep">
          <CardContent className="space-y-3 pt-1">
            <p className="font-heading text-base font-semibold text-parchment">
              Want structured guidance before exam day?
            </p>
            <p className="text-sm text-parchment/70">
              Join our online guidance sessions or ask the office for the
              exam brochure.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button nativeButton={false}
                render={<Link href="/contact" />}
                className="bg-amber-spark text-emerald-deep hover:bg-amber-spark/85"
              >
                Register for guidance
              </Button>
              <Button nativeButton={false}
                render={<Link href="/contact" />}
                variant="outline"
                className="border-parchment/30 bg-transparent text-parchment hover:bg-parchment/10"
              >
                Request brochure
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
