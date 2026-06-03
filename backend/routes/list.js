const router = require("express").Router();

const User = require("../models/user");
const List = require("../models/list");





//create
router.post("/addTask", async (req, res) => {
   try {
      const { title, body, email } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser) {
         const list = new List({ title, body, user: existingUser });
         await list.save().then(() => res.status(200).json({ list }));
         existingUser.list.push(list);
         await existingUser.save();
      }

   } catch (error) {
      console.log(error);
   };


});
// update
router.put("/updateTask/:id", async (req, res) => {

   try {

      const { title, body } = req.body;

      const updatedTask = await List.findByIdAndUpdate(
         req.params.id,
         { title, body },
         { new: true }
      );

      return res.status(200).json({
         message: "Task Updated",
         updatedTask
      });

   } catch (error) {

      console.log(error);

      return res.status(500).json({
         message: "Internal server error"
      });
   }
});
//delete
router.delete("/deleteTask/:id", async (req, res) => {

   try {

      const deletedTask = await List.findByIdAndDelete(req.params.id);

      await User.updateMany(
         { list: req.params.id },
         { $pull: { list: req.params.id } }
      );

      return res.status(200).json({
         message: "Task Deleted",
         deletedTask
      });

   } catch (error) {

      console.log(error);

      return res.status(500).json({
         message: "Internal server error"
      });
   }
});
//get task 
router.get("/getTasks/:id", async (req, res) => {

   try {

      const existingUser = await User.findById(req.params.id);
      if (!existingUser) {
         return res.status(404).json({
            message: "User not found"
         });
      }
      const tasks = await List.find({
         user: req.params.id
      }).sort({ createdAt: -1 });

      if (tasks.length === 0) {
         return res.status(200).json({
            success: true,
            message: "No tasks available for this user."
         });
      }

      return res.status(200).json({
         success: true,
         message: "Tasks fetched successfully",
         tasks
      });

   } catch (error) {

      console.log(error);

      return res.status(500).json({
         success: false,
         message: "Internal server error"
      });
   }
});

module.exports = router;