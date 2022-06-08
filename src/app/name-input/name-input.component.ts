import { Component } from "@angular/core";
import { RiotService } from "../riot/riot.service";

@Component({
    selector: 'lw-names',
    templateUrl: './name-input.components.html',
    styleUrls: ['./name-input.components.css']
})
export class NameInput {
    nameInput = '';
    names: string[] = [];
    allyChampions: string[] = ['','','','',''];
    enemyChampions: string[] = ['','','','','']
    estimateClicked = false;

    constructor(private riotService: RiotService) {}
    addNames(): void {
        this.names = this.nameInput.split('\n')
        this.names = this.names.map(e => e.replace(" joined the lobby", ""))
    }

    getValue(): void {
        this.names.forEach((player, id) => {
            let allyChampInput = document.querySelector("#"+player) as HTMLInputElement;
            let enemyChampInput = document.querySelector("#enemy"+id) as HTMLInputElement;
            if (allyChampInput != null) {
                this.allyChampions[id] = allyChampInput.value.replace(/\s+/g, '').toLocaleLowerCase();
            }

            if (enemyChampInput != null) {
                this.enemyChampions[id] = enemyChampInput.value.replace(/\s+/g, '').toLocaleLowerCase();
            }
        })
    }
    //Comment
    estimateClick(): void {
        let emptyChamp = false
        // this.allyChampions.forEach((champ) => {
        //     if (champ === '') {
        //         emptyChamp = true;
        //     }
        // })
        // this.enemyChampions.forEach((champ) => {
        //     if (champ === '') {
        //         emptyChamp = true;
        //     }
        // })
        this.estimateClicked = !emptyChamp;
        if (!emptyChamp) {
            this.riotService.getRiotAPI("testing").subscribe({
                next: result => console.log(result),
                error: err => console.log(err)
            }
            );
        }
        // console.log(this.estimateClicked)
    }


}