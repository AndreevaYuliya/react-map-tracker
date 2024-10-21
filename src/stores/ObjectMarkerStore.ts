import { makeAutoObservable } from 'mobx';

export type ObjectMarkerType = {
    id: string;
    coordinates: [number, number];
    direction: number;
    lastUpdate: number;
}

class ObjectMarkerStore {
    objects: ObjectMarkerType[] = [];
    lostObjects: Set<string> = new Set();

    constructor() {
        makeAutoObservable(this);
    }

    addObject(object: ObjectMarkerType) {
        this.objects.push(object);
        this.lostObjects.delete(object.id);
    }

    updateObject(id: string, coordinates: [number, number], direction: number) {
        const object = this.objects.find((object) => object.id === id);

        if (object) {
            object.coordinates = coordinates;
            object.direction = direction;
            object.lastUpdate = Date.now();

            this.lostObjects.delete(id);
        }
    }

    markLost(id: string) {
        this.lostObjects.add(id);
    }

    checkLostObjects() {
        const currentTime = Date.now();

        this.objects.forEach((object) => {
            // Якщо об'єкт не отримував оновлень більше 5 хвилин
            if (currentTime - object.lastUpdate > 300_000 && !this.lostObjects.has(object.id)) {
                this.markLost(object.id);
            }
        });

        // Видалення об'єктів, які були позначені як втрачений більше 5 хвилин
        this.objects = this.objects.filter((object) => {
            if (this.lostObjects.has(object.id)) {
                return currentTime - object.lastUpdate <= 300_000;
            }
            
            return true;
        });
    }
}

const objectMarkerStore = new ObjectMarkerStore();

export default objectMarkerStore;
