import Image from "next/image";
import { TopBar } from "@/components/layout/TopBar";
import { Card } from "@/components/ui/Card";
import { staffMembers } from "@/lib/mock-schedule";

export default function StaffPage() {
  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
      <TopBar title="צוות" subtitle={`${staffMembers.length} אנשי צוות`} />

      <div className="grid grid-cols-1 gap-4 px-4 pb-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        {staffMembers.map((member) => (
          <Card key={member.id} className="flex flex-col items-center gap-3 text-center">
            <Image
              src={member.avatarUrl}
              alt=""
              width={56}
              height={56}
              className="h-14 w-14 rounded-full border border-border object-cover"
            />
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
