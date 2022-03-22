export const USER_ROLES = ['global-admin', 'faculty-admin', 'student', 'tutor', 'department-admin', 'group-admin'] as const;
export type TUserRole = typeof USER_ROLES[number];