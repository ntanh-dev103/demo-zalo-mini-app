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
  lat: 21.028511, // Hà Nội
  lng: 105.804817,
};

export const LocationPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [address, setAddress] = useState<string>("");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 🔑 put your key here
  });

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`,
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress("Không tìm thấy địa chỉ");
      }
    } catch (err) {
      setAddress("Lỗi khi lấy địa chỉ");
    }
  };

  return (
    <>
      <ListItem
        onClick={() => setVisible(true)}
        title={address || "Chọn vị trí"}
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
                    const lat = e.latLng.lat();
                    const lng = e.latLng.lng();
                    setSelected({ lat, lng });
                    fetchAddress(lat, lng); // 🔥 fetch human-readable address
                  }
                }}
              >
                {selected && <Marker position={selected} />}
              </GoogleMap>
            )}
          </ActionSheet>,
          document.body,
        )}
    </>
  );
};
