const Menu = require("../models/Menu")
require("dotenv").config();

// Fetch today's menu based on the selected day
exports.menufetch = async (req, res) =>{
    try {
        const Day = req.params.day
        console.log({Day})
        const menu = await Menu.findOne({Day});
		if (!menu) {
			return res.status(404).json({
				success: false,
				message: `Menu Not Found,Enter Day Again`,
			});
		}
        console.log(menu)
        res.json(menu);
    
      } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
}

//ADD MENU
exports.menuadd = async (req, res) =>{
    try{
        const{
            Day,
            Breakfast,
            Lunch,
            Dinner,
            Sweet_dish
        }= req.body

        //check all details are present
        if (
            !Day||
            !Breakfast ||
            !Lunch ||
            !Dinner||
            !Sweet_dish
        ) {
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
            });
        }
        // Check if menu already exists
		const existingmenu = await User.findOne({ email });
		if (existingmenu) {
			return res.status(400).json({
				success: false,
				message: "Menu already exists.",
			});
		}
        const menu = await Menu.create({
			Day,
            Breakfast,
            Lunch,
            Dinner,
            Sweet_dish
		});

		return res.status(200).json({
			success: true,
			menu,
			message: "Menu added successfully",
		});
}catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Menu cannot be added",
    });
}
}

exports.menuUpdate = async (req, res) =>{
    try{
        const{
            Day,
            Breakfast,
            Lunch,
            Dinner,
            Sweet_dish
        }= req.body

        const updatedMenu = await Menu.findOneAndUpdate({ Day },
                             { Breakfast },
                             {Lunch},
                             {Dinner},
                             {Sweet_dish},
                            { new: true });
        if (!updatedMenu) {
          return res.status(404).json({
             message: 'Menu not found for the selected day' 
            });
        }
        return res.status(200).json({
			success: true,
			updatedMenu,
			message: "Menu updated successfully",
		});
        
      
    }catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Menu cannot be updated",
        });
    }
}


exports.menuAll = async (req, res) =>{
    try {
        const menu = await Menu.find();
        // const menuArray = menu.map(item => item.toObject());
        return res.status(200).json({
			success: true,
			menu,
			message: "Menu fetched successfully",
		});
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

exports.menudelete = async (req, res) =>{
    try {
        const{Day} = req.body;
        await Menu.deleteMany({ Day: Day });
        return res.status(200).json({
            success: true,
            message: `Menu for ${Day} deleted successfully`,
        });
    
      } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message 
        });
    }
}