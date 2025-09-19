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

interface LocationPickerProps {
  onChevronClick?: () => void;
}

export const LocationPicker: FC<LocationPickerProps> = ({ onChevronClick }) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [address, setAddress] = useState<string>("");

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Replace with your key
  });

  const fetchAddress = async (lat: number, lng: number) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`,
      );
      const data = await res.json();
      if (data.status === "OK" && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setAddress("Không tìm thấy địa chỉ");
      }
    } catch {
      setAddress("Lỗi khi lấy địa chỉ");
    }
  };

  const handleClick = () => {
    console.log("LocationPicker name clicked");
    setVisible(true);
  };

  return (
    <>
      <ListItem
        onClick={handleClick}
        title={address || "Chọn vị trí"}
        subtitle={
          selected
            ? `Lat: ${selected.lat.toFixed(4)}, Lng: ${selected.lng.toFixed(4)}`
            : "Nhấn để mở bản đồ"
        }
      />
      {onChevronClick && (
        <Box
          className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2"
          onClick={() => {
            console.log("LocationPicker chevron clicked (via prop)");
            onChevronClick();
          }}
        >
          <Icon icon="zi-chevron-right" className="text-gray-500" />
        </Box>
      )}
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
            {loadError && <p>Lỗi tải Google Maps</p>}
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
                    fetchAddress(lat, lng);
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