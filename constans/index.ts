import logo from "../assets/images/Logo_Image.png";
import prog from "../assets/images/prog.jpeg";
import getstarted from "../assets/images/started.jpg";
import ATPiaLogo from "../assets/images/ATPia_Logo.png";
import avatar from "../assets/images/avatar.png";
import avatarr from "../assets/images/avatarr.png";

export const images = {
  logo,
  prog,
  getstarted,
  ATPiaLogo,
  avatar,
  avatarr,
};

export const onboarding =[
    {
        id:1,
        title: 'Welcome to ATPia',
        description: 'Your personal nutrition and fitness companion',
        image: images.logo
    },
    {
        id:2,
        title: 'Track Your Progress',
        description: 'Monitor your nutrition and fitness goals with ease',
        image: images.prog
    },
    {
        id:3,
        title: 'Get Started',
        description: 'Ready to begin your health journey?',
        image: images.getstarted
    }
]