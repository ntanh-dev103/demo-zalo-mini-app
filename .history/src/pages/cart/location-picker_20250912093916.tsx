import React, { FC, useState } from "react";
import { ListItem } from "components/list-item";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { createPortal } from "react-dom";
import { ActionSheet } from "components/fullscreen-sheet";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 21.028511, // Hanoi by default
  lng: 105.804817,
};

export const LocationPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 🔑 put your key here
  });

  return (
    <>
      <ListItem
        onClick={() => setVisible(true)}
        title={selected ? "Vị trí của bạn" : "Chọn vị trí"}
        subtitle={
          selected
            ? `Lat: ${selected.lat.toFixed(4)}, Lng: ${selected.lng.toFixed(4)}`
            : "Nhấn để mở bản đồ"
        }
      />

      {visible &&
        createPortal(
          <ActionSheet
            title="Chọn vị trí của bạn"
            visible={visible}
            onClose={() => setVisible(false)}
            actions={[
              [
                {
                  text: "Xác nhận vị trí",
                  onClick: () => setVisible(false),
                  highLight: true,
                },
              ],
              [{ text: "Đóng", close: true, danger: true }],
            ]}
          >
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={selected || defaultCenter}
                zoom={14}
                onClick={(e) => {
                  if (e.latLng) {
                    setSelected({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng(),
                    });
                  }
                }}
              >
                {selected && <Marker position={selected} />}
              </GoogleMap>
            )}
          </ActionSheet>,
          document.body
        )}
    </>
  );
};
