import { TransformUtil } from '@ts-core/common';
import { LedgerCommand, ChaincodeTransportCommandAsync } from '../LedgerCommand';
import { LedgerUser } from '../../../ledger/user';
import { IUserListDtoResponse, IUserListDto } from '../user';

export class ProjectUserListCommand extends ChaincodeTransportCommandAsync<IProjectUserListDto, IUserListDtoResponse> {
    // --------------------------------------------------------------------------
    //
    //  Static Properties
    //
    // --------------------------------------------------------------------------

    public static readonly NAME = LedgerCommand.PROJECT_USER_LIST;

    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(request: IProjectUserListDto) {
        super(ProjectUserListCommand.NAME, request, null, true);
    }

    // --------------------------------------------------------------------------
    //
    //  Protected Methods
    //
    // --------------------------------------------------------------------------

    protected checkResponse(response: IUserListDtoResponse): IUserListDtoResponse {
        response.items = TransformUtil.toClassMany(LedgerUser, response.items);
        return response;
    }
}

export interface IProjectUserListDto extends IUserListDto {
    projectUid: string;
}
