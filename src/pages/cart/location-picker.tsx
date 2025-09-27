import React, { FC, useState } from "react";
import { ListItem } from "components/list-item";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { createPortal } from "react-dom";
import { ActionSheet } from "components/fullscreen-sheet"; // Giả định ActionSheet là Sheet/Modal

const containerStyle = {
  width: "100%",
  height: "400px",
};

const defaultCenter = {
  lat: 21.028511, // Ví dụ: Hà Nội
  lng: 105.804817,
};

export const LocationPicker: FC = () => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [address, setAddress] = useState<string>("");
  const [tempSelection, setTempSelection] = useState<{ lat: number; lng: number } | null>(null);
  const [tempAddress, setTempAddress] = useState<string>("");


  // ✅ load maps script
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    // Cần thay thế bằng Khóa API Google Maps của bạn
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", 
  });

  const fetchAddress = async (lat: number, lng: number) => {
    setTempAddress("Đang tìm kiếm địa chỉ...");
    try {
      const res = await fetch(
        // Cần thay thế bằng Khóa API Google Maps của bạn
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`, 
      );
      const data = await res.json();
      if (data.status === "OK" && data.results.length > 0) {
        setTempAddress(data.results[0].formatted_address);
      } else {
        setTempAddress("Không tìm thấy địa chỉ");
      }
    } catch {
      setTempAddress("Lỗi khi lấy địa chỉ");
    }
  };
  
  // Xử lý xác nhận vị trí được chọn
  const handleConfirm = () => {
    if (tempSelection && tempAddress) {
      setSelected(tempSelection);
      setAddress(tempAddress);
      setVisible(false);
    }
  };
  
  // Xử lý khi mở modal
  const handleOpen = () => {
    setTempSelection(selected);
    setTempAddress(address);
    setVisible(true);
  };
  
  // Xử lý click trên bản đồ
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setTempSelection({ lat, lng });
      fetchAddress(lat, lng);
    }
  };

  return (
    <>
      <ListItem
        onClick={handleOpen} // Gọi handleOpen
        title={address || "Chọn vị trí"}
        subtitle={
          selected
            ? address 
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
                  text: tempAddress || "Xác nhận vị trí",
                  onClick: handleConfirm, // Gọi handleConfirm
                  highLight: true,
                  disabled: !tempSelection || tempAddress.includes("Lỗi"), // Tắt nút nếu chưa chọn hoặc lỗi
                },
              ],
              [{ text: "Đóng", close: true, danger: true }],
            ]}
          >
            <div style={{ height: '50px', padding: '0 16px', lineHeight: '50px', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ddd' }}>
                <p style={{ margin: 0, fontWeight: 'bold' }}>{tempAddress || 'Vui lòng chọn một điểm trên bản đồ'}</p>
                {tempSelection && <p style={{ margin: 0, fontSize: '10px' }}>{`Lat: ${tempSelection.lat.toFixed(4)}, Lng: ${tempSelection.lng.toFixed(4)}`}</p>}
            </div>
            {/* 🔥 Show error if maps fail */}
            {loadError && <p style={{ padding: '16px' }}>Lỗi tải Google Maps</p>}

            {/* 🔥 Only render map when loaded */}
            {isLoaded && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={tempSelection || selected || defaultCenter}
                zoom={tempSelection || selected ? 16 : 14}
                onClick={handleMapClick} // Gọi handleMapClick
              >
                {tempSelection && <Marker position={tempSelection} />}
              </GoogleMap>
            )}
          </ActionSheet>,
          document.body,
        )}
    </>
  );
};