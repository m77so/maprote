import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { isLeft } from "fp-ts/Either";
export interface QuestJson {
    type:     "FeatureCollection";
    features: Feature[];
    bbox:     [number, number, number, number];
}

interface Feature {
    type:       FeatureType;
    properties: Properties;
    geometry:   Geometry;
}

interface Geometry {
    type:        GeometryType;
    coordinates: Array<Array<number[]>>;
}

enum GeometryType {
    Polygon = "Polygon",
}

interface Properties {
    ANSWER: string;
}

enum FeatureType {
    Feature = "Feature",
}

export function validateQuestJson(json : unknown) {
    const questValidator = t.type({
        type: t.string,
        features: t.array(
          t.type({
            type: t.literal('Feature'),
            properties: t.type({
              ANSWER: t.string,
            }),
            geometry: t.type({
              type: t.literal('Polygon'),
              coordinates: t.array(t.array(t.tuple([t.number, t.number]))),
            }),
          })
        ),
        bbox: t.tuple([t.number, t.number, t.number, t.number]),
    });
    const result = questValidator.decode(json);
  
    if (isLeft(result)) {
      const errors = PathReporter.report(result);
      throw new Error(errors.join('\n'));
    }
    
    const validData = result.right;
    console.log(validData);
}

function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

export enum QuestState {

}
export class Quest {
    geojson: QuestJson
    questions: string[]
    score: number[]

    constructor(
        geojson: QuestJson,
        question_number: number
    )  {
        this.geojson = geojson
        this.questions = shuffleArray( geojson.features.map(v=>v.properties.ANSWER) )
        this.questions = this.questions.slice(0, Math.min(question_number, this.questions.length))
        this.score = []
    }

    solve(answer: string): boolean {
        const is_correct: boolean = answer == this.questions[this.score.length]
        if (is_correct) {
            this.score.push(1)
        } else {
            this.score.push(0)
        }
        return is_correct
    }

    next() {
        return this.questions[this.score.length]
    }
}