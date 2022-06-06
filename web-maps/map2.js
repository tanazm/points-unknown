mapboxgl.accessToken = 'pk.eyJ1IjoidGFuYXptIiwiYSI6ImNsMWprZGNubjFscGozbHFrcG41dDh5bmkifQ.oq4bHdIFMK-OUA4k1Ux3bQ';
var map2 = new mapboxgl.Map({
    container: 'map2',
    style: 'mapbox://styles/tanazm/cl42rqx10001d16ny87nk6jmx',
    zoom: 3,
    maxZoom: 13,
    minZoom: 3.5,
    center: [-99, 38],
    maxBounds: [
      [-180, 15],
      [-30, 72],
    ],
    projection: 'albers',
  });

  map2.on("load", function () {
    map2.addLayer(
      {
        id: "us_police",
        type: "circle",
        source: {
          type: "geojson",
          data: "data/policeBrutality.geojson",
        },
        paint: {
          "circle-radius": 7,
          "circle-color": "#444444",
          "circle-stroke-color": "#000000",
          "circle-opacity": 0.2,
        },
      },
      "waterway-label"
    );
    map2.addLayer(
      {
        id: "us_states_outline",
        type: "line",
        source: {
          type: "geojson",
          data: "data/statefinal.geojson",
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 0.7,
        },
      },
      "us_police"
    );
  });
  
  map2.on("click", "us_police", function (e) {
    var stateName = e.features[0].properties.state;
    var cityName = e.features[0].properties.city;
    var date = e.features[0].properties.date;
    var description = e.features[0].properties.description;
    new mapboxgl.Popup()
      .setLngLat(e.lngLat)
      .setHTML(
        "<h2>" +
          cityName +
          ", " +
          stateName +
          "</h2>" +
          "<p>" +
          date +
          "</p>" +
          "<p>" +
          description +
          "</p>"
      )
      .addTo(map2);
  });
  map2.on("mouseenter", "us_police", function () {
    map2.getCanvas().style.cursor = "pointer";
  });
  map2.on("mouseleave", "us_police", function () {
    map2.getCanvas().style.cursor = "";
  });