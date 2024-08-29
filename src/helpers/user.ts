export function getNameInitials(name: string): string {
    const nameParts = name.trim().split(' ').filter(part => part);
    const initials = nameParts.map(part => part[0].toUpperCase()).join('');

    return initials;
}