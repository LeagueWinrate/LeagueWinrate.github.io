import { Component } from "@angular/core";
import { RiotService } from "../riot/riot.service";
import { RiotInput } from "../riot/input"
const ort = require('onnxruntime-web');

@Component({
    selector: 'lw-names',
    templateUrl: './name-input.components.html',
    styleUrls: ['./name-input.components.css']
})
export class NameInput {
    InferenceSession = ort.InferenceSession;
    Tensor = ort.Tensor;

    nameInput = '';
    names: string[] = [];
    allyChampions: string[] = ['','','','',''];
    enemyChampions: string[] = ['','','','','']
    estimateClicked = false;

    constructor(private riotService: RiotService) {}
    addNames(): void {
        this.names = this.nameInput.trim().split('\n')
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

        const data: RiotInput = {
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
            this.runInference("hi");
            // this.riotService.getRiotAPI(data).subscribe({
            //     next: result => this.runInference(result),
            //     error: err => console.log(err)
            // }
            // );
        }
    }

    async runInference(input: string) {
        console.log(input)
        console.log("---")

        const session = await ort.InferenceSession.create('../src/app/name-input/LeagueWinOneO.onnx', { executionProviders: ['wasm']});

        // const session = await this.InferenceSession.create('LeagueWinOneO.onnx');

        const dataA = Float32Array.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13,14,15,16,17,18,19,20]);
        // const data = this.prepareData(input);
        const tensorA = new ort.Tensor('float32', dataA, [3, 4]);
        const feed = {float_input : new ort.Tensor('float32', tensorA, [1,20])}
        const results = await session.run(feed);
        console.log(results)
        console.log(results.c.data)
        // return results
    }

}