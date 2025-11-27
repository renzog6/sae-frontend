// filepath: sae-frontend/lib/constants/contact.constants.ts
import { ContactType } from "@/lib/types/shared/contact";

export const contactTypeLabels: Record<ContactType, string> = {
  [ContactType.EMAIL]: "Email",
  [ContactType.PHONE]: "Teléfono",
  [ContactType.WHATSAPP]: "WhatsApp",
  [ContactType.TELEGRAM]: "Telegram",
  [ContactType.INSTAGRAM]: "Instagram",
  [ContactType.LINKEDIN]: "LinkedIn",
  [ContactType.OTHER]: "Otro",
} as const;
