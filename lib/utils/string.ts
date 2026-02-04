// filepath: sae-frontend/lib/utils/string.ts

export const getInitials = (fullName?: string) => {
    if (!fullName) return "";
    return fullName
        .trim()
        .split(/\s+/)
        .map(n => n[0].toUpperCase())
        .join(". ") + ".";
};
