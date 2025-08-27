import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/authSlice";
import { setValueTrue } from "../redux/slices/TureOr";
import Swal from "sweetalert2";

// Custom hook for logout functionality
export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // Show confirmation dialog
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will be logged out of your account",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, logout",
      });

      if (result.isConfirmed) {
        // Dispatch logout action
        dispatch(logoutUser());

        // Update TureOr state
        dispatch(setValueTrue(false));

        // Show success message
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });

        Toast.fire({
          icon: "success",
          title: "Logged out successfully",
        });

        // Redirect to home page
        navigate("/");
      }
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "An error occurred while logging out",
      });
    }
  };

  return logout;
};

// Simple logout function without confirmation
export const useQuickLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const quickLogout = () => {
    dispatch(logoutUser());
    dispatch(setValueTrue(false));
    navigate("/");
  };

  return quickLogout;
};
