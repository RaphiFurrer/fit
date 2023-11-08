import axa from '../assets/AXA.png';

const Header = () => {
  return (
    <header className="header">
      <div className="container mx-auto header-container mb-4 border-b border-gray-300 height[60px] pb-2">
        <img className="w-[50px] object-left-top" src={axa} />
      </div>
    </header>
  );
};

export default Header;
