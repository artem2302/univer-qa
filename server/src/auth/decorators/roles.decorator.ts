
import { SetMetadata } from '@nestjs/common';

import { TUserRole } from 'src/users/types';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: TUserRole[]) => SetMetadata(ROLES_KEY, roles);
