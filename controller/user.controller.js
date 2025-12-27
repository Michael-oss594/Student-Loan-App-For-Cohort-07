const User = require("../models/user.models");


const apply = async (req, res) => {
    try {
        const { name, age, phoneNumber, address, loanAmount } = req.body;
        if (!name || !age || !address || !loanAmount) {
        return res.status(400).json ({message: 'All fields are required.'});
    }
   const newUser = new User ({
    name,
    age,
    phoneNumber,
    address,
    loanAmount,
    loanStatus: false,
   });
   await newUser.save();
   return res.status(201).json(newUser);

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error"});
    }
};

const allLoans = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({users, count: users.length});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server Error"});
    }
};

const loanById = async (req, res)=> {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({ message: 'User not found'});
        }
        return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error"});  
    }
};


const searchByName = async (req, res) => {
    try {
        const { name } = req.query;
        const user = await User.findOne({ name: name });
            if(!user) {
                return res.status(404).json({ message: 'User not found'});
            }
            return res.status(200).json(user);
        } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error"});
    }
};

const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, age, phoneNumber, address, loanAmount } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, age, phoneNumber, address, loanAmount },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found'});
        }   
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error"});
    }   
};


const deleteLoan = async (req, res) =>{
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found'});
        }
        return res.status(200).json(deletedUser);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error"});
    }
};

module.exports = {
    apply,
    allLoans,
    loanById,
    searchByName,
    updateLoan,
    deleteLoan,
};
