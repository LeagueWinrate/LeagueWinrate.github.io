import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    // const usersUrl = "https://getbootstrap.com/docs/4.0/components/buttons/";
    // const usersUrl = "https://developer.riotgames.com/docs/portal#product-registration_application-process"
    const usersUrl = "https://na.op.gg/summoners/na/penguin27513"
    // const usersUrl = "https://u.gg/lol/profile/na1/penguin27513/overview/"

    let request = this.http.get(usersUrl, {responseType: "text" as const})
    request.subscribe({
      next: (data) => console.log("data", data),
      error: (err) => (console.log("error", err))
    })

    return of('hi');
    // return this.http.get('https://u.gg/lol/champions/lulu/build', {responseType: "text" as const} )
    
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
