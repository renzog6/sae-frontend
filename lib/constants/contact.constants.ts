import { ContactType } from "@/lib/types/enums";

export const contactTypeLabels: Record<ContactType, string> = {
  [ContactType.EMAIL]: "Email",
  [ContactType.PHONE]: "Teléfono",
  [ContactType.WHATSAPP]: "WhatsApp",
  [ContactType.TELEGRAM]: "Telegram",
  [ContactType.INSTAGRAM]: "Instagram",
  [ContactType.LINKEDIN]: "LinkedIn",
  [ContactType.OTHER]: "Otro",
} as const;
