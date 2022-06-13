import { Component } from "@angular/core";
import { RiotService } from "../riot/riot.service";
import { RiotInput } from "../riot/input"

@Component({
    selector: 'lw-names',
    templateUrl: './name-input.components.html',
    styleUrls: ['./name-input.components.css']
})
export class NameInput {
    nameInput = '';
    names: string[] = [];
    allyChampions: string[] = [];
    enemyChampions: string[] = []
    addNamesClicked = false;
    estimateClicked = false;
    output = "Loading Please Wait"

    constructor(private riotService: RiotService) {}
    addNames(): void {
        this.addNamesClicked = true;
        this.names = this.nameInput.trim().split('\n')
        this.names = this.names.map(e => e.replace(" joined the lobby", ""))
    }

    getValue(): void {
        for (let i = 0; i < 5; i++) {
            let allyChampInput = document.querySelector("#ally"+i) as HTMLInputElement;
            let enemyChampInput = document.querySelector("#enemy"+i) as HTMLInputElement;
            if (allyChampInput != null) {
                this.allyChampions.push(allyChampInput.value.replace(/\s+/g, '').toLocaleLowerCase());
            }

            if (enemyChampInput != null) {
                this.enemyChampions.push(enemyChampInput.value.replace(/\s+/g, '').toLocaleLowerCase());
            }
        }


    }

    estimateClick(): void {
        let emptyChamp = this.allyChampions.length == 0 || this.enemyChampions.length == 0
        let data: RiotInput = {
            "name1": this.names[0],
            "name2": this.names[1],
            "name3": this.names[2],
            "name4": this.names[3],
            "name5": this.names[4],
            "allyChamp1": this.allyChampions[0],
            "allyChamp2": this.allyChampions[1],
            "allyChamp3": this.allyChampions[2],
            "allyChamp4": this.allyChampions[3],
            "allyChamp5": this.allyChampions[4],
            "enemyChamp1": this.enemyChampions[0],
            "enemyChamp2": this.enemyChampions[1],
            "enemyChamp3": this.enemyChampions[2],
            "enemyChamp4": this.enemyChampions[3],
            "enemyChamp5": this.enemyChampions[4],
        }
        this.estimateClicked = !emptyChamp;
        if (!emptyChamp) {
            this.riotService.getRiotAPI(data).subscribe({
                next: result => this.output = result,
                error: err => console.log(err)
            }
            );
        }
    }
}