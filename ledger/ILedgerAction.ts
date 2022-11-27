import * as _ from 'lodash';
import { LedgerCoinId } from './coin';

export class ILedgerAction {
    // uid: string;
    date: Date;
    type: LedgerActionType;
    objectUid?: string;
    requestUid: string;

    isSucceed: boolean;
    initiatorUid?: string;

    userUid?: string;
    coinUid?: string;
    projectUid?: string;
    companyUid?: string;

    amount?: string;
    coinId?: LedgerCoinId;
}

export enum LedgerActionType {
    USER_ADDED = 'USER_ADDED',
    USER_CRYPTO_KEY_CHANGED = 'USER_CRYPTO_KEY_CHANGED',

    COMPANY_ADDED = 'COMPANY_ADDED',
    COMPANY_USER_ADDED = 'COMPANY_USER_ADDED',
    COMPANY_USER_EDITED = 'COMPANY_USER_EDITED',
    COMPANY_USER_REMOVED = 'COMPANY_USER_REMOVED',

    COIN_ADDED = 'COIN_ADDED',
    COIN_HOLDED = 'COIN_HOLDED',
    COIN_UNHOLDED = 'COIN_UNHOLDED',
    COIN_BURNED = 'COIN_BURNED',
    COIN_EMITTED = 'COIN_EMITTED',
    COIN_EXCHANGED = 'COIN_EXCHANGED',

    // Based on COIN_EXCHANGED
    COIN_EXCHANGE_SENT = 'COIN_EXCHANGE_SENT',
    COIN_EXCHANGE_RECEIVE = 'COIN_EXCHANGE_RECEIVE',


    PROJECT_ADDED = 'PROJECT_ADDED',
    PROJECT_EDITED = 'PROJECT_EDITED',
    PROJECT_REMOVED = 'PROJECT_REMOVED',
    PROJECT_USER_ADDED = 'PROJECT_USER_ADDED',
    PROJECT_USER_EDITED = 'PROJECT_USER_EDITED',
    PROJECT_USER_REMOVED = 'PROJECT_USER_REMOVED'
}
