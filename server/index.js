// env var
require("dotenv").config();

// libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

// configs
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

// microservices routes
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/menu";
import Image from "./API/image";
import Order from "./API/orders";
import Reviews from "./API/reviews";
import User from "./API/User";
import MailService from "./API/Mail";



// Database connection
import ConnectDB from "./database/connection";

const zomato = express();

// application middlewares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

// passport configuration
googleAuthConfig(passport);
routeConfig(passport);

// Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant",Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Reviews);
zomato.use("/user", User);
zomato.use("/mail", MailService);

zomato.get("/", (req, res) => res.json({ message: "Setup success" }));

zomato.listen(4000, () => 
  ConnectDB()
    .then(() => console.log("Server is runnig!!!"))
    .catch(() =>
      console.log("Server is running but database connection failed!!")
      )  
);


