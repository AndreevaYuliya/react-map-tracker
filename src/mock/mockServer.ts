import { ObjectMarkerType } from '../stores/ObjectMarkerStore';


export const BASE_LAT = 51.75;
export const BASE_LNG = 39.59;

const COORDINATE_VARIATION = 0.01;

const mockData: ObjectMarkerType[] = Array.from({ length: 200 }, (_, index) => ({
    id: `object_${index}`,
    coordinates: [
        parseFloat((BASE_LAT + (Math.random() * COORDINATE_VARIATION * 2 - COORDINATE_VARIATION)).toFixed(6)),
        parseFloat((BASE_LNG + (Math.random() * COORDINATE_VARIATION * 2 - COORDINATE_VARIATION)).toFixed(6)),
    ],
    direction: Math.random() * 360,
    lastUpdate: Date.now(),
}));

let interval: NodeJS.Timeout | null = null;

export const startMockServer = (callback: (data: ObjectMarkerType[]) => void) => {
    if (interval) {
        return;
    }

    interval = setInterval(() => {
        mockData.forEach((object) => {
            // Випадкове рішення про те, чи оновити об'єкт
            if (Math.random() > 0.1) {
                object.coordinates = [
                    object.coordinates[0] + (Math.random() - 0.5) * 0.005,
                    object.coordinates[1] + (Math.random() - 0.5) * 0.005,
                ];

                object.lastUpdate = Date.now();
            }
        });

        callback(mockData);
    }, 1_000);
};

export const stopMockServer = () => {
    if (interval) {
        clearInterval(interval);
        
        interval = null;
    }
};

