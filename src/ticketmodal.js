
import React, { useEffect, useState } from "react";
import './styles/ticketmodal.css'

function TicketForm() {
  const initialValues = {
    First_name: "",
    last_name: "",
    registration_number: "",
    num: "",
    
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [selectedOption, setSelectedOption] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  const [Easypaisanum, setEasypaisanum] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isPurchase, setIsPurchase] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  

  const handleExpiryDateChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit characters
    value = value.replace(/\D/g, "");

    // Add a slash (/) after the second character
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    // Limit the input to 5 characters
    value = value.slice(0, 5);

    setExpiryDate(value);
  };
  const handleEasypaisanum =(e)=>{
    let value = e.target.value;
    value = value.slice(0, 11);
    setEasypaisanum(value);

  }
  const handleCardNumberChange = (e) => {
    let value = e.target.value;

    // Remove any non-digit characters
    value = value.replace(/\D/g, "");

    // Add a space after every four characters
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
    value = value.slice(0, 19);

    setCardNumber(value);
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handlePurchase = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsPurchase(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isPurchase) {
      console.log(formValues);
    }
  }, [formValues]);

  const validate = (values) => {
    const errors = {};
    if (!values.First_name) {
      errors.First_name = "First name is required";
    }
    if (!values.last_name) {
      errors.last_name = "Last name is required";
    }
    if (!values.registration_number) {
      errors.registration_number = "Registration number is required";
    }
    if (!values.num) {
      errors.num = "Number of tickets required";
    }
    if (selectedOption === "-- Select --") {
      errors.selectedOption = "Please Select your Department";
    }
    if (paymentOption === "-- Select --") {
        errors.paymentOption = "Please Select payment method";}
    if (!expiryDate) {
      errors.expiryDate = "Expiry date of card required";
    }
    if (!cardNumber) {
        errors.cardNumber = "Card Number required";
      }
    if (!Easypaisanum) {
        errors.Easypaisanum = "Easypaisa number required required";
      }
    return errors;
  };
  const renderFormBasedOnPaymentMethod = () => {
    if (paymentOption === "Easypaisa") {
      return (
        <div className="field">
            <label className="labele ">Easypaisa Account Number</label>
            <input
              type="text"
              value={Easypaisanum}
              onChange={handleEasypaisanum}
              placeholder="03000000000"
            />
            {formErrors.Easypaisanum && (
              <p className="error">{formErrors.Easypaisanum}</p>
            )}
             <button className="fluid ui buttone blue" type="submit">
            PAY
          </button>
          </div>
          
      );
    }else if (paymentOption === "Master Card") {
      return (
        <div>
          {/* Additional fields or components for Master Card */}
          <div className="field">
            <label>Card Number</label>
            <input
              type="text"
              value={cardNumber}
              onChange={handleCardNumberChange}
              placeholder="1234 1234 1234 1234"
            />
            {formErrors.cardNumber && (
              <p className="error">{formErrors.cardNumber}</p>
            )}
          </div>
          <div className="field">
            <label className="labele ">Expiration Date</label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
            />
            {formErrors.expiryDate && (
              <p className="error">{formErrors.expiryDate}</p>
            )}
          </div>
          <button className="fluid ui button blue" type="submit">
            PAY
          </button>
        </div>
      );
    } else if (paymentOption === "On Campus") {
      return (
        <div>
            <button className="fluid ui button blue" type="submit">
            Reserve 
          </button>
          
        </div>
      );
    } else {
      return null; // Render nothing if no payment option is selected
    }
  };

  return (
    <div className="Modal-container">
      <form onSubmit={handlePurchase}>
        <h1 style={{fontFamily:"Helvetica"}}>Buy Tickets</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label className="labele ">First Name</label>
            <input
              type="text"
              name="First_name"
              placeholder="Enter your First name"
              value={formValues.First_name}
              onChange={handleChange}
              className="form-control "
            />
            {formErrors.First_name && (
              <p className="error para">{formErrors.First_name}</p>
            )}
          </div>
          <div className="field">
            <label className="labele ">Last Name</label>
            <input
              type="text"
              name="last_name"
              className="form-control "
              placeholder="Enter your Last name"
              value={formValues.last_name}
              onChange={handleChange}
            />
            {formErrors.last_name && (
              <p className="error">{formErrors.last_name}</p>
            )}
          </div>
          <div className="field">
            <label className="labele ">Registration Number</label>
            <input
              className="form-control "
              type="text"
              name="registration_number"
              placeholder="Enter your Registration number"
              value={formValues.registration_number}
              onChange={handleChange}
            />
            {formErrors.registration_number && (
              <p className="error">{formErrors.registration_number}</p>
            )}
          </div>
          <div>
            <label  className="labele "htmlFor="combobox">Select Department:</label>
            <select
            className="form-select"
              id="combobox"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="option1">Mechanical Engineer</option>
              <option value="option2">Material Engineer</option>
              <option value="option3">Computer Science</option>
              <option value="option4">AeroSpace Engineer</option>
              <option value="option5">Avionics</option>
              <option value="option6">Space Science</option>
              <option value="option7">Electrical Engineer</option>
              <option value="option8">Math</option>
              <option value="option9">Physics</option>
            </select>
            {formErrors.selectedOption && (
              <p className="error">{formErrors.selectedOption}</p>
            )}
          </div>
          <div className="field">
            <label className="labele ">Tickets</label>
            <input
              className="form-control "
              type="number"
              name="num"
              placeholder="Enter the number of tickets"
              value={formValues.num}
              onChange={handleChange}
            />
            {formErrors.num && <p className="error">{formErrors.num}</p>}
          </div>
          <div>
            <label className="labele " htmlFor="combobox">Select Payment Method</label>
            <select
              
            className="form-select"
                id="combobox"
                value={paymentOption}
                onChange={(e) => setPaymentOption(e.target.value)}
>
                <option value="">-- Select --</option>
                <option value="Easypaisa">Easypaisa</option>
                <option value="Master Card">Master Card</option>
                 <option value="On Campus">On Campus</option>
                </select>

              {formErrors.selectedOption && (
              <p className="error">{formErrors.paymentOption}</p>
            )}
              </div>

          
          {renderFormBasedOnPaymentMethod()}
         
        </div>
      </form>
    </div>
  );
}
export default TicketForm;
