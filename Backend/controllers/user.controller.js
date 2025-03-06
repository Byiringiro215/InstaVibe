import User from "../models/user.model.js";

export const getUsersForSideBar=async(req,res)=>{
    try {
        const loggedInUserId=req.user._id;
//retrieves all users except the logged in user minus the password
        const filteredUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");

             // Check if there are no users found
    if (filteredUsers.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }

        res.status(200).json(filteredUsers);

    } catch (error) {
        console.error("Error in getUsersForSideBar:",error.message);
        res.status(500).json({error:"Internal server error"});

    }
}