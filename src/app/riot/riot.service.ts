import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RiotConstants } from './constants';

@Injectable({
  providedIn: 'root'
})
export class RiotService {

  constructor(private http: HttpClient) { }

  getRiotAPI(url: string):Observable<any> {
    const na = "na1"
    const ameria = "americas"    
    let baseUrl = this.RiotUrl(na) + this.getSummonerByName("penguin27513") + RiotConstants.api_key
    console.log(baseUrl)
    return of(url)
    // return this.http.get(baseUrl)
    //test
    
  }

  RiotUrl(region: string): string {
    return `https://${region}.api.riotgames.com`
  }

  getSummonerByName(name: string) {
    const version = RiotConstants.summoner_version
    return `/lol/summoner/${version}/summoners/by-name/${name}`
  }

  getEntriesBySummonerId(summonerId: string) {
    const version = RiotConstants.league_version
    return `/lol/league/${version}/entries/by-summoner/${summonerId}`
  }

  getMatchListByPuuid(puuid: string) {
    const version = RiotConstants.match_version
    return `lol/match/${version}/matches/by-puuid/${puuid}/ids`
  }

  getMatchByMatchId(matchId: string) {
    const version = RiotConstants.match_version
    return `lol/match/${version}/matches/${matchId}`
  }

  getSummonerByPuuid(puuid: string) {
    const version = RiotConstants.summoner_version
    return `lol/summoner/${version}/summoners/by-puuid/${puuid}`
  }

  getEntriesByRank(queue: string, tier: string, division: string) {
    const version = RiotConstants.league_version
    return `lol/league/${version}/entries/${queue}/${tier}/${division}`
  }

  getSummonerBySummonerId(summonerId: string) {
    const version = RiotConstants.summoner_version
    return `lol/summoner/${version}/summoners/${summonerId}`
  }

}
