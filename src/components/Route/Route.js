import React, { useContext, useEffect } from "react";
import { MapContext } from "contexts/MapContext";
import { Polyline } from "@react-google-maps/api";

export default (props) => {
  const map = useContext(MapContext);

  if (!props.path) return false;
  console.log(props.path);
  const path = props.path
    .map((path) => window.google.maps.geometry.encoding.decodePath(path))
    .flat();
  console.log(path[0].toJSON());

  const bgPolyLine = new window.google.maps.Polyline({
    path,
    geodesic: true,
    strokeColor: "#000000", //'#6495ED',
    strokeOpacity: 0.6,
    strokeWeight: 4,
  });

  const polyLine = new window.google.maps.Polyline({
    path,
    geodesic: true,
    strokeColor: props.color || "#999", //'#6495ED',
    strokeOpacity: 0.8,
    strokeWeight: 4,
  });

  useEffect(() => {
    bgPolyLine.setMap(map.get());
    polyLine.setMap(map.get());
    return () => {
      polyLine.setMap(null);
      bgPolyLine.setMap(null);
    };
  }, [polyLine]);

  return null;
};
