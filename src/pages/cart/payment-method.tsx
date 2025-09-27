import React, { FC } from "react";
import { Radio } from "zmp-ui";

type PaymentOption = "visa" | "atm" | "cod";

interface Props {
  value: PaymentOption;
  onChange: (val: PaymentOption) => void;
}

export const PaymentMethod: FC<Props> = ({ value, onChange }) => {
  return (
    <div className="space-y-4">
      {/* Nhóm chọn phương thức */}
      <Radio.Group value={value} onChange={(e) => onChange(e as PaymentOption)}>
        <div className="space-y-2">
          <Radio value="visa" className="flex items-center space-x-2">
            <span>💳 Thanh toán bằng thẻ Visa</span>
          </Radio>
          {value === "visa" && (
            <div className="ml-6 p-3 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">Thông tin thẻ Visa</h4>
              <input
                type="text"
                placeholder="Số thẻ Visa"
                className="w-full border px-2 py-1 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Tên chủ thẻ"
                className="w-full border px-2 py-1 rounded mb-2"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-1/2 border px-2 py-1 rounded"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-1/2 border px-2 py-1 rounded"
                />
              </div>
            </div>
          )}

          <Radio value="atm" className="flex items-center space-x-2">
            <span>🏦 Thanh toán bằng thẻ ATM</span>
          </Radio>
          {value === "atm" && (
            <div className="ml-6 p-3 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">Chọn ngân hàng liên kết</h4>
              <select className="w-full border px-2 py-2 rounded">
                <option>Vietcombank</option>
                <option>Techcombank</option>
                <option>ACB</option>
              </select>
            </div>
          )}

          <Radio value="cod" className="flex items-center space-x-2">
            <span>📦 Thanh toán khi nhận hàng (COD)</span>
          </Radio>
          {value === "cod" && (
            <div className="ml-6 p-3 border rounded-lg bg-gray-50">
              <h4 className="font-medium mb-2">Thanh toán khi nhận hàng</h4>
              <p className="text-sm text-gray-600">
                Bạn sẽ thanh toán trực tiếp cho nhân viên giao hàng khi nhận sản phẩm.
              </p>
            </div>
          )}
        </div>
      </Radio.Group>
    </div>
  );
};
