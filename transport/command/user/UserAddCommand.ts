import { ITraceable } from '@ts-core/common';
import { TransformUtil } from '@ts-core/common';
import { LedgerUser } from '../../../ledger/user';
import { IsString, IsDate, IsEnum, Length, ValidateNested, Matches, IsOptional, IsDefined } from 'class-validator';
import { LedgerCommand, ChaincodeTransportCommandAsync } from '../LedgerCommand';
import { RegExpUtil, ValidateUtil } from '../../../util';
import { Type } from 'class-transformer';
import { LedgerRole } from '../../../ledger/role';

export class UserAddCommand extends ChaincodeTransportCommandAsync<IUserAddDto, LedgerUser> {
    // --------------------------------------------------------------------------
    //
    //  Public Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = LedgerCommand.USER_ADD;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IUserAddDto) {
        super(UserAddCommand.NAME, TransformUtil.toClass(UserAddDto, request));
    }

    // --------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    // --------------------------------------------------------------------------

    protected checkResponse(item: LedgerUser): LedgerUser {
        return TransformUtil.toClass(LedgerUser, item);
    }
}

export interface IUserCryptoKey {
    value: string;
    algorithm: string;
}

export interface IUserAddDto extends ITraceable {
    cryptoKey: IUserCryptoKey;
    description: string;
    roles: Array<LedgerRole>;
}

export class UserCryptoKey implements IUserCryptoKey {
    @IsString()
    value: string;

    @IsString()
    algorithm: string;
}

export class UserAddDto implements IUserAddDto {
    @IsDefined()
    @Type(() => UserCryptoKey)
    @ValidateNested()
    cryptoKey: UserCryptoKey;

    @Matches(RegExpUtil.DESCRIPTION_REG_EXP)
    description: string;

    @IsEnum(LedgerRole, { each: true })
    roles: Array<LedgerRole>;
}
