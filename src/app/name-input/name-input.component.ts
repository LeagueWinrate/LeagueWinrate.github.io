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
    enemyChampions: string[] = [];
    addNamesClicked = false;
    estimateClicked = false;
    output = "Loading Please Wait... This will take about 5-10 seconds"

    constructor(private riotService: RiotService) {}
    addNames(): void {
        this.addNamesClicked = true;
        this.names = this.nameInput.trim().split('\n')
        this.names = this.names.map(e => e.replace(" joined the lobby", ""))
    }

    getValue(): void {
        this.allyChampions = [];
        this.enemyChampions = [];
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
        this.getValue()
        let emptyChamp = this.allyChampions.length == 0 || this.enemyChampions.length == 0
        this.estimateClicked = !emptyChamp;
        this.output = "Loading Please Wait... This will take about 5-10 seconds"
        if (!emptyChamp) {
            this.riotService.getRiotAPI(this.names, this.allyChampions, this.enemyChampions).subscribe({
                next: result => {
                    this.output = result.body
                },
                error: err => console.log(err)
            }
            );
        }
    }
}