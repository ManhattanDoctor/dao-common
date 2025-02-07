import { LedgerEvent, ILedgerEventDto, LedgerEventDefault } from '../LedgerEvent';

export class UserEditedEvent extends LedgerEventDefault {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = LedgerEvent.USER_EDITED;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor() {
        super(UserEditedEvent.NAME);
    }
}
