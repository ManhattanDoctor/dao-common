import { Type } from 'class-transformer';
import * as _ from 'lodash';

export class UserPreferences {
    name?: string;
    phone?: string;
    email?: string;
    locale?: string;
    isMale?: boolean;
    picture?: string;
    location?: string;
    description?: string;

    @Type(() => Date)
    birthday?: Date;
}

export const USER_PREFERENCES_STRING_MAX_LENGTH = 256;

export const USER_PREFERENCES_NAME_MIN_LENGTH = 5;
export const USER_PREFERENCES_NAME_MAX_LENGTH = 50;

export const USER_PREFERENCES_PHONE_MAX_LENGTH = 12;
export const USER_PREFERENCES_EMAIL_MAX_LENGTH = 50;
export const USER_PREFERENCES_LOCALE_MAX_LENGTH = 2;
export const USER_PREFERENCES_PICTURE_MAX_LENGTH = USER_PREFERENCES_STRING_MAX_LENGTH;
export const USER_PREFERENCES_LOCATION_MAX_LENGTH = USER_PREFERENCES_STRING_MAX_LENGTH;
export const USER_PREFERENCES_DESCRIPTION_MAX_LENGTH = USER_PREFERENCES_STRING_MAX_LENGTH;
