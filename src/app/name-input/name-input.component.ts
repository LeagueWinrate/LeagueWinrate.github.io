import { Component } from "@angular/core";
import { RiotService } from "../riot/riot.service";
import { RiotInput } from "../riot/input"
import { ChampInput } from "./champ-input";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'lw-names',
    templateUrl: './name-input.components.html',
    styleUrls: ['./name-input.components.css']
})
export class NameInput {
    gettingEstimate = false;
    nameInput = '';
    names: string[] = [];
    allyChampions: string[] = [];
    enemyChampions: string[] = [];
    addNamesValid = false;
    estimate = false;
    empty = false
    output = "Loading Please Wait... This will take about 5-10 seconds"
    championList: string[] = Object.values(require("./champion_name.json"))
    champInput: ChampInput = {
        ally0: '',
        ally1: '',
        ally2: '',
        ally3: '',
        ally4: '',
        enemy0: '',
        enemy1: '',
        enemy2: '',
        enemy3: '',
        enemy4: '',
    }

    constructor(private riotService: RiotService) {}
    addNames(): void {
        this.names = this.nameInput.trim().split('\n')
        this.names = this.names.map(e => e.replace(" joined the lobby", ""))
        if (this.names.length == 5) {
            this.addNamesValid = true;
        }
    }

    getValue(): void {
        let champions = Object.values(this.champInput)
        champions.forEach(champ => {
            if (champ === '') {
                this.empty = true;
            }
        })
    }

    estimateClick(form: NgForm): void {
        this.gettingEstimate = true;
        if (form.valid) {
            this.getValue()
            this.output = "Loading Please Wait... This will take about 5-10 seconds"
            this.estimate = true;
            this.allyChampions = [this.champInput.ally0, this.champInput.ally1, this.champInput.ally2, this.champInput.ally3, this.champInput.ally4]
            this.enemyChampions = [this.champInput.enemy0, this.champInput.enemy1, this.champInput.enemy2, this.champInput.enemy3, this.champInput.enemy4]
            this.riotService.getRiotAPI(this.names, this.allyChampions, this.enemyChampions).subscribe({
                next: result => {
                    this.output = result.body
                    this.gettingEstimate = false;
                },
                error: err => {
                    console.log(err)
                    this.gettingEstimate = false;
                }
            }
            );

        }
    }
}