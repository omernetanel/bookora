import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";

type StaffMember = {
  id: string;
  name: string;
  role: string;
  workingDays: string;
  workingHours: string;
};

const staffMembers: StaffMember[] = [
  { id: "s1", name: "אור כהן", role: "ספר בכיר", workingDays: "א׳–ה׳", workingHours: "09:00–17:00" },
  { id: "s2", name: "מיכל לוי", role: "יועצת", workingDays: "א׳–ד׳", workingHours: "10:00–18:00" },
  { id: "s3", name: "דניאל אברהם", role: "מעצב שיער", workingDays: "ב׳–ו׳", workingHours: "09:00–15:00" },
];

export default function StaffPage() {
  return (
    <main className="flex flex-1 flex-col overflow-y-auto">
      <TopBar title="צוות" subtitle={`${staffMembers.length} אנשי צוות`} />

      <div className="grid grid-cols-3 gap-4 px-8 pb-8">
        {staffMembers.map((member) => (
          <Card key={member.id} className="flex flex-col items-center gap-3 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
              {member.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {member.workingDays}
              {", "}
              <span dir="ltr">{member.workingHours}</span>
            </p>
          </Card>
        ))}
      </div>
    </main>
  );
}
