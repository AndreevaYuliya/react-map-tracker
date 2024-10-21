import React, { useEffect } from 'react';

import { observer } from 'mobx-react-lite';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import L from 'leaflet';

import { BASE_LAT, BASE_LNG, startMockServer, stopMockServer } from '../mock/mockServer';

import objectMarkerStore from '../stores/ObjectMarkerStore';

import 'leaflet/dist/leaflet.css';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapView = observer(() => {
    useEffect(() => {
        startMockServer((data) => {
            data.forEach((item) => {
                if (!objectMarkerStore.objects.find((object) => object.id === item.id)) {
                    objectMarkerStore.addObject(item);
                } else {
                    objectMarkerStore.updateObject(item.id, item.coordinates, item.direction);
                }
            });
        });

        return () => {
            stopMockServer();
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            objectMarkerStore.checkLostObjects();
        }, 60_000);

        return () => {
            clearInterval(interval)
        };
    }, []);

    return (
        <MapContainer center={[BASE_LAT, BASE_LNG]} zoom={15} style={{ height: '100vh', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />

            {objectMarkerStore.objects.map((object) => (
                <Marker key={object.id} position={object.coordinates} opacity={objectMarkerStore.lostObjects.has(object.id) ? 0.5 : 1}>
                    <Popup>
                        <div>
                            <h4>Object ID: {object.id}</h4>
                            <p>Direction: {object.direction}°</p>

                            {objectMarkerStore.lostObjects.has(object.id) && <p style={{ color: 'red' }}>Status: Lost</p>}
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
});

export default MapView;
