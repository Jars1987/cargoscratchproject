//how to add multiple lines on a map using a layer

const lineData = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        id: 1,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-8.516333, 41.325222],
          [-7.5, 40.23],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 2,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-8.516333, 41.325222],
          [-9.05, 38.86],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 3,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-8.516333, 41.325222],
          [-3.68, 40.42],
        ],
      },
    },

    {
      type: 'Feature',
      properties: {
        id: 4,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-8.516333, 41.325222],
          [12.56, -5.07],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 5,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-8.516333, 41.325222],
          [13.24, -8.8],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 6,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-8.516333, 41.325222],
          [13.56, -12.32],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 7,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-8.516333, 41.325222],
          [32.58, -25.98],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 8,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-8.516333, 41.325222],
          [121.45, 31.23],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 9,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-7.503694, 40.229889],
          [-9.057306, 38.864083],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 1,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-9.057306, 38.864083],
          [-3.6839691696228236, 40.4226357441819],
          [13.2422543, -8.8046248],
          [32.5888944, -25.9808064],
          [121.450028, 31.233432],
        ],
      },
    },
    {
      type: 'Feature',
      properties: {
        id: 1,
      },
      geometry: {
        type: 'LineString',
        coordinates: [
          [-3.6839691696228236, 40.4226357441819],
          [121.450028, 31.233432],
        ],
      },
    },
  ],
};

export default lineData;

useEffect(() => {
  const map = new mapboxgl.Map({
    container: mapContainerRef.current,
    style: 'mapbox://styles/apollosurfer/ckvml4v1o56uu15tjjm2939s8',
    center: [62.08, 15.19],
    zoom: 2,
  });
  // Adding Layers
  map.on('load', () => {
    map.addSource('line-data', {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: lineData.features },
    });

    //add multiple routes layer
    map.addLayer({
      id: 'line-animation',
      type: 'line',
      source: 'line-data',
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#999999',
        'line-width': 2,
        'line-dasharray': [2, 2],
      },
    });

    return () => {
      map.remove();
    };
  });
}, []);
