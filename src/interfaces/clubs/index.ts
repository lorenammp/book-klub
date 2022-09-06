export interface IClubRequest {
    name: string,
    description: string,
    adm_id: string
}

export interface IClub{
    adm_id: string,
    name: string,
    description: string,
    isActive: boolean,
    created_at: string,
}