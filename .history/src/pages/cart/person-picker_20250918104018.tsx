import { ListItem } from "components/list-item";
import React, { FC } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { phoneState, requestPhoneTriesState, userState } from "state";
import { Box, Icon } from "zmp-ui";

interface PersonPickerProps {
  onChevronClick?: () => void;
}

const PersonPicker: FC<PersonPickerProps> = ({ onChevronClick }) => {
  const user = useRecoilValueLoadable(userState);
  const phone = useRecoilValue(phoneState);

  return (
    <>
      <ListItem
        title={
          user.state === "hasValue" ? `${user.contents.name} - ${phone}` : phone
        }
        subtitle="Người nhận"
      />
      {onChevronClick && (
        <Box
          className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2"
          onClick={() => {
            console.log("PersonPicker chevron clicked (via prop)");
            onChevronClick();
          }}
        >
          <Icon icon="zi-chevron-right" className="text-gray-500" />
        </Box>
      )}
    </>
  );
};

interface RequestPersonPickerPhoneProps {
  onChevronClick?: () => void;
}

export const RequestPersonPickerPhone: FC<RequestPersonPickerPhoneProps> = ({
  onChevronClick,
}) => {
  const retry = useSetRecoilState(requestPhoneTriesState);
  const phone = useRecoilValueLoadable(phoneState);

  const handleClick = () => {
    console.log("RequestPersonPickerPhone name clicked");
    retry((r) => r + 1);
  };

  if (phone.state === "hasValue" && phone.contents) {
    return <PersonPicker onChevronClick={onChevronClick} />;
  }

  return (
    <>
      <ListItem
        onClick={handleClick}
        title="Chọn người nhận"
        subtitle="Yêu cầu truy cập số điện thoại"
      />
      {onChevronClick && (
        <Box
          className="cursor-pointer absolute right-0 top-1/2 transform -translate-y-1/2"
          onClick={() => {
            console.log("RequestPersonPickerPhone chevron clicked (via prop)");
            onChevronClick();
          }}
        >
          <Icon icon="zi-chevron-right" className="text-gray-500" />
        </Box>
      )}
    </>
  );
};