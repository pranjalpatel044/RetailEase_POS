import "./CustomerForm.css";

const CustomerForm = ({customerName,mobileNumber, setMobileNumber,setCustomerName }) => {
    return (
        <div className="customer-form p-2">
            <div className="mb-2 d-flex align-items-center">
                <label htmlFor="customerName" className="form-label me-2" style={{ minWidth: "120px" }}>
                    Customer Name
                </label>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    id="customerName"
                    placeholder="Enter name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required

                />
            </div>

            <div className="mb-2 d-flex align-items-center">
                <label htmlFor="mobileNumber" className="form-label me-2" style={{ minWidth: "120px" }}>
                    Customer Number
                </label>
                <input
                    type="tel"
                    className="form-control form-control-sm"
                    id="mobileNumber"
                    placeholder="Enter mobile"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                />
            </div>
        </div>
    );
};

export default CustomerForm;
