import { useAddress } from "../../context/addressContext";
import "./address.css";

export const AddressForm = () => {
  const {
    addressData,
    setIsAddressCardVisible,
    checkout,
    setCheckout,
    removeAddressData,
  } = useAddress();
  return (
    <>
      <div className="address-form">
        <h2>Select Address</h2>
        {addressData.length === 0 && <h2>No addresses added.</h2>}
        {addressData.map((data) => {
          const { _id, name, street, city, state, pincode } = data;
          return (
            <div key={_id} className="address-list">
              <input
                type="radio"
                name="address"
                checked={checkout && checkout._id === _id}
                onChange={() => setCheckout(data)}
              />
              <div className="address-data">
                <div>
                  <h3>{name}</h3>
                  <p>{street},</p>
                  <p>
                    {city}, {state}
                  </p>
                  <p>{pincode}</p>
                </div>

                <div className="address-btn">
                  <button
                    onClick={() => {
                      setIsAddressCardVisible(true);
                      setCheckout(data);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => removeAddressData(_id)}>Delete</button>
                </div>
              </div>
            </div>
          );
        })}
        <button
          onClick={() => {
            setIsAddressCardVisible(true);
            setCheckout({
              name: "",
              street: "",
              city: "",
              state: "",
              pincode: "",
            });
          }}
        >
          Add New Address
        </button>
      </div>
    </>
  );
};
