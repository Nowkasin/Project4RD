function initialize() {
  const locations = {
    image1: { lat: 13.743454263299475, lng: 100.52981109559687 },
    image2: { lat: 13.758121982178181, lng: 100.56458846931703 },
    image3: { lat: 13.746980495820132, lng: 100.53547521534148 },
    image4: { lat: 13.731186835126849, lng: 100.56994324976763 },
    image5: { lat: 13.746025939600537, lng: 100.53958637713093 },
    image6: { lat: 13.777637122053687, lng: 100.47585589115931 },
    image7: { lat: 13.693594423278702, lng: 100.64865424013169 },
    image8: { lat: 13.921613365281061, lng: 100.39148090120962 },
    image9: { lat: 13.989115311304836, lng: 100.61667482667877},
    image10: { lat: 13.746561611757581, lng: 100.53525407738354 },
    image11: { lat: 13.877027542647438, lng: 100.4119239504582 },
    image12: { lat: 13.878001743637995, lng: 100.41062976240374 },

  };

  const map = new google.maps.Map(document.getElementById("map"), {
    center: locations["image1"],
    zoom: 14,
  });

  const markers = []; // เก็บ Marker ทั้งหมด

  function clearMarkers() {
    markers.forEach((marker) => {
      marker.setMap(null); // ลบ Marker ออกจากแผนที่
    });
    markers.length = 0; // ลบ Marker ทั้งหมดจากอาเรย์
  }

  function changeLocation(locationId) {
    const selectedLocation = locations[locationId];
    if (selectedLocation) {
      map.panTo(selectedLocation);
      clearMarkers(); // เรียกใช้ฟังก์ชันเพื่อลบ Marker ทั้งหมด
      placeMarker(selectedLocation, locationId);
    }
  }

  function placeMarker(location, locationId) {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
      title: locationId,
    });

    marker.addListener("click", () => {
      map.panTo(location);
    });

    markers.push(marker); // เพิ่ม Marker ลงในอาเรย์
  }

  const locationButtons = document.getElementById("locationButtons");

  Array.from(locationButtons.children).forEach((li) => {
    const button = li.querySelector("button");
    const locationId = button.getAttribute("data-location-id");

    button.addEventListener("click", () => changeLocation(locationId));
  });
}

window.onload = initialize;
