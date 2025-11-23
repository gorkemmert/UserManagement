import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUser = async (req, res) => {
  try {
  
    let { page, limit, sortKey, sortDirection, ...filters } = req.query;

    Object.keys(filters).forEach((key) => {
      if (filters[key] === "" || filters[key] === undefined) {
        delete filters[key];
      }
    });

    if (filters.meslek) {
      filters.meslek = { $in: filters.meslek.split(",") };
    }

    if (filters.tckn) {
      filters.tckn = filters.tckn.toString();
    }

   
    if (req.query.name) {
      filters.name = { $regex: req.query.name, $options: "i" };
    }
    if (req.query.surname) {
      filters.surname = { $regex: req.query.surname, $options: "i" };
    }
    if (req.query.tckn) {
      filters.tckn = { $regex: req.query.tckn, $options: "i" };
    }



   
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    const skip = (page - 1) * limit;

  
    let sort = {};
    if (sortKey) {
      sort[sortKey] = sortDirection === "desc" ? -1 : 1;
    }

   
    const total = await User.countDocuments(filters);

    const users = await User.find(filters)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      data: users,
      total,
      page,
      limit,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSingleUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({
            message:error.message,
        });
    }
}

export const createUser = async (req, res) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    const body = {...req.body, password: hash }

    try {
        const response = await User.create(body)
        if(response){
            res.status(201).json(body)
        }
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const updateUser = async (req, res) => {
    const {id} = req.params;
    const post = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, post, {new: true});
        res.json(updatedUser)
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        
        const response = await User.findByIdAndDelete(id)
        res.json(response)
        
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}


export const loginUser = async (req, res) => {
    const userName = req.body.name
    const userPassword = req.body.password
    const user = await User.findOne({name:userName})

    try {
        if(user){
            // const isUser = await bcrypt.compare(userPassword, user.password)
            const isUser = userPassword === user.password
            if(isUser){
                const payload = { 
                    userId: user._id, 
                    loginDate: Date.now(), 
                    userName: user.name,
                };
                
                const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: 7200})
                res.json({role: user.role , access_token: token , expiresIn: 7200})
            } else {
                res.json({message: "girdiğiniz kullanıcı ve şifre yanlıştır"})
            }
             
        }else {
            res.send("user not found")
        }
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
}

export const seedUsers = async (req, res) => {
    try {
        const users = [];

        for (let i = 1; i <= 9; i++) {
            // const hash = await bcrypt.hash(`pass${i}`, 10);
            users.push({
                name: `user${i}`,
                surname: `surname${i}`,
                password: 123,
                tckn: `1234567890${i}`, 
                meslek: i % 2 === 0 ? "Mühendis" : "Yazar", 
                role: i % 2 === 0 ? "admin" : "user"
            });
        }

        const response = await User.insertMany(users);
        res.status(201).json({
            message: "kullanıcı başarıyla eklendi",
            data: response
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
