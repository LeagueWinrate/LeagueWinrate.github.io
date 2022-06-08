import { environment } from "src/environments/environment";

const key = environment.riot_api

export const RiotConstants = {
    summoner_version: 'v4',
    league_version: 'v4',
    match_version: 'v5',
    api_key: `?api_key=${key}`
};