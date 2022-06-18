import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { json } from 'stream/consumers';
import { RiotInput } from './input';
@Injectable({
  providedIn: 'root'
})
export class RiotService {

  constructor(private http: HttpClient) { }

  getRiotAPI(names: string[], allyChampions: string[], enemyChampions: string[]):Observable<any> {

    let params = new HttpParams().set("name1", names[0])
                                 .set("name2", names[1])
                                 .set("name3", names[2])
                                 .set("name4", names[3])
                                 .set("name5", names[4])
                                 .set("allyChampion1", allyChampions[0])
                                 .set("allyChampion2", allyChampions[1])
                                 .set("allyChampion3", allyChampions[2])
                                 .set("allyChampion4", allyChampions[3])
                                 .set("allyChampion5", allyChampions[4])
                                 .set("enemyChampion1", enemyChampions[0])
                                 .set("enemyChampion2", enemyChampions[1])
                                 .set("enemyChampion3", enemyChampions[2])
                                 .set("enemyChampion4", enemyChampions[3])
                                 .set("enemyChampion5", enemyChampions[4])

    
    const api_gateway = "https://1rdolqehpd.execute-api.us-east-1.amazonaws.com/winrate"
    let request = this.http.get<any>(api_gateway, {params: params})
    return request;
    
  }
}
