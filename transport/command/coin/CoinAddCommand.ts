import { ITraceable } from '@ts-core/common';
import { TransformUtil } from '@ts-core/common';
import { Matches, IsNumber, IsString } from 'class-validator';
import { LedgerCommand, ChaincodeTransportCommandAsync } from '../LedgerCommand';
import { LedgerCompany } from '../../../ledger/company';
import { LedgerCoin } from '../../../ledger/coin';
import { LedgerVoting } from '../../../ledger/voting';

export class CoinAddCommand extends ChaincodeTransportCommandAsync<ICoinAddDto, LedgerCoin> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = LedgerCommand.COIN_ADD;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: ICoinAddDto) {
        super(CoinAddCommand.NAME, TransformUtil.toClass(CoinAddDto, request));
    }

    // --------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    // --------------------------------------------------------------------------

    protected checkResponse(item: LedgerCoin): LedgerCoin {
        return TransformUtil.toClass(LedgerCoin, item);
    }
}

export interface ICoinAddDto extends ITraceable {
    coinId: string;
    decimals: number;
    companyUid: string;
    emit?: {
        to: string;
        amount: string;
    }
}

export class CoinAddDto implements ICoinAddDto {
    @IsString()
    coinId: string;

    @IsNumber()
    decimals: number;

    @Matches(LedgerCompany.UID_REG_EXP)
    companyUid: string;

    @Matches(LedgerVoting.UID_REG_EXP)
    votingUid: string;
}
