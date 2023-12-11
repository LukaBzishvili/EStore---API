import logo from "../assets/images/E-commerce.png";

/* eslint-disable react/no-unescaped-entities */

// const data = {
//   shop: ["Gift Cards", "Site Maps", "Polka Blog", "Login", "Sign In"],
//   sell: ["Sell on Polka", "Teams", "Forums", "Affiliates"],
//   about: ["Polka, Inc", "Policies", "Investors", "Careers", "Press"],
//   help: ["Help Center", "Trust and Safety", "Privacy settings"],
// };

const data = [
  ["Gift Cards", "Site Maps", "Polka Blog", "Login", "Sign In"],
  ["Sell on Polka", "Teams", "Forums", "Affiliates"],
  ["Polka, Inc", "Policies", "Investors", "Careers", "Press"],
  ["Help Center", "Trust and Safety", "Privacy settings"],
];

const names = ["Shop", "Sell", "About", "Help"];

const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center text-black">
      <div className="max-w-screen-2xl gap-[30px] w-full flex flex-col sm:flex-row items-center justify-between px-[60px] py-[40px]">
        <div className="flex flex-col gap-[10px] sm:gap-[35px]">
          <img src={logo} className="w-[190px]" />
          <h3>
            Crickelwood,London
            <br />
            NW2 6qg, UK
          </h3>
          <div></div>
          <p className=" mt-[10px] sm:mt-[50px]">© 2022 Commerce, Inc.</p>
        </div>
        <div className="flex flex-col self-start w-full h-full px-[50px]">
          <div className="ml-4 gap-[40px] w-full h-full grid grid-cols-2 md:grid-cols-4">
            {data.map((column, index) => (
              <ul className="flex flex-col justify-evenly" key={index}>
                <h3 className="text-xl mb-[20px] font-bold">{names[index]}</h3>
                {column.map((list, index) => (
                  <li key={index}>{list}</li>
                ))}
              </ul>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
