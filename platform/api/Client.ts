import { TransportHttp, ITransportHttpSettings, UID, getUid } from '@ts-core/common';
import { ILogger } from '@ts-core/common';
import * as _ from 'lodash';
import { ITraceable, TraceUtil } from '@ts-core/common';
import { TransformUtil } from '@ts-core/common';
import { IInitDto, IInitDtoResponse, ILoginDto, ILoginDtoResponse } from './login';
import { User, UserCompany, UserProject } from '../user';
import { Coin } from '../coin';
import { IUserGetDtoResponse, IUserEditDto, IUserEditDtoResponse } from '../api/user';
import { ILedgerObjectDetails } from './ILedgerObjectDetails';
import { IProjectEditDto, IProjectEditDtoResponse, IProjectGetDtoResponse, IProjectListDto, IProjectListDtoResponse, IProjectUserListDto, IProjectUserListDtoResponse, IProjectUserRoleGetDtoResponse, IProjectUserRoleSetDto, IProjectUserRoleSetDtoResponse } from './project';
import { LedgerProjectRole } from '../../ledger/role';
import { ProjectUser } from '../project';
import { ICompanyGetDtoResponse } from './company';
import { ICoinGetDtoResponse, ICoinListDto, ICoinListDtoResponse } from './coin';

export class Client extends TransportHttp<ITransportHttpSettings> {
    // --------------------------------------------------------------------------
    //
    //  Constructor
    //
    // --------------------------------------------------------------------------

    constructor(logger: ILogger, url?: string) {
        super(logger, { method: 'get', baseURL: url, isHandleError: true, isHandleLoading: true, headers: {} });
    }

    // --------------------------------------------------------------------------
    //
    //  Auth Methods
    //
    // --------------------------------------------------------------------------

    public async login(data: ILoginDto): Promise<ILoginDtoResponse> {
        return this.call<ILoginDtoResponse, ILoginDto>(LOGIN_URL, { data: TraceUtil.addIfNeed(data), method: 'post' });
    }

    public async init(data?: IInitDto): Promise<IInitDtoResponse> {
        let item = await this.call<IInitDtoResponse, IInitDto>(INIT_URL, { data: TraceUtil.addIfNeed(data) });
        item.user = TransformUtil.toClass(User, item.user);
        item.company = TransformUtil.toClass(UserCompany, item.company);
        return item;
    }

    public async logout(traceId?: string): Promise<void> {
        return this.call<void, ITraceable>(LOGOUT_URL, { data: TraceUtil.addIfNeed({ traceId }), method: 'post' });
    }

    // --------------------------------------------------------------------------
    //
    //  User Methods
    //
    // --------------------------------------------------------------------------

    public async userGet(id: number): Promise<IUserGetDtoResponse> {
        let item = await this.call<User>(`${USER_URL}/${id}`);
        return TransformUtil.toClass(User, item);
    }

    public async userEdit(data: IUserEditDto): Promise<IUserEditDtoResponse> {
        let item = await this.call<IUserEditDtoResponse, IUserEditDto>(`${USER_URL}/${data.id}`, { method: 'put', data });
        return TransformUtil.toClass(User, item);
    }

    // --------------------------------------------------------------------------
    //
    //  Company Methods
    //
    // --------------------------------------------------------------------------

    public async companyGet(id: number): Promise<ICompanyGetDtoResponse> {
        let item = await this.call<UserCompany>(`${COMPANY_URL}/${id}`);
        return TransformUtil.toClass(UserCompany, item);
    }

    // --------------------------------------------------------------------------
    //
    //  Coin Methods
    //
    // --------------------------------------------------------------------------

    public async coinGet(id: number): Promise<ICoinGetDtoResponse> {
        let item = await this.call<Coin>(`${COIN_URL}/${id}`);
        return TransformUtil.toClass(Coin, item);
    }

    public async coinList(data?: ICoinListDto): Promise<ICoinListDtoResponse> {
        let item = await this.call<ICoinListDtoResponse, ICoinListDto>(COIN_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(Coin, item.items);
        return item;
    }

    // --------------------------------------------------------------------------
    //
    //  Project Methods
    //
    // --------------------------------------------------------------------------

    public async projectEdit(data: IProjectEditDto): Promise<IProjectEditDtoResponse> {
        let item = await this.call<IProjectEditDtoResponse, IProjectEditDto>(`${PROJECT_URL}/${data.id}`, { method: 'put', data });
        return TransformUtil.toClass(UserProject, item);
    }

    public async projectGet(id: number): Promise<IProjectGetDtoResponse> {
        let item = await this.call<UserProject>(`${PROJECT_URL}/${id}`);
        return TransformUtil.toClass(UserProject, item);
    }

    public async projectList(data?: IProjectListDto): Promise<IProjectListDtoResponse> {
        let item = await this.call<IProjectListDtoResponse, IProjectListDto>(PROJECT_URL, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(UserProject, item.items);
        return item;
    }

    public async projectUserList(data?: IProjectUserListDto, id?: number): Promise<IProjectUserListDtoResponse> {
        let item = await this.call<IProjectUserListDtoResponse, IProjectUserListDto>(`${PROJECT_URL}/${id}/user`, { data: TraceUtil.addIfNeed(data) });
        item.items = TransformUtil.toClassMany(ProjectUser, item.items);
        return item;
    }

    public async projectUserRoleGet(projectId: number, userId: number): Promise<IProjectUserRoleGetDtoResponse> {
        let item = await this.call<IProjectUserRoleGetDtoResponse, void>(`${PROJECT_URL}/${projectId}/role/${userId}`);
        return item;
    }

    public async projectUserRoleSet(projectId: number, userId: number, data: Array<LedgerProjectRole>): Promise<IProjectUserRoleSetDtoResponse> {
        let item = await this.call<IProjectUserRoleSetDtoResponse, IProjectUserRoleSetDto>(`${PROJECT_URL}/${projectId}/role/${userId}`, { data, method: 'post' });
        return item;
    }


    //--------------------------------------------------------------------------
    //
    // 	Ledger Object
    //
    //--------------------------------------------------------------------------

    public async ledgerObjectDetails(uid: UID): Promise<ILedgerObjectDetails> {
        return this.call<ILedgerObjectDetails>(LEDGER_OBJECT_DETAILS_URL, { data: { uid: getUid(uid) } });
    }

    //--------------------------------------------------------------------------
    //
    // 	Public Properties
    //
    //--------------------------------------------------------------------------

    public set sid(value: string) {
        if (!_.isNil(this.headers)) {
            this.headers.Authorization = `Bearer ${value}`;
        }
    }
}

const PREFIX = 'api/';

export const USER_URL = PREFIX + 'user';
export const COIN_URL = PREFIX + 'coin';
export const COMPANY_URL = PREFIX + 'company';
export const PROJECT_URL = PREFIX + 'project';

export const INIT_URL = PREFIX + 'init';
export const LOGIN_URL = PREFIX + 'login';
export const LOGOUT_URL = PREFIX + 'logout';

export const LEDGER_OBJECT_DETAILS_URL = PREFIX + 'ledgerObjectDetails';
