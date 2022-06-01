import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from '../api/axios';
import { toast } from "react-toastify";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "/auth/forgot",
        JSON.stringify({ email }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setEmail("");
      if (res.data === "Mail sent successfully") {
        toast.success("Mail sent successfully");
        navigate("/reset");
      } else {
        toast(res.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="con">
      <div className="box bg-dark text-white">
      <form onSubmit={handleClick}>
        <div className="form-group m-5">
          <input
            className="form-control col-3"
            type="email"
            autoComplete="off"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Email..."
            required
          />
        </div>
        <div className="d-flex justify-content-center align-items-center flex-column">
          <button className="btn btn-primary" type="submit">
            Send Otp
          </button><br/>
          <Link to="/login">Login</Link>
        </div>
      </form>
      </div>
    </div>
  );
};

export default Forgot;