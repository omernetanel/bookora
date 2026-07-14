export type TourStep = {
  id: string;
  title: string;
  description: string;
  /** Matches a `data-tour="<value>"` attribute on the target element, or
   * `null` for a step shown as a centered card with no highlighted target. */
  target: string | null;
};

export const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    title: "ברוכים הבאים ל-LYNKO",
    description:
      "זו סביבת דמו חיה — אפשר ללחוץ, לקבוע ולערוך תורים ולנווט בין העמודים בחופשיות. שום דבר לא נשמר בפועל.",
    target: null,
  },
  {
    id: "sidebar-nav",
    title: "כל המערכת שלך, במקום אחד",
    description: "מהתפריט אפשר לעבור בין היומן, הלקוחות, השירותים, הצוות והדוחות.",
    target: "sidebar-nav",
  },
  {
    id: "view-toggle",
    title: "תצוגת יום / שבוע / חודש",
    description: "אפשר לעבור בין תצוגות של היומן — מבט מהיר על כל השבוע, או פירוט יומי מלא.",
    target: "view-toggle",
  },
  {
    id: "notifications",
    title: "התראות בזמן אמת",
    description: "תורים חדשים, תזכורות וביטולים מתעדכנים כאן.",
    target: "notifications-bell",
  },
  {
    id: "demo-badge",
    title: "תג תצוגת דמו",
    description: "כל הנתונים כאן מדומים לצורך ההדגמה, והם מתאפסים בכל רענון של הדף.",
    target: "demo-badge",
  },
  {
    id: "closing",
    title: "רוצים גרסה כזו לעסק שלכם?",
    description: "זו רק דוגמה למה שאפשר לבנות — מותאם אישית למותג ולתהליך העבודה שלכם.",
    target: null,
  },
];
