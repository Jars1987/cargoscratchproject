import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import './Map.css';
import fetchData from '../api/fetchData';
import { route, point } from '../api/lineAmination';
import Popup from './PopUp';

mapboxgl.accessToken =
  process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_MAPBOX_TOKEN
    : process.env.MAPBOXTOKEN;

const steps = 500;
let counter = 0;

const distanceCoordinates = n => {
  const lineDistance = turf.length(route.features[n]);
  const arc = [];
  for (let i = 0; i < lineDistance; i += lineDistance / steps) {
    const segment = turf.along(route.features[n], i);
    arc.push(segment.geometry.coordinates);
  }
  route.features[n].geometry.coordinates = arc;
};

for (let i = 0; i < 7; i++) {
  distanceCoordinates(i);
}

function Map() {
  const mapContainerRef = useRef(null);
  const popUpRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/apollosurfer/ckvml4v1o56uu15tjjm2939s8',
      center: [62.08, 15.19],
      zoom: 2,
    });
    // Adding Layers
    map.on('load', () => {
      // add the data source for new a feature collection with no features
      map.addSource('random-points-data', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: fetchData.features },
      });

      //route animation route source
      map.addSource('route', { type: 'geojson', data: route });
      //route animation moving point source
      map.addSource('point', { type: 'geojson', data: point });

      // now add the layer, and reference the data source above by name
      //add multiple markers to map by layer
      map.addLayer({
        id: 'random-points-layer',
        source: 'random-points-data',
        type: 'symbol',
        layout: {
          'icon-image': 'marker-blue',
          'icon-padding': 0,
          'icon-allow-overlap': true,
        },
      });

      //add the route layer
      map.addLayer({
        id: 'route',
        source: 'route',
        type: 'line',
        paint: { 'line-width': 2, 'line-color': '#007cbf' },
      });
      //add the moving point layer
      map.addLayer({
        id: 'point',
        source: 'point',
        type: 'symbol',
        layout: {
          'icon-image': 'airport-15',
          'icon-rotate': ['get', 'bearing'],
          'icon-rotation-alignment': 'map',
          'icon-allow-overlap': true,
          'icon-ignore-placement': true,
        },
      });
      //add pop ups to the marker layer by adding a click
      map.on('click', 'random-points-layer', e => {
        if (e.features.length) {
          const feature = e.features[0];
          // create popup node
          const popupNode = document.createElement('div');
          ReactDOM.render(<Popup feature={feature} />, popupNode);
          // set popup on map
          popUpRef.current
            .setLngLat(feature.geometry.coordinates)
            .setDOMContent(popupNode)
            .addTo(map);
        }
      });

      map.on('click', 'random-points-layer', e => {
        map.flyTo({
          center: e.features[0].geometry.coordinates,
          essential: true,
        });
      });

      //add pointer to markers use the layer name we made for markers
      map.on('mouseenter', 'random-points-layer', () => {
        map.getCanvas().style.cursor = 'pointer';
      });

      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'random-points-layer', () => {
        map.getCanvas().style.cursor = '';
      });

      //Create the animation function for

      function animate() {
        // wee need the for loop to first add all the coordinates
        // to each feature before adding the data
        for (let i = 0; i < route.features.length; i++) {
          const start =
            route.features[i].geometry.coordinates[
              counter >= steps ? counter - 1 : counter
            ];
          const end =
            route.features[i].geometry.coordinates[
              counter >= steps ? counter : counter + 1
            ];
          if (!start || !end) return;

          point.features[i].geometry.coordinates =
            route.features[i].geometry.coordinates[counter];
          point.features[i].properties.bearing = turf.bearing(
            turf.point(start),
            turf.point(end)
          );
        }

        map.getSource('point').setData(point);

        if (counter < steps) {
          requestAnimationFrame(animate);
        }
        counter = counter + 1;
      }

      animate();

      setTimeout(() => {
        map.flyTo({
          center: [-8.516333, 41.325222],
          zoom: 16.5,
          speed: 0.2,
          duration: 10000,
        });
      }, 6000);
      setTimeout(() => map.fire('click', [-8.516333, 41.325222]), 8000);
    });
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div>
      <div ref={mapContainerRef} className='map-container' />
    </div>
  );
}

export default Map;
