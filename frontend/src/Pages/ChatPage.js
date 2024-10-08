import { useEffect, useState } from "react";
import Chatbox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/Miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false); 
  const { user, setUser  } = ChatState();

    // Ensure user state is updated with localStorage info on page load
    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);  // Sync the user state with localStorage
    }, [setUser]);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}

      <div className="d-flex justify-content-between" style={{ width: "100%", height: "91.5vh", padding: "10px" }}>
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} /> 
        )}
      </div>
    </div>
  );
};

export default Chatpage;


         

