
import { TransportEvent } from '@ts-core/common';

export enum LedgerEvent {
    USER_ADDED = 'DAO:UserAdded',
    USER_EDITED = 'DAO:UserEdited',
    USER_REMOVED = 'DAO:UserRemoved',
    USER_CRYPTO_KEY_CHANGED = 'DAO:UserCryptoKeyChanged',

    COMPANY_ADDED = 'DAO:CompanyAdded',
    COMPANY_EDITED = 'DAO:CompanyEdited',
    COMPANY_REMOVED = 'DAO:CompanyRemoved',
    COMPANY_USER_ADDED = 'DAO:CompanyUserAdded',
    COMPANY_USER_EDITED = 'DAO:CompanyUserEdited',
    COMPANY_USER_REMOVED = 'DAO:CompanyUserRemoved',

    COIN_ADDED = 'DAO:CoinAdded',
    COIN_REMOVED = 'DAO:CoinRemoved',

    VOTING_ADDED = 'DAO:VotingAdded',
    VOTING_VOTED = 'DAO:VotingVoted',
    VOTING_EDITED = 'DAO:VotingEdited',
    VOTING_FINISHED = 'DAO:VotingFinished',
    VOTING_STEP_EDITED = 'DAO:VotingStepEdited',

    COIN_HOLDED = 'DAO:CoinHolded',
    COIN_BURNED = 'DAO:CoinBurned',
    COIN_EMITTED = 'DAO:CoinEmitted',
    COIN_UNHOLDED = 'DAO:CoinUnholded',
    COIN_TRANSFERRED = 'DAO:CoinTransferred',

    PROJECT_ADDED = 'DAO:ProjectAdded',
    PROJECT_EDITED = 'DAO:ProjectEdited',
    PROJECT_REMOVED = 'DAO:ProjectRemoved',
    PROJECT_USER_ADDED = 'DAO:ProjectUserAdded',
    PROJECT_USER_EDITED = 'DAO:ProjectUserEdited',
    PROJECT_USER_REMOVED = 'DAO:ProjectUserRemoved'
}

export interface ILedgerEventDto {}

export class LedgerEventDefault extends TransportEvent<ILedgerEventDto> {
    constructor(name: string, data?: ILedgerEventDto) {
        super(name, data);
    }
}
